# Proton Technologies — Landing Page Design Plan

> **Business:** Proton Technologies Limited designs, builds and ships websites for decoration companies at no cost. The only charge is a **$150 USD/year** plan covering hosting, maintenance and related running costs.
> **Audience:** Owners and managers of interior design studios, renovation and fit‑out contractors, kitchen & bath specialists, painters & decorators, flooring, lighting and furnishing businesses.
> **Page goal:** Get qualified decoration businesses to **apply for a free website**.

---

## 1. Creative concept: "From blueprint to website"

Decoration businesses think in drawings: floor plans, elevations, mood boards. Proton thinks in circuits, and the logo is literally a circuit board. The visual language joins the two:

- **Fine blueprint line work that draws itself** (animated SVG). This is the "drawing SVG animation background" motif, used in every section.
- **Circuit traces and nodes taken from the Proton logo** connect ideas on the page: stats, process steps, the cursor, eyebrows and bullets.
- **Warm, real interior photography "fills in" the drawings.** It stands for the promise: *we draw it, we build it, it works for you.*

The emotional arc runs from **curiosity** (hero drawing), to **urgency** (why it matters), to **confidence** (solutions and examples), to **trust** (how the free model works), to **action** (apply).

---

## 2. Brand system

### 2.1 Colour (sampled from the logo)

| Token | Hex | Role |
|---|---|---|
| `ink-950` | `#030D1C` | Dark section base (navy-black, not pure black) |
| `ink-900` | `#071A33` | Dark cards and surfaces |
| `ink-800` | `#0C2748` | Borders and dividers on dark |
| `navy-700` | `#08487C` | Logo navy: headings on light, primary buttons on light |
| `blue-500` | `#108CE8` | Logo blue: links and interactive states |
| `cyan-400` | `#18C4FC` | Logo L-trace: key accent, glow, highlights on dark |
| `sky-300` | `#50CCFC` | Logo frame: line-drawings on dark |
| `peri-200` | `#A0D0FC` | Soft accent and secondary nodes |
| `paper` | `#F4F7FB` | Cool light background |
| `linen` | `#F5F1EA` | Warm light background (gallery section; a nod to interiors) |
| `slate-600` | `#475A73` | Body text on light (AA on paper) |
| `slate-300` | `#9DB0C8` | Body text on dark (AA on ink) |

**Signature gradient ("Proton beam"):** `#50CCFC → #18C4FC → #108CE8 → #08487C`, used sparingly for accent words, primary CTAs on dark and the CTA panel.

### 2.2 Typography (self-hosted with `next/font`, no layout shift)

| Role | Typeface | Usage |
|---|---|---|
| Display / UI / body | **Plus Jakarta Sans** 400–800 | Bold geometric sans. It echoes the logo wordmark and the reference site's confident headlines. Headlines use weight 700–800 with −0.035em tracking. |
| Accent | **Instrument Serif** *Italic* | 1–3 emotive words per headline (*for free*, *more than ever*). Gives the editorial elegance interior designers respond to. |
| Technical | **Geist Mono** 400–500 | Eyebrows, blueprint annotations, numbers and labels. Uppercase with +0.14em tracking. |

Fluid scale (`clamp`): H1 44→104px · H2 36→72px · H3 22→28px · Lead 18→22px · Body 16–17px / 1.65.

### 2.3 Logo usage
- The **mark is rebuilt as a vector SVG** from the supplied logo. It stays crisp at every size, and its circuit traces can animate as they draw.
- The **wordmark stays the original artwork**. It is extracted to transparent PNGs in a *positive* version (navy/blue, for light backgrounds) and a *reversed* version (white/sky, for dark backgrounds).
- The favicon, app icon and social share image all use the mark.

### 2.4 Signature motifs
1. **Trace + node:** a line that ends in a dot, as in the logo. Used for eyebrows, list bullets, dividers, progress lines and the cursor.
2. **Blueprint annotations:** mono labels (`FIG. 01`, `A—01`), dimension lines with end ticks, and crop marks on card corners.
3. **Grid paper:** a two-level drafting grid (24px minor, 120px major) with `+` marks at the intersections, faded out by radial masks.
4. **The arch:** a staple of interior design. Used as an image mask in the hero and in the example sites.

