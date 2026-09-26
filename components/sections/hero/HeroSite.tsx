import type { CSSProperties } from "react";
import { Photo } from "@/components/ui/Photo";
import { heroPhoto } from "@/lib/content";

/*
 * The concept homepage shown in the hero, drawn twice from one coordinate system:
 * as a blueprint (SVG) and as the finished site (HTML). Both use a 1200 × 750 unit
 * frame, so every wireframe line sits where the real element renders.
 * HTML units are container-query widths of the frame: 1 unit = 1/12 cqw.
 */

const INK = "#2f2a26";
const MUTED = "#6b6358";
const ACCENT = "#a47e5c";
const BP = "#50ccfc";

const u = (n: number) => `${Number((n / 12).toFixed(4))}cqw`;

function at(x: number, y: number, w?: number, h?: number): CSSProperties {
  return { left: u(x), top: u(y), width: w === undefined ? undefined : u(w), height: h === undefined ? undefined : u(h) };
}

const text = (size: number, lineHeight = size): CSSProperties => ({ fontSize: u(size), lineHeight: u(lineHeight) });

const projects = [
  { photo: "nordStove", title: "Birch Cottage", meta: "Living room · 2024", y: 168 },
  { photo: "archLiving", title: "Arc Apartment", meta: "Full home · 2024", y: 432 },
  { photo: "nordBedroom", title: "The Linen House", meta: "Bedroom · 2025", y: 696 },
] as const;

const stats = [
  { x: 56, value: "240+", label: "Homes designed" },
  { x: 186, value: "12", label: "Years in practice" },
  { x: 316, value: "4.9", label: "Client rating" },
];

/* ── Blueprint ─────────────────────────────────────────────── */

/**
 * Text placeholder: a bar through the middle of a line of type. Thick bars use butt caps,
 * because a round cap shows as a dot before DrawSVG has drawn any length.
 */
function Bar({ x, y, w, t, o = 0.3 }: { x: number; y: number; w: number; t: number; o?: number }) {
  const round = t < 6;
  const inset = round ? t / 2 : 0;
  return (
    <path
      data-bp="ui"
      d={`M${x + inset} ${y}h${Math.max(0, w - inset * 2)}`}
      strokeWidth={t}
      strokeOpacity={o}
      strokeLinecap={round ? "round" : "butt"}
    />
  );
}

