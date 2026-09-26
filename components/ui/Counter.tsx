"use client";

import { useRef } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";

/** Counts up to `value` when scrolled into view. Server-renders the final value. */
export function Counter({ value, duration = 1.8 }: { value: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      gsap.matchMedia().add(MQ.motion, () => {
        const state = { v: 0 };
        el.textContent = "0";
        gsap.to(state, {
          v: value,
          duration,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
          onUpdate: () => {
            el.textContent = String(Math.round(state.v));
          },
        });
        return () => {
          el.textContent = String(value);
        };
      });
    },
    { scope: ref },
  );

  return (
    <span ref={ref} className="tabular-nums">
      {value}
    </span>
  );
}
