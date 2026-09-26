import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Section eyebrow: node + drawn trace + index + label (blueprint annotation style). */
export function Eyebrow({ index, children, className }: { index?: string; children: ReactNode; className?: string }) {
  return (
    <p className={cn("eyebrow", className)} data-eyebrow>
      <span className="eyebrow__node" aria-hidden="true" />
      <span className="eyebrow__trace" aria-hidden="true" />
      {index && (
        <>
          <span className="eyebrow__index">{index}</span>
          <span className="eyebrow__sep" aria-hidden="true">
            /
          </span>
        </>
      )}
      <span>{children}</span>
    </p>
  );
}

/** Pill eyebrow with a live pulsing node, used in the hero and CTA. */
export function EyebrowPill({
  children,
  detail,
  className,
  style,
}: {
  children: ReactNode;
  detail?: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <p className={cn("eyebrow-pill", className)} style={style}>
      <span className="live-dot" aria-hidden="true" />
      <span className="text-fg">{children}</span>
      {detail && <span className="hidden text-muted sm:inline">{detail}</span>}
    </p>
  );
}
