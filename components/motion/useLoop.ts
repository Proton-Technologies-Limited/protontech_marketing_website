"use client";

import type { RefObject } from "react";
import { gsap, MQ, ScrollTrigger, useGSAP } from "@/lib/gsap";

type Build = (tl: gsap.core.Timeline, q: (selector: string) => Element[]) => void;

/**
 * Builds a looping timeline that only runs while its element is on screen.
 * With reduced motion, the timeline is parked on a representative frame instead.
 */
export function useLoop<T extends HTMLElement>(scope: RefObject<T | null>, build: Build, staticProgress = 1) {
  useGSAP(
    () => {
      const q = gsap.utils.selector(scope);
      const mm = gsap.matchMedia();

      mm.add(MQ.motion, () => {
        const tl = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 0.4 });
        build(tl, q);
        ScrollTrigger.create({
          trigger: scope.current,
          start: "top 92%",
          end: "bottom 8%",
          onToggle: (self) => (self.isActive ? tl.play() : tl.pause()),
        });
      });

      mm.add(MQ.reduce, () => {
        const tl = gsap.timeline({ paused: true });
        build(tl, q);
        tl.progress(staticProgress);
      });
    },
    { scope },
  );
}
