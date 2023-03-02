import audioconcat from "audioconcat";

const mergeAudios = (songs) => {
  audioconcat(songs)
    .concat("./output/audio.mp3")
    .on("start", function (command) {
      console.log("ffmpeg process started:", command);
    })
    .on("error", function (err, stdout, stderr) {
      console.error("Error:", err);
      console.error("ffmpeg stderr:", stderr);
    })
    .on("end", function (output) {
      console.error("Audio created in:", output);
    });
};

export default mergeAudios;
