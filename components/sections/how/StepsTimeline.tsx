"use client";

import { useRef } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";

type Step = { title: string; text: string };

/** Process steps on a circuit line that fills with scroll; each node switches on as it's reached. */
export function StepsTimeline({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      const nodes = q("[data-step]");
      const light = (p: number) =>
        nodes.forEach((node, i) => node.classList.toggle("is-on", p >= i / (nodes.length - 1) - 0.02));

      gsap.matchMedia().add(
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
            desktop ? { scaleX: 0, scaleY: 1 } : { scaleX: 1, scaleY: 0 },
            {
              scaleX: 1,
              scaleY: 1,
              ease: "none",
              scrollTrigger: {
                trigger: ref.current,
                start: desktop ? "top 75%" : "top 70%",
                end: desktop ? "bottom 55%" : "bottom 60%",
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
      {/* The track runs through node centres: vertical on mobile, horizontal on desktop */}
      <div aria-hidden="true" className="absolute bottom-6 left-6 top-6 w-px bg-line-strong lg:bottom-auto lg:left-6 lg:right-[calc(20%-2.7rem)] lg:top-6 lg:h-px lg:w-auto">
        <span data-fill className="absolute inset-0 origin-top bg-linear-to-b from-cyan-400 to-blue-500 lg:origin-left lg:bg-linear-to-r" />
      </div>
      <ol className="relative grid gap-10 lg:grid-cols-5 lg:gap-6">
      {steps.map((step, i) => (
        <li key={step.title} className="relative grid grid-cols-[3rem_1fr] gap-5 lg:block">
          <span
            data-step
            className="relative z-10 grid size-12 place-items-center rounded-full border border-line-strong bg-paper font-mono text-[0.8rem] font-medium text-steel-500 transition-[background-color,color,border-color,box-shadow] duration-500 [&.is-on]:border-blue-500 [&.is-on]:bg-blue-500 [&.is-on]:text-white [&.is-on]:shadow-[0_0_0_8px_rgb(16_140_232/0.12)]"
          >
            0{i + 1}
          </span>
          <div className="lg:mt-8 lg:pr-4">
            <h4 className="text-xl font-bold tracking-[-0.02em] text-ink-950">{step.title}</h4>
            <p className="mt-3 leading-relaxed text-steel-600">{step.text}</p>
          </div>
        </li>
      ))}
      </ol>
    </div>
  );
}
