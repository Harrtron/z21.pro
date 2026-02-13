# z21 — Design Reference

> Derived from the logo concept in `logo.png`. Use this as the single source of truth for visual direction across the landing page and any future assets.

---

## 1. Logo Analysis

| Attribute        | Detail |
|------------------|--------|
| **Wordmark**     | **z21** — lowercase "z", numerals "21" |
| **Typeface style** | Heavy-weight, italic/oblique, condensed sans-serif (geometric, sharp terminals) |
| **Primary effect** | Chromatic aberration / RGB-split glitch — two colour channels are offset from the white base |
| **Background**   | Near-black (`#0B0D12`) with horizontal scan-line / static noise texture |

---

## 2. Colour Palette

### Core colours

| Role | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Background** | `#0B0D12` | 11, 13, 18 | Page background |
| **Surface** | `#111118` | 17, 17, 24 | Cards, elevated sections |
| **Primary text** | `#FFFFFF` | 255, 255, 255 | Headlines, logo base layer |
| **Muted text** | `#8888A0` | 136, 136, 160 | Body copy, secondary labels |

### Accent colours (from chromatic aberration effect)

| Role | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Cyan / Electric blue** | `#00A0FF` | 0, 160, 255 | Left-offset channel, links, interactive states |
| **Hot pink / Magenta** | `#FF2070` | 255, 32, 112 | Right-offset channel, highlights, CTAs |

### Gradient

```css
linear-gradient(135deg, #00A0FF, #FF2070)
```

Use sparingly for accent borders, hover glows, or button backgrounds.

---

## 3. Typography Direction

- **Headlines**: Extra-bold / Black weight, italic, tight letter-spacing (`-0.02em`). A geometric sans-serif like **Inter**, **Satoshi**, or **Space Grotesk** (with CSS `font-style: italic; font-weight: 900`).
- **Body**: Regular weight of the same family, comfortable line-height (`1.6`).
- **Monospace** (if needed): **JetBrains Mono** or **Fira Code** for code snippets or data.

---

## 4. Visual Effects & Texture

### Scan-line / noise background

The logo background features subtle **horizontal scan lines** and **static noise** layered over the dark base. This creates a CRT / retro-digital atmosphere.

**Implementation ideas:**

- CSS pseudo-element with a tiling noise SVG or small PNG at low opacity (`0.03–0.06`).
- Thin 1 px horizontal lines via a repeating linear-gradient.

### Chromatic aberration (glitch)

The defining visual motif. Two offset colour layers (cyan-blue left, hot-pink right) sit behind the white wordmark.

**Implementation ideas:**

- CSS `text-shadow` with opposing offsets in the two accent colours.
- For richer effect: duplicate the element and use `mix-blend-mode: screen` with `translate` offsets.
- Subtle CSS animation to "jitter" the offset on hover or at intervals for a living glitch feel.

---

## 5. Design Principles

1. **Dark-first** — The interface is dark by default; light surfaces are exceptions, not the rule.
2. **High contrast** — White and bright accents against near-black. No mid-grey muddle.
3. **Minimal but bold** — Generous whitespace, oversized type, very few competing elements.
4. **Tech-forward / cyberpunk-adjacent** — Glitch textures, scan lines, neon accents convey a cutting-edge, slightly rebellious energy.
5. **Motion with purpose** — Subtle glitch animations and transitions; never gratuitous.

---

## 6. Spacing & Layout Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | `4px` | Tight internal padding |
| `--space-sm` | `8px` | Icon gaps, inline spacing |
| `--space-md` | `16px` | Card padding, stack gaps |
| `--space-lg` | `32px` | Section padding |
| `--space-xl` | `64px` | Hero vertical padding |
| `--space-2xl` | `128px` | Major section breaks |
| `--radius` | `8px` | Default border-radius |
| `--radius-lg` | `16px` | Cards, modals |

---

## 7. Component Sketches (for landing page)

- **Single screen only**: Full-viewport dark section (`100vh`) with vertically centred content.
- **Primary mark**: Massive `z21` wordmark (about `30-40vh`), white base with cyan and pink offset shadows.
- **Subheading**: One line only (`Zero to one.`), muted and letter-spaced.
- **Micro detail**: Optional bottom-centre text (`z21 -- product velocity.`) at very low emphasis.
- **No extras**: No nav, no links, no footer, no forms, no social icons, no CTA buttons.

---

## 8. Copy & Tone Decisions

- **Primary copy**: `Zero to one.`
- **Optional alternate copy**: `Zero → One.` or `From zero to one.`
- **Micro detail (optional)**: `z21 -- product velocity.`
- **Voice**: Minimal, controlled, and intentionally under-explained.
- **Rule**: Mystery over explanation.

---

*This document should evolve as the design matures. Keep the landing page direction minimal and intentional unless strategy changes.*
