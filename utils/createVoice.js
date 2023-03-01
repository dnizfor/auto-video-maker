import txtomp3 from "text-to-mp3";

export default createVoice = (text, outputPath) => {
  txtomp3.getMp3(text, function (err, binaryStream) {
    if (err) {
      console.log(err);
      return;
    }
    var file = fs.createWriteStream(outputPath); // write it down the file
    file.write(binaryStream);
    file.end();
  });
};
