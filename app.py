from conconate_videos import concatenate_clips_in_folder
from create_video_clips import create_video_clip
import json
import os

os.mkdir("output")
os.mkdir("clips")

# Load JSON data from a file
with open('lib/home.json', 'r', encoding="utf-8") as f:
    words_and_means = json.load(f)

levels = ["A1", "A2", "B1", "B2", "C1"]
levels = [0]
print(words_and_means[0])

for level in levels:
    index = 0


    words_of_level = [
        dic for dic in words_and_means if dic["level"] == level]

    print(words_of_level)

    for item in words_of_level:
        if (f'{index}.mp4' not in os.listdir("clips")):
            create_video_clip(item['word'], item['mean'], "en", "tr",index)
        index +=1

    concatenate_clips_in_folder('clips', level, "assets/intro.mp4")
