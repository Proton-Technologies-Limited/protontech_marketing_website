"use client";

import { useRef, type ReactNode } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";

/**
 * Desktop (motion allowed): pins the gallery and converts vertical scroll into
 * horizontal travel. Otherwise: a native, snap-scrolling carousel.
 * Also measures how far each concept site can scroll inside its frame (--dist).
 */
export function ExamplesGallery({ children, count }: { children: ReactNode; count: number }) {
  const root = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const scroller = q("[data-scroller]")[0] as HTMLElement;
      const track = q("[data-track]")[0] as HTMLElement;
      const fill = q("[data-progress]")[0];

      const measure = () =>
        q("[data-card]").forEach((card) => {
          const viewport = card.querySelector<HTMLElement>("[data-site-viewport]");
          const site = card.querySelector<HTMLElement>("[data-site-scroll]");
          if (viewport && site) {
            (card as HTMLElement).style.setProperty("--dist", `${Math.min(0, viewport.offsetHeight - site.offsetHeight)}px`);
          }
        });
      measure();
      const ro = new ResizeObserver(measure);
      ro.observe(track);

      const setProgress = (p: number) => {
        gsap.set(fill, { scaleX: p });
        if (counter.current) counter.current.textContent = String(Math.min(count, Math.floor(p * count) + 1)).padStart(2, "0");
      };

      // Touch devices: tap a frame to run its preview.
      const onClick = (e: MouseEvent) => {
        const frame = (e.target as Element).closest("[data-frame]");
        if (frame && window.matchMedia("(hover: none)").matches) frame.closest("[data-card]")?.classList.toggle("is-previewing");
      };
      root.current?.addEventListener("click", onClick);

      const mm = gsap.matchMedia();
      mm.add(`${MQ.desktop} and ${MQ.motion}`, () => {
        const distance = () => Math.max(0, track.scrollWidth - scroller.clientWidth);
        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: q("[data-pin]")[0],
            start: "center center",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            onUpdate: (self) => setProgress(self.progress),
          },
        });
      });

      mm.add(`(max-width: 1023.98px), ${MQ.reduce}`, () => {
        const onScroll = () => setProgress(scroller.scrollLeft / Math.max(1, scroller.scrollWidth - scroller.clientWidth));
        onScroll();
        scroller.addEventListener("scroll", onScroll, { passive: true });
        return () => scroller.removeEventListener("scroll", onScroll);
      });

      return () => {
        ro.disconnect();
        root.current?.removeEventListener("click", onClick);
      };
    },
    { scope: root },
  );

  return (
    <div ref={root} className="relative">
      <div data-pin className="relative py-[clamp(3rem,6vw,5rem)]">
        <div data-scroller className="no-scrollbar snap-x snap-mandatory overflow-x-auto">
          <div data-track className="flex w-max items-stretch gap-[clamp(1.25rem,3vw,3rem)] px-[var(--gutter)] will-change-transform">
            {children}
          </div>
        </div>
        <div className="container-x mt-10 flex items-center gap-6">
          <p className="mono-label shrink-0 text-ink-950" aria-hidden="true">
            <span ref={counter}>01</span>
            <span className="text-steel-400"> / {String(count).padStart(2, "0")}</span>
          </p>
          <div className="relative h-px flex-1 bg-line-strong" aria-hidden="true">
            <div data-progress className="absolute inset-0 origin-left scale-x-0 bg-blue-500" />
          </div>
          <p className="mono-label hidden shrink-0 text-steel-500 sm:block">
            <span className="lg:hidden">Swipe to explore</span>
            <span className="hidden lg:inline">Scroll to explore</span>
          </p>
        </div>
      </div>
    </div>
  );
}
