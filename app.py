from conconate_videos import concatenate_clips_in_folder
from create_video_clips import create_video_clip
import json
import shutil

# Load JSON data from a file
with open('lib/data.json', 'r', encoding="utf-8") as f:
    words_and_means = json.load(f)

levels = ["A1", "A2", "B1", "B2", "C1"]

for level in levels:

    words_of_level = [
        dic for dic in words_and_means if dic["level"] == level]

    print(words_of_level)

    for item in words_of_level:
        create_video_clip(item['word'], item['mean'], "en", "iw")

shutil.copy("assets/intro.mp4", "clips/0.mp4")

concatenate_clips_in_folder('clips', level)
