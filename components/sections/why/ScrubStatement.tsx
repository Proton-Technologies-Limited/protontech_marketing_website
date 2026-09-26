"use client";

import { useRef } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";

/** A statement that "lights up" word by word as it scrolls through the viewport. */
export function ScrubStatement({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MQ.motion, () => {
        gsap.fromTo(
          gsap.utils.selector(ref)("[data-word]"),
          { opacity: 0.14 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.1,
            scrollTrigger: { trigger: ref.current, start: "top 80%", end: "bottom 50%", scrub: 0.4 },
          },
        );
      });
    },
    { scope: ref },
  );

  const segments = text.split(/(\*[^*]+\*)/g).filter(Boolean);

  return (
    <p ref={ref} className={className}>
      {segments.map((segment, i) => {
        const accent = segment.startsWith("*");
        const words = (accent ? segment.slice(1, -1) : segment).split(/(\s+)/);
        return words.map((word, j) =>
          /^\s+$/.test(word) || word === "" ? (
            word
          ) : (
            <span key={`${i}-${j}`} data-word className={accent ? "accent" : undefined}>
              {word}
            </span>
          ),
        );
      })}
    </p>
  );
}
