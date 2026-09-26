"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { setLenis } from "@/lib/lenis-store";

/**
 * Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger
 * and Lenis share a single animation frame loop.
 */
export function SmoothScroll() {
  useEffect(() => {
    // Pinned sections change the page height after hydration, so a browser-restored
    // scroll position would land in the wrong place. Start from the top (or the #hash).
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    if (!window.location.hash) window.scrollTo(0, 0);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      anchors: { offset: 0, duration: 1.4 },
      stopInertiaOnNavigate: true,
    });
    setLenis(lenis);

    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Pinned sections add their scroll distance after the browser has already jumped to
    // a #hash, so deep links land short. Re-align whenever ScrollTrigger re-measures,
    // until the visitor scrolls on their own. This scrolls natively because Lenis measures
    // elements against its own cached position, which is stale after the browser's jump.
    const target = window.location.hash && document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
    const align = () => {
      if (target) window.scrollTo(0, target.getBoundingClientRect().top + window.scrollY);
    };
    const release = () => {
      ScrollTrigger.removeEventListener("refresh", align);
      ["wheel", "touchstart", "keydown", "pointerdown"].forEach((type) => window.removeEventListener(type, release));
    };
    let settle = 0;
    if (target) {
      ScrollTrigger.addEventListener("refresh", align);
      ["wheel", "touchstart", "keydown", "pointerdown"].forEach((type) => window.addEventListener(type, release, { passive: true }));
      requestAnimationFrame(align);
      settle = window.setTimeout(release, 6000);
    }

    return () => {
      release();
      window.clearTimeout(settle);
      gsap.ticker.remove(raf);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}
