from moviepy.editor import *
from gtts import gTTS
import os


def create_video_clip(word, mean, lang1, lang2,output_name):
    # Create audio files for word and mean
    word_audio = gTTS(text=word, lang=lang1)
    word_audio.save(f"word.mp3")
    mean_audio = gTTS(text=mean, lang=lang2)
    mean_audio.save(f"word-mean.mp3")

    # Create video clips for word and mean
    word_clip = TextClip(word, fontsize=150, color='black',
                         bg_color="white", size=(1920, 1080), font='assets/NotoSansSC-Medium.otf')
    word_clip = word_clip.set_duration(
        3).set_audio(AudioFileClip("word.mp3"))
    mean_clip = TextClip(f"{word}\n{mean}", fontsize=150,
                         color='black', bg_color="white", size=(1920, 1080), font='assets/NotoSansSC-Medium.otf')
    mean_clip = mean_clip.set_duration(
        3).set_audio(AudioFileClip("word-mean.mp3"))

    # Concatenate the two clips
    final_clip = concatenate_videoclips([word_clip, mean_clip])

    # Create an image clip of your logo
    logo_clip = ImageClip("assets/logo.png").set_duration(final_clip.duration)

    # Position the logo in the bottom right corner
    logo_clip = logo_clip.set_position(("right", "top"))
    logo_clip = logo_clip.margin(top=50, right=50, opacity=0)

    # Overlay the logo on top of the final video clip
    final_clip = CompositeVideoClip([final_clip, logo_clip])

    # Write the result to a file
    final_clip.write_videofile(f"clips/{output_name}.mp4", fps=1)

    # Delete the temporary audio files
    os.remove(f"word.mp3")
    os.remove(f"word-mean.mp3")
