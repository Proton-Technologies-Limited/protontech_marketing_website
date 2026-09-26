"use client";

import { useRef, type CSSProperties } from "react";
import { useLoop } from "@/components/motion/useLoop";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { Photo } from "@/components/ui/Photo";

/* ── Stunning designs ───────────────────────────────────────────── */

const SWATCHES = ["#EFE8DD", "#B08968", "#6B7F5E", "#B5654A"];

export function DesignVisual() {
  const ref = useRef<HTMLDivElement>(null);

  useLoop(
    ref,
    (tl, q) => {
      const mock = q("[data-mock]");
      const ring = q("[data-ring]");
      const pitch = 48; // swatch size + gap
      [2, 3, 1].forEach((index, i) => {
        tl.to(ring, { x: index * pitch, duration: 0.7, ease: "expo.inOut" }, 1.6 + i * 2)
          .to(mock, { "--mock-accent": SWATCHES[index], duration: 0.7, ease: "power2.inOut" }, 1.6 + i * 2);
      });
      tl.to({}, { duration: 1.4 });
    },
    0,
  );

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <div className="bg-grid mask-radial absolute inset-0 opacity-70" aria-hidden="true" />

      <div
        data-mock
        className="absolute left-[6%] top-[11%] w-[76%] [container-type:inline-size]"
        style={{ "--mock-accent": SWATCHES[1] } as CSSProperties}
      >
        <BrowserFrame url="oakandlinen.studio" className="shadow-[0_40px_80px_-30px_rgb(0_0_0/0.8)]">
          <div className="relative aspect-[16/10] overflow-hidden bg-[#F5F1EA] text-[#2f2a26]">
            <div className="flex items-center justify-between px-[5cqw] pt-[3.4cqw]">
              <span className="font-serif text-[3.1cqw]">Oak &amp; Linen</span>
              <span className="flex gap-[3cqw] text-[1.55cqw] font-medium text-[#6b6358]">
                <span>Work</span>
                <span>Studio</span>
                <span>Contact</span>
              </span>
            </div>
            <div className="grid grid-cols-[1.15fr_1fr] items-end gap-[4cqw] px-[5cqw] pt-[4.5cqw]">
              <div className="pb-[4cqw]">
                <p className="font-mono text-[1.35cqw] uppercase tracking-[0.2em]" style={{ color: "var(--mock-accent)" }}>
                  Interior design
                </p>
                <p className="mt-[1.8cqw] font-serif text-[6.6cqw] leading-[0.95]">
                  Spaces with{" "}
                  <em className="italic" style={{ color: "var(--mock-accent)" }}>
                    soul.
                  </em>
                </p>
                <p className="mt-[2.2cqw] max-w-[30cqw] text-[1.65cqw] leading-relaxed text-[#6b6358]">
                  Residential interiors, styled and sourced with care.
                </p>
                <span
                  className="mt-[2.8cqw] inline-flex rounded-full px-[3cqw] py-[1.35cqw] text-[1.55cqw] font-semibold text-white"
                  style={{ background: "var(--mock-accent)" }}
                >
                  Start a project
                </span>
              </div>
              <div className="relative aspect-[4/5] overflow-hidden rounded-t-full">
                <Photo name="nordLiving" fill sizes="280px" className="object-cover" />
              </div>
            </div>
            {/* 12-column grid overlay, revealed on hover */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 grid grid-cols-12 gap-[1.6cqw] px-[5cqw] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            >
              {Array.from({ length: 12 }, (_, i) => (
                <span key={i} className="border-x border-cyan-400/40 bg-cyan-400/[0.07]" />
              ))}
            </div>
          </div>
        </BrowserFrame>
      </div>

      <div className="absolute right-[3%] top-[30%] hidden w-[34%] max-w-[190px] rounded-2xl lg:block border border-white/10 bg-ink-900/95 p-4 shadow-2xl">
        <p className="font-serif text-5xl leading-none text-white">Aa</p>
        <p className="mt-3 text-sm font-semibold text-white">Instrument Serif</p>
        <p className="mono-label mt-1 !text-[0.62rem] text-steel-300">Display · 64 / 68</p>
      </div>

      <div className="absolute bottom-[7%] right-[4%] rounded-2xl border border-white/10 bg-ink-900/95 p-4 shadow-2xl">
        <p className="mono-label !text-[0.62rem] text-steel-300">Brand palette</p>
        <div className="relative mt-3 flex gap-2">
          {SWATCHES.map((color) => (
            <span key={color} className="size-10 rounded-full ring-1 ring-white/10" style={{ background: color }} />
          ))}
          <span
            data-ring
            aria-hidden="true"
            className="absolute left-0 top-0 size-10 rounded-full ring-2 ring-cyan-400 ring-offset-2 ring-offset-ink-900"
            style={{ transform: "translateX(48px)" }}
          />
        </div>
      </div>
    </div>
  );
}

