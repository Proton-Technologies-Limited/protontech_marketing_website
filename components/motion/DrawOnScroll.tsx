"use client";

import { useRef, type ReactNode } from "react";
import { gsap, MQ, ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * Draws every [data-draw] stroke inside it when it scrolls into view, and fades
 * in [data-draw-label] text. The drawing plays once on a timeline rather than
 * being scrubbed: large SVGs repainting on every scroll frame cause jank.
 * Decorative: hidden from assistive tech.
 */
export function DrawOnScroll({
  children,
  className,
  start = "top 85%",
  duration = 2.6,
}: {
  children: ReactNode;
  className?: string;
  start?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MQ.motion, () => {
        const q = gsap.utils.selector(ref);
        const strokes = q("[data-draw]");
        const labels = q("[data-draw-label]");
        const tl = gsap.timeline({ paused: true, defaults: { ease: "power2.inOut" } });
        if (strokes.length) tl.from(strokes, { drawSVG: 0, duration: duration * 0.55, stagger: { amount: duration * 0.45 } }, 0);
        if (labels.length) tl.from(labels, { opacity: 0, duration: 0.6, stagger: 0.15, ease: "power1.out" }, duration * 0.5);
        ScrollTrigger.create({ trigger: ref.current, start, once: true, onEnter: () => tl.play() });
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className} aria-hidden="true">
      {children}
    </div>
  );
}
