"use client";

import { useRef } from "react";
import { Counter } from "@/components/ui/Counter";
import { gsap, MQ, useGSAP } from "@/lib/gsap";

type Stat = { value: number; suffix: string; label: string; source: string };

/**
 * Four research-backed stats wired together by a circuit trace that fills
 * as you scroll; each node lights up as the current reaches it.
 */
export function StatsCircuit({ stats }: { stats: Stat[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      const nodes = q("[data-node]");
      const light = (progress: number) =>
        nodes.forEach((node, i) => node.classList.toggle("is-on", progress >= i / nodes.length - 0.001));

      const mm = gsap.matchMedia();
      mm.add(
        { desktop: `${MQ.desktop} and ${MQ.motion}`, mobile: `(max-width: 1023.98px) and ${MQ.motion}`, reduce: MQ.reduce },
        (ctx) => {
          const { desktop, reduce } = ctx.conditions ?? {};
          if (reduce) {
            gsap.set(q("[data-fill]"), { scaleX: 1, scaleY: 1 });
            light(1);
            return;
          }
          gsap.fromTo(
            q("[data-fill]"),
            desktop ? { scaleX: 0, scaleY: 1 } : { scaleY: 0, scaleX: 1 },
            {
              scaleX: 1,
              scaleY: 1,
              ease: "none",
              scrollTrigger: {
                trigger: ref.current,
                start: desktop ? "top 72%" : "top 80%",
                end: desktop ? "top 30%" : "bottom 55%",
                scrub: 0.5,
                onUpdate: (self) => light(self.progress),
              },
            },
          );
        },
      );
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="relative">
      {/* Trace: track + fill (horizontal on desktop, vertical on mobile) */}
      <div aria-hidden="true" className="absolute bottom-0 left-0 top-0 w-px bg-line lg:bottom-auto lg:right-0 lg:h-px lg:w-auto">
        <div
          data-fill
          className="absolute inset-0 origin-top bg-linear-to-b from-cyan-400 to-blue-500 lg:origin-left lg:bg-linear-to-r"
        />
      </div>

      <ul className="grid gap-y-14 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <li key={stat.source} className="relative pl-8 lg:pl-0 lg:pr-8 lg:pt-12">
            <span
              data-node
              aria-hidden="true"
              className="absolute left-[-5px] top-1 size-[11px] rounded-full border border-line-strong bg-paper transition-[background-color,border-color,box-shadow] duration-500 lg:top-[-5px] [&.is-on]:border-blue-500 [&.is-on]:bg-blue-500 [&.is-on]:shadow-[0_0_0_6px_rgb(16_140_232/0.14)]"
            />
            <p className="mono-label text-steel-400" aria-hidden="true">
              0{i + 1}
            </p>
            <p className="mt-4 text-[clamp(3.25rem,2rem+3.2vw,5.25rem)] font-extrabold leading-none tracking-[-0.055em] text-ink-950">
              <Counter value={stat.value} />
              <span className="ml-1 align-top text-[0.42em] font-bold tracking-[-0.02em] text-blue-500">{stat.suffix}</span>
            </p>
            <p className="mt-5 max-w-[27ch] text-[1.0625rem] leading-relaxed text-steel-600">{stat.label}</p>
            <p className="mono-label mt-5 text-steel-400">Source: {stat.source}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
