import { FloorPlan } from "@/components/art/FloorPlan";
import { DrawOnScroll } from "@/components/motion/DrawOnScroll";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { LineIcon, type IconName } from "@/components/ui/LineIcon";
import { why, whyPhoto } from "@/lib/content";
import { withAccent } from "@/lib/utils";
import { ScrubStatement } from "./ScrubStatement";
import { StatsCircuit } from "./StatsCircuit";

export function WhyItMatters() {
  return (
    <section
      id="why"
      data-theme="light"
      data-header-theme="light"
      aria-labelledby="why-title"
      className="section-y relative overflow-hidden bg-paper"
    >
      <div aria-hidden="true" className="bg-grid-light mask-fade-y pointer-events-none absolute inset-0" />
      <DrawOnScroll
        className="pointer-events-none absolute -right-24 top-24 hidden w-[44rem] text-navy-700/25 xl:block"
        start="top 90%"
        end="center 40%"
      >
        <FloorPlan className="h-auto w-full" />
      </DrawOnScroll>

      <div className="container-x relative">
        <div className="max-w-[58rem]">
          <Eyebrow index={why.index}>{why.eyebrow}</Eyebrow>
          <h2 id="why-title" data-reveal="lines" className="display-2 mt-7 text-ink-950">
            {withAccent(why.title)}
          </h2>
        </div>

        <div className="mt-16 grid items-end gap-14 lg:mt-24 lg:grid-cols-12 lg:gap-8">
          <ScrubStatement
            text={why.statement}
            className="text-[clamp(1.5rem,1rem+1.45vw,2.45rem)] font-semibold leading-[1.28] tracking-[-0.028em] text-ink-900 lg:col-span-7"
          />
          <figure data-reveal="fade-up" className="lg:col-span-4 lg:col-start-9">
            <ParallaxImage
              name={whyPhoto}
              sizes="(min-width: 1024px) 30vw, 90vw"
              className="aspect-[4/5] rounded-t-full rounded-b-[1.75rem] bg-paper-2"
            />
            <figcaption className="mt-5 flex gap-4 text-sm leading-relaxed text-steel-600">
              <span className="mono-label shrink-0 pt-0.5 text-blue-500">Fig. 02</span>
              {why.photoCaption}
            </figcaption>
          </figure>
        </div>

        <div className="mt-24 lg:mt-36">
          <StatsCircuit stats={why.stats} />
        </div>

        <ul className="mt-24 grid gap-5 md:grid-cols-3 lg:mt-32">
          {why.pillars.map((pillar, i) => (
            <li
              key={pillar.title}
              data-reveal="fade-up"
              data-delay={i * 0.08}
              className="crop-marks group relative rounded-[1.25rem] bg-white/70 p-8 ring-1 ring-line backdrop-blur-sm transition-shadow duration-500 hover:shadow-[0_24px_60px_-30px_rgb(8_72_124/0.35)] lg:p-10"
            >
              <span className="grid size-12 place-items-center rounded-2xl bg-blue-500/8 text-blue-500 ring-1 ring-blue-500/15 transition-colors duration-500 group-hover:bg-blue-500 group-hover:text-white">
                <LineIcon name={pillar.icon as IconName} />
              </span>
              <h3 className="mt-8 text-xl font-bold tracking-[-0.02em] text-ink-950">{pillar.title}</h3>
              <p className="mt-3 leading-relaxed text-steel-600">{pillar.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
