"use client";

import { useId, useState } from "react";

export function Accordion({ items, headingLevel = 3 }: { items: { q: string; a: string }[]; headingLevel?: 3 | 4 }) {
  const Heading = headingLevel === 4 ? "h4" : "h3";
  const [open, setOpen] = useState<number | null>(0);
  const id = useId();

  return (
    <div className="border-t border-line">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className="acc-item border-b border-line" data-open={isOpen}>
            <Heading>
              <button
                type="button"
                id={`${id}-b${i}`}
                aria-expanded={isOpen}
                aria-controls={`${id}-p${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-center justify-between gap-6 py-6 text-left text-[1.0625rem] font-semibold tracking-[-0.01em] text-fg sm:text-lg"
              >
                <span className="transition-colors duration-300 group-hover:text-accent">{item.q}</span>
                <span
                  aria-hidden="true"
                  className="relative grid size-9 shrink-0 place-items-center rounded-full border border-line-strong transition-colors duration-300 group-hover:border-accent"
                >
                  <span className="absolute h-px w-3.5 bg-current" />
                  <span
                    className="absolute h-3.5 w-px bg-current transition-transform duration-500 ease-out-expo"
                    style={{ transform: isOpen ? "scaleY(0)" : "scaleY(1)" }}
                  />
                </span>
              </button>
            </Heading>
            <div id={`${id}-p${i}`} role="region" aria-labelledby={`${id}-b${i}`} className="acc-panel" inert={!isOpen}>
              <div>
                <p className="max-w-[62ch] pb-7 pr-12 leading-relaxed text-muted">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
