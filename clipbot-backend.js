const express = require('express');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');

const app = express();

const clipsDir = path.join(__dirname, 'clips');

if (!fs.existsSync(clipsDir)) fs.mkdirSync(clipsDir, { recursive: true });

app.use(express.json());
app.use(express.static('public'));

function runCommand(command, args) {
  return new Promise((resolve, reject) => {
    const proc = spawn(command, args);
    let stdout = '';
    let stderr = '';

    proc.stdout.on('data', (data) => { stdout += data; });
    proc.stderr.on('data', (data) => { stderr += data; });

    proc.on('close', (code) => {
      if (code !== 0) reject(new Error(`${command} failed: ${stderr}`));
      else resolve(stdout);
    });
  });
}

async function getVideoDuration(url) {
  const output = await runCommand('yt-dlp', [
    '--print', 'duration',
    url
  ]);
  return Math.floor(parseFloat(output.trim()));
}

// Get video info (duration only, no download)
app.post('/api/load-video', async (req, res) => {
  const { url } = req.body;
  
  try {
    console.log('Getting video duration...');
    const duration = await getVideoDuration(url);

    res.json({
      success: true,
      url: url,
      duration: duration
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Stream video to browser for preview with seeking support
app.get('/api/stream-video', async (req, res) => {
  const url = req.query.url;
  
  if (!url) {
    return res.status(400).json({ error: 'URL required' });
  }

  try {
    console.log('Starting video stream...');
    
    const ytdlp = spawn('yt-dlp', [
      '-f', 'best[ext=mp4]',
      '-o', '-',
      url
    ]);

    res.setHeader('Content-Type', 'video/mp4');
    res.setHeader('Accept-Ranges', 'bytes');
    res.setHeader('Cache-Control', 'public, max-age=3600');

    ytdlp.stdout.pipe(res);

    ytdlp.stderr.on('data', (data) => {
      console.log('yt-dlp:', data.toString().trim());
    });

    res.on('close', () => {
      ytdlp.kill();
    });

  } catch (error) {
    console.error('Stream error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Create clip by streaming + clipping (no full download needed)
app.post('/api/create-clip', async (req, res) => {
  const { url, startTime, endTime, quality } = req.body;
  
  try {
    const qualityMap = {
      high: ['-crf', '18'],
      medium: ['-crf', '23'],
      low: ['-crf', '28']
    };

    const clipId = `clip_${Date.now()}_${quality}`;
    const clipPath = path.join(clipsDir, `${clipId}.mp4`);

    console.log(`Creating ${quality} clip: ${startTime}s to ${endTime}s (streaming)`);

    const ytdlp = spawn('yt-dlp', [
      '-f', 'best[ext=mp4]',
      '-o', '-',
      url
    ]);

    const ffmpeg = spawn('ffmpeg', [
      '-i', 'pipe:0',
      '-ss', startTime.toString(),
      '-to', endTime.toString(),
      '-c:v', 'libx264',
      ...qualityMap[quality],
      '-preset', 'fast',
      '-c:a', 'aac',
      '-y',
      clipPath
    ]);

    ytdlp.stdout.pipe(ffmpeg.stdin);

    let ffmpegError = '';
    ffmpeg.stderr.on('data', (data) => {
      ffmpegError += data.toString();
    });

    return new Promise((resolve, reject) => {
      ffmpeg.on('close', (code) => {
        ytdlp.kill();

        if (code !== 0) {
          reject(new Error('FFmpeg encoding failed'));
        } else {
          const stats = fs.statSync(clipPath);
          const fileSizeMB = (stats.size / 1024 / 1024).toFixed(2);

          console.log(`✅ Clip created: ${fileSizeMB}MB`);

          res.json({
            success: true,
            clipId: clipId,
            downloadUrl: `/clips/${clipId}.mp4`,
            fileSize: fileSizeMB,
            quality: quality
          });

          resolve();
        }
      });

      ytdlp.on('error', (err) => {
        ffmpeg.kill();
        reject(err);
      });

      ffmpeg.on('error', reject);
    });

  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.use('/clips', express.static(clipsDir));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🎬 ClipBot STREAMING MODE running at http://localhost:${PORT}`);
  console.log('✨ Minimal data consumption - videos stream on-demand!');
});