### 2.5 Eyebrow design (not on every section)
Format: `[node]──── 01 · WHY IT MATTERS`. A glowing node, a short trace that **draws in** on reveal, then an index and label in Geist Mono. The hero and CTA use a **pill** variant with a pulsing node instead: "Free website program", "Applications open". The marquee and footer have no eyebrow.

### 2.6 Buttons
- **Primary:** a pill with a fill that wipes in from the cursor side, text that rolls (the label slides up and a duplicate slides in), an arrow that shifts, and a magnetic pull toward the cursor. It is navy on light backgrounds and uses the "beam" gradient on dark ones.
- **Secondary:** an outline pill whose border **draws** around on hover (SVG stroke).
- **Text link:** an underline that draws left→right on hover and retracts right→left on leave.
- All buttons have a visible `:focus-visible` ring (cyan, 2px, offset) and a pressed state (scale .97).

### 2.7 Imagery direction
- Warm, natural-light interior photography with real materials (oak, linen, stone, brass). No generic "business people" stock.
- Photos appear **inside designed frames**: browser mock-ups, arches and cards. They never float loose.
- Sources for the build are free-licence Unsplash photos, served through Unsplash's image CDN with a custom `next/image` loader for AVIF/WebP at exact sizes. Credits are listed in `lib/images.ts`. **Swap in your own project photos before launch.**
- Everything else is **created in code**: blueprint drawings, circuit art, UI mini-illustrations, the WebGL gradient and grain. That keeps the page fast and fully original.

---

## 3. Motion system

| Constant | Value |
|---|---|
| Personality | *Premium-precise*: calm, confident, architectural. No bounce or overshoot. |
| Signature ease | `expo.out` ≈ `cubic-bezier(0.16, 1, 0.3, 1)` for entrances; `power2.inOut` for on-screen moves; `power2.in` for exits |
| Durations | 0.2s (hover/press) · 0.8s (reveals) · 1.4–2.2s (line drawing) |
| Entrance pattern | Headline lines rise out of a clip mask (SplitText, 80ms stagger), body copy fades up 24px, lines draw with DrawSVG |
| Stagger budget | Total ≤ 500ms per group |

**Signature moments**
1. **Hero:** grid → circuit traces → browser frame → interior drawing draw in sequence. The drawing then *renders* into a finished website with a real photo in an arch, text and a CTA. Floating UI cards parallax with the mouse.
2. **Why it matters:** the statement lights up word by word as you scroll, and a circuit trace draws between the stat cards while the numbers count up.
3. **Solutions:** each bento card has a live mini-illustration (phone reflow, speed gauge, search typing, colour editor, security checklist) and a cursor-following spotlight border.
4. **Examples:** a pinned horizontal gallery (desktop) with browser mock-ups; hovering scrolls the concept site inside its frame.
5. **How it works:** the process line fills as you scroll and each step's node lights up.
6. **CTA:** circuit traces converge into the Proton mark behind the headline.

**Layers** (from the motion-design skill): primary (headlines and cards), secondary (lines, nodes, labels), ambient (WebGL aurora, node pulses, marquee).

**Smooth scroll:** Lenis (`lerp 0.1`) is driven by the GSAP ticker and synced with ScrollTrigger. Anchor links scroll smoothly with a header offset.

**Custom cursor:** a node dot plus a trailing ring (GSAP `quickTo`), with these states:
- `link`: the ring grows
- `view`: a 96px disc labelled "View"
- `drag`: arrows
- `text`: the native I-beam
- `pressed`: shrinks

Colours adapt to dark and light sections. The cursor is only enabled for fine pointers and when reduced motion is off.

**Reduced motion:** Lenis, the cursor, parallax and scrubbed animations are all disabled. Drawings and counters show their final state, and only short opacity fades remain.

---

## 4. Page architecture (in order)

