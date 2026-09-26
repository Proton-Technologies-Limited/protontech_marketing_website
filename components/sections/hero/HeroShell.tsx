"use client";

import { useRef, type ReactNode } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";

/** Hero <section> with scroll-out parallax: copy lifts and fades, background sinks. */
export function HeroShell({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MQ.motion, () => {
        const q = gsap.utils.selector(ref);
        const scrub = { trigger: ref.current, start: "top top", end: "bottom top", scrub: true };
        q("[data-hero-copy]").forEach((el, i) => {
          gsap.to(el, { y: -110 + i * 45, opacity: 0.15, ease: "none", scrollTrigger: scrub });
        });
        gsap.to(q("[data-hero-bg]"), { yPercent: 16, ease: "none", scrollTrigger: scrub });
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      id="top"
      data-theme="dark"
      data-header-theme="dark"
      aria-labelledby="hero-title"
      className="grain relative isolate min-h-[100svh] overflow-hidden bg-ink-950"
    >
      {children}
    </section>
  );
}
