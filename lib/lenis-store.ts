import type Lenis from "lenis";

let instance: Lenis | null = null;

export const setLenis = (lenis: Lenis | null) => {
  instance = lenis;
};

export const getLenis = () => instance;

/** Smooth-scroll to a target, falling back to native scrolling when Lenis is off (reduced motion). */
export function scrollToTarget(target: string | number | HTMLElement, offset = 0) {
  const lenis = instance;
  if (lenis) {
    lenis.scrollTo(target, { offset, duration: 1.4 });
    return;
  }
  if (typeof target === "number") {
    window.scrollTo({ top: target });
    return;
  }
  const el = typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;
  el?.scrollIntoView({ block: "start" });
}
