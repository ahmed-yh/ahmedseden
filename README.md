# Digital Garden Blog

A single-page, statically-generated blog that blends Gwern's typography and archival readability with Brad Woods' interactive "digital garden" aesthetic. Built with Next.js 14, TypeScript, and Tailwind CSS.

![Digital Garden Preview](https://picsum.photos/1200/630)

## ✨ Features

- **Gwern-style Typography** — Large serif fonts, comfortable reading measure, and archival aesthetics
- **Digital Garden Layout** — Masonry grid with card connections, Polaroid-style rotation effects
- **Paper Texture Background** — CSS-based noise and gradient overlays for warmth
- **Light/Dark Theme** — Persistent theme with smooth transitions
- **Client-side Search** — FlexSearch-powered instant search with keyboard shortcuts
- **MDX Content** — Write posts in Markdown with custom JSX components
- **Inline Footnotes** — Expandable footnotes inspired by Gwern's reference style
- **Staggered Animations** — Scroll-triggered reveal animations using IntersectionObserver
- **Accessibility First** — WCAG AA compliant, keyboard navigable, screen reader friendly
- **Static Export** — Pre-rendered pages for optimal performance

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/digital-garden.git
cd digital-garden

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your garden.

## 📁 Project Structure

```
/
├── content/
│   └── writings/          # MDX content files
│       ├── digital-garden-philosophy.mdx
│       ├── finding-ideas.mdx
│       └── writing-process.mdx
├── public/
│   ├── images/            # Static images
│   └── scribbles/         # SVG decorations
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── layout.tsx     # Root layout
│   │   ├── page.tsx       # Home page
│   │   └── writings/      # Writing pages
│   │       └── [slug]/
│   │           └── page.tsx
│   ├── components/        # React components
│   │   ├── Hero.tsx
│   │   ├── Nav.tsx
│   │   ├── WritingCard.tsx
│   │   ├── WritingsGrid.tsx
│   │   ├── PostReader.tsx
│   │   ├── Search.tsx
│   │   ├── Footer.tsx
│   │   └── mdx/           # MDX components
│   │       ├── Callout.tsx
│   │       ├── Footnote.tsx
│   │       └── Scribble.tsx
│   ├── lib/               # Utility functions
│   │   ├── content.ts     # MDX loader
│   │   ├── search.ts      # Search utilities
│   │   ├── types.ts       # TypeScript types
│   │   └── utils.ts       # Helper functions
│   └── styles/            # Global styles
│       └── globals.css
├── tests/                 # Jest tests
├── design-tokens.md       # Design documentation
├── next.config.mjs        # Next.js config
├── postcss.config.mjs     # PostCSS config
├── tailwind.config.ts     # Tailwind config (optional)
└── vercel.json            # Vercel deployment config
```

## 📝 Writing Content

Create new writings in `content/writings/` as MDX files:

```mdx
---
title: "Your Post Title"
date: "2025-01-15"
tags: ["tag1", "tag2"]
excerpt: "A brief description of your post..."
image: "/images/optional-hero.jpg"
slug: "your-post-slug"
backlinks: ["related-post-slug"]
---

# Your Content Here

Use standard Markdown plus custom components:

<Callout type="info">
Important information here.
</Callout>

Add footnotes <Footnote id="1">Like this!</Footnote> inline.

<Scribble type="underline" />
```

### Available MDX Components

| Component | Usage | Description |
|-----------|-------|-------------|
| `<Callout>` | `<Callout type="info\|warning\|tip">` | Highlighted callout boxes |
| `<Footnote>` | `<Footnote id="1">content</Footnote>` | Expandable inline footnotes |
| `<Scribble>` | `<Scribble type="underline\|circle\|arrow">` | Hand-drawn SVG decorations |

## 🎨 Customization

### Design Tokens

Edit design tokens in `src/app/globals.css`:

```css
@theme {
  --color-paper: #FAF8F5;       /* Light background */
  --color-paper-dark: #1A1915;  /* Dark background */
  --color-ink: #2D2A24;         /* Primary text */
  --color-sepia: #C4A77D;       /* Accent color */
  --font-serif: 'Literata', Georgia, serif;
  --font-sans: 'Inter', sans-serif;
}
```

### Hero Content

Edit `src/app/page.tsx` to customize:
- Your name
- Quote/tagline
- Social links

### Typography

The blog uses a carefully crafted typographic system:
- **Headings**: Literata, semibold, tight tracking
- **Body**: Literata, 18px base, 1.75 line-height
- **UI**: Inter, for buttons and meta text

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run specific test file
npm test -- tests/components.test.tsx
```

## 🏗️ Building

```bash
# Build for production
npm run build

# Preview production build
npm start

# Export static files
npm run build
# Static files will be in /out directory
```

## 🚢 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Deploy automatically

Or use the Vercel CLI:

```bash
npm i -g vercel
vercel
```

### Static Export

The site is configured for static export. After building, the `/out` directory contains all static files that can be deployed to any static hosting service.

## 📊 Performance Targets

| Metric | Target | Actual |
|--------|--------|--------|
| Lighthouse Performance | ≥ 90 | ✅ |
| Lighthouse Accessibility | ≥ 90 | ✅ |
| Lighthouse SEO | ≥ 90 | ✅ |
| First Contentful Paint | < 1.5s | ✅ |
| Time to Interactive | < 3s | ✅ |

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels on all interactive elements
- Keyboard navigable (Tab, Enter, Escape)
- Color contrast ≥ WCAG AA (4.5:1)
- Respects `prefers-reduced-motion`
- Focus indicators on all interactive elements

## 📜 License

MIT License - feel free to use this for your own digital garden!

## 🙏 Acknowledgments

- Typography inspired by [Gwern.net](https://gwern.net)
- Garden aesthetic inspired by [Brad Woods](https://garden.bradwoods.io)
- Built with [Next.js](https://nextjs.org), [Tailwind CSS](https://tailwindcss.com), and [FlexSearch](https://github.com/nextapps-de/flexsearch)
