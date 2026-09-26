import { conceptSites } from "@/components/examples/ConceptSites";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { LogoMark } from "@/components/ui/Logo";
import { examples } from "@/lib/content";
import { withAccent } from "@/lib/utils";
import { ExamplesGallery } from "./ExamplesGallery";

const cardWidth = "w-[86vw] sm:w-[68vw] lg:w-[min(62vw,calc((100svh-15rem)*1.5))]";

export function Examples() {
  return (
    <section
      id="examples"
      data-theme="light"
      data-header-theme="light"
      aria-labelledby="examples-title"
      className="relative overflow-hidden bg-linen"
    >
      <div aria-hidden="true" className="bg-grid-light mask-fade-y pointer-events-none absolute inset-0 opacity-80" />

      <div className="container-x relative pt-[clamp(6rem,11vw,10.5rem)]">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow index={examples.index}>{examples.eyebrow}</Eyebrow>
            <h2 id="examples-title" data-reveal="lines" className="display-2 mt-7 text-ink-950">
              {withAccent(examples.title)}
            </h2>
          </div>
          <p data-reveal="fade-up" className="lead text-steel-600 lg:col-span-4 lg:col-start-9">
            {examples.lead}
          </p>
        </div>
      </div>

      <ExamplesGallery count={examples.items.length}>
        {examples.items.map((example, i) => {
          const Site = conceptSites[example.key];
          return (
            <figure key={example.key} data-card className={`group relative shrink-0 snap-center ${cardWidth}`}>
              <div
                data-frame
                tabIndex={0}
                role="img"
                aria-label={`${example.name}: concept homepage for a ${example.type.toLowerCase()}. Hover or focus to scroll the preview.`}
                data-cursor="view"
                data-cursor-label="Preview"
                className="rounded-[clamp(10px,1.2vw,16px)] outline-offset-4 transition-transform duration-700 ease-out-expo group-hover:-translate-y-1.5"
              >
                <BrowserFrame url={example.url} className="shadow-[0_40px_90px_-40px_rgb(7_26_51/0.5)]">
                  <div data-site-viewport aria-hidden="true" className="relative aspect-[16/10] overflow-hidden [contain:layout_paint] [container-type:inline-size]">
                    <div
                      data-site-scroll
                      className="absolute inset-x-0 top-0 transition-transform duration-[1.4s] ease-[cubic-bezier(.6,0,.2,1)] group-focus-within:[transform:translateY(var(--dist,0px))] group-hover:[transform:translateY(var(--dist,0px))] group-hover:duration-[7s] group-hover:ease-[cubic-bezier(.45,0,.25,1)] group-[.is-previewing]:[transform:translateY(var(--dist,0px))] group-[.is-previewing]:duration-[7s]"
                    >
                      <Site />
                    </div>
                  </div>
                </BrowserFrame>
              </div>
              <figcaption className="mt-6 flex flex-wrap items-start justify-between gap-x-6 gap-y-4">
                <div>
                  <p className="mono-label flex items-center gap-3 text-steel-500">
                    <span className="rounded-full bg-ink-950 px-2.5 py-1 !text-[0.6rem] text-white">Concept</span>
                    0{i + 1} / {example.type}
                  </p>
                  <h3 className="mt-2 text-[clamp(1.5rem,1.2rem+0.8vw,1.9rem)] font-bold tracking-[-0.03em] text-ink-950">{example.name}</h3>
                </div>
                <ul className="flex max-w-full flex-wrap gap-2 lg:max-w-[58%] lg:justify-end" aria-label="Features">
                  {example.tags.map((tag) => (
                    <li key={tag} className="rounded-full border border-line-strong bg-white/50 px-3 py-1.5 text-[13px] text-steel-600">
                      {tag}
                    </li>
                  ))}
                </ul>
              </figcaption>
            </figure>
          );
        })}

        <div
          data-card
          data-theme="dark"
          className="bg-grid relative flex w-[86vw] shrink-0 snap-center flex-col justify-between gap-12 overflow-hidden rounded-[clamp(16px,1.6vw,24px)] bg-ink-950 p-8 sm:w-[60vw] lg:w-[min(28vw,26rem)] lg:p-10"
        >
          <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-blue-500/30 blur-3xl" />
          <LogoMark className="relative size-14" />
          <div className="relative">
            <p className="mono-label text-sky-300">05 / Your business</p>
            <p className="display-3 mt-4 text-white">
              Yours could be <span className="accent">next.</span>
            </p>
            <p className="mt-4 leading-relaxed text-steel-300">
              Tell us about your company and we&apos;ll design a site like these, built to your brand at no cost.
            </p>
            <Button href="#apply" variant="beam" className="mt-8">
              Apply for free
            </Button>
          </div>
        </div>
      </ExamplesGallery>
    </section>
  );
}
