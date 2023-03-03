import wordList from "./lib/wordList.json" assert { type: "json" };
import createVideo from "./utils/createVideo.js";
import createVoice from "./utils/createVoice.js";
import mergeAllClips from "./utils/mergeAllClips.js";

const wordsOfLevel = wordList.filter((index) => index.level === "A1");

const createVideoParts = async () => {
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
      for (let index = 0; index < wordsOfLevel.length; index++) {
        await createVideo(
          wordsOfLevel[index].word,
          "",
          `clips/${index * 2}.mp4`,
          `voices/${index * 2}.mp3`
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

createVideoParts()
  .then(() =>
    mergeAllClips(
      [...wordsOfLevel.map((data, i) => `clips/${i}.mp4`)],
      "./output/video.mp4"
    )
  )
  .catch((err) => console.log(err));
