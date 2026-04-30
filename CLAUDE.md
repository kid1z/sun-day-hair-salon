# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Single-page marketing site for Sun Day Hair Salon (Binh Tan, HCMC, Vietnam). Next.js 16 App Router, Bun package manager, Tailwind CSS v4, all static content — no backend or API routes.

## Commands

```bash
bun dev          # Start dev server (localhost:3000)
bun run build    # Production build
bun run start    # Start production server
bun run lint     # ESLint (next/core-web-vitals + typescript configs)
```

No test runner is configured yet.

## Architecture

**Directory structure:**
- `src/app/` — Routes: `/` (home page), `robots.ts`, `sitemap.ts`, plus metadata in `layout.tsx`
- `src/components/` — Animation primitives used across the page

**The page is a single `"use client"` component** (`src/app/page.tsx`). It is not broken into sub-components — all sections (hero, about, services, gallery, contact) live in one file.

**Animation system:**
- `SplitText` — GSAP SplitText plugin; splits text into chars/words/lines and staggers entrance animations
- `RevealOnScroll` — CSS-based reveal using IntersectionObserver; toggles `.reveal-visible` class on `.reveal-on-scroll` elements; respects `prefers-reduced-motion`
- `BlurText` — Motion (Framer Motion) library; blur-to-clear word entrance (not currently used on the page)
- `HLSVideo` — hls.js wrapper for HLS video playback with native Safari fallback

**Styling:**
- Tailwind CSS v4 with `@tailwindcss/postcss` (no `tailwind.config.ts`)
- Two font families: Instrument Serif (headings, via `.font-heading`), Barlow (body, via `.font-body`)
- CSS custom properties for colors: `--bg-base`, `--fg-base`, `--accent-soft`, `--accent-strong`
- Color palette: near-black background (#090807) with warm cream/gold/copper text and accents
- `.liquid-glass` and `.liquid-glass-strong` CSS classes provide border-gradient glass effects via `::before` pseudo-elements with mask-composite

**SEO:**
- `layout.tsx` exports full `Metadata` with Open Graph, Twitter card, canonical URL, and Vietnamese locale
- `robots.ts` and `sitemap.ts` read `NEXT_PUBLIC_SITE_URL` env var
- JSON-LD `HairSalon` structured data in the page body

**Next.js config:**
- `images.remotePatterns` allows `images.unsplash.com`
- Path alias: `@/*` → `./src/*`
- TypeScript strict mode, bundler module resolution, JSX react-jsx

## Key dependencies

| Package | Purpose |
|---|---|
| `gsap` + `@gsap/react` | SplitText entrance animations |
| `motion` | In-view based blur reveal |
| `hls.js` | HLS video playback on non-Safari browsers |
| `lucide-react` | Icons |

## Important notes

- This is Next.js **16.2.1** — APIs and conventions may differ from Next.js 14/15. Check `node_modules/next/dist/docs/` for reference when writing routing, data-fetching, or rendering code.
- The entire home page is a client component; splitting it into server components would require restructuring.
- There are no tests, no CI, and no API routes — this is purely a static marketing page.
