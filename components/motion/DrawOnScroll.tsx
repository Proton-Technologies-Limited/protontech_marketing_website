"use client";

import { useRef, type ReactNode } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";

/**
 * Draws every [data-draw] stroke inside it as the user scrolls through,
 * and fades in [data-draw-label] text. Decorative: hidden from assistive tech.
 */
export function DrawOnScroll({
  children,
  className,
  start = "top 85%",
  end = "bottom 40%",
  scrub = 1,
}: {
  children: ReactNode;
  className?: string;
  start?: string;
  end?: string;
  scrub?: number | boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MQ.motion, () => {
        const q = gsap.utils.selector(ref);
        const scrollTrigger = { trigger: ref.current, start, end, scrub };
        const strokes = q("[data-draw]");
        const labels = q("[data-draw-label]");
        if (strokes.length) gsap.from(strokes, { drawSVG: 0, ease: "none", stagger: 0.035, scrollTrigger });
        if (labels.length) gsap.from(labels, { opacity: 0, ease: "none", stagger: 0.2, scrollTrigger });
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