/* ── Mobile optimized ───────────────────────────────────────────── */

export function MobileVisual() {
  const ref = useRef<HTMLDivElement>(null);

  useLoop(
    ref,
    (tl, q) => {
      const screen = q("[data-screen]")[0] as HTMLElement;
      const viewport = q("[data-viewport]")[0] as HTMLElement;
      const distance = () => -(screen.offsetHeight - viewport.offsetHeight);
      tl.to(screen, { y: distance, duration: 3.2, ease: "power2.inOut" }, 0.6)
        .fromTo(q("[data-tap]"), { scale: 0, opacity: 0.8 }, { scale: 2.4, opacity: 0, duration: 0.7, ease: "power2.out" }, 4)
        .to(screen, { y: 0, duration: 2.6, ease: "power2.inOut" }, 4.6);
    },
    0,
  );

  return (
    <div ref={ref} className="absolute inset-0 flex items-center justify-center overflow-hidden">
      <div className="bg-grid mask-radial absolute inset-0 opacity-60" aria-hidden="true" />
      <div aria-hidden="true" className="absolute left-1/2 top-1/2 h-[80%] w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-dashed border-white/12">
        <span className="mono-label absolute left-3 top-2 !text-[0.6rem] text-steel-400">1440</span>
      </div>
      <div aria-hidden="true" className="absolute left-1/2 top-1/2 h-[70%] w-[50%] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-dashed border-white/15">
        <span className="mono-label absolute left-3 top-2 !text-[0.6rem] text-steel-400">768</span>
      </div>

      <div className="relative h-[250px] w-[122px] rounded-[24px] border border-white/25 bg-ink-950 p-[5px] shadow-[0_30px_60px_-20px_rgb(0_0_0/0.8)]">
        <div data-viewport className="relative h-full overflow-hidden rounded-[19px] bg-[#FFFDF8] text-[#1d1d1b]">
          <div data-screen className="absolute inset-x-0 top-0 px-2.5 pb-4 pt-6">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-extrabold tracking-tight">
                hue<span className="text-[#E0A526]">&amp;</span>co.
              </span>
              <span className="flex flex-col gap-[3px]">
                <span className="h-px w-3 bg-current" />
                <span className="h-px w-3 bg-current" />
              </span>
            </div>
            <div className="relative mt-2.5 h-24 overflow-hidden rounded-lg">
              <Photo name="hueRooms" fill sizes="120px" className="object-cover" />
            </div>
            <p className="mt-2.5 text-[12px] font-extrabold leading-[1.05] tracking-tight">Colour, done properly.</p>
            <div className="mt-1.5 space-y-1">
              <span className="block h-[3px] w-full rounded bg-black/10" />
              <span className="block h-[3px] w-4/5 rounded bg-black/10" />
            </div>
            <span className="relative mt-2.5 inline-flex rounded-full bg-[#E0A526] px-2.5 py-1 text-[7px] font-bold">
              Get a free quote
              <span data-tap className="absolute left-1/2 top-1/2 -ml-2 -mt-2 size-4 rounded-full bg-white/80" />
            </span>
            <div className="mt-3 flex gap-1">
              {["#E0A526", "#3D5A80", "#E07A5F", "#98B08F", "#EFE8DD"].map((c) => (
                <span key={c} className="size-3.5 rounded-full ring-1 ring-black/10" style={{ background: c }} />
              ))}
            </div>
            <div className="mt-3 grid grid-cols-2 gap-1.5">
              <div className="relative aspect-square overflow-hidden rounded-md">
                <Photo name="hueMustard" fill sizes="60px" className="object-cover" />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-md">
                <Photo name="hueBlue" fill sizes="60px" className="object-cover" />
              </div>
            </div>
            <div className="mt-3 space-y-1">
              <span className="block h-[3px] w-full rounded bg-black/10" />
              <span className="block h-[3px] w-2/3 rounded bg-black/10" />
              <span className="block h-[3px] w-3/4 rounded bg-black/10" />
            </div>
            <div className="mt-3 rounded-md bg-[#1d1d1b] p-2 text-[6px] text-white/70">© Hue &amp; Co. Decorators</div>
          </div>
          <span className="absolute left-1/2 top-1.5 h-3.5 w-12 -translate-x-1/2 rounded-full bg-ink-950" aria-hidden="true" />
        </div>
      </div>
      <span className="mono-label absolute bottom-[8%] right-[8%] !text-[0.6rem] text-sky-300">375 px</span>
    </div>
  );
}