function ImageBox({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  return (
    <>
      <rect data-bp="ui" x={x} y={y} width={w} height={h} rx="8" strokeOpacity=".7" />
      <path data-bp="ui" d={`M${x} ${y}L${x + w} ${y + h}M${x + w} ${y}L${x} ${y + h}`} strokeOpacity=".22" />
    </>
  );
}

export function SiteBlueprint() {
  return (
    <svg
      viewBox="0 0 1200 750"
      className="absolute inset-0 size-full"
      fill="none"
      stroke={BP}
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <defs>
        <clipPath id="hs-arch">
          <path d="M468 750V276a152 152 0 0 1 304 0v474Z" />
        </clipPath>
      </defs>

      {/* Browser chrome */}
      <rect data-bp="frame" x=".75" y=".75" width="1198.5" height="748.5" rx="14" strokeOpacity=".95" />
      <path data-bp="frame" d="M1 40h1198" strokeOpacity=".6" />
      <circle data-bp="frame" cx="22" cy="20" r="5" strokeOpacity=".6" />
      <circle data-bp="frame" cx="38" cy="20" r="5" strokeOpacity=".6" />
      <circle data-bp="frame" cx="54" cy="20" r="5" strokeOpacity=".6" />
      <rect data-bp="frame" x="440" y="10" width="320" height="20" rx="10" strokeOpacity=".6" />
      <path data-bp="frame" d="M1 104h1198" strokeOpacity=".4" />

      {/* Navigation */}
      <Bar x={56} y={72} w={136} t={11} o={0.45} />
      <Bar x={520} y={72} w={52} t={3} o={0.45} />
      <Bar x={592} y={72} w={40} t={3} o={0.45} />
      <Bar x={652} y={72} w={54} t={3} o={0.45} />
      <Bar x={726} y={72} w={48} t={3} o={0.45} />
      <rect data-bp="ui" x="1036" y="57" width="108" height="30" rx="15" strokeOpacity=".8" />

      {/* Hero copy */}
      <Bar x={56} y={147} w={252} t={2.5} o={0.5} />
      <Bar x={56} y={202} w={378} t={26} o={0.26} />
      <Bar x={56} y={262} w={296} t={26} o={0.26} />
      <Bar x={56} y={322} w={344} t={26} o={0.26} />
      <Bar x={56} y={383} w={350} t={3} o={0.4} />
      <Bar x={56} y={405} w={268} t={3} o={0.4} />
      <rect data-bp="ui" x="56" y="434" width="196" height="44" rx="22" strokeOpacity=".85" />
      <path data-bp="ui" d="M220 456h12m-5-5 5 5-5 5" strokeOpacity=".85" />
      <Bar x={276} y={456} w={88} t={3} o={0.45} />
      <path data-bp="ui" d="M276 468h88" strokeOpacity=".5" />

      {/* Stats */}
      <path data-bp="ui" d="M56 540h384" strokeOpacity=".45" />
      {stats.map((s) => (
        <g key={s.x}>
          <Bar x={s.x} y={571} w={s.value.length * 15 + 8} t={14} o={0.28} />
          <Bar x={s.x} y={598} w={s.label.length * 7.2} t={2} o={0.45} />
        </g>
      ))}

      {/* Selected work */}
      <Bar x={820} y={147} w={116} t={2.5} o={0.5} />
      <Bar x={1066} y={147} w={78} t={3} o={0.45} />
      {projects.map((p) => (
        <g key={p.title}>
          <ImageBox x={820} y={p.y} w={324} h={196} />
          <Bar x={820} y={p.y + 219} w={p.title.length * 9.4} t={14} o={0.28} />
          <Bar x={820} y={p.y + 241} w={p.meta.length * 5.6} t={2} o={0.45} />
        </g>
      ))}

      {/* Arch, construction lines and interior elevation */}
      <path data-bp="ui" d="M468 750V276a152 152 0 0 1 304 0v474" strokeOpacity=".95" />
      <path data-bp="art" d="M452 276h336M620 112v164" strokeOpacity=".3" />
      <path data-bp="art" d="M620 276 727.5 168.5" strokeOpacity=".45" />
      <g clipPath="url(#hs-arch)" strokeOpacity=".85">
        <path data-bp="art" d="M468 640h304" />
        <path
          data-bp="art"
          d="M484 648l-10 10M506 648l-10 10M528 648l-10 10M550 648l-10 10M572 648l-10 10M594 648l-10 10M616 648l-10 10M638 648l-10 10M660 648l-10 10M682 648l-10 10M704 648l-10 10M726 648l-10 10M748 648l-10 10M770 648l-10 10"
          strokeOpacity=".35"
        />
        {/* Pendant */}
        <path data-bp="art" d="M620 124v112" />
        <path data-bp="art" d="M598 236h44l12 26h-68Z" />
        <circle data-bp="art" cx="620" cy="270" r="4" />
        {/* Framed print */}
        <rect data-bp="art" x="566" y="318" width="108" height="76" />
        <rect data-bp="art" x="574" y="326" width="92" height="60" strokeOpacity=".45" />
        <path data-bp="art" d="M582 378q20-28 40 0q12-12 24 0" />
        <circle data-bp="art" cx="650" cy="344" r="6" />
        {/* Daybed */}
        <rect data-bp="art" x="534" y="470" width="172" height="44" rx="14" />
        <rect data-bp="art" x="522" y="508" width="196" height="54" rx="12" />
        <rect data-bp="art" x="510" y="492" width="28" height="70" rx="12" />
        <rect data-bp="art" x="702" y="492" width="28" height="70" rx="12" />
        <path data-bp="art" d="M524 562v14M716 562v14" />
        <rect data-bp="art" x="548" y="478" width="44" height="32" rx="9" transform="rotate(-8 570 494)" />
        <rect data-bp="art" x="648" y="478" width="44" height="32" rx="9" transform="rotate(8 670 494)" />
        <path data-bp="art" d="M612 512q12 24 4 50" strokeOpacity=".55" />
        {/* Plant */}
        <path data-bp="art" d="M476 600h28l-4 40h-20Z" />
        <path data-bp="art" d="M490 600c-7-15-14-28-17-48 11 8 19 25 17 48Z" />
        <path data-bp="art" d="M490 600c3-21 9-34 20-47-2 19-9 34-20 47Z" />
        <path data-bp="art" d="M490 600c-3-14-3-31 2-60 5 26 3 45-2 60Z" />
        {/* Floor lamp */}
        <path data-bp="art" d="M752 640V446M742 640h20" />
        <path data-bp="art" d="M738 446h28l-6-30h-16Z" />
      </g>

      {/* Annotations */}
      <g data-bp-label fill={BP} fillOpacity=".75" stroke="none" style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 9.5, letterSpacing: "0.14em" }}>
        <text x="446" y="206">H1 · SERIF 60/60</text>
        <text x="262" y="428">CTA · 196×44</text>
        <text x="676" y="200">R152</text>
        <text x="484" y="730">A-01 · ARCH ELEVATION</text>
        <text x="1136" y="356" textAnchor="end">IMG · 3:2</text>
        <text x="1144" y="124" textAnchor="end">GRID · 12 COL</text>
      </g>
    </svg>
  );
}

