# Proton Technologies — Marketing Website

Landing page for **Proton Technologies Limited**: free, professionally designed websites for decoration companies (interior designers, renovators, painters & decorators…), with a flat **$150/year** hosting & care plan.

The design rationale (concept, brand system, motion system, section-by-section plan) lives in [`docs/DESIGN-PLAN.md`](docs/DESIGN-PLAN.md).

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack), React 19, TypeScript |
| Styling | Tailwind CSS v4 (design tokens in `app/globals.css`) |
| Motion | GSAP 3.15 + ScrollTrigger, SplitText, DrawSVG (all free) via `@gsap/react` |
| Smooth scroll | Lenis (synced to GSAP's ticker) |
| WebGL | A raw fragment shader for the hero aurora (no three.js) |
| Images | `next/image` with a custom Unsplash CDN loader |

## Run it locally

You need Node.js 20.9 or newer.

1. Open a terminal in the project folder.
2. Install dependencies (first time only):
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open **http://localhost:3000** in your browser. If port 3000 is busy, use the address printed in the terminal.

Edits (for example to `lib/content.ts`) reload in the browser automatically. Press `Ctrl + C` in the terminal to stop the server.

Other commands:

```bash
npm run build    # production build (type-checks too)
npm start        # serve the production build at http://localhost:3000
npm run lint
```

Set your production URL so canonical links, the sitemap and structured data are correct:

```bash
NEXT_PUBLIC_SITE_URL=https://www.your-domain.com
```

## Project structure

```
app/
  layout.tsx            fonts, metadata/SEO, global providers (smooth scroll, cursor, reveals)
  page.tsx              section order + JSON-LD structured data
  actions.ts            "Apply" form Server Action (validation + honeypot)
  globals.css           tokens, typography scale, buttons, eyebrows, cursor, reveal states
  opengraph-image.tsx   generated social share image
  icon.svg · apple-icon.tsx · favicon.ico · sitemap.ts · robots.ts · manifest.ts
components/
  layout/               Header (adaptive theme, mobile menu), Footer
  sections/             Hero, BuiltFor, WhyItMatters, Solutions, Examples, HowItWorks, ApplyCta
  examples/             four coded concept websites shown in the Examples gallery
  art/                  WebGL aurora, floor plan, circuit traces, logo-mark outline
  motion/               SmoothScroll, CustomCursor, RevealManager, Magnetic, ParallaxImage, DrawOnScroll…
  ui/                   Button, Eyebrow, Logo, Photo, BrowserFrame, Accordion, Counter, LineIcon
lib/
  content.ts            ALL page copy (edit text here)
  site.ts               name, URL, email, nav, pricing
  images.ts             photo registry + credits
  schema.ts             schema.org JSON-LD
```

### Editing content

- **Copy**: `lib/content.ts`. Wrap words in `*asterisks*` inside headlines to render them in the accent serif.
- **Contact details, URL, pricing**: `lib/site.ts`.
- **Photos**: `lib/images.ts`. Replace the Unsplash IDs, or switch `components/ui/Photo.tsx` to local files.

### Declarative animations

Server-rendered markup opts into scroll reveals with data attributes, handled by one global `RevealManager`:

- `data-reveal="lines"`: headline lines rise out of a mask (SplitText)
- `data-reveal="fade-up" | "fade" | "scale"` (optional `data-delay="0.2"`)
- `data-eyebrow`: the eyebrow trace draws in

The custom cursor reads `data-cursor="view"` with `data-cursor-label="Preview"` (and `drag` / `hide`).

Everything respects **`prefers-reduced-motion`**. With it on, smooth scroll, the cursor, parallax and scrubbed drawings are disabled, and every element renders in its final state.

### Performance notes

- **Judge scroll smoothness on a production build** (`npm run build && npm start`). `npm run dev` adds React development checks and is noticeably heavier.
- Keep GPU-expensive CSS off large or moving areas. That means no `mix-blend-mode` overlays and no `backdrop-filter` on cards; the fixed header is the one exception.
- Big decorative SVG drawings play once when they enter view (`DrawOnScroll`) rather than being scrubbed on every scroll frame.
- The hero's WebGL aurora renders at about 35% resolution and 30fps, and pauses off-screen.
- The hero scene (`components/sections/hero/`) moves only transforms and opacity. Its resting 3D pose lives in CSS (`.hero-plane` in `globals.css`), so it renders before hydration and with reduced motion. `HeroShell` animates from that pose.
- The hero's mock homepage is drawn twice from one 1200 × 750 coordinate system: once as a blueprint (`SiteBlueprint`) and once as the finished HTML (`SiteRender`). If you move an element in one, move it in the other.
- The hero pins on desktop, and so does the Examples gallery. `SmoothScroll` re-aligns `#hash` deep links once the pins have added their scroll distance.

## Before launch: checklist

- [ ] Set `NEXT_PUBLIC_SITE_URL` and replace the placeholder email in `lib/site.ts`
- [ ] Connect `app/actions.ts` to your inbox or CRM (see the `TODO`). Today it only logs submissions on the server.
- [ ] Confirm business claims in `lib/content.ts`: care-plan inclusions and timeline wording
- [ ] Replace the concept imagery with your own project photos, and add social links (`site.socials`)
- [ ] Add Privacy and Terms pages, then link them from the footer
- [ ] If you have a vector (SVG) version of the logo, swap it in for `public/brand/wordmark-*.png`

## Photo credits

Concept imagery is from [Unsplash](https://unsplash.com/license) (free licence). The full list with links is in `lib/images.ts`. Photographers: Puscas Adryan, Clay Banks, Jason Briscoe, Kam Idris, Alef Morais, Lisa Anna, Julia, Karolina De Costa, laura adai, Olena Bohovyk, Ryan Ancill, Vincent Yap, amir hossein and serjan midili.