| # | Section | Theme | Background design | Eyebrow |
|---|---|---|---|---|
| 0 | Header (sticky) | adaptive | transparent → frosted "island" after scroll; hides on scroll down | — |
| 1 | **Hero** | dark `ink-950` | WebGL aurora (brand blues) + drafting grid + animated blueprint of a website/interior + grain | Pill: "Free website program" |
| 1b | Built-for marquee | dark | thin rule lines, scroll-velocity marquee | — |
| 2 | **Why your B2B website matters more than ever** | light `paper` | grid paper + journey trace drawn on scroll | `01 · Why it matters` |
| 3 | **A full suite of web design solutions** | dark `ink-950` | circuit traces behind a bento grid, radial glows | `02 · What you get` |
| 4 | **Take a look at examples we can build** | warm `linen` | ruler/dimension lines, arches | `03 · Examples` |
| 5 | **How it works** (why it's free) | light `paper` | floor-plan drawing that draws as the steps progress | `04 · How it works` |
| 6 | **CTA: Apply for free** | inset panel, beam gradient | converging traces into the logo mark, grid, grain | Pill: "Applications open" |
| 7 | Footer | dark `ink-950` | giant outlined wordmark, grid | — |

### 4.1 Hero
- **H1:** "Get a professional website *for free* and jumpstart your business." The serif-italic "for free" gets a hand-drawn underline that animates.
- **Lead:** "Custom website design that connects and delivers. We design, build and launch high-performing websites for interior designers, renovators and decorators: $0 upfront, then just $150 a year for hosting and care."
- **CTAs:** *Apply for your free website* (primary) · *See what we build* (secondary).
- **Proof chips:** $0 design & build · $150/yr hosting & care · Mobile-first & SEO-ready.
- **Visual:** a browser frame drawn in blueprint lines, with an interior drawing inside an arch. It "renders" into a finished concept website. Floating UI cards ("New enquiry: kitchen renovation", "Performance 98") and dimension annotations sit around it.

### 1b. Built-for marquee
"Interior design studios · Renovation contractors · Kitchen & bath specialists · Painters & decorators · Flooring & tiling · Furniture & upholstery · Lighting design · Curtains & blinds · Home staging · Commercial fit-outs"

### 4.2 Why it matters
- **Left (sticky):** the H2, plus the statement that lights up word by word on scroll.
- **Right:** four stat cards joined by a drawn circuit trace, each citing a well-known source. We use no invented client numbers.
  - **50 ms** for a first impression (Lindgaard et al., 2006)
  - **75%** judge credibility by design (Stanford Web Credibility Research)
  - **53%** of mobile visits abandoned after 3 s (Google)
  - **17%** of B2B buying time is spent with suppliers (Gartner)
- **Bottom:** three outcome pillars. *Look established from day one* · *Get found by the right clients* · *Turn browsers into booked consultations*.

### 4.3 Solutions
- **H2** "A full suite of web design *solutions.*" and the lead "Design and development, built as one B2B growth engine."
- **Bento grid** of six cards: **Stunning designs** (large), **Mobile optimized**, **Maximum load speed**, **SEO ready**, **Easily customizable**, **Cutting-edge security**. Each card has a coded mini-illustration.
- A **capability strip**: Responsive web design · User journey mapping · Interactive elements · SEO strategy · Portfolio galleries · Quote & enquiry forms · Maps & reviews · Analytics · Hosting & care.

### 4.4 Examples
- A pinned horizontal track of four **concept** sites, each coded as a real mini-website inside a browser frame and clearly labelled *Concept*:
  1. **Atelier Nord**: interior design studio (Scandinavian, warm linen and oak, serif)
  2. **Stone & Oak**: kitchen & bath renovation (forest green and stone, bold sans)
  3. **Maison Lumière**: lighting & décor boutique (black and brass, luxe serif)
  4. **Hue & Co.**: painters & decorators (confident colour, playful type)
- An end card reads "Your business could be next →". On mobile, the track becomes a native swipe carousel (CSS scroll-snap).

### 4.5 How it works (why we don't charge for the build)
- **H2:** "Free to build. *Fair to run.*"
- **Two price tiles:** **$0** design & build · **$150/year** hosting & care ("about 41¢ a day").
- **Why it's free:** *We specialise* (a refined system for one industry means efficient builds) · *We earn as you grow* (income comes from the care plan, so we're invested long term) · *Your success is our showcase* (referrals).
- **Five steps:** Apply → Discovery call → Design → Build & launch → Grow with care.
- **FAQ accordion:** is it really free, what's included, who it's for, updating content, timeline, "what's the catch?"

### 4.6 CTA
- **H2:** "Apply to get your website built by professionals *for free.*"
- A **left column** with next steps (Apply in 2 minutes → Discovery call → See your design).
- A **right column** with a glass application form: name, business, email, phone, business type, current site and message. It submits to a Next.js Server Action, stubbed and ready to connect to email or a CRM, and shows animated success and error states.

