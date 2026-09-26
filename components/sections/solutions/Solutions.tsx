import type { ReactNode } from "react";
import { CircuitBackdrop } from "@/components/art/CircuitBackdrop";
import { DrawOnScroll } from "@/components/motion/DrawOnScroll";
import { SpotlightGroup } from "@/components/motion/SpotlightGroup";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { solutions, type SolutionKey } from "@/lib/content";
import { cn, withAccent } from "@/lib/utils";
import { DesignVisual, MobileVisual, SpeedVisual } from "./VisualsA";
import { CustomVisual, SecurityVisual, SeoVisual } from "./VisualsB";

const visuals: Record<SolutionKey, ReactNode> = {
  design: <DesignVisual />,
  mobile: <MobileVisual />,
  speed: <SpeedVisual />,
  seo: <SeoVisual />,
  custom: <CustomVisual />,
  security: <SecurityVisual />,
};

const layout: Record<SolutionKey, string> = {
  design: "lg:col-span-7 lg:row-span-2",
  mobile: "lg:col-span-5",
  speed: "lg:col-span-5",
  seo: "lg:col-span-4",
  custom: "lg:col-span-4",
  security: "lg:col-span-4",
};

export function Solutions() {
  return (
    <section
      id="solutions"
      data-theme="dark"
      data-header-theme="dark"
      aria-labelledby="solutions-title"
      className="section-y grain relative overflow-hidden bg-ink-950"
    >
      <div aria-hidden="true" className="bg-grid mask-fade-y pointer-events-none absolute inset-0 opacity-70" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_40%_at_85%_10%,rgb(16_140_232/0.18),transparent_70%),radial-gradient(45%_35%_at_10%_90%,rgb(24_196_252/0.1),transparent_70%)]"
      />
      <DrawOnScroll className="pointer-events-none absolute inset-0 text-cyan-400/25" start="top 60%" duration={3.2}>
        <CircuitBackdrop className="size-full" />
      </DrawOnScroll>

      <div className="container-x relative">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow index={solutions.index}>{solutions.eyebrow}</Eyebrow>
            <h2 id="solutions-title" data-reveal="lines" className="display-2 mt-7 text-white">
              {withAccent(solutions.title)}
            </h2>
          </div>
          <p data-reveal="fade-up" className="lead text-steel-300 lg:col-span-4 lg:col-start-9">
            {solutions.lead}
          </p>
        </div>

        <SpotlightGroup className="mt-16 grid gap-4 lg:mt-20 lg:grid-cols-12">
          {solutions.items.map((item, i) => {
            const large = item.key === "design";
            return (
              <article
                key={item.key}
                data-reveal="fade-up"
                data-delay={(i % 3) * 0.06}
                className={cn(
                  "spotlight group flex flex-col rounded-[1.75rem] border border-white/10 bg-ink-900/80 p-2",
                  layout[item.key],
                )}
              >
                <div
                  className={cn(
                    "relative overflow-hidden rounded-[1.3rem] bg-ink-850/60 ring-1 ring-white/[0.06] [contain:layout_paint]",
                    large ? "min-h-[22rem] flex-1 lg:min-h-[30rem]" : "h-[17rem]",
                  )}
                >
                  {visuals[item.key]}
                </div>
                <div className={cn("px-5 pb-5 pt-6 lg:px-6", large && "lg:px-8 lg:pb-7")}>
                  <div className="flex items-baseline gap-3">
                    <span className="mono-label text-sky-300">0{i + 1}</span>
                    <h3 className={cn("font-bold tracking-[-0.02em] text-white", large ? "text-2xl lg:text-[1.75rem]" : "text-xl")}>
                      {item.title}
                    </h3>
                  </div>
                  <p className={cn("mt-3 leading-relaxed text-steel-300", large && "lg:max-w-[46ch] lg:text-[1.0625rem]")}>
                    {item.text}
                  </p>
                </div>
              </article>
            );
          })}
        </SpotlightGroup>

        <div data-reveal="fade-up" className="mt-14 flex flex-col gap-5 border-t border-white/10 pt-10 lg:flex-row lg:items-center lg:gap-10">
          <p className="mono-label shrink-0 text-sky-300">Also included</p>
          <ul className="flex flex-wrap gap-2.5">
            {solutions.capabilities.map((cap) => (
              <li
                key={cap}
                className="rounded-full border border-white/12 px-4 py-2 text-sm text-steel-200 transition-colors duration-300 hover:border-cyan-400/60 hover:text-white"
              >
                {cap}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
