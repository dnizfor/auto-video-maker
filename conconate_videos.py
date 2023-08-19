import os
from moviepy.editor import VideoFileClip, concatenate_videoclips


def concatenate_clips_in_folder(folder_path, output):
    # Get a list of all mp4 files in the folder
    video_paths = [os.path.join(folder_path, f)
                   for f in os.listdir(folder_path) if f.endswith('.mp4')]
    print(video_paths)

    merged_video = concatenate_videoclips([VideoFileClip(video_paths[0]),
                                          VideoFileClip(video_paths[1])])

    for i in range(2, len(video_paths)):
        video_to_add = VideoFileClip(video_paths[i])
        merged_video = concatenate_videoclips([merged_video, video_to_add])
        print("okkk")

    merged_video.write_videofile(
        f'output/{output}-video.mp4', codec="libx264", audio_bufsize=1000,    audio_bitrate='192k',
        audio_fps=44100,
        audio_nbytes=2,
        audio_codec="aac",)
    merged_video.close()


concatenate_clips_in_folder("test", "b2")
