"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, MQ } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/** Pulls its child gently toward the pointer (fine pointers only). */
export function Magnetic({ children, strength = 0.28, className }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia(`${MQ.finePointer} and ${MQ.motion}`).matches) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" });
    let cx = 0;
    let cy = 0;

    const onEnter = () => {
      const r = el.getBoundingClientRect();
      cx = r.left + r.width / 2 - Number(gsap.getProperty(el, "x"));
      cy = r.top + r.height / 2 - Number(gsap.getProperty(el, "y"));
    };
    const onMove = (e: PointerEvent) => {
      xTo((e.clientX - cx) * strength);
      yTo((e.clientY - cy) * strength);
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      gsap.killTweensOf(el);
    };
  }, [strength]);

  return (
    <div ref={ref} className={cn("inline-block", className)}>
      {children}
    </div>
  );
}
