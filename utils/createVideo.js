import fs from "fs";
import ffmpegStatic from "ffmpeg-static";
import ffmpeg from "fluent-ffmpeg";
import { Canvas, loadImage } from "canvas";
import { stitchFramesToVideo } from "./stitchFramesToVideo.js";
import { UltimateTextToImage } from "ultimate-text-to-image";

const createVideo = async (text1, text2, outputPath, soundPath) => {
  // Tell fluent-ffmpeg where it can find FFmpeg
  ffmpeg.setFfmpegPath(ffmpegStatic);

  const dataUri = new UltimateTextToImage(text1, {
    fontFamily: "Arial, Sans",
    fontSize: 150,
  })
    .render()
    .toDataUrl();
  const dataUri2 = new UltimateTextToImage(text2, {
    fontFamily: "Arial, Sans",
    fontSize: 60,
  })
    .render()
    .toDataUrl();
  // Clean up the temporary directories first
  for (const path of ["output", "frames"]) {
    if (fs.existsSync(path)) {
      await fs.promises.rm(path, { recursive: true });
    }
    await fs.promises.mkdir(path, { recursive: true });
  }

  const canvas = new Canvas(1280, 720);
  const context = canvas.getContext("2d");

  const logo = await loadImage(dataUri);
  const logo2 = await loadImage(dataUri2);
  const icon = await loadImage("assets/icon.png");

  // The video length and frame rate, as well as the number of frames required
  // to create the video
  const duration = 3;
  const frameRate = 5;
  const frameCount = Math.floor(duration * frameRate);

  // Render each frame
  for (let i = 0; i < frameCount; i++) {
    const time = i / frameRate;

    console.log(
      `Rendering frame ${i} at ${Math.round(time * 10) / 10} seconds...`
    );

    // Clear the canvas with a white background color. This is required as we are
    // reusing the canvas with every frame
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);

    renderFrame(context, duration, time);

    // Store the image in the directory where it can be found by FFmpeg
    const output = canvas.toBuffer("image/png");
    const paddedNumber = String(i).padStart(4, "0");
    await fs.promises.writeFile(`frames/-${paddedNumber}.png`, output);
  }
  // Stitch all frames together with FFmpeg
  await stitchFramesToVideo(
    "frames/-%04d.png",
    soundPath,
    outputPath,
    duration,
    frameRate
  );
  function renderFrame(context, duration, time) {
    // Calculate the progress of the animation from 0 to 1
    let t = time / duration;

    // Draw the image from left to right over a distance of 550 pixels
    context.drawImage(logo, 100, 200);
    context.drawImage(logo2, 100, 500);
    context.drawImage(icon, 1050, 10);
  }
};

export default createVideo;
