"use client";

import { useRef, type CSSProperties } from "react";
import { useLoop } from "@/components/motion/useLoop";
import { Photo } from "@/components/ui/Photo";

/** Types `to` into `el`, starting from what's there (deletes first). Returns duration used. */
function typeText(tl: gsap.core.Timeline, el: Element | undefined, from: string, to: string, at: number, speed = 0.05) {
  if (!el) return 0;
  const state = { i: 0 };
  const del = from.length;
  const total = del + to.length;
  tl.to(
    state,
    {
      i: total,
      duration: total * speed,
      ease: `steps(${total})`,
      onUpdate: () => {
        const n = Math.round(state.i);
        el.textContent = n <= del ? from.slice(0, del - n) : to.slice(0, n - del);
      },
      onStart: () => {
        state.i = 0;
      },
    },
    at,
  );
  return total * speed;
}

/* ── SEO ready ──────────────────────────────────────────────────── */

const QUERY = "interior designer near me";

export function SeoVisual() {
  const ref = useRef<HTMLDivElement>(null);

  useLoop(
    ref,
    (tl, q) => {
      const query = q("[data-query]")[0];
      const typed = typeText(tl, query, "", QUERY, 0.3, 0.055);
      tl.fromTo(q("[data-result]"), { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: "expo.out" }, 0.5 + typed)
        .fromTo(q("[data-badge]"), { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "expo.out" }, 0.9 + typed)
        .to(q("[data-result]"), { opacity: 0, y: -8, duration: 0.4, stagger: 0.05, ease: "power2.in" }, 4.4 + typed);
      typeText(tl, query, QUERY, "", 4.6 + typed, 0.015);
    },
    0.55,
  );

  return (
    <div ref={ref} className="absolute inset-0 flex flex-col justify-center gap-3 overflow-hidden px-[8%]">
      <div className="bg-grid mask-radial absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="relative flex items-center gap-3 rounded-full border border-white/12 bg-white/[0.05] px-4 py-3">
        <svg viewBox="0 0 20 20" className="size-4 shrink-0 text-steel-300" fill="none" aria-hidden="true">
          <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="m12.8 12.8 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <span className="flex min-w-0 items-center text-sm text-white">
          <span data-query className="truncate">
            {QUERY}
          </span>
          <span className="ml-0.5 h-4 w-px animate-pulse bg-cyan-400" aria-hidden="true" />
        </span>
      </div>
      <div
        data-result
        className="relative rounded-2xl border border-cyan-400/40 bg-cyan-400/[0.06] p-4 shadow-[0_0_50px_-12px_rgb(24_196_252/0.45)]"
      >
        <div className="flex items-center gap-2">
          <span className="grid size-5 place-items-center rounded-full bg-[#F5F1EA] font-serif text-[10px] text-[#2f2a26]">A</span>
          <span className="truncate font-mono text-[11px] text-steel-300">ateliernord.com › projects</span>
          <span data-badge className="ml-auto shrink-0 rounded-full bg-cyan-400 px-2 py-0.5 text-[10px] font-bold text-ink-950">
            Your business
          </span>
        </div>
        <p className="mt-2 text-[15px] font-semibold text-sky-300">Atelier Nord · Interior Design Studio</p>
        <p className="mt-1 line-clamp-1 text-xs text-steel-300">Calm, considered interiors for modern living. Book a consultation today.</p>
      </div>
      <div data-result className="relative space-y-2 rounded-2xl border border-white/8 p-4">
        <span className="block h-2 w-1/3 rounded bg-white/10" />
        <span className="block h-2.5 w-2/3 rounded bg-white/15" />
        <span className="block h-2 w-5/6 rounded bg-white/8" />
      </div>
    </div>
  );
}

/* ── Easily customizable ────────────────────────────────────────── */

const ACCENTS = ["#B08968", "#3D5A80", "#E07A5F", "#6B7F5E"];