/** The layout grid that flashes in while the page is being drafted. */
export function SiteColumns() {
  return (
    <div aria-hidden="true" className="absolute inset-x-[4.667%] bottom-0 flex gap-[1.333%]" style={{ top: u(104) }}>
      {Array.from({ length: 12 }, (_, i) => (
        <span key={i} data-col className="h-full flex-1 origin-top border-x border-cyan-400/15 bg-cyan-400/[0.035] opacity-0" />
      ))}
    </div>
  );
}

/* ── Rendered site ─────────────────────────────────────────── */

function Arrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SiteRender() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#f4efe8]" style={{ color: INK }}>
      {/* Browser chrome */}
      <div className="absolute inset-x-0 top-0 border-b border-[#d9d2c7] bg-[#ebe6de]" style={{ height: u(40) }}>
        {["#ff5f57", "#febc2e", "#28c840"].map((c, i) => (
          <span key={c} className="absolute rounded-full" style={{ ...at(17 + i * 16, 15, 10, 10), background: c }} />
        ))}
        <span
          className="absolute flex items-center justify-center gap-[0.4cqw] rounded-full bg-[#f8f5f0] font-mono"
          style={{ ...at(440, 10, 320, 20), ...text(10.5, 20), color: MUTED }}
        >
          <svg viewBox="0 0 12 12" className="w-[0.8cqw]" aria-hidden="true">
            <path d="M3.5 5V3.8a2.5 2.5 0 0 1 5 0V5M2.8 5h6.4v4.6H2.8z" fill="none" stroke="currentColor" strokeWidth="1.1" />
          </svg>
          ateliernord.com
        </span>
      </div>

      {/* Navigation */}
      <p className="absolute font-serif tracking-[-0.01em]" style={{ ...at(56, 60), ...text(24) }}>
        Atelier Nord
      </p>
      {[
        ["Projects", 520],
        ["Studio", 592],
        ["Services", 652],
        ["Journal", 726],
      ].map(([label, x]) => (
        <p key={label} className="absolute font-medium" style={{ ...at(Number(x), 64), ...text(12.5, 16), color: MUTED }}>
          {label}
        </p>
      ))}
      <p
        className="absolute flex items-center justify-center gap-[0.5cqw] rounded-full font-semibold text-white"
        style={{ ...at(1036, 57, 108, 30), ...text(11.5, 30), background: INK }}
      >
        Enquire
      </p>
      <span className="absolute inset-x-0 h-px bg-[#2f2a26]/10" style={{ top: u(104) }} />

      {/* Hero copy */}
      <p className="absolute font-mono uppercase tracking-[0.24em]" style={{ ...at(56, 140), ...text(9.5, 14), color: ACCENT }}>
        Interior design studio · Est. 2014
      </p>
      <p className="absolute whitespace-nowrap font-serif tracking-[-0.02em]" style={{ ...at(54, 168), ...text(60) }}>
        Calm, <em>considered</em>
        <br />
        interiors for
        <br />
        modern living.
      </p>
      <p className="absolute" style={{ ...at(56, 372, 360), ...text(14, 22), color: MUTED }}>
        We design warm, timeless homes that feel as good as they look, from first sketch to final cushion.
      </p>
      <span
        data-site-cta
        className="absolute flex items-center justify-between rounded-full font-semibold text-white"
        style={{ ...at(56, 434, 196, 44), ...text(12.5, 44), paddingInline: `${u(20)} ${u(6)}`, background: INK }}
      >
        Book a consultation
        <span className="grid place-items-center rounded-full bg-white/15" style={{ width: u(32), height: u(32) }}>
          <Arrow className="w-[1.1cqw]" />
        </span>
        <span
          data-site-ripple
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 -ml-[6cqw] -mt-[6cqw] size-[12cqw] rounded-full border-2 border-[#2f2a26]/40 opacity-0"
        />
      </span>
      <p className="absolute border-b border-[#2f2a26]/40 font-semibold" style={{ ...at(276, 448), ...text(12.5, 16), paddingBottom: u(3) }}>
        View projects
      </p>

      {/* Stats */}
      <span className="absolute h-px bg-[#2f2a26]/12" style={{ ...at(56, 540, 384) }} />
      {stats.map((s) => (
        <div key={s.x} className="absolute" style={at(s.x, 556)}>
          <p className="font-serif" style={text(30)}>
            {s.value}
          </p>
          <p className="font-mono uppercase tracking-[0.18em]" style={{ ...text(8.5, 12), marginTop: u(10), color: MUTED }}>
            {s.label}
          </p>
        </div>
      ))}

      {/* Arch photo */}
      <div className="absolute overflow-hidden rounded-t-full" style={at(468, 124, 304, 640)}>
        <Photo
          name={heroPhoto}
          alt=""
          fill
          loading="eager"
          sizes="(min-width: 1024px) 21vw, (min-width: 640px) 28vw, 33vw"
          className="object-cover"
        />
      </div>
      <p
        className="absolute rounded-full bg-white/92 font-semibold"
        style={{ ...at(484, 690), ...text(10.5, 24), paddingInline: u(12) }}
      >
        The Alcove House · 2025
      </p>

      {/* Selected work */}
      <p className="absolute font-mono uppercase tracking-[0.24em]" style={{ ...at(820, 140), ...text(9.5, 14), color: ACCENT }}>
        Selected work
      </p>
      <p className="absolute flex items-center gap-[0.4cqw] font-semibold" style={{ ...at(1066, 139, 78), ...text(11.5, 16), justifyContent: "flex-end" }}>
        All projects <Arrow className="w-[0.9cqw]" />
      </p>
      {projects.map((p) => (
        <div key={p.title} className="absolute" style={at(820, p.y, 324)}>
          <div className="relative overflow-hidden rounded-[0.67cqw]" style={{ height: u(196) }}>
            <Photo name={p.photo} alt="" fill sizes="(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 35vw" className="object-cover" />
          </div>
          <p className="font-serif" style={{ ...text(20, 22), marginTop: u(12) }}>
            {p.title}
          </p>
          <p style={{ ...text(10.5, 14), marginTop: u(6), color: MUTED }}>{p.meta}</p>
        </div>
      ))}
    </div>
  );
}

