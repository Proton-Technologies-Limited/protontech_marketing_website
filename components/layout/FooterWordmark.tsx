"use client";

import { useRef } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { scrollToTarget } from "@/lib/lenis-store";

/** Giant outlined wordmark whose letters rise into place as the footer arrives. */
export function FooterWordmark() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MQ.motion, () => {
        gsap.from(gsap.utils.selector(ref)("[data-letter]"), {
          yPercent: 70,
          opacity: 0,
          stagger: 0.06,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom bottom", scrub: 0.6 },
        });
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none select-none overflow-hidden">
      <p className="flex justify-between px-[var(--gutter)] text-[clamp(5rem,21.5vw,22rem)] font-extrabold leading-[0.78] tracking-[-0.06em]">
        {"PROTON".split("").map((letter, i) => (
          <span
            key={i}
            data-letter
            className="inline-block bg-linear-to-b from-sky-300/30 via-blue-500/12 to-blue-500/0 bg-clip-text pb-[0.04em] text-transparent"
          >
            {letter}
          </span>
        ))}
      </p>
    </div>
  );
}

export function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => scrollToTarget(0)}
      className="group inline-flex items-center gap-3 text-sm font-semibold text-steel-300 transition-colors hover:text-white"
    >
      Back to top
      <span className="grid size-9 place-items-center rounded-full border border-white/15 transition-colors duration-300 group-hover:border-cyan-400 group-hover:text-cyan-400">
        <svg viewBox="0 0 16 16" className="size-3.5 transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5" fill="none" aria-hidden="true">
          <path d="M8 13V3M3.5 7.5 8 3l4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </button>
  );
}
