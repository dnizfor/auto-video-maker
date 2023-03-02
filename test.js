import mergeAudios from "./utils/mergeAudios.js";

const list = [
  ...[...Array(3).keys()].map((a, index) => `./voices/${index}.mp3`),
];
console.log(list);
mergeAudios(list);
