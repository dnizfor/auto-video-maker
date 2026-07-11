from moviepy.editor import *
import os
import tempfile

from piper_tts import synthesize_to_wav


def create_video_clip(word, mean, lang1, lang2,output_name):
    # Create local audio files with Piper TTS.
    word_audio_file = tempfile.NamedTemporaryFile(suffix=".wav", delete=False)
    mean_audio_file = tempfile.NamedTemporaryFile(suffix=".wav", delete=False)
    word_audio_path = word_audio_file.name
    mean_audio_path = mean_audio_file.name
    word_audio_file.close()
    mean_audio_file.close()

    synthesize_to_wav(word, lang1, word_audio_path)
    synthesize_to_wav(mean, lang2, mean_audio_path)

    word_audio = AudioFileClip(word_audio_path)
    mean_audio = AudioFileClip(mean_audio_path)

    # Create video clips for word and mean
    word_clip = TextClip(word, fontsize=150, color='black',
                         bg_color="white", size=(1920, 1080), font='assets/NotoSansSC-Medium.otf')
    word_clip = word_clip.set_duration(
        max(3, word_audio.duration)).set_audio(word_audio)
    mean_clip = TextClip(f"{word}\n{mean}", fontsize=150,
                         color='black', bg_color="white", size=(1920, 1080), font='assets/NotoSansSC-Medium.otf')
    mean_clip = mean_clip.set_duration(
        max(3, mean_audio.duration)).set_audio(mean_audio)

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
    word_audio.close()
    mean_audio.close()
    os.remove(word_audio_path)
    os.remove(mean_audio_path)
