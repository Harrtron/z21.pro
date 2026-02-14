# z21 Brand Identity

> Zero to one, fast.

A brand identity guide for z21 — a high-velocity product lab. Dark-first, minimal, with subtle chromatic aberration and controlled motion.

---

## Tagline & Voice

- **Primary tagline:** zero to one, fast
- **Short form:** zero to one
- **Voice:** Mystery and intent over explanation. No long marketing copy.
- **Writing style:** lowercase everywhere.
- **Positioning:** Not an agency — we build our own. High-velocity product lab that ships, iterates, and scales.

---

## Colour Palette

| Token   | Hex       | Usage                                      |
|---------|-----------|--------------------------------------------|
| **bg**  | `#07090d` | Primary background (near-black)            |
| **fg**  | `#ffffff` | Primary foreground / body text             |
| **muted** | `#bfc7cf` | Secondary text, subheadings, links         |
| **micro** | `#5a6068` | Tertiary text, fine print, manifest copy   |
| **cyan**  | `#00a0ff` | Accent (left chromatic aberration)         |
| **pink**  | `#ff2070` | Accent (right chromatic aberration)        |

### CSS Variables

```css
:root {
  --bg: #07090d;
  --fg: #ffffff;
  --muted: #bfc7cf;
  --micro: #5a6068;
  --cyan: #00a0ff;
  --pink: #ff2070;
}
```

### Accent Usage

- Cyan and pink are used for **chromatic aberration** — subtle offset shadows on text (e.g. `-6px 0 cyan`, `6px 0 pink`).
- Use sparingly. Avoid chaotic or overwhelming colour.
- Link hover: `var(--cyan)`.
- Gradients and glows use low-opacity versions of cyan and pink.

---

## Typography

### Font Stack

| Role       | Font          | Weight | Style  | Fallbacks                                      |
|------------|---------------|--------|--------|------------------------------------------------|
| **Logo**   | Archivo       | 900    | Italic | Arial Black, sans-serif                        |
| **Body**   | Space Grotesk | 300    | Normal | Inter, Segoe UI, Roboto, Arial, sans-serif     |

### Google Fonts Import

```html
<link href="https://fonts.googleapis.com/css2?family=Archivo:ital,wght@1,900&family=Space+Grotesk:wght@300&display=swap" rel="stylesheet" />
```

### Typography Rules

- **Logo:** Bold, italic, lowercase, tight letter-spacing (`-0.03em`).
- **Subheading:** Light weight (300), uppercase, letter-spacing (`0.15em`).
- **Body / manifest:** Light weight, lowercase, moderate letter-spacing (`0.09em`).
- **Micro copy:** Smallest size, lowercase, letter-spacing (`0.12em`).
- Prefer a modern grotesk style. Avoid decorative or novelty fonts.

---

## Visual Style

### Core Principles

- **Dark-first:** Near-black background. No light mode.
- **Dominant mark:** Primary logo/wordmark bold, centered, dominant.
- **Chromatic aberration:** Cyan and pink accents used subtly.
- **Controlled motion:** Ambient background shifts only. No chaotic animation.
- **Single-screen signal:** Not a marketing site. Minimal content.

### Effects & Atmosphere

- **Scan lines:** Subtle horizontal lines with `mix-blend-mode: screen`.
- **Noise texture:** Light fractal noise overlay for depth.
- **Radial gradients:** Soft cyan glow (top-left), soft pink glow (bottom-right).
- **Glitch band:** Thin vertical band of cyan/pink gradient that drifts.
- **Edge flashes:** Occasional vertical flashes on left (cyan) and right (pink) edges.
- **Vignette:** Darkened edges via radial gradient.

### Logo Treatment

- Text shadow: `-6px 0 var(--cyan)`, `6px 0 var(--pink)` (chromatic offset).
- Optional: `-webkit-text-stroke: 1.2px rgba(255, 255, 255, 0.92)`.
- Short glitch animation on load and periodically (respects `prefers-reduced-motion`).

---

## Assets

| Asset                  | Path                         | Use                          |
|------------------------|------------------------------|------------------------------|
| Logo (square)          | `assets/z21-logo-square.png` | OG image, social sharing     |
| Favicon / icon         | `assets/z21-logo-icon-alt.png` | Favicon, browser tab         |

---

## Content Constraints

- Include only: core mark, short subheading, optional micro-detail.
- **Do not add:** Navigation, footer links, buttons, forms, social icons, long marketing copy.
- Prioritise mystery and intent over explanation.

---

## Technical Stack (Brand-Relevant)

- Plain HTML, CSS, vanilla JavaScript.
- No frameworks or build tools.
- Deployable as static files (e.g. GitHub Pages).

---

## Accessibility

- Respect `prefers-reduced-motion: reduce` — disable animations when requested.
- Ensure sufficient contrast for text on dark background.
- Use semantic HTML and ARIA where appropriate.
