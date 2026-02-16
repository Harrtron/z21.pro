#!/usr/bin/env python3
"""Assemble captured PNG frames into an optimized animated GIF."""

import json
import sys
from pathlib import Path
from PIL import Image

BASE = Path(__file__).parent
META = BASE / "frames-meta.json"
ASSETS = BASE.parent.parent / "assets"
OUTPUT = Path(sys.argv[1]) if len(sys.argv) > 1 else ASSETS / "z21-logo-animated.gif"
TARGET_W = int(sys.argv[2]) if len(sys.argv) > 2 else 600
TARGET_H = int(sys.argv[3]) if len(sys.argv) > 3 else 400

if not META.exists():
    print("No frames-meta.json found. Run capture-frames.mjs first.")
    sys.exit(1)

with open(META) as f:
    frames_meta = json.load(f)

if not frames_meta:
    print("No frames found!")
    sys.exit(1)

bg_color = (7, 9, 13)
rgb_images = []
durations = []

for entry in frames_meta:
    img = Image.open(entry["file"]).convert("RGBA")
    if img.size != (TARGET_W, TARGET_H):
        img = img.resize((TARGET_W, TARGET_H), Image.LANCZOS)
    bg = Image.new("RGB", img.size, bg_color)
    bg.paste(img, mask=img.split()[3])
    rgb_images.append(bg)
    durations.append(entry["delay"])

quantized = []
for img in rgb_images:
    q = img.quantize(colors=192, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.FLOYDSTEINBERG)
    quantized.append(q)

quantized[0].save(
    OUTPUT,
    save_all=True,
    append_images=quantized[1:],
    duration=durations,
    loop=0,
    optimize=True,
)

print(f"Animated GIF saved to: {OUTPUT}")
print(f"  Dimensions: {TARGET_W}x{TARGET_H}")
print(f"  Frames: {len(quantized)}")
print(f"  Total duration: {sum(durations)}ms")
print(f"  File size: {OUTPUT.stat().st_size / 1024:.1f} KB")
