# Design Tokens

This document describes the design system for the Digital Garden blog, including color palette, typography, spacing, and other visual constants.

## Color Palette

### Light Theme

| Token | Value | Usage |
|-------|-------|-------|
| `--color-paper` | `#FAF8F5` | Main background, warm cream |
| `--color-ink` | `#2D2A24` | Primary text, dark warm gray |
| `--color-ink-muted` | `#6B6459` | Secondary text, meta info |
| `--color-sepia` | `#C4A77D` | Accent, links, highlights |
| `--color-sepia-dark` | `#A68B5B` | Accent hover state |
| `--color-border` | `#E5E0D8` | Dividers, card borders |
| `--color-card` | `#FFFFFF` | Card backgrounds |

### Dark Theme

| Token | Value | Usage |
|-------|-------|-------|
| `--color-paper-dark` | `#1A1915` | Main background |
| `--color-ink-dark` | `#E8E4DD` | Primary text |
| `--color-ink-muted-dark` | `#9B9488` | Secondary text |
| `--color-border-dark` | `#3D3A33` | Dividers |
| `--color-card-dark` | `#252219` | Card backgrounds |

## Typography

### Font Stack

| Usage | Font | Fallbacks |
|-------|------|-----------|
| Serif (content) | Literata | Georgia, Times New Roman, serif |
| Sans (UI) | Inter | -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif |

### Type Scale

| Element | Size | Weight | Line Height | Tracking |
|---------|------|--------|-------------|----------|
| Hero Title | 8xl (96px) | 600 | 1.1 | -0.02em |
| Section Title | 5xl (48px) | 600 | 1.2 | -0.02em |
| Card Title | lg (18px) | 600 | 1.4 | normal |
| Body | base-lg (16-18px) | 400 | 1.75 | normal |
| Meta | sm (14px) | 400 | 1.5 | normal |
| Tags | xs (12px) | 500 | 1.4 | normal |

### Reading Measure

- **Prose**: 70ch (approximately 700px)
- **Narrow**: 65ch (for focused reading)

## Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| 1 | 4px | Tight gaps |
| 2 | 8px | Small gaps |
| 3 | 12px | Card padding |
| 4 | 16px | Standard gap |
| 6 | 24px | Section spacing |
| 8 | 32px | Large spacing |
| 12 | 48px | Section margins |
| 16 | 64px | Page sections |
| 20 | 80px | Hero padding |

## Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-card` | `0 4px 20px rgba(45, 42, 36, 0.08)` | Default card shadow |
| `--shadow-card-hover` | `0 8px 30px rgba(45, 42, 36, 0.12)` | Hover state |
| `--shadow-card-dark` | `0 4px 20px rgba(0, 0, 0, 0.3)` | Dark mode cards |

## Border Radius

| Usage | Value |
|-------|-------|
| Buttons | 8px |
| Cards | 12px |
| Tags | 4px / full |
| Images | 4px |

## Transitions

| Token | Value | Usage |
|-------|-------|-------|
| `--transition-base` | `200ms ease-out` | Hover states |
| `--transition-slow` | `400ms ease-out` | Animations |

## Effects

### Card Rotation

Cards have slight random rotation (-3° to +3°) for organic, hand-placed feel. Rotation is deterministic based on slug hash for consistency.

### Paper Texture

CSS-generated SVG noise pattern with low opacity (0.4 light, 0.15 dark) using `mix-blend-mode: multiply`.

### Scribble Animations

SVG stroke-draw animation using `stroke-dasharray` and `stroke-dashoffset` for hand-drawn reveal effect.

## Accessibility Requirements

| Requirement | Specification |
|-------------|---------------|
| Color Contrast | ≥ 4.5:1 (WCAG AA) |
| Focus Indicator | 2px solid sepia, 2px offset |
| Reduced Motion | Respect `prefers-reduced-motion` |
| Touch Target | ≥ 44px × 44px |

## Responsive Breakpoints

| Name | Width | Grid Columns |
|------|-------|--------------|
| Mobile | < 768px | 1 |
| Tablet | 768px - 1024px | 2 |
| Desktop | > 1024px | 3 |
