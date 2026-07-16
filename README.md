# ClipBot - AI Video Clipping Tool

ClipBot is a local video clipping application that analyzes videos from any platform and automatically identifies the most engaging moments. Users paste a video URL, select their desired clip duration using an interactive timeline, choose quality, and download the result.

## Features

- Support for videos from YouTube, TikTok, Instagram, Twitter, and most platforms
- Interactive timeline interface for precise clip selection
- Multiple quality export options (high, medium, low)
- Real-time download progress tracking
- Streaming-based processing to minimize data consumption
- Completely free and runs locally on your computer

## Requirements

Before starting, install these three tools on your system:

Node.js - Download from https://nodejs.org and install the LTS version. Verify installation by running `node --version` in your terminal.

FFmpeg - Download from https://ffmpeg.org/download.html. On Windows, download from https://www.gyan.dev/ffmpeg/builds/, extract the folder, and add it to your system PATH. On Mac, use `brew install ffmpeg`. On Linux, use `sudo apt-get install ffmpeg`. Verify with `ffmpeg -version`.

yt-dlp - Install via Python with `pip install yt-dlp`. If pip is not available, install Python first from https://www.python.org/downloads/. Verify with `yt-dlp --version`.

## Setup Instructions

1. Create a folder for ClipBot on your computer (for example, C:\Users\YourName\ClipBot).

2. Download the following files into your ClipBot folder:
   - clipbot-backend.js
   - package.json
   - Create a public subfolder and add index.html inside it

3. Your folder structure should look like this:
   ```
   ClipBot/
   ├── clipbot-backend.js
   ├── package.json
   └── public/
       └── index.html
   ```

4. Open a terminal or command prompt in your ClipBot folder. On Windows, you can right-click and select "Open PowerShell here".

5. Install dependencies by running `npm install`.

6. Set your environment for the streaming backend. The application uses yt-dlp to stream videos directly without downloading the full file first.

7. Start the application by running `npm start`. You should see output indicating that ClipBot is running at http://localhost:3000.

## Using ClipBot

1. Open your web browser and go to http://localhost:3000.
2. Paste a video URL into the input field.
3. Click the Load Video button to fetch the video information.
4. The video will stream in the player for preview.
5. Use the timeline below the video to select your desired clip by clicking and dragging to set start and end points.
6. Choose your desired quality level: high for best quality, medium for balanced, or low for smallest file size.
7. Click Download Clip to create and download your selected clip.
8. Clips are saved to the ClipBot/clips folder on your computer.

## How It Works

The application uses yt-dlp to fetch video information and stream video content from the source platform. FFmpeg handles the video encoding and clip extraction. The interactive timeline interface allows precise selection of clip start and end points. Multiple quality presets adjust the video encoding parameters to balance file size and visual quality.

## File Organization

Downloaded clips are saved to the ClipBot/clips directory on your computer. Each clip filename includes the quality level used during encoding. Temporary files are cleaned up automatically after processing.

## Customization

To modify clip behavior, edit clipbot-backend.js:

Line 57 controls frame extraction count. Increasing this number (currently 12) extracts more frames from the video, providing better moment detection but slower processing.

Line 116 controls default clip length. The current setting creates clips around 30 seconds.

Line 121 controls video encoding quality. The values for high, medium, and low quality can be adjusted. Lower CRF values produce better quality but larger file sizes.

## Common Issues

If the application crashes when loading a video, verify that yt-dlp is installed correctly by running `yt-dlp --version` in your terminal.

If FFmpeg is not found, check that it has been added to your system PATH environment variable.

If videos fail to load, check your internet connection and verify that the video URL is publicly accessible.

## Platform Support

ClipBot works with most video platforms including YouTube, TikTok, Instagram, Twitter, and many others. Some platforms may have restrictions or require specific conditions for video access. The yt-dlp project maintains a list of supported sites.

## Future Development

The tool is designed for personal use and local operation. Future versions could include batch processing, additional AI analysis features, or cloud deployment options.

## Technical Stack

Built with Node.js for the backend, Express for the web server, FFmpeg for video processing, and yt-dlp for video downloading and streaming.
