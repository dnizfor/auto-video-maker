import os
import subprocess
from moviepy.editor import *


def concatenate_clips_in_folder(folder_path, output, intro):
    # Get a list of all mp4 files in the folder
    files = [os.path.join(folder_path, f)
             for f in os.listdir(folder_path) if f.endswith('.mp4')]

    # Create a temporary file to store the list of input files
    with open('input.txt', 'w') as f:
        for file in files:
            f.write(f"file '{file}'\n")

    # Use FFMPEG to concatenate the videos
    cmd = f'ffmpeg -f concat -safe 0 -i input.txt -af aresample=async=1 -c:v copy output/{output}.mp4'
    subprocess.run(cmd, shell=True)

    # Delete the temporary file
    os.remove('input.txt')
    # os.remove('output/main_video.mp4')

    for i in os.listdir("clips"):
        os.remove(f"clips/{i}")