export function CustomVisual() {
  const ref = useRef<HTMLDivElement>(null);

  useLoop(
    ref,
    (tl, q) => {
      const field = q("[data-field]")[0];
      const title = q("[data-title]")[0];
      const pitch = 30;
      const t1 = typeText(tl, field, "Spring collection", "Autumn edit", 0.4, 0.045);
      tl.call(() => {
        if (title) title.textContent = "Autumn edit";
      }, [], 0.45 + t1)
        .to(q("[data-ring]"), { x: pitch, duration: 0.6, ease: "expo.inOut" }, 1 + t1)
        .to(q("[data-preview]"), { "--acc": ACCENTS[1], duration: 0.6 }, 1 + t1)
        .to(q("[data-knob]"), { x: 0, duration: 0.35, ease: "power2.inOut" }, 2.2 + t1)
        .to(q("[data-switch]"), { backgroundColor: "rgb(255 255 255 / 0.15)", duration: 0.35 }, 2.2 + t1)
        .to(q("[data-cta]"), { scale: 0.6, opacity: 0, duration: 0.35, ease: "power2.in" }, 2.2 + t1)
        .to(q("[data-knob]"), { x: 14, duration: 0.35, ease: "power2.inOut" }, 3.4 + t1)
        .to(q("[data-switch]"), { backgroundColor: "#18C4FC", duration: 0.35 }, 3.4 + t1)
        .to(q("[data-cta]"), { scale: 1, opacity: 1, duration: 0.5, ease: "expo.out" }, 3.4 + t1)
        .to(q("[data-ring]"), { x: 0, duration: 0.6, ease: "expo.inOut" }, 4.6 + t1)
        .to(q("[data-preview]"), { "--acc": ACCENTS[0], duration: 0.6 }, 4.6 + t1);
      const t2 = typeText(tl, field, "Autumn edit", "Spring collection", 5.2 + t1, 0.035);
      tl.call(() => {
        if (title) title.textContent = "Spring collection";
      }, [], 5.25 + t1 + t2);
    },
    0,
  );

  return (
    <div ref={ref} className="absolute inset-0 flex items-center justify-center gap-3 overflow-hidden px-[6%]">
      <div className="bg-grid mask-radial absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="relative w-[56%] rounded-2xl border border-white/10 bg-ink-950/70 p-4">
        <p className="mono-label !text-[0.6rem] text-sky-300">Edit · Homepage hero</p>
        <p className="mt-3 text-[11px] font-medium text-steel-300">Headline</p>
        <div className="mt-1 flex h-8 items-center rounded-lg border border-white/12 bg-white/[0.04] px-2.5 text-[12px] text-white">
          <span data-field className="truncate">
            Spring collection
          </span>
          <span className="ml-px h-3.5 w-px animate-pulse bg-cyan-400" aria-hidden="true" />
        </div>
        <p className="mt-3 text-[11px] font-medium text-steel-300">Accent colour</p>
        <div className="relative mt-1.5 flex gap-1.5">
          {ACCENTS.map((c) => (
            <span key={c} className="size-6 rounded-full" style={{ background: c }} />
          ))}
          <span
            data-ring
            aria-hidden="true"
            className="absolute left-0 top-0 size-6 rounded-full ring-2 ring-white ring-offset-2 ring-offset-ink-950"
          />
        </div>
        <div className="mt-3.5 flex items-center justify-between">
          <p className="text-[11px] font-medium text-steel-300">Booking button</p>
          <span data-switch className="relative h-[18px] w-8 rounded-full bg-cyan-400">
            <span data-knob className="absolute left-0.5 top-0.5 size-[14px] rounded-full bg-white" style={{ transform: "translateX(14px)" }} />
          </span>
        </div>
      </div>
      <div
        data-preview
        className="relative w-[40%] rounded-2xl bg-[#FFFDF8] p-2.5 text-[#2f2a26] shadow-2xl"
        style={{ "--acc": ACCENTS[0] } as CSSProperties}
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
          <Photo name="nordBedroom" fill sizes="160px" className="object-cover" />
        </div>
        <p data-title className="mt-2 truncate font-serif text-[17px] leading-tight">
          Spring collection
        </p>
        <span
          data-cta
          className="mt-2 inline-flex rounded-full px-3 py-1 text-[10px] font-semibold text-white"
          style={{ background: "var(--acc)" }}
        >
          Book a visit
        </span>
      </div>
    </div>
  );
}

