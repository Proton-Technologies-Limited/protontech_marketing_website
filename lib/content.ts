/**
 * All landing-page copy lives here so it can be edited without touching layout code.
 * Emphasis markers: text wrapped in *asterisks* inside headlines renders in the accent serif.
 */
import type { PhotoKey } from "./images";

export const hero = {
  eyebrow: { label: "Free website program", detail: "for decoration businesses" },
  // Explicit lines give the desktop headline its rhythm; they wrap naturally on small screens.
  titleLines: ["Get a professional website", "*for free* and jumpstart", "your business."],
  lead: "Custom website design that connects and delivers. We design, build and launch high-performing websites for interior designers, renovators and decorators. It's $0 upfront, then just $150 a year for hosting and care.",
  primaryCta: { label: "Apply for your free website", href: "#apply" },
  secondaryCta: { label: "See what we build", href: "#examples" },
  proof: ["$0 design & build", "$150/yr hosting & care", "Mobile-first & SEO-ready"],
};

export const builtFor = [
  "Interior design studios",
  "Renovation contractors",
  "Kitchen & bath specialists",
  "Painters & decorators",
  "Flooring & tiling",
  "Furniture & upholstery",
  "Lighting design",
  "Curtains & blinds",
  "Home staging",
  "Commercial fit-outs",
];

export const why = {
  index: "01",
  eyebrow: "Why it matters",
  title: "Why your B2B website matters *more than ever.*",
  statement:
    "Before a client ever picks up the phone, they've already toured your work online. Your website is your *showroom,* your *portfolio* and your *hardest-working salesperson,* open 24/7. When it's slow, dated or clumsy on a phone, the project quietly goes to someone else.",
  photoCaption: "Every great project starts with a drawing. We start with yours.",
  stats: [
    {
      value: 50,
      suffix: "ms",
      label: "is all it takes for visitors to form an opinion of your website.",
      source: "Lindgaard et al., 2006",
    },
    {
      value: 75,
      suffix: "%",
      label: "of people judge a company's credibility by the design of its website.",
      source: "Stanford Web Credibility Research",
    },
    {
      value: 53,
      suffix: "%",
      label: "of mobile visits are abandoned when a page takes longer than three seconds to load.",
      source: "Google, 2016",
    },
    {
      value: 17,
      suffix: "%",
      label: "of a B2B buyer's time is spent meeting suppliers. The rest of the journey happens without you.",
      source: "Gartner",
    },
  ],
  pillars: [
    {
      icon: "badge",
      title: "Look established from day one",
      text: "A polished, modern site signals quality craftsmanship before you've said a word, and lets your finished projects do the selling.",
    },
    {
      icon: "pin",
      title: "Get found by the right clients",
      text: "Local SEO foundations put your business in front of homeowners and companies searching for your services nearby.",
    },
    {
      icon: "spark",
      title: "Turn browsers into booked consultations",
      text: "Clear journeys, fast pages and frictionless enquiry forms turn casual interest into real projects in your calendar.",
    },
  ],
};

export type SolutionKey = "design" | "mobile" | "speed" | "seo" | "custom" | "security";

export const solutions = {
  index: "02",
  eyebrow: "What you get",
  title: "A full suite of web design *solutions.*",
  lead: "Design and development, built as one B2B growth engine. Every Proton website ships with the same professional toolkit. No upsells, no hidden extras.",
  items: [
    {
      key: "design" as SolutionKey,
      title: "Stunning designs",
      text: "Bespoke layouts, considered typography and imagery that does your craftsmanship justice, designed around your brand and your best projects.",
    },
    {
      key: "mobile" as SolutionKey,
      title: "Mobile optimized",
      text: "Pixel-perfect on every screen. Most clients will discover you on a phone, so we design for it first.",
    },
    {
      key: "speed" as SolutionKey,
      title: "Maximum load speed",
      text: "Optimized images, modern code and global edge hosting keep every page loading in a blink.",
    },
    {
      key: "seo" as SolutionKey,
      title: "SEO ready",
      text: "Semantic code, structured data and local SEO foundations help the right clients find you.",
    },
    {
      key: "custom" as SolutionKey,
      title: "Easily customizable",
      text: "Swap projects, photos and prices in minutes, or send us a message and we'll handle it.",
    },
    {
      key: "security" as SolutionKey,
      title: "Cutting-edge security",
      text: "SSL encryption, managed updates, backups and monitoring, all handled for you year-round.",
    },
  ],
  capabilities: [
    "Responsive web design",
    "User journey mapping",
    "Interactive elements",
    "SEO strategy",
    "Portfolio galleries",
    "Quote & enquiry forms",
    "Google Maps & reviews",
    "Analytics setup",
    "Hosting & care",
  ],
};

export type ExampleKey = "nord" | "stone" | "lumiere" | "hue";

