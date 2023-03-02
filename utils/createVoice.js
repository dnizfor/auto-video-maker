import gtts from "node-gtts";
import path from "path";
const createVoice = (text, lan, outputPath) => {
  var filepath = path.join(outputPath);

  gtts(lan).save(filepath, text, function () {});
};

export default createVoice;