/* ── Cutting-edge security ──────────────────────────────────────── */

const CHECKS = ["SSL certificate", "Managed updates", "Regular backups", "Uptime monitoring"];

export function SecurityVisual() {
  const ref = useRef<HTMLDivElement>(null);

  useLoop(ref, (tl, q) => {
    tl.fromTo(q("[data-shield]"), { drawSVG: "0%" }, { drawSVG: "100%", duration: 1.1, ease: "power2.inOut" }, 0.2)
      .fromTo(q("[data-shield-fill]"), { opacity: 0 }, { opacity: 1, duration: 0.6 }, 1)
      .fromTo(q("[data-lock]"), { scale: 0.5, opacity: 0, transformOrigin: "50% 50%" }, { scale: 1, opacity: 1, duration: 0.6, ease: "expo.out" }, 1.1)
      .fromTo(q("[data-check]"), { drawSVG: "0%" }, { drawSVG: "100%", duration: 0.35, stagger: 0.28, ease: "power2.out" }, 1.4)
      .fromTo(q("[data-check-label]"), { opacity: 0.35 }, { opacity: 1, duration: 0.3, stagger: 0.28 }, 1.45)
      .fromTo(q("[data-status]"), { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.5, ease: "expo.out" }, 2.7)
      .to(q("[data-shield], [data-check], [data-shield-fill], [data-lock], [data-status]"), { opacity: 0, duration: 0.45 }, 5.6)
      .set(q("[data-shield], [data-check]"), { opacity: 1, drawSVG: "0%" }, 6.1);
  }, 0.75);

  return (
    <div ref={ref} className="absolute inset-0 flex items-center justify-center gap-7 overflow-hidden px-[8%]">
      <div className="bg-grid mask-radial absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="relative w-[30%] max-w-[112px] shrink-0">
        <svg viewBox="0 0 100 116" className="w-full overflow-visible" aria-hidden="true">
          <path data-shield-fill d="M50 5 91 20v33c0 27-17.5 48-41 57C26.5 101 9 80 9 53V20Z" fill="rgb(24 196 252 / .08)" />
          <path data-shield d="M50 5 91 20v33c0 27-17.5 48-41 57C26.5 101 9 80 9 53V20Z" fill="none" stroke="#18C4FC" strokeWidth="2" strokeLinejoin="round" />
          <g data-lock fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round">
            <rect x="36" y="50" width="28" height="22" rx="4" />
            <path d="M42 50v-6a8 8 0 0 1 16 0v6M50 58v6" />
          </g>
        </svg>
        <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-mint-400/15 px-2 py-0.5 font-mono text-[10px] text-mint-400">
          HTTPS
        </span>
      </div>
      <ul className="relative space-y-2.5">
        {CHECKS.map((item) => (
          <li key={item} className="flex items-center gap-2.5 text-[13px] text-steel-200">
            <svg viewBox="0 0 20 20" className="size-5 shrink-0" fill="none" aria-hidden="true">
              <circle cx="10" cy="10" r="9" stroke="rgb(52 211 153 / .3)" />
              <path data-check d="m6 10.3 2.7 2.6L14 7.4" stroke="#34D399" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span data-check-label>{item}</span>
          </li>
        ))}
        <li data-status className="mono-label flex items-center gap-2 pt-1.5 !text-[0.6rem] text-mint-400">
          <span className="size-1.5 animate-pulse rounded-full bg-mint-400" aria-hidden="true" />
          All systems normal
        </li>
      </ul>
    </div>
  );
}
