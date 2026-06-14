# 🎬 ClipBot - AI Video Clipping Tool

Paste a video link from **any platform** (YouTube, TikTok, Instagram, Twitter, etc). AI automatically:
- Detects the most clip-worthy moments
- Generates viral-optimized titles  
- Creates clips in multiple quality levels
- Lets you download them

**Zero cost. Runs locally. 100% yours.**

---

## ⚙️ Setup (5 min)

### 1. **Install Required Tools**

You need these 3 free tools on your computer:

#### **A) Node.js**
- Go to: https://nodejs.org
- Download the LTS (Long Term Support) version
- Run the installer, click Next → Next → Finish
- Verify: Open terminal/command prompt, type:
  ```
  node --version
  ```
  Should show something like `v20.x.x`

#### **B) FFmpeg**
- Go to: https://ffmpeg.org/download.html
- **Windows**: Download from https://www.gyan.dev/ffmpeg/builds/
  - Choose "full" build
  - Extract the folder somewhere safe (e.g., `C:\ffmpeg`)
  - Add to PATH (search "environment variables" in Windows)
  
- **Mac**: 
  ```
  brew install ffmpeg
  ```
  (If you don't have Homebrew: https://brew.sh)

- **Linux**:
  ```
  sudo apt-get install ffmpeg
  ```

Verify: Open terminal, type:
```
ffmpeg -version
```

#### **C) yt-dlp**
Open terminal/command prompt and type:
```
pip install yt-dlp
```

If `pip` doesn't work, install Python first: https://www.python.org/downloads/

Verify:
```
yt-dlp --version
```

---

### 2. **Get Anthropic API Key**

ClipBot uses Claude's vision API to analyze video frames. You get free credits.

1. Go to: https://console.anthropic.com
2. Sign up (or log in)
3. Click **API Keys** on the left
4. Click **Create Key**
5. Copy the key (starts with `sk-ant-`)
6. **Save it somewhere safe** — you'll use it next

---

### 3. **Set Up ClipBot**

1. Create a folder for ClipBot (e.g., `C:\Users\YourName\ClipBot`)

2. Download these 3 files into that folder:
   - `clipbot-backend.js`
   - `package.json`
   - Create a `public` folder and put `index.html` inside

3. Your folder structure should look like:
   ```
   ClipBot/
   ├── clipbot-backend.js
   ├── package.json
   └── public/
       └── index.html
   ```

4. Open terminal in the ClipBot folder (right-click → Open PowerShell here, or `cd` to the folder)

5. Install Node dependencies:
   ```
   npm install
   ```
   This downloads the code libraries ClipBot needs.

6. Set your API key as an environment variable:

   **Windows (PowerShell)**:
   ```
   $env:ANTHROPIC_API_KEY = "your-api-key-here"
   ```

   **Mac/Linux**:
   ```
   export ANTHROPIC_API_KEY="your-api-key-here"
   ```

7. Start ClipBot:
   ```
   npm start
   ```

   You should see:
   ```
   🎬 ClipBot running at http://localhost:3000
   ```

---

## 🚀 Using ClipBot

1. Open your browser
2. Go to: **http://localhost:3000**
3. Paste a video URL (YouTube, TikTok, any platform)
4. Click **Analyze**
5. Wait 1-3 minutes (first time takes longer)
6. Download clips in your preferred quality

**Clips saved to**: `ClipBot/clips/` folder

---

## 🎯 How It Works

1. **Downloads the video** using yt-dlp (supports almost all platforms)
2. **Extracts 12 key frames** from the video
3. **Sends to Claude's vision API** with instructions to find clip-worthy moments
4. **AI identifies**: scene changes, high energy, faces, text, transitions
5. **Generates viral-optimized titles** (short, clickable, emoji-friendly)
6. **Creates clips** in 3 quality levels (high, medium, low)
7. **Gives you download links**

---

## ⚡ Tips for Getting Clicks

ClipBot looks for moments that work on social media:
- **Scene cuts/transitions** → instantly engaging
- **Faces/reactions** → people hook on expressions
- **Movement/action** → motion stops scrolls
- **Text overlays** → readable on silent
- **High energy audio** → dialogue peaks matter

**Best content to clip:**
- Podcasts / interviews (dialogue clips perform great)
- Gaming streams (highlights, clutches)
- Vlogs (energetic moments)
- Educational videos (key takeaways)
- Sports (goal moments, big plays)
- Comedy sketches (punchlines)

---

## 🔧 Customizing

Want to tweak it? Edit `clipbot-backend.js`:

- **Line 57**: Change `count = 12` to extract more frames (higher quality detection, slower)
- **Line 104**: Change `5` to extract more than 5 clips per video
- **Line 116**: Change `+ 30` to adjust clip length (currently 30-60 sec)
- **Line 121**: Change `['-crf', '18']` values to adjust quality (lower = better, slower)

---

## 📊 FAQ

**Q: Can I share this as a tool?**
A: Yes! Once stable, you can host it online and monetize it. We can discuss that when you're ready.

**Q: How much does this cost?**
A: The Anthropic API has a free tier with credits. Once you exceed credits, it's ~$0.03-0.15 per video analyzed (depends on video length). Still way cheaper than alternatives.

**Q: Does it work with TikTok/Instagram?**
A: Yes, yt-dlp handles most platforms. Some may have restrictions, but works for majority of public content.

**Q: Can I batch process videos?**
A: Currently designed for one at a time. Easy to add batch later if you need it.

**Q: What if it crashes?**
A: Check the terminal error message. Most common issues:
- Missing yt-dlp/ffmpeg → reinstall
- API key not set → set environment variable
- Video too long → might timeout (try shorter videos first)

---

## 🚀 Next Steps

1. **Try it**: Test with 2-3 short videos
2. **Refine**: Tweak AI prompts based on results (edit the prompt in line 79-95)
3. **Scale**: Once smooth, start clipping for your channel
4. **Grow**: Use these clips on shorts, reels, TikTok
5. **Monetize**: If it gains traction, we can turn this into a paid tool

---

**Built with**: Node.js + Claude AI + FFmpeg + yt-dlp

Good luck! Let me know if you hit any snags. 🔥
"# ClipBot" 
