import Ffmpeg from "fluent-ffmpeg";
import fs from "fs";
// concat 3 mp4s together using 2 500ms directionalWipe transitions

const mergeClips = (videoNames, outputPath) => {
  return new Promise((resolve, reject) => {
    let mergedVideo = Ffmpeg();
    videoNames.forEach((video) => (mergedVideo = mergedVideo.input(video)));
    mergedVideo.on("end", () => console.log("ok")).mergeToFile(outputPath);
    mergedVideo.on("end", () => resolve());
    mergedVideo.on("error", (err) => {
      console.log("an error happened: " + err.message);
      return reject(new Error(err));
    });
  });
};
const mergeAllClips = async (videoNames, endName) => {
  let shadowArray = [...Array(videoNames.length).keys()];
  let rate = 0;
  while (shadowArray.length) {
    let videoList = shadowArray.splice(0, 400);
    videoList = [...videoList.map((item) => `clips/${item}.mp4`)];
    await mergeClips(videoList, `./output/video-${rate}.mp4`);
    rate += 1;
  }
  let files = fs.readdirSync("output/");

  // maximum array length is 400 in ffmpeg. If your output videos bigger than 400 you should write more code .
  // I dont because by output videos count less than 400 . İt is enought for me.

  await mergeClips(
    [...files.map((path) => `output/${path}`)],
    `end/last-video-${endName}.mp4`
  );
  files = await fs.readdirSync("output/");

  files.map((path) => {
    if (path !== "last-video.mp4") {
      fs.unlink(`output/${path}`, (err) => console.log(err));
    }
  });
};
export default mergeAllClips;