### 4.7 Footer
- A closing line, "Let's build something your clients will *remember.*", with a CTA and email.
- Link columns: Explore / Solutions / Contact.
- A giant gradient **PROTON** wordmark that reveals on scroll.
- © line, photo credits and a back-to-top button. Add legal links here once the Privacy and Terms pages exist.

---

## 5. Technical architecture

| Concern | Choice | Why |
|---|---|---|
| Framework | **Next.js 16** App Router, React 19, TypeScript (strict), Turbopack | Server Components by default. Content is fully server-rendered for SEO. |
| Styling | **Tailwind CSS v4**, with tokens in `@theme` | Fast iteration and a tiny CSS output |
| Animation | **GSAP 3.15** + `@gsap/react` (ScrollTrigger, SplitText, DrawSVGPlugin, all free) | Industry standard, with timeline control and scroll scrubbing |
| Smooth scroll | **Lenis** (`lenis/react`) | The reference-grade smooth scroll |
| WebGL | **Raw WebGL fragment shader** (no three.js) | About 3 KB instead of about 150 KB for the same 2D gradient field. It's lazy-initialised, paused off-screen and capped at DPR 1.5. |
| Images | `next/image` + custom loader (Unsplash CDN params; local files go through the Next optimizer) | AVIF/WebP at exact sizes, lazy loading, reserved space |
| Fonts | `next/font/google` (self-hosted, `display: swap`, latin subset) | No FOIT and no CLS |
| Forms | Server Action with validation | No client JS needed for submission logic |

**Folder structure**

```
app/            layout, page, globals.css, actions.ts, sitemap, robots, manifest, icon, opengraph-image
components/
  layout/       Header, Footer, MobileMenu
  sections/     Hero, BuiltFor, WhyItMatters, Solutions, Examples, HowItWorks, ApplyCta
  ui/           Button, Eyebrow, Logo, BrowserFrame, Accordion, Marquee, Counter, …
  motion/       SmoothScroll, CustomCursor, Reveal, SplitHeading, Magnetic, useReducedMotion
  art/          HeroBlueprint, AuroraCanvas (WebGL), grids, circuit traces, mini-illustrations
  examples/     four concept mini-sites
lib/            gsap (plugin registration), content (all copy), site (config), images
```

**Performance budget:** LCP ≤ 2.0 s (the H1 is text, not an image), CLS ≤ 0.05, INP ≤ 200 ms. Everything is server-rendered. Client JS is limited to the animation islands. Offscreen WebGL and heavy work are paused, and below-the-fold images are lazy.

---

## 6. SEO

- **Metadata API:** title, description, canonical, Open Graph and Twitter cards, a generated OG image (`opengraph-image.tsx`), theme colour and icons.
- **JSON-LD:** `Organization`, `WebSite`, `ProfessionalService` with `Offer`s ($0 build, $150/yr care) and `FAQPage`.
- `sitemap.xml`, `robots.txt` and `manifest.webmanifest`.
- Semantic HTML: one `h1`, an `h2` per section, `h3` per card, landmarks, `aria-labelledby` sections and descriptive alt text.
- Keyword focus: *free website for decoration companies*, *interior design website*, *renovation contractor web design*, *B2B web design*.

## 7. Accessibility

- WCAG 2.2 AA colour contrast, a skip link and visible focus rings.
- The accordion and mobile menu are keyboard operable.
- The form has labels, inline errors and `aria-live` status messages.
- Full `prefers-reduced-motion` support.
- Split text keeps an accessible label, and the marquee duplicates are `aria-hidden`.

## 8. Content to confirm before launch (placeholders live in `lib/site.ts`)

- Domain / canonical URL, contact email and phone, service area or address, and social links
- Exact inclusions of the $150/yr plan, plus typical launch timeline wording
- Where application submissions should go (email or CRM)
- Replace concept photos with your own project imagery, and add Privacy and Terms pages

## 9. Build order and QA

1. Foundation: tokens, fonts, layout, SEO files, smooth scroll and cursor providers
2. Global UI: header, buttons, eyebrow, logo
3. Sections, top to bottom
4. QA: `next build` (types and lint), then a browser review at 1440 / 1024 / 390 px, reduced-motion pass, console clean-up and a keyboard walkthrough
