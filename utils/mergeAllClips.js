import Ffmpeg from "fluent-ffmpeg";
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
const mergeAllClips = async (videoNames) => {
  let shadowArray = [...Array(videoNames.length).keys()];
  let rate = 0;
  while (shadowArray.length) {
    let videoList = shadowArray.splice(0, 400);
    videoList = [...videoList.map((item) => `clips/${item}.mp4`)];
    await mergeClips(videoList, `./output/video-${rate}.mp4`);
    rate += 1;
  }
};
export default mergeAllClips;
