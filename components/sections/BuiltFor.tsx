"use client";

import { useRef } from "react";
import { builtFor } from "@/lib/content";
import { gsap, MQ, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

function NodeSeparator() {
  return (
    <svg viewBox="0 0 40 12" className="h-3 w-10 shrink-0 text-cyan-400" aria-hidden="true">
      <path d="M0 6h14M26 6h14" stroke="currentColor" strokeOpacity=".4" />
      <circle cx="20" cy="6" r="3.5" fill="currentColor" />
    </svg>
  );
}

/** Infinite ticker of the industries we serve. Scrolling speeds it up. */
export function BuiltFor() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MQ.motion, () => {
        const track = ref.current?.querySelector("[data-track]");
        if (!track) return;
        const loop = gsap.to(track, { xPercent: -50, duration: 46, ease: "none", repeat: -1 });

        let boost = 0;
        let speed = 1;
        const tick = () => {
          boost *= 0.93;
          speed += (1 + boost - speed) * 0.12;
          loop.timeScale(speed);
        };

        ScrollTrigger.create({
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => {
            if (self.isActive) {
              loop.resume();
              gsap.ticker.add(tick);
            } else {
              loop.pause();
              gsap.ticker.remove(tick);
            }
          },
          onUpdate: (self) => {
            boost = Math.min(Math.abs(self.getVelocity()) / 260, 7);
          },
        });

        return () => gsap.ticker.remove(tick);
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      aria-label="Businesses we build for"
      data-theme="dark"
      data-header-theme="dark"
      className="relative overflow-hidden border-y border-white/10 bg-ink-950 py-7 sm:py-9"
    >
      <div className="flex items-center">
        <p className="mono-label hidden shrink-0 items-center gap-3 pl-[var(--gutter)] pr-8 text-sky-300 md:flex">
          <span className="size-1.5 rounded-full bg-cyan-400" aria-hidden="true" />
          Built for
        </p>
        {/* Edge fades are overlays, not a mask: masking a moving layer recomposites every frame. */}
        <div className="relative min-w-0 flex-1 overflow-hidden">
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-ink-950 to-ink-950/0 sm:w-28" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-ink-950 to-ink-950/0 sm:w-28" />
          <div data-track className="flex w-max will-change-transform">
            {[0, 1].map((copy) => (
              <ul key={copy} aria-hidden={copy === 1 ? true : undefined} className="flex shrink-0 items-center">
                {builtFor.map((item, i) => (
                  <li key={item} className="flex items-center">
                    <span
                      className={cn(
                        "whitespace-nowrap px-6 text-[clamp(1.5rem,1rem+2.2vw,2.75rem)] font-extrabold tracking-[-0.035em] sm:px-8",
                        i % 2 ? "text-sky-300" : "text-white",
                      )}
                    >
                      {item}
                    </span>
                    <NodeSeparator />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
