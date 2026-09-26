"use client";

import { useRef } from "react";
import { Photo } from "@/components/ui/Photo";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import type { PhotoKey } from "@/lib/images";
import { cn } from "@/lib/utils";

/** Photo that drifts inside its frame while scrolling (depth without layout shift). */
export function ParallaxImage({
  name,
  sizes,
  className,
  amount = 10,
  alt,
}: {
  name: PhotoKey;
  sizes: string;
  className?: string;
  amount?: number;
  alt?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MQ.motion, () => {
        const img = ref.current?.querySelector("img");
        if (!img) return;
        gsap.fromTo(
          img,
          { yPercent: -amount },
          {
            yPercent: amount,
            ease: "none",
            scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <Photo name={name} alt={alt} fill sizes={sizes} className="scale-[1.25] object-cover" />
    </div>
  );
}
