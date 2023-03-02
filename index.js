import wordList from "./lib/wordList.json" assert { type: "json" };
import createVoice from "./utils/createVoice.js";
import mergeAudios from "./utils/mergeAudios.js";

wordList.map((index) => console.log(index));

const wordsOfLevel = wordList.filter((index) => index.level === "A1");

let rate = 0;

wordsOfLevel.map(async (data) => {
  await createVoice(data.word, "en", `./voices/${rate}.mp3`);
  await createVoice(data.mean, "tr", `./voices/${rate + 1}.mp3`);
  rate = rate + 2;
});
const audioCountArray = [...Array(977 - 2).keys()];

const songList = [
  ...audioCountArray.map((data, index) => `./voices/${index}.mp3`),
];

mergeAudios(songList);