/* ── Phone ─────────────────────────────────────────────────── */

/** Phone screen units: 360 × 780, as container-query widths of the screen. */
const p = (n: number) => `${Number((n / 3.6).toFixed(4))}cqw`;

export function PhoneSite() {
  return (
    <div className="relative size-full overflow-hidden bg-[#f4efe8] [container-type:inline-size]" style={{ color: INK }}>
      {/* Status bar */}
      <p className="absolute font-semibold" style={{ left: p(30), top: p(19), fontSize: p(13), lineHeight: p(16) }}>
        9:41
      </p>
      <span className="absolute rounded-full bg-black" style={{ left: p(130), top: p(14), width: p(100), height: p(28) }} />
      <span className="absolute flex items-end" style={{ left: p(272), top: p(22), gap: p(2.5) }} aria-hidden="true">
        {[5, 7.5, 10, 12.5].map((h) => (
          <span key={h} className="rounded-[1px] bg-current" style={{ width: p(3), height: p(h) }} />
        ))}
      </span>
      <span
        className="absolute rounded-[3px] border border-current/40 p-px"
        style={{ left: p(300), top: p(22), width: p(26), height: p(12.5) }}
        aria-hidden="true"
      >
        <span className="block h-full w-[78%] rounded-[1.5px] bg-current" />
      </span>

      {/* Navigation */}
      <p className="absolute font-serif tracking-[-0.01em]" style={{ left: p(24), top: p(62), fontSize: p(21), lineHeight: p(22) }}>
        Atelier Nord
      </p>
      <span className="absolute flex flex-col" style={{ left: p(312), top: p(66), gap: p(7), width: p(24) }} aria-hidden="true">
        <span className="h-px bg-current" />
        <span className="h-px bg-current" />
      </span>

      {/* Hero */}
      <div className="absolute overflow-hidden rounded-t-full" style={{ left: p(24), top: p(104), width: p(312), height: p(330) }}>
        <Photo
          name={heroPhoto}
          alt=""
          fill
          loading="eager"
          sizes="(min-width: 1024px) 15vw, (min-width: 640px) 20vw, 29vw"
          className="object-cover"
        />
      </div>
      <p
        className="absolute font-mono uppercase tracking-[0.22em]"
        style={{ left: p(24), top: p(456), fontSize: p(8.5), lineHeight: p(12), color: ACCENT }}
      >
        Interior design studio
      </p>
      <p className="absolute whitespace-nowrap font-serif tracking-[-0.02em]" style={{ left: p(22), top: p(478), fontSize: p(35), lineHeight: p(35) }}>
        Calm, <em>considered</em>
        <br />
        interiors for
        <br />
        modern living.
      </p>
      <p className="absolute" style={{ left: p(24), top: p(594), width: p(300), fontSize: p(12.5), lineHeight: p(19), color: MUTED }}>
        Warm, timeless homes that feel as good as they look.
      </p>
      <p
        className="absolute flex items-center justify-between rounded-full font-semibold text-white"
        style={{ left: p(24), top: p(652), width: p(312), height: p(48), fontSize: p(13), paddingInline: `${p(22)} ${p(8)}`, background: INK }}
      >
        Book a consultation
        <span className="grid place-items-center rounded-full bg-white/15" style={{ width: p(34), height: p(34) }}>
          <Arrow className="w-[4cqw]" />
        </span>
      </p>
      <span className="absolute rounded-full bg-current/30" style={{ left: p(126), top: p(762), width: p(108), height: p(4) }} />
    </div>
  );
}
