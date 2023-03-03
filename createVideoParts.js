import wordList from "./lib/wordList.json" assert { type: "json" };
import createVideo from "./utils/createVideo.js";
import fs from "fs";
import createVoice from "./utils/createVoice.js";

const audioCountArray = [...Array(977 - 2).keys()];

const songList = [
  ...audioCountArray.map((data, index) => `./voices/${index}.mp3`),
];

const createVideoParts = async () => {
  const wordsOfLevel = wordList.filter((index) => index.level === "A1");

  let rate = 0;

  for (let index = 0; index < wordsOfLevel.length; index++) {
    await createVoice(
      wordsOfLevel[index].word,
      "en",
      `./voices/${index * 2}.mp3`
    );
    await createVoice(
      wordsOfLevel[index].mean,
      "tr",
      `./voices/${index * 2 + 1}.mp3`
    );
    if (index + 1 === wordsOfLevel.length) {
      if (index % 10) {
        await setTimeout(() => console.log("wait"), 3000);
      }
      for (let index = 0; index < wordsOfLevel.length * 2; index++) {
        await createVideo(
          "selam",
          "hello",
          `clips/${index}.mp4`,
          `voices/${index}.mp3`
        );
      }
    }
  }
};

createVideoParts();
