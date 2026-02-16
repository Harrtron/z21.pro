import puppeteer from 'puppeteer-core';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const framesDir = path.join(__dirname, 'frames');
const htmlPath = path.join(__dirname, 'logo-page.html');

if (fs.existsSync(framesDir)) fs.rmSync(framesDir, { recursive: true });
fs.mkdirSync(framesDir);

const CHROME_PATH = process.platform === 'darwin'
  ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  : process.env.CHROME_PATH || 'google-chrome';
const WIDTH = 600;
const HEIGHT = 400;
const DPR = 2;

/*
  Timeline (alternating edge flashes + second glitch before loop):
    0.0 – 1.0s  : resting hold
    1.0 – 3.0s  : LEFT edge flash (cyan)
    1.5 – 1.85s : logo glitch #1 (during left flash)
    3.0 – 5.0s  : RIGHT edge flash (pink)
    5.0 – 5.35s : logo glitch #2 (before loop)
    5.5 – 5.8s  : resting tail → loop
*/

async function main() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--force-color-profile=srgb'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: WIDTH, height: HEIGHT, deviceScaleFactor: DPR });
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });
  await page.evaluate(() => window.fontsReady());
  await new Promise(r => setTimeout(r, 1500));

  const frames = [];
  let frameIdx = 0;

  async function captureFrame(globalTime, delayMs) {
    await page.evaluate((t) => window.setFrame(t), globalTime);
    await new Promise(r => setTimeout(r, 60));
    const framePath = path.join(framesDir, `frame_${String(frameIdx).padStart(3, '0')}.png`);
    await page.screenshot({ path: framePath });
    frames.push({ file: framePath, delay: delayMs, time: globalTime });
    console.log(`  Frame ${frameIdx}: t=${globalTime.toFixed(3)}s, delay=${delayMs}ms`);
    frameIdx++;
  }

  const fps = 15;
  const frameDuration = Math.round(1000 / fps);

  console.log('Phase 1: Resting hold');
  await captureFrame(0.0, 1200);

  console.log('Phase 2: Left edge flash + logo glitch #1');
  for (let t = 1.0; t <= 3.0; t += frameDuration / 1000) {
    await captureFrame(t, frameDuration);
  }

  console.log('Phase 3: Right edge flash');
  for (let t = 3.0 + frameDuration / 1000; t <= 5.0; t += frameDuration / 1000) {
    await captureFrame(t, frameDuration);
  }

  console.log('Phase 4: Logo glitch #2 (before loop)');
  for (let t = 5.0; t <= 5.35; t += frameDuration / 1000) {
    await captureFrame(t, frameDuration);
  }

  console.log('Phase 5: Resting tail');
  await page.evaluate(() => window.resetToResting());
  await new Promise(r => setTimeout(r, 60));
  const tailPath = path.join(framesDir, `frame_${String(frameIdx).padStart(3, '0')}.png`);
  await page.screenshot({ path: tailPath });
  frames.push({ file: tailPath, delay: 400, time: 5.8 });
  console.log(`  Frame ${frameIdx}: t=5.800s, delay=400ms (tail)`);

  const metaPath = path.join(__dirname, 'frames-meta.json');
  fs.writeFileSync(metaPath, JSON.stringify(frames, null, 2));
  console.log(`\nCaptured ${frames.length} frames. Metadata: ${metaPath}`);

  await browser.close();
}

main().catch(err => { console.error(err); process.exit(1); });
