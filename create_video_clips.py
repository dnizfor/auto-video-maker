from moviepy.editor import *
import os
import tempfile
from pathlib import Path

from piper_tts import synthesize_to_wav


VIDEO_SIZE = (1920, 1080)
PANEL_WIDTH = VIDEO_SIZE[0] // 2
IMAGE_PADDING = 70


def _image_path_for_word(word):
    image_path = Path("images") / f"{word}.png"
    if not image_path.is_file():
        raise FileNotFoundError(
            f"Image not found for '{word}'. Expected file: {image_path}"
        )
    return image_path


def _create_split_clip(text, image_path, duration, audio):
    background = ColorClip(size=VIDEO_SIZE, color=(255, 255, 255)).set_duration(duration)

    text_clip = TextClip(
        text,
        fontsize=130,
        color="black",
        bg_color="white",
        size=(PANEL_WIDTH - 80, VIDEO_SIZE[1]),
        method="caption",
        align="center",
        font="assets/NotoSansSC-Medium.otf",
    ).set_duration(duration).set_position((40, 0))

    image_clip = ImageClip(str(image_path))
    max_image_width = PANEL_WIDTH - (IMAGE_PADDING * 2)
    max_image_height = VIDEO_SIZE[1] - (IMAGE_PADDING * 2)
    scale = min(max_image_width / image_clip.w, max_image_height / image_clip.h)
    image_clip = image_clip.resize(scale).set_duration(duration)
    image_x = PANEL_WIDTH + ((PANEL_WIDTH - image_clip.w) / 2)
    image_y = (VIDEO_SIZE[1] - image_clip.h) / 2
    image_clip = image_clip.set_position((image_x, image_y))

    divider = ColorClip(
        size=(4, VIDEO_SIZE[1]), color=(225, 225, 225)
    ).set_duration(duration).set_position((PANEL_WIDTH - 2, 0))

    return CompositeVideoClip(
        [background, text_clip, image_clip, divider], size=VIDEO_SIZE
    ).set_duration(duration).set_audio(audio)


def create_video_clip(word, mean, lang1, lang2,output_name):
    image_path = _image_path_for_word(word)

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

    # Put text on the left and the matching word image on the right.
    word_clip = _create_split_clip(
        word, image_path, max(3, word_audio.duration), word_audio
    )
    mean_clip = _create_split_clip(
        f"{word}\n{mean}", image_path, max(3, mean_audio.duration), mean_audio
    )

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
