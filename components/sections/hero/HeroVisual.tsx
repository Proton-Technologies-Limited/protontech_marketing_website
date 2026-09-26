"use client";

import { useRef, useState } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { photos, photoUrl } from "@/lib/images";
import { cn } from "@/lib/utils";

type Mode = "blueprint" | "live";

const SERIF = "var(--font-instrument), Georgia, serif";
const SANS = "var(--font-jakarta), system-ui, sans-serif";
const MONO = "var(--font-geist-mono), monospace";
const INK = "#2f2a26";
const MUTED = "#7a7066";

/** Line styles for the blueprint layer */
const bp = {
  stroke: "#50CCFC",
  fill: "none",
  strokeWidth: 1.25,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/**
 * Hero centrepiece: a website + interior drawn as a blueprint that then
 * "renders" into a finished concept site. Visitors can flip between the two.
 */
export function HeroVisual({ className }: { className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const renderTl = useRef<gsap.core.Timeline | null>(null);
  const [mode, setMode] = useState<Mode>("blueprint");

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const cards = q("[data-card]");
      gsap.set(cards[0], { z: 70 });
      gsap.set(cards[1], { z: 110 });

      const render = gsap
        .timeline({
          paused: true,
          defaults: { ease: "power2.inOut" },
          onComplete: () => setMode("live"),
          onReverseComplete: () => setMode("blueprint"),
        })
        .fromTo(q("[data-render-clip]"), { attr: { height: 0 } }, { attr: { height: 482 }, duration: 1.35 }, 0)
        .fromTo(
          q("[data-scan]"),
          { attr: { y: 60 }, opacity: 1 },
          { attr: { y: 536 }, duration: 1.35, immediateRender: false },
          0,
        )
        .to(q("[data-scan]"), { opacity: 0, duration: 0.25 }, 1.25)
        .to(q("[data-bp-content]"), { opacity: 0, duration: 0.7 }, 0.5)
        .fromTo(cards, { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.16, ease: "expo.out" }, 1.1);
      renderTl.current = render;

      const mm = gsap.matchMedia();

      mm.add(MQ.reduce, () => {
        render.progress(1);
      });

      mm.add(MQ.motion, () => {
        gsap
          .timeline({ delay: 0.5, defaults: { ease: "power2.inOut" } })
          .from(q("[data-annot] [data-line]"), { drawSVG: 0, duration: 1.1, stagger: 0.06 }, 0)
          .from(q("[data-annot] text, [data-label]"), { opacity: 0, duration: 0.6, stagger: 0.05, ease: "power1.out" }, 0.7)
          .from(q("[data-bp='frame']"), { drawSVG: 0, duration: 1.3, stagger: 0.05 }, 0.1)
          .from(q("[data-bp='ui']"), { drawSVG: 0, duration: 0.9, stagger: 0.022 }, 0.55)
          .from(q("[data-bp='interior']"), { drawSVG: 0, duration: 1.1, stagger: 0.022 }, 0.75)
          .from(q("[data-bp='trace']"), { drawSVG: 0, duration: 0.9, stagger: 0.12 }, 1.2)
          .from(q("[data-node]"), { scale: 0, transformOrigin: "50% 50%", duration: 0.6, stagger: 0.1, ease: "expo.out" }, 1.8)
          .from(q("[data-toggle]"), { opacity: 0, y: -6, duration: 0.6, ease: "expo.out" }, 1.9)
          .add(() => render.play(), 2.45);

        // Scroll: the visual drifts up and away as the hero leaves.
        gsap.to(q("[data-scroll-fx]"), {
          yPercent: -9,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top 35%", end: "bottom top", scrub: true },
        });

        // Pointer: subtle 3D tilt with cards floating at different depths.
        if (!window.matchMedia(MQ.finePointer).matches) return;
        const tilt = q("[data-tilt]")[0];
        const rotX = gsap.quickTo(tilt, "rotationX", { duration: 1.2, ease: "power3" });
        const rotY = gsap.quickTo(tilt, "rotationY", { duration: 1.2, ease: "power3" });
        const onMove = (e: PointerEvent) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          rotY(nx * 9);
          rotX(-ny * 6);
        };
        window.addEventListener("pointermove", onMove, { passive: true });
        return () => window.removeEventListener("pointermove", onMove);
      });

      root.current?.classList.add("is-ready");
    },
    { scope: root },
  );

  // Only plays/reverses the existing timeline, so it doesn't need contextSafe.
  const switchTo = (next: Mode) => {
    const tl = renderTl.current;
    if (!tl) return;
    if (next === "live") tl.play();
    else tl.reverse();
    setMode(next);
  };

  const photo = photos.archNook;

  return (
    <div ref={root} className={cn("hero-visual relative [container-type:inline-size]", className)}>
      <div data-scroll-fx className="[perspective:1600px]">
        <div data-tilt className="relative [transform-style:preserve-3d]">
          <svg viewBox="0 0 800 620" className="h-auto w-full overflow-visible" role="img" aria-labelledby="hero-visual-title">
            <title id="hero-visual-title">
              Blueprint of a decoration company website that renders into a finished homepage with an arched interior photo
            </title>
            <defs>
              <clipPath id="hv-frame">
                <rect x="40" y="60" width="720" height="480" rx="14" />
              </clipPath>
              <clipPath id="hv-arch">
                <path d="M420 520V300a150 150 0 0 1 300 0v220Z" />
              </clipPath>
              <clipPath id="hv-render">
                <rect data-render-clip x="40" y="58" width="720" height="482" />
              </clipPath>
              <clipPath id="hv-thumb">
                <rect width="44" height="44" rx="8" />
              </clipPath>
              <linearGradient id="hv-scan" x1="0" x2="1">
                <stop offset="0" stopColor="#18C4FC" stopOpacity="0" />
                <stop offset=".5" stopColor="#7FDCFF" />
                <stop offset="1" stopColor="#18C4FC" stopOpacity="0" />
              </linearGradient>
              <filter id="hv-glow" x="-20%" y="-400%" width="140%" height="900%">
                <feGaussianBlur stdDeviation="4" />
              </filter>
            </defs>

            {/* Annotations: dimension lines & labels */}
            <g data-annot stroke="#A0D0FC" strokeOpacity=".45" strokeWidth="1" fill="none">
              <path data-line d="M40 36h330M430 36h330" />
              <path data-line d="M40 29v14M760 29v14" />
              <path data-line d="M16 60v212M16 328v212" />
              <path data-line d="M9 60h14M9 540h14" />
              <g fill="#A0D0FC" fillOpacity=".7" stroke="none" style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.12em" }}>
                <text x="400" y="39.5" textAnchor="middle">
                  1440 PX
                </text>
                <text x="19" y="300" textAnchor="middle" transform="rotate(-90 16 300)">
                  900 PX
                </text>
                <text x="40" y="575">
                  FIG. 01 — HOMEPAGE / HERO
                </text>
                <text x="760" y="575" textAnchor="end">
                  SCALE 1:1
                </text>
              </g>
            </g>

            {/* Circuit traces from the Proton mark */}
            <g {...bp} stroke="#18C4FC" strokeOpacity=".75">
              <path data-bp="trace" d="M150 540v38a10 10 0 0 0 10 10h120" />
              <path data-bp="trace" d="M600 540v48" />
              <path data-bp="trace" d="M760 230h16a10 10 0 0 1 10 10v84" />
            </g>
            <g fill="#18C4FC">
              <circle data-node cx="284" cy="588" r="4.5" />
              <circle data-node cx="600" cy="592" r="4.5" />
              <circle data-node cx="786" cy="328" r="4.5" />
            </g>

            {/* Blueprint layer */}
            <g {...bp}>
              <rect data-bp="frame" x="40" y="60" width="720" height="480" rx="14" strokeOpacity=".95" />
              <path data-bp="frame" d="M40 96h720" strokeOpacity=".6" />
              <g data-bp-content>
                <circle data-bp="frame" cx="64" cy="78" r="4.5" strokeOpacity=".6" />
                <circle data-bp="frame" cx="82" cy="78" r="4.5" strokeOpacity=".6" />
                <circle data-bp="frame" cx="100" cy="78" r="4.5" strokeOpacity=".6" />
                <rect data-bp="frame" x="290" y="68" width="220" height="20" rx="10" strokeOpacity=".6" />

                {/* Website wireframe */}
                <g strokeOpacity=".7">
                  <circle data-bp="ui" cx="78" cy="126" r="7" />
                  <path data-bp="ui" d="M92 126h56" strokeWidth="5" strokeOpacity=".45" />
                  <path data-bp="ui" d="M430 126h36M484 126h36M538 126h40M596 126h34" strokeWidth="3" strokeOpacity=".45" />
                  <rect data-bp="ui" x="652" y="114" width="80" height="24" rx="12" />
                  <path data-bp="ui" d="M76 182h100" strokeWidth="2.5" strokeOpacity=".5" />
                  <path data-bp="ui" d="M76 212h254" strokeWidth="15" strokeOpacity=".3" />
                  <path data-bp="ui" d="M76 244h214" strokeWidth="15" strokeOpacity=".3" />
                  <path data-bp="ui" d="M76 276h242" strokeWidth="15" strokeOpacity=".3" />
                  <path data-bp="ui" d="M76 308h254M76 324h214" strokeWidth="3" strokeOpacity=".4" />
                  <rect data-bp="ui" x="76" y="350" width="138" height="38" rx="19" />
                  <path data-bp="ui" d="M188 369h12m-5-5 5 5-5 5" />
                  <path data-bp="ui" d="M234 369h66" strokeWidth="2.5" strokeOpacity=".5" />
                  <path data-bp="ui" d="M76 424h92" strokeWidth="2" strokeOpacity=".45" />
                  <rect data-bp="ui" x="76" y="438" width="44" height="44" rx="8" />
                  <rect data-bp="ui" x="128" y="438" width="44" height="44" rx="8" />
                  <rect data-bp="ui" x="180" y="438" width="44" height="44" rx="8" />
                </g>

                {/* Arch + interior elevation */}
                <path data-bp="ui" d="M420 520V300a150 150 0 0 1 300 0v220Z" strokeOpacity=".9" />
                <g clipPath="url(#hv-arch)" strokeOpacity=".85">
                  <path data-bp="interior" d="M420 468h300" />
                  <path data-bp="interior" d="M432 476l-8 8M452 476l-8 8M472 476l-8 8M492 476l-8 8M512 476l-8 8M532 476l-8 8M552 476l-8 8M572 476l-8 8M592 476l-8 8M612 476l-8 8M632 476l-8 8M652 476l-8 8M672 476l-8 8M692 476l-8 8M712 476l-8 8" strokeOpacity=".35" />
                  <path data-bp="interior" d="M570 150v88" />
                  <path data-bp="interior" d="M552 238h36l12 24h-60Z" />
                  <circle data-bp="interior" cx="570" cy="269" r="4" />
                  <rect data-bp="interior" x="530" y="288" width="80" height="58" />
                  <rect data-bp="interior" x="538" y="296" width="64" height="42" strokeOpacity=".5" />
                  <path data-bp="interior" d="M546 332q24-30 48 0" />
                  <circle data-bp="interior" cx="585" cy="308" r="5" />
                  <rect data-bp="interior" x="498" y="380" width="156" height="34" rx="12" />
                  <rect data-bp="interior" x="486" y="408" width="180" height="38" rx="10" />
                  <rect data-bp="interior" x="472" y="396" width="28" height="50" rx="10" />
                  <rect data-bp="interior" x="652" y="396" width="28" height="50" rx="10" />
                  <path data-bp="interior" d="M490 446v12M662 446v12M576 412v30" />
                  <rect data-bp="interior" x="512" y="386" width="36" height="28" rx="8" transform="rotate(-8 530 400)" />
                  <rect data-bp="interior" x="604" y="386" width="36" height="28" rx="8" transform="rotate(8 622 400)" />
                  <path data-bp="interior" d="M432 438h34l-5 30h-24Z" />
                  <path data-bp="interior" d="M449 438c-9-18-18-34-24-56 14 8 25 28 24 56Z" />
                  <path data-bp="interior" d="M449 438c3-24 11-40 24-56-2 22-11 39-24 56Z" />
                  <path data-bp="interior" d="M449 438c-4-15-4-35 2-72 7 31 4 54-2 72Z" />
                  <path data-bp="interior" d="M690 432h26M694 432l-2 36M712 432l2 36" />
                  <path data-bp="interior" d="M698 432c-3-10 0-19 5-23 5 4 8 13 5 23Z" />
                  <path data-bp="interior" d="M703 409v-15m0 6c4-3 7-4 10-4" />
                </g>
                <text data-label x="430" y="512" fill="#A0D0FC" fillOpacity=".7" stroke="none" style={{ fontFamily: MONO, fontSize: 9, letterSpacing: "0.12em" }}>
                  A-01 · ARCH R150
                </text>
              </g>
            </g>

            {/* Rendered website layer (revealed by a scan-line wipe) */}
            <g clipPath="url(#hv-render)">
              <g clipPath="url(#hv-frame)">
                <rect x="40" y="60" width="720" height="480" fill="#f5f1ea" />
                <rect x="40" y="60" width="720" height="36" fill="#ebe6de" />
                <path d="M40 96h720" stroke="#d9d2c7" />
                <circle cx="64" cy="78" r="4.5" fill="#ff5f57" />
                <circle cx="82" cy="78" r="4.5" fill="#febc2e" />
                <circle cx="100" cy="78" r="4.5" fill="#28c840" />
                <rect x="290" y="68" width="220" height="20" rx="10" fill="#f8f5f0" />
                <text x="400" y="81.5" textAnchor="middle" fill={MUTED} style={{ fontFamily: MONO, fontSize: 10 }}>
                  ateliernord.com
                </text>

                <text x="72" y="132" fill={INK} style={{ fontFamily: SERIF, fontSize: 19 }}>
                  Atelier Nord
                </text>
                <g fill="#5b544c" style={{ fontFamily: SANS, fontSize: 10.5, fontWeight: 500 }}>
                  <text x="428" y="130">Projects</text>
                  <text x="484" y="130">Studio</text>
                  <text x="534" y="130">Journal</text>
                  <text x="592" y="130">Contact</text>
                </g>
                <rect x="652" y="114" width="80" height="24" rx="12" fill={INK} />
                <text x="692" y="129.5" textAnchor="middle" fill="#fff" style={{ fontFamily: SANS, fontSize: 10, fontWeight: 600 }}>
                  Book a visit
                </text>

                <text x="76" y="185" fill="#9a8f82" style={{ fontFamily: MONO, fontSize: 8.5, letterSpacing: "0.18em" }}>
                  INTERIOR DESIGN STUDIO
                </text>
                <g fill={INK} style={{ fontFamily: SERIF, fontSize: 37, letterSpacing: "-0.01em" }}>
                  <text x="74" y="222">
                    Calm, <tspan fontStyle="italic">considered</tspan>
                  </text>
                  <text x="74" y="256">interiors for</text>
                  <text x="74" y="290">modern living.</text>
                </g>
                <g fill={MUTED} style={{ fontFamily: SANS, fontSize: 11.5 }}>
                  <text x="76" y="314">We design warm, timeless homes that</text>
                  <text x="76" y="330">feel as good as they look.</text>
                </g>
                <rect x="76" y="350" width="138" height="38" rx="19" fill={INK} />
                <text x="130" y="373" textAnchor="middle" fill="#fff" style={{ fontFamily: SANS, fontSize: 11, fontWeight: 600 }}>
                  View our work
                </text>
                <path d="M184 369h12m-5-5 5 5-5 5" stroke="#fff" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                <text x="234" y="373" fill={INK} style={{ fontFamily: SANS, fontSize: 11, fontWeight: 600 }}>
                  Our process
                </text>
                <path d="M234 378h64" stroke={INK} strokeOpacity=".4" />

                <text x="76" y="428" fill="#9a8f82" style={{ fontFamily: MONO, fontSize: 8, letterSpacing: "0.18em" }}>
                  RECENT PROJECTS
                </text>
                {(["nordBedroom", "nordStove", "lumiereLounge"] as const).map((key, i) => (
                  <g key={key} transform={`translate(${76 + i * 52} 438)`}>
                    <image
                      href={photoUrl(photos[key], 120)}
                      width="44"
                      height="44"
                      preserveAspectRatio="xMidYMid slice"
                      clipPath="url(#hv-thumb)"
                    />
                  </g>
                ))}

                <image
                  href={photoUrl(photo, 720)}
                  x="420"
                  y="150"
                  width="300"
                  height="370"
                  preserveAspectRatio="xMidYMid slice"
                  clipPath="url(#hv-arch)"
                />
                <rect x="434" y="486" width="112" height="22" rx="11" fill="#fff" fillOpacity=".92" />
                <text x="490" y="500.5" textAnchor="middle" fill={INK} style={{ fontFamily: SANS, fontSize: 9.5, fontWeight: 600 }}>
                  The Linen House
                </text>
              </g>
            </g>

            {/* Scan line (glow + core) */}
            <rect data-scan x="40" y="60" width="720" height="6" fill="url(#hv-scan)" opacity="0" filter="url(#hv-glow)" />
            <rect data-scan x="40" y="60" width="720" height="1.5" fill="url(#hv-scan)" opacity="0" />
          </svg>

          {/* Blueprint / Live toggle, set into the browser toolbar */}
          <div
            data-toggle
            role="group"
            aria-label="Preview mode"
            className="absolute right-[6.5%] top-[12.6%] hidden -translate-y-1/2 items-center sm:flex rounded-full border border-white/15 bg-ink-950/70 p-[3px] font-mono text-[clamp(8px,1.2cqw,10.5px)] uppercase tracking-[0.12em] backdrop-blur"
          >
            {(["blueprint", "live"] as const).map((m) => (
              <button
                key={m}
                type="button"
                aria-pressed={mode === m}
                onClick={() => switchTo(m)}
                className={cn(
                  "rounded-full px-[1.2cqw] py-[0.45cqw] transition-colors duration-300",
                  mode === m ? "bg-cyan-400 text-ink-950" : "text-steel-300 hover:text-white",
                )}
              >
                {m === "live" ? "Live" : "Blueprint"}
              </button>
            ))}
          </div>

          {/* Floating UI cards */}
          <div
            data-card
            className="absolute left-[0%] top-[66%] w-[52%] sm:left-[-7%] sm:top-[63%] sm:w-[44%] rounded-[clamp(12px,2cqw,18px)] border border-white/12 bg-ink-900/80 p-[clamp(10px,2cqw,16px)] shadow-[0_30px_60px_-20px_rgb(0_0_0/0.7)] backdrop-blur-xl"
          >
            <div className="flex items-center gap-[clamp(8px,1.8cqw,14px)]">
              <span className="grid size-[clamp(28px,5.4cqw,42px)] shrink-0 place-items-center rounded-full bg-cyan-400/15 text-cyan-400">
                <svg viewBox="0 0 20 20" className="size-1/2" fill="none" aria-hidden="true">
                  <path d="M3 5.5h14v9H3zM3.5 6l6.5 5 6.5-5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
              </span>
              <div className="min-w-0">
                <p className="font-mono text-[clamp(8px,1.25cqw,10px)] uppercase tracking-[0.14em] text-sky-300">
                  New enquiry · just now
                </p>
                <p className="mt-0.5 truncate text-[clamp(11px,1.9cqw,15px)] font-semibold text-white">
                  Kitchen renovation, 4-bed home
                </p>
              </div>
            </div>
          </div>

          <div
            data-card
            className="absolute right-[0%] top-[34%] w-[30%] sm:right-[-1.5%] sm:top-[36%] sm:w-[25%] rounded-[clamp(12px,2cqw,18px)] border border-white/12 bg-ink-900/80 p-[clamp(10px,2cqw,16px)] shadow-[0_30px_60px_-20px_rgb(0_0_0/0.7)] backdrop-blur-xl"
          >
            <div className="flex items-center gap-[clamp(8px,1.6cqw,12px)]">
              <svg viewBox="0 0 40 40" className="size-[clamp(30px,6cqw,46px)] shrink-0 -rotate-90" aria-hidden="true">
                <circle cx="20" cy="20" r="16" fill="none" stroke="rgb(255 255 255 / .12)" strokeWidth="4" />
                <circle cx="20" cy="20" r="16" fill="none" stroke="#34d399" strokeWidth="4" strokeLinecap="round" pathLength="100" strokeDasharray="98 100" />
              </svg>
              <div>
                <p className="text-[clamp(14px,2.8cqw,22px)] font-extrabold leading-none tracking-tight text-white">98</p>
                <p className="mt-1 font-mono text-[clamp(7px,1.15cqw,9.5px)] uppercase tracking-[0.12em] text-steel-300">Performance</p>
              </div>
            </div>
            <div className="mt-[clamp(8px,1.6cqw,12px)] grid grid-cols-2 gap-1 border-t border-white/10 pt-[clamp(6px,1.2cqw,10px)] font-mono text-[clamp(7px,1.15cqw,9.5px)] uppercase tracking-[0.1em]">
              <span className="text-steel-300">SEO</span>
              <span className="text-right text-mint-400">100</span>
              <span className="text-steel-300">Mobile</span>
              <span className="text-right text-mint-400">100</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
