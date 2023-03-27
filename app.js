import wordList from "./lib/wordList.json" assert { type: "json" };
import createVideo from "./utils/createVideo.js";
import createVoice from "./utils/createVoice.js";
import mergeAllClips from "./utils/mergeAllClips.js";

const createVideoParts = async (wordsOfLevel) => {
  for (let index = 0; index < wordsOfLevel.length; index++) {
    if (index % 8 === 0 && index !== 0) {
      await new Promise((resolve) => setTimeout(resolve, 4000)); // protect from google server overload
    }

    await createVoice(
      wordsOfLevel[index].word,
      "en",
      `./voices/${index * 2}.mp3`
    );
    await createVoice(
      wordsOfLevel[index].mean,
      "id",
      `./voices/${index * 2 + 1}.mp3`
    );
    if (index + 1 === wordsOfLevel.length) {
      if (index % 9) {
        await setTimeout(() => console.log("wait"), 5000);
      }
      for (let index = 0; index < wordsOfLevel.length; index++) {
        await createVideo(
          wordsOfLevel[index].word,
          "",
          `clips/${index * 2}.mp4`,
          `./voices/${index * 2}.mp3`
        );

        await createVideo(
          wordsOfLevel[index].word,
          wordsOfLevel[index].mean,
          `clips/${index * 2 + 1}.mp4`,
          `voices/${index * 2 + 1}.mp3`
        );
      }
    }
  }
};

const levels = ["A1", "A2", "B1", "B2", "C1", ""];
const make = async (index) => {
  try {
    const level = levels[index];
    const wordsOfLevel =
      level === ""
        ? wordList
        : wordList.filter((index) => index.level === level);
    await createVideoParts(wordsOfLevel);
    await mergeAllClips(
      [
        ...[...Array(wordsOfLevel.length * 2).keys()].map(
          (data, i) => `clips/${i}.mp4`
        ),
      ],
      level
    );
  } catch {
    make();
  }
};
const start = async () => {
  for (let index = 0; index < levels.length; index++) {
    await make(index);
  }
};
start();
