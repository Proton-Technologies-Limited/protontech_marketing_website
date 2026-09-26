/**
 * Global site configuration.
 * Values marked TODO are placeholders. Replace them before launch.
 */
export const site = {
  name: "Proton Technologies",
  legalName: "Proton Technologies Limited",
  // TODO: set NEXT_PUBLIC_SITE_URL in your environment (e.g. https://www.yourdomain.com)
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.protontech.example").replace(/\/$/, ""),
  // TODO: replace with your real inbox
  email: "hello@protontech.example",
  tagline: "Free professional websites for decoration companies.",
  description:
    "Proton Technologies designs, builds and launches professional websites for interior design, renovation and decoration companies for free. You only cover $150 a year for hosting, maintenance and care.",
  keywords: [
    "free website for decoration companies",
    "interior design website",
    "renovation contractor web design",
    "website for painters and decorators",
    "B2B web design",
    "web design for interior designers",
    "free web design",
    "small business website hosting",
  ],
  pricing: {
    build: 0,
    carePerYear: 150,
    currency: "USD",
  },
  nav: [
    { label: "Why it matters", href: "#why" },
    { label: "Solutions", href: "#solutions" },
    { label: "Examples", href: "#examples" },
    { label: "How it works", href: "#how-it-works" },
  ],
  // TODO: add your real profiles (leave empty to hide)
  socials: [] as { label: string; href: string }[],
} as const;

export type NavItem = (typeof site.nav)[number];
