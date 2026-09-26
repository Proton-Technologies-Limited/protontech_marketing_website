import type { CSSProperties } from "react";
import { AuroraCanvas } from "@/components/art/AuroraCanvas";
import { Magnetic } from "@/components/motion/Magnetic";
import { Button } from "@/components/ui/Button";
import { EyebrowPill } from "@/components/ui/Eyebrow";
import { hero } from "@/lib/content";
import { HeroShell } from "./HeroShell";
import { HeroVisual } from "./HeroVisual";

const delay = (d: number) => ({ "--d": `${d}s` }) as CSSProperties;

/** Headline line renderer: the *accent* gets the serif italic plus a hand-drawn underline. */
function TitleLine({ text }: { text: string }) {
  return text
    .split(/(\*[^*]+\*)/g)
    .filter(Boolean)
    .map((part, i) =>
      part.startsWith("*") ? (
        <span key={i} className="accent relative inline-block leading-none">
          {part.slice(1, -1)}
          <svg
            aria-hidden="true"
            viewBox="0 0 220 24"
            preserveAspectRatio="none"
            className="intro-underline pointer-events-none absolute -bottom-[0.1em] left-[-2%] h-[0.22em] w-[104%] overflow-visible"
          >
            <path
              d="M4 17C46 9 118 5 216 11"
              pathLength={1}
              fill="none"
              stroke="url(#underline-gradient)"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="underline-gradient" x1="0" x2="1">
                <stop offset="0" stopColor="#7fdcff" />
                <stop offset="1" stopColor="#108ce8" />
              </linearGradient>
            </defs>
          </svg>
        </span>
      ) : (
        <span key={i}>{part}</span>
      ),
    );
}

export function Hero() {
  return (
    <HeroShell>
      {/* Background: CSS glow fallback → WebGL aurora → drafting grid */}
      <div data-hero-bg aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(60%_55%_at_78%_38%,rgb(16_140_232/0.28),transparent_70%),radial-gradient(40%_40%_at_5%_100%,rgb(8_72_124/0.35),transparent_70%)]" />
        <AuroraCanvas className="absolute inset-0 size-full" />
        <div className="bg-grid mask-radial absolute inset-0" />
      </div>

      <div className="container-x relative pb-16 pt-[clamp(8.25rem,19vh,11.5rem)] lg:pb-0">
        <div data-hero-copy>
          <EyebrowPill detail={hero.eyebrow.detail} className="intro" style={delay(0.05)}>
            {hero.eyebrow.label}
          </EyebrowPill>
          <h1 id="hero-title" className="hero-title display-1 mt-7 text-white">
            {hero.titleLines.map((line, i) => (
              <span key={line} className="hero-line" style={{ "--i": i } as CSSProperties}>
                <span>
                  <TitleLine text={line} />
                </span>{" "}
              </span>
            ))}
          </h1>
        </div>

        <div className="mt-9 grid items-start gap-14 lg:mt-10 lg:grid-cols-12 lg:gap-8">
          <div data-hero-copy className="lg:col-span-5 lg:pt-2">
            <p className="lead intro max-w-[34rem] text-steel-300" style={delay(0.55)}>
              {hero.lead}
            </p>
            <div className="intro mt-9 flex flex-wrap items-center gap-3" style={delay(0.7)}>
              <Magnetic>
                <Button href={hero.primaryCta.href} variant="beam">
                  {hero.primaryCta.label}
                </Button>
              </Magnetic>
              <Button href={hero.secondaryCta.href} variant="outline" icon="down">
                {hero.secondaryCta.label}
              </Button>
            </div>
            <ul className="intro mt-10 flex flex-wrap gap-x-6 gap-y-3" style={delay(0.85)}>
              {hero.proof.map((item) => (
                <li key={item} className="mono-label flex items-center gap-2.5 text-steel-300">
                  <svg viewBox="0 0 16 16" className="size-4 text-cyan-400" fill="none" aria-hidden="true">
                    <circle cx="8" cy="8" r="7.25" stroke="currentColor" strokeOpacity=".4" />
                    <path d="m5 8.3 2 1.9 4-4.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative lg:col-span-7 lg:-mt-[calc(var(--fs-display-1)*1.15)] lg:translate-x-[2%]">
            <HeroVisual />
          </div>
        </div>
      </div>
    </HeroShell>
  );
}
