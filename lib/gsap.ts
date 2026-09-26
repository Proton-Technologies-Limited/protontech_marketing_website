"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin, useGSAP);
  // Brand motion constants: decisive entrances, calm on-screen motion.
  gsap.defaults({ ease: "expo.out", duration: 0.9 });
  ScrollTrigger.config({ ignoreMobileResize: true });
}

/** Media query strings shared by every animated component. */
export const MQ = {
  motion: "(prefers-reduced-motion: no-preference)",
  reduce: "(prefers-reduced-motion: reduce)",
  desktop: "(min-width: 1024px)",
  finePointer: "(hover: hover) and (pointer: fine)",
} as const;

export { gsap, ScrollTrigger, SplitText, DrawSVGPlugin, useGSAP };
