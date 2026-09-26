import { MarkOutline } from "@/components/art/MarkOutline";
import { DrawOnScroll } from "@/components/motion/DrawOnScroll";
import { EyebrowPill } from "@/components/ui/Eyebrow";
import { apply } from "@/lib/content";
import { withAccent } from "@/lib/utils";
import { ApplyForm } from "./ApplyForm";

export function ApplyCta() {
  return (
    <section
      id="apply"
      data-theme="dark"
      data-header-theme="dark"
      aria-labelledby="apply-title"
      className="relative bg-ink-950 p-[clamp(0.5rem,1.5vw,1.25rem)]"
    >
      <div className="grain relative overflow-hidden rounded-[clamp(1.5rem,3vw,2.75rem)] bg-[linear-gradient(140deg,#0b5a99_0%,#08487c_38%,#071a33_100%)]">
        <div aria-hidden="true" className="bg-grid mask-radial pointer-events-none absolute inset-0 opacity-70" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_50%_at_15%_10%,rgb(24_196_252/0.35),transparent_70%),radial-gradient(40%_45%_at_95%_100%,rgb(16_140_232/0.35),transparent_70%)]"
        />
        <DrawOnScroll
          className="pointer-events-none absolute -left-[12%] top-1/2 w-[min(58rem,90vw)] -translate-y-1/2 text-cyan-400/25 lg:-left-[6%]"
          start="top 80%"
          end="center 45%"
        >
          <MarkOutline className="h-auto w-full" />
        </DrawOnScroll>

        <div className="container-x relative grid gap-14 py-[clamp(4.5rem,9vw,8.5rem)] lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <EyebrowPill detail="for decoration businesses">{apply.eyebrow}</EyebrowPill>
            <h2 id="apply-title" data-reveal="lines" className="display-2 mt-7 text-white">
              {withAccent(apply.title)}
            </h2>
            <p data-reveal="fade-up" className="lead mt-7 max-w-[36rem] text-ice-100/80">
              {apply.lead}
            </p>
            <ol className="mt-12 space-y-0">
              {apply.steps.map((step, i) => (
                <li key={step} data-reveal="fade-up" data-delay={0.1 + i * 0.08} className="relative flex items-center gap-5 pb-7 last:pb-0">
                  {i < apply.steps.length - 1 && (
                    <span aria-hidden="true" className="absolute left-5 top-10 h-[calc(100%-2.5rem)] w-px border-l border-dashed border-sky-300/40" />
                  )}
                  <span className="grid size-10 shrink-0 place-items-center rounded-full border border-sky-300/40 bg-white/5 font-mono text-xs text-sky-300">
                    0{i + 1}
                  </span>
                  <span className="text-lg font-semibold text-white">{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <div data-reveal="fade-up" className="lg:col-span-6 lg:col-start-7 lg:self-center">
            <ApplyForm />
          </div>
        </div>
      </div>
    </section>
  );
}
