import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { PhoneSite, SiteBlueprint, SiteColumns, SiteRender } from "./HeroSite";

const enquiries = [
  "Kitchen renovation, 4-bed home",
  "Loft living room redesign",
  "Full-home styling, new build",
  "Bathroom refit, period home",
];

/** Sizes are fractions of the frame width (--k = 1% of it), so the whole scene scales as one. */
const k = (n: number) => `calc(var(--k) * ${n})`;

/* ── Drafting layer: guides, registration marks, dimensions ─── */

/** A construction line: full strength along the frame, fading out toward the viewport edges. */
function Guide({ axis, from, to, at }: { axis: "x" | "y"; from: number; to: number; at: string }) {
  const span = to - from;
  const a = `${((-from / span) * 100).toFixed(1)}%`;
  const b = `${(((100 - from) / span) * 100).toFixed(1)}%`;
  const line = "rgb(80 204 252 / 0.4)";
  const x = axis === "x";
  return (
    <span
      data-guide={axis}
      className={cn("absolute", x ? "h-px origin-left" : "w-px origin-top")}
      style={{
        [x ? "top" : "left"]: at,
        [x ? "left" : "top"]: `${from}%`,
        [x ? "width" : "height"]: `${span}%`,
        background: `linear-gradient(${x ? "90deg" : "180deg"}, transparent, ${line} ${a}, ${line} ${b}, transparent)`,
      }}
    />
  );
}

function Mark({ style }: { style: CSSProperties }) {
  return (
    <span data-mark className="absolute size-[18px] -translate-1/2 text-sky-300" style={style}>
      <svg viewBox="0 0 18 18" className="size-full" aria-hidden="true">
        <path d="M9 0v18M0 9h18" stroke="currentColor" strokeWidth="1" />
        <circle cx="9" cy="9" r="4" fill="none" stroke="currentColor" strokeWidth="1" />
      </svg>
    </span>
  );
}

function Drafting() {
  return (
    <div data-guides className="pointer-events-none absolute inset-0 opacity-50">
      {/* Guides run far past the frame so they cross the viewport in perspective. Vertical
          ones only run downward, so they never cut through the headline above the frame. */}
      <Guide axis="x" at="0%" from={-70} to={170} />
      <Guide axis="x" at="13.87%" from={-70} to={170} />
      <Guide axis="y" at="0%" from={0} to={180} />
      <Guide axis="y" at="4.667%" from={0} to={180} />
      <Guide axis="y" at="51.67%" from={-60} to={0} />
      <Mark style={{ left: 0, top: 0 }} />
      <Mark style={{ left: "4.667%", top: "13.87%" }} />
      <Mark style={{ left: "51.67%", top: "-6%" }} />
      <Mark style={{ left: 0, top: "100%" }} />

      {/* Height dimension */}
      <div className="absolute inset-y-0 flex flex-col items-center gap-3 text-sky-300" style={{ left: "-3%" }}>
        <span data-mark-tick className="absolute -inset-x-[5px] top-0 h-px bg-current/45" />
        <span data-dim className="w-px flex-1 origin-bottom bg-current/45" />
        <span data-annot className="rotate-180 font-mono text-[clamp(8px,calc(var(--k)*0.72),11px)] tracking-[0.16em] text-sky-300/80 [writing-mode:vertical-rl]">
          900 PX
        </span>
        <span data-dim className="w-px flex-1 origin-top bg-current/45" />
        <span data-mark-tick className="absolute -inset-x-[5px] bottom-0 h-px bg-current/45" />
      </div>

      <p
        data-annot
        className="absolute whitespace-nowrap font-mono text-[clamp(8px,calc(var(--k)*0.72),11px)] uppercase tracking-[0.16em] text-sky-300/80"
        style={{ left: "22%", top: "-4.5%" }}
      >
        Fig. 01 — Homepage
      </p>
    </div>
  );
}

/* ── Floating UI ───────────────────────────────────────────── */

/**
 * Outer element: positioned in the plane and moved by the scroll timeline.
 * Inner [data-arrive]: owns the entrance, so the two never fight over transforms.
 */
