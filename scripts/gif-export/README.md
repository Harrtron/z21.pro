# z21 Logo GIF Export

Exports the z21 homepage logo animation (logo glitch + alternating edge flashes) as animated GIFs.

## Requirements

- **Node.js** (v18+)
- **Python 3** with Pillow
- **Chrome** (for Puppeteer; on macOS: `/Applications/Google Chrome.app`)

## Setup

```bash
cd scripts/gif-export
npm install
python3 -m venv venv
source venv/bin/activate   # or `venv\Scripts\activate` on Windows
pip install Pillow
```

## Usage

### Full build (capture + assemble both sizes)

```bash
npm run capture
./venv/bin/python3 assemble-gif.py
./venv/bin/python3 assemble-gif.py ../../assets/z21-logo-animated-2x.gif 1200 800
```

Or as two steps:

1. **Capture frames** (requires Chrome):
   ```bash
   npm run capture
   ```

2. **Assemble GIF** (requires Pillow):
   ```bash
   ./venv/bin/python3 assemble-gif.py
   ./venv/bin/python3 assemble-gif.py ../../assets/z21-logo-animated-2x.gif 1200 800
   ```

Outputs:

- `assets/z21-logo-animated.gif` (600×400)
- `assets/z21-logo-animated-2x.gif` (1200×800)

## Timeline

- 0–1s: Resting hold
- 1–3s: Left cyan edge flash sweeps down
- 1.5–1.85s: Logo glitch #1
- 3–5s: Right pink edge flash sweeps down
- 5–5.35s: Logo glitch #2 (before loop)
- 5.5–5.8s: Resting tail → loop

## Custom Chrome path

On Linux or if Chrome is elsewhere:

```bash
CHROME_PATH=/path/to/chromium node capture-frames.mjs
```