export const examples = {
  index: "03",
  eyebrow: "Examples",
  title: "Take a look at examples *we can build.*",
  lead: "Concept websites designed for the kinds of businesses we serve. Every Proton site is custom. These show the standard of craft, speed and detail you can expect.",
  items: [
    {
      key: "nord" as ExampleKey,
      name: "Atelier Nord",
      type: "Interior design studio",
      url: "ateliernord.com",
      tags: ["Portfolio gallery", "Consultation booking", "Journal"],
      accent: "#b08968",
    },
    {
      key: "stone" as ExampleKey,
      name: "Stone & Oak",
      type: "Kitchen & bath renovation",
      url: "stoneandoak.co",
      tags: ["Before & after gallery", "Instant quote form", "Service areas"],
      accent: "#2f4a3a",
    },
    {
      key: "lumiere" as ExampleKey,
      name: "Maison Lumière",
      type: "Lighting & décor boutique",
      url: "maisonlumiere.studio",
      tags: ["Collection showcase", "Showroom appointments", "Lookbook"],
      accent: "#c8a26b",
    },
    {
      key: "hue" as ExampleKey,
      name: "Hue & Co.",
      type: "Painters & decorators",
      url: "hueandco.com",
      tags: ["Colour consultations", "Project gallery", "Free quotes"],
      accent: "#e0a526",
    },
  ],
};

export const howItWorks = {
  index: "04",
  eyebrow: "How it works",
  title: "Free to build. *Fair to run.*",
  lead: "Most agencies charge thousands before you see a single page. We flipped the model: we design and build your website for free, and one simple yearly plan covers everything it takes to keep it running.",
  plans: [
    {
      price: "$0",
      period: "one-time",
      name: "Design & build",
      note: "Your cost to get a custom website: nothing.",
      features: [
        "Custom design & layout",
        "Development & launch",
        "Mobile optimization",
        "On-page SEO setup",
        "Enquiry forms & integrations",
      ],
    },
    {
      price: "$150",
      period: "per year",
      name: "Hosting & care",
      note: "About 41¢ a day to keep everything running.",
      features: [
        "Fast, secure hosting",
        "SSL certificate",
        "Updates & maintenance",
        "Backups & monitoring",
        "Small content updates & support",
      ],
    },
  ],
  reasonsTitle: "So why don't we charge for design?",
  reasons: [
    {
      title: "We specialise.",
      text: "Decoration is all we do. A refined design system and deep industry know-how let us craft custom sites in a fraction of the usual time, without cutting corners.",
    },
    {
      title: "We earn as you grow.",
      text: "Our income comes from the yearly care plan, not a big upfront invoice. That keeps us invested in your site staying fast, secure and effective for years.",
    },
    {
      title: "Your success is our showcase.",
      text: "Every great website we launch brings referrals from happy clients. Doing brilliant work for you is our best marketing.",
    },
  ],
  stepsTitle: "From application to launch",
  steps: [
    { title: "Apply", text: "Tell us about your business in a two-minute application. No payment details needed." },
    { title: "Discovery call", text: "We learn your services, style and ideal clients, then map the journey they'll take on your site." },
    { title: "Design", text: "We design your custom website and refine it with your feedback until it feels unmistakably you." },
    { title: "Build & launch", text: "We develop, optimize and launch on fast, secure hosting, with SEO foundations in place from day one." },
    { title: "Grow with care", text: "Hosting, updates, security and small edits are covered by your $150/year plan. We're here when you need us." },
  ],
  faqTitle: "Questions, *answered.*",
  faqs: [
    {
      q: "Is the website really free?",
      a: "Yes. Designing and building your website costs $0. The only cost is the $150 yearly plan, which covers hosting, maintenance and the other running costs of keeping your site online.",
    },
    {
      q: "What's the catch?",
      a: "There isn't one. We invest in your build up front and earn our keep through the yearly care plan, so we only succeed if your website keeps working for you.",
    },
    {
      q: "What does the $150 yearly plan include?",
      a: "Fast and secure hosting, an SSL certificate, software and security updates, backups and monitoring, plus help with small content updates whenever you need them.",
    },
    {
      q: "Who is this for?",
      a: "Interior designers, renovation and fit-out contractors, kitchen and bath specialists, painters and decorators, and flooring, lighting and furnishing businesses. In short, any company that makes spaces beautiful.",
    },
    {
      q: "Can I update the website myself?",
      a: "Absolutely. Your site is built to be easy to update. Or simply send us your changes and we'll take care of small edits as part of your plan.",
    },
    {
      q: "How long does it take?",
      a: "Timelines depend on your content and feedback, but most projects move from discovery call to launch in a matter of weeks, not months.",
    },
  ],
};

export const apply = {
  eyebrow: "Applications open",
  title: "Apply to get your website built by professionals *for free.*",
  lead: "Tell us about your decoration business. If we're a fit, we'll design and build your new website at no cost. You simply cover $150 a year for hosting and care.",
  steps: ["Apply in two minutes", "Quick discovery call", "See your new design"],
  businessTypes: [
    "Interior design",
    "Renovation & fit-out",
    "Kitchen & bath",
    "Painting & decorating",
    "Flooring & tiling",
    "Furniture & décor",
    "Lighting",
    "Other",
  ],
};

export const footer = {
  closing: "Let's build something your clients will *remember.*",
  blurb: "Proton Technologies Limited designs, builds and cares for websites that help decoration businesses grow.",
  explore: [
    { label: "Why it matters", href: "#why" },
    { label: "Solutions", href: "#solutions" },
    { label: "Examples", href: "#examples" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Apply", href: "#apply" },
  ],
  services: [
    "Responsive web design",
    "User journey mapping",
    "Interactive elements",
    "SEO strategy",
    "Hosting & care",
  ],
};

/** Photos used by the hero and why sections */
export const heroPhoto: PhotoKey = "archNook";
export const whyPhoto: PhotoKey = "sketching";
