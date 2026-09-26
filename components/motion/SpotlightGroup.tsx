"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { MQ } from "@/lib/gsap";

/** Feeds pointer coordinates to descendant .spotlight cards (for the glow border). */
export function SpotlightGroup({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || !window.matchMedia(MQ.finePointer).matches) return;
    const onMove = (e: PointerEvent) => {
      const card = (e.target as Element).closest<HTMLElement>(".spotlight");
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    root.addEventListener("pointermove", onMove, { passive: true });
    return () => root.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