function Float({ name, className, z, children }: { name: string; className: string; z: number; children: ReactNode }) {
  return (
    <div data-float={name} className={cn("absolute", className)} style={{ transform: `translateZ(${z}px)` }}>
      <div data-arrive>{children}</div>
    </div>
  );
}

function EnquiryCard() {
  return (
    <div className="relative rounded-[clamp(12px,calc(var(--k)*1.4),20px)] border border-white/12 bg-ink-900/95 shadow-[0_30px_60px_-20px_rgb(0_0_0/0.7)]" style={{ padding: k(1.25) }}>
      <span data-enquiry-glow className="pointer-events-none absolute -inset-px rounded-[inherit] border border-cyan-400/70 opacity-0 shadow-[0_0_30px_-6px_rgb(24_196_252/0.6)]" />
      <div className="flex items-center" style={{ gap: k(1.1) }}>
        <span className="relative grid shrink-0 place-items-center rounded-full bg-cyan-400/15 text-cyan-400" style={{ width: k(3.4), height: k(3.4) }}>
          <svg viewBox="0 0 20 20" className="size-1/2" fill="none" aria-hidden="true">
            <path d="M3 5.5h14v9H3zM3.5 6l6.5 5 6.5-5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
          <span className="absolute -right-px -top-px size-[26%] rounded-full bg-cyan-400 ring-2 ring-ink-900" />
          <span data-enquiry-ping className="absolute -right-px -top-px size-[26%] rounded-full bg-cyan-400 opacity-0" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-mono uppercase tracking-[0.14em] text-sky-300" style={{ fontSize: `clamp(8px, ${k(0.8)}, 11px)` }}>
            New enquiry · just now
          </p>
          <p className="mt-0.5 grid overflow-hidden font-semibold text-white" style={{ fontSize: `clamp(11px, ${k(1.3)}, 18px)` }}>
            {enquiries.map((message, i) => (
              <span key={message} data-enquiry-msg className={cn("truncate [grid-area:1/1]", i > 0 && "opacity-0")}>
                {message}
              </span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
}

function PerformanceCard() {
  return (
    <div className="rounded-[clamp(12px,calc(var(--k)*1.4),20px)] border border-white/12 bg-ink-900/95 shadow-[0_30px_60px_-20px_rgb(0_0_0/0.7)]" style={{ padding: k(1.25) }}>
      <div className="flex items-center" style={{ gap: k(1) }}>
        <svg viewBox="0 0 40 40" className="shrink-0 -rotate-90" style={{ width: k(3.8), height: k(3.8) }} aria-hidden="true">
          <circle cx="20" cy="20" r="16" fill="none" stroke="rgb(255 255 255 / .12)" strokeWidth="4" />
          <circle data-perf-ring cx="20" cy="20" r="16" fill="none" stroke="#34d399" strokeWidth="4" strokeLinecap="round" pathLength="100" strokeDasharray="98 100" />
        </svg>
        <div>
          <p data-perf-num className="font-extrabold leading-none tracking-tight text-white tabular-nums" style={{ fontSize: `clamp(16px, ${k(1.9)}, 26px)` }}>
            98
          </p>
          <p className="mt-1 font-mono uppercase tracking-[0.12em] text-steel-300" style={{ fontSize: `clamp(7px, ${k(0.72)}, 10px)` }}>
            Performance
          </p>
        </div>
      </div>
      <div
        className="grid grid-cols-2 gap-1 border-t border-white/10 font-mono uppercase tracking-[0.1em]"
        style={{ marginTop: k(1), paddingTop: k(0.8), fontSize: `clamp(7px, ${k(0.72)}, 10px)` }}
      >
        <span className="text-steel-300">SEO</span>
        <span className="text-right text-mint-400">100</span>
        <span className="text-steel-300">Mobile</span>
        <span className="text-right text-mint-400">100</span>
      </div>
    </div>
  );
}

function DeviceLabel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      data-present
      className={cn("absolute flex items-center gap-3 whitespace-nowrap font-mono uppercase tracking-[0.16em] text-sky-300 opacity-0", className)}
      style={{ fontSize: `clamp(8px, ${k(0.8)}, 11px)` }}
    >
      <span className="size-1.5 rounded-full bg-cyan-400" aria-hidden="true" />
      {children}
    </p>
  );
}

function Cursor() {
  return (
    <div data-cursor-track aria-hidden="true" className="pointer-events-none absolute inset-0">
      <svg data-cursor viewBox="0 0 20 24" className="absolute left-0 top-0 w-[1.7cqw] -translate-x-[12%] -translate-y-[6%] opacity-0 drop-shadow-[0_2px_4px_rgb(0_0_0/0.35)]">
        <path d="M2 2v17.5l4.8-4.6 3.1 7.1 3-1.3-3-7h6.6Z" fill="#fff" stroke="#2f2a26" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

/**
 * The hero's 3D scene: a website blueprint that renders into a finished homepage,
 * then (on desktop scroll) splits into desktop, phone and live UI cards.
 * Markup only; every animation lives in HeroShell.
 */
export function HeroStage() {
  return (
    <div
      data-stage
      role="img"
      aria-label="A website blueprint that renders into a finished homepage for an interior design studio, shown on desktop and mobile with a new enquiry arriving"
      className="hero-stage pointer-events-none"
    >
      <div data-tilt className="hero-tilt">
        <div data-plane className="hero-plane">
          <Drafting />

          <div data-frame-shadow className="absolute inset-0 rounded-[1.2%/1.9%] shadow-[0_50px_120px_-30px_rgb(0_0_0/0.85),0_0_0_1px_rgb(255_255_255/0.08)]" />
          <div data-frame className="absolute inset-0 overflow-hidden rounded-[1.2%/1.9%] [container-type:inline-size] [isolation:isolate]">
            {/* The finished site is painted from the start (so its photo counts for LCP straight away),
                hidden under an opaque drafting sheet that the scan line wipes off. */}
            <SiteRender />
            <div data-sheet className="invisible absolute inset-0 overflow-hidden">
              <div
                data-sheet-inner
                className="absolute inset-0 bg-ink-850 bg-[linear-gradient(rgb(160_208_252/0.07)_1px,transparent_1px),linear-gradient(90deg,rgb(160_208_252/0.07)_1px,transparent_1px),linear-gradient(rgb(160_208_252/0.035)_1px,transparent_1px),linear-gradient(90deg,rgb(160_208_252/0.035)_1px,transparent_1px)] bg-size-[10cqw_10cqw,10cqw_10cqw,2cqw_2cqw,2cqw_2cqw]"
              >
                <SiteBlueprint />
                <SiteColumns />
              </div>
            </div>
            <div data-scan aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-0">
              <span className="absolute inset-x-0 bottom-full h-24 bg-linear-to-t from-cyan-400/25 to-cyan-400/0" />
              <span className="absolute inset-x-0 top-0 h-0.5 bg-[#7fdcff] shadow-[0_0_18px_4px_rgb(24_196_252/0.7)]" />
            </div>
            <Cursor />
          </div>

          {/* Presented pose only. Anchored to the frame so they frame the composition at any viewport. */}
          <p
            data-present
            className="absolute left-1/2 top-[-7.5%] -translate-x-1/2 whitespace-nowrap font-mono uppercase tracking-[0.2em] text-sky-300 opacity-0"
            style={{ fontSize: `clamp(10px, ${k(0.95)}, 13px)` }}
          >
            Fig. 02 — One design, every screen
          </p>
          <DeviceLabel className="left-0 top-[103%]">Desktop · 1440 × 900</DeviceLabel>
          <DeviceLabel className="left-[97%] top-[103%] -translate-x-1/2">Mobile · 390 × 844</DeviceLabel>

          <div data-phone className="hero-phone absolute">
            <div data-arrive className="aspect-[360/780] rounded-[15%/7%] bg-[#0b1522] p-[3.2%] shadow-[0_40px_80px_-24px_rgb(0_0_0/0.8),inset_0_0_0_1px_rgb(255_255_255/0.14)]">
              <div className="size-full overflow-hidden rounded-[12.5%/5.8%]">
                <PhoneSite />
              </div>
            </div>
          </div>

          <Float name="perf" z={150} className="hero-float-perf">
            <PerformanceCard />
          </Float>
          <Float name="enquiry" z={110} className="hero-float-enquiry">
            <EnquiryCard />
          </Float>
        </div>
      </div>
    </div>
  );
}
