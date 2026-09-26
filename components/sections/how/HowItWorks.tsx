import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { LineIcon } from "@/components/ui/LineIcon";
import { howItWorks } from "@/lib/content";
import { cn, withAccent } from "@/lib/utils";
import { StepsTimeline } from "./StepsTimeline";

export function HowItWorks() {
  const [build, care] = howItWorks.plans;

  return (
    <section
      id="how-it-works"
      data-theme="light"
      data-header-theme="light"
      aria-labelledby="how-title"
      className="section-y relative overflow-hidden bg-paper"
    >
      <div aria-hidden="true" className="bg-grid-light mask-fade-y pointer-events-none absolute inset-0" />

      <div className="container-x relative">
        {/* Header */}
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow index={howItWorks.index}>{howItWorks.eyebrow}</Eyebrow>
            <h2 id="how-title" data-reveal="lines" className="display-2 mt-7 text-ink-950">
              {withAccent(howItWorks.title)}
            </h2>
          </div>
          <p data-reveal="fade-up" className="lead text-steel-600 lg:col-span-5">
            {howItWorks.lead}
          </p>
        </div>

        {/* Pricing: $0 + $150/yr */}
        <div className="relative mt-16 grid gap-4 lg:mt-20 lg:grid-cols-2">
          {[build, care].map((plan, i) => {
            const dark = i === 1;
            return (
              <article
                key={plan.name}
                data-reveal="fade-up"
                data-delay={i * 0.1}
                data-theme={dark ? "dark" : "light"}
                className={cn(
                  "relative overflow-hidden rounded-[1.75rem] p-8 sm:p-10 lg:p-12",
                  dark
                    ? "bg-grid bg-ink-900 text-white shadow-[0_40px_80px_-40px_rgb(7_26_51/0.7)]"
                    : "bg-white ring-1 ring-line shadow-[0_30px_70px_-45px_rgb(8_72_124/0.35)]",
                )}
              >
                {dark && (
                  <div aria-hidden="true" className="pointer-events-none absolute -right-28 -top-28 size-80 rounded-full bg-blue-500/35 blur-3xl" />
                )}
                <div className="relative flex items-center justify-between gap-4">
                  <h3 className={cn("mono-label", dark ? "text-sky-300" : "text-blue-500")}>{plan.name}</h3>
                  <span
                    className={cn(
                      "rounded-full px-3 py-1 text-xs font-semibold",
                      dark ? "bg-cyan-400/15 text-cyan-400" : "bg-blue-500/10 text-blue-500",
                    )}
                  >
                    {dark ? "Everything included" : "No upfront cost"}
                  </span>
                </div>
                <p className="relative mt-8 flex items-baseline gap-3">
                  <span className={cn("text-[clamp(4.5rem,3rem+5vw,7.5rem)] font-extrabold leading-[0.85] tracking-[-0.06em]", dark ? "text-white" : "text-ink-950")}>
                    {plan.price}
                  </span>
                  <span className={cn("text-lg font-medium", dark ? "text-steel-300" : "text-steel-500")}>/ {plan.period}</span>
                </p>
                <p className={cn("relative mt-5", dark ? "text-steel-300" : "text-steel-600")}>{plan.note}</p>
                <ul className={cn("relative mt-8 grid gap-3 border-t pt-8 sm:grid-cols-2", dark ? "border-white/10" : "border-line")}>
                  {plan.features.map((feature) => (
                    <li key={feature} className={cn("flex items-start gap-3", dark ? "text-steel-200" : "text-steel-700")}>
                      <span
                        className={cn(
                          "mt-0.5 grid size-5 shrink-0 place-items-center rounded-full",
                          dark ? "bg-cyan-400/15 text-cyan-400" : "bg-blue-500/10 text-blue-500",
                        )}
                      >
                        <LineIcon name="check" className="size-3" />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 z-10 hidden size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-2xl font-light text-blue-500 shadow-[0_10px_30px_-10px_rgb(8_72_124/0.5)] ring-1 ring-line lg:grid"
          >
            +
          </span>
        </div>

        {/* Why it's free */}
        <div className="mt-28 grid gap-12 lg:mt-36 lg:grid-cols-12 lg:gap-8">
          <h3 data-reveal="lines" className="display-3 text-ink-950 lg:col-span-4">
            {howItWorks.reasonsTitle}
          </h3>
          <ol className="grid gap-10 sm:grid-cols-3 lg:col-span-8 lg:gap-8">
            {howItWorks.reasons.map((reason, i) => (
              <li key={reason.title} data-reveal="fade-up" data-delay={i * 0.08} className="border-t border-line-strong pt-6">
                <span className="mono-label text-blue-500">0{i + 1}</span>
                <h4 className="mt-4 text-xl font-bold tracking-[-0.02em] text-ink-950">{reason.title}</h4>
                <p className="mt-3 leading-relaxed text-steel-600">{reason.text}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* Process */}
        <div className="mt-28 lg:mt-36">
          <h3 data-reveal="lines" className="display-3 text-ink-950">
            {howItWorks.stepsTitle}
          </h3>
          <div className="mt-12 lg:mt-16">
            <StepsTimeline steps={howItWorks.steps} />
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-28 grid gap-12 lg:mt-36 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <h3 data-reveal="lines" className="display-3 text-ink-950">
              {withAccent(howItWorks.faqTitle)}
            </h3>
            <p data-reveal="fade-up" className="mt-5 max-w-[34ch] leading-relaxed text-steel-600">
              Still wondering how free really works? Here are the questions decoration businesses ask us most.
            </p>
            <div data-reveal="fade-up" className="mt-8">
              <Button href="#apply" variant="solid">
                Apply for free
              </Button>
            </div>
          </div>
          <div data-reveal="fade-up" className="lg:col-span-7 lg:col-start-6">
            <Accordion items={howItWorks.faqs} headingLevel={4} />
          </div>
        </div>
      </div>
    </section>
  );
}
