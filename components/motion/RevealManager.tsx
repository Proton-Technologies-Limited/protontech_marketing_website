"use client";

import { gsap, MQ, ScrollTrigger, SplitText, useGSAP } from "@/lib/gsap";

/**
 * One global controller for declarative scroll reveals, so section markup
 * can stay in Server Components and opt in with data attributes:
 *
 *  data-reveal="fade-up" | "fade" | "scale" | "lines"   (optional data-delay="0.2")
 *  data-eyebrow                                          (trace draws in)
 */
export function RevealManager() {
  useGSAP(() => {
    const html = document.documentElement;
    const mm = gsap.matchMedia();

    mm.add(MQ.motion, () => {
      const delayOf = (el: Element) => Number((el as HTMLElement).dataset.delay ?? 0);

      const batch = (selector: string, to: gsap.TweenVars) =>
        ScrollTrigger.batch(selector, {
          start: "top 88%",
          once: true,
          onEnter: (els) =>
            els.forEach((el, i) =>
              gsap.to(el, { ...to, delay: delayOf(el) + i * 0.08, overwrite: true }),
            ),
        });

      batch('[data-reveal="fade-up"]', { opacity: 1, y: 0, duration: 1.1 });
      batch('[data-reveal="fade"]', { opacity: 1, duration: 1.2, ease: "power2.out" });
      batch('[data-reveal="scale"]', { opacity: 1, scale: 1, duration: 1.2 });

      ScrollTrigger.batch("[data-eyebrow]", {
        start: "top 92%",
        once: true,
        onEnter: (els) => els.forEach((el) => el.classList.add("is-in")),
      });

      const played = new WeakSet<Element>();
      gsap.utils.toArray<HTMLElement>('[data-reveal="lines"]').forEach((el) => {
        SplitText.create(el, {
          type: "lines",
          mask: "lines",
          linesClass: "split-line",
          autoSplit: true,
          onSplit(self) {
            gsap.set(el, { visibility: "visible" });
            if (played.has(el)) return;
            return gsap.from(self.lines, {
              yPercent: 115,
              rotate: 1.2,
              transformOrigin: "0% 100%",
              duration: 1.25,
              stagger: 0.09,
              delay: delayOf(el),
              scrollTrigger: {
                trigger: el,
                start: "top 88%",
                once: true,
                onEnter: () => played.add(el),
              },
            });
          },
        });
      });
    });

    mm.add(MQ.reduce, () => {
      document.querySelectorAll("[data-eyebrow]").forEach((el) => el.classList.add("is-in"));
    });

    html.classList.add("reveal-ready");
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
  });

  return null;
}
