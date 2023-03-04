import Ffmpeg from "fluent-ffmpeg";
// concat 3 mp4s together using 2 500ms directionalWipe transitions

const mergeAllClips = (videoNames, outputPath) => {
  let mergedVideo = Ffmpeg();
  videoNames.forEach((video) => (mergedVideo = mergedVideo.input(video)));
  mergedVideo.on("end", () => console.log("ok")).mergeToFile(outputPath);
};

export default mergeAllClips;