/* ── Maximum load speed ─────────────────────────────────────────── */

const METRICS = [
  { k: "LCP", v: "0.8s" },
  { k: "CLS", v: "0.01" },
  { k: "INP", v: "48ms" },
];

export function SpeedVisual() {
  const ref = useRef<HTMLDivElement>(null);

  useLoop(ref, (tl, q) => {
    const score = q("[data-score]")[0];
    const counter = { v: 0 };
    tl.fromTo(q("[data-arc]"), { drawSVG: "0% 0%" }, { drawSVG: "0% 98%", duration: 1.8, ease: "power3.out" }, 0.3)
      .fromTo(
        counter,
        { v: 0 },
        {
          v: 98,
          duration: 1.8,
          ease: "power3.out",
          onUpdate: () => {
            if (score) score.textContent = String(Math.round(counter.v));
          },
        },
        0.3,
      )
      .fromTo(q("[data-metric]"), { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: "expo.out" }, 1.4)
      .to(q("[data-metric], [data-arc], [data-score]"), { opacity: 0, duration: 0.4 }, 5)
      .set(q("[data-arc]"), { drawSVG: "0% 0%" }, 5.4)
      .call(() => {
        if (score) score.textContent = "0";
      }, [], 5.42)
      .set(q("[data-arc], [data-score]"), { opacity: 1 }, 5.45);
  }, 0.6);

  return (
    <div ref={ref} className="absolute inset-0 flex flex-col items-center justify-center gap-6 overflow-hidden">
      <div className="bg-grid mask-radial absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="relative w-[220px]">
        <svg viewBox="0 0 220 124" className="w-full" aria-hidden="true">
          <defs>
            <linearGradient id="speed-grad" x1="0" x2="1">
              <stop offset="0" stopColor="#18C4FC" />
              <stop offset="1" stopColor="#34D399" />
            </linearGradient>
          </defs>
          <path d="M20 112a90 90 0 0 1 180 0" fill="none" stroke="rgb(255 255 255 / .08)" strokeWidth="12" strokeLinecap="round" />
          <path data-arc d="M20 112a90 90 0 0 1 180 0" fill="none" stroke="url(#speed-grad)" strokeWidth="12" strokeLinecap="round" />
          {Array.from({ length: 11 }, (_, i) => {
            const a = Math.PI - (i / 10) * Math.PI;
            return (
              <line
                key={i}
                x1={110 + Math.cos(a) * 70}
                y1={112 - Math.sin(a) * 70}
                x2={110 + Math.cos(a) * 64}
                y2={112 - Math.sin(a) * 64}
                stroke="rgb(160 208 252 / .35)"
                strokeWidth="1"
              />
            );
          })}
        </svg>
        <div className="absolute inset-x-0 bottom-0 text-center">
          <p data-score className="text-5xl font-extrabold leading-none tracking-[-0.05em] text-white tabular-nums">
            98
          </p>
          <p className="mono-label mt-2 !text-[0.62rem] text-steel-300">Performance</p>
        </div>
      </div>
      <div className="relative flex flex-wrap justify-center gap-2">
        {METRICS.map((m) => (
          <span
            key={m.k}
            data-metric
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-[11px] text-steel-300"
          >
            <span className="size-1.5 rounded-full bg-mint-400" aria-hidden="true" />
            {m.k}
            <b className="font-medium text-white">{m.v}</b>
          </span>
        ))}
      </div>
    </div>
  );
}
