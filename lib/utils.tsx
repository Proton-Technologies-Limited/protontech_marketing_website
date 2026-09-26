import type { ReactNode } from "react";

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

/** Render `*emphasis*` segments of a headline in the accent serif. */
export function withAccent(text: string): ReactNode[] {
  return text
    .split(/(\*[^*]+\*)/g)
    .filter(Boolean)
    .map((part, i) =>
      part.startsWith("*") && part.endsWith("*") ? (
        <span key={i} className="accent">
          {part.slice(1, -1)}
        </span>
      ) : (
        part
      ),
    );
}

/** Plain-text version of an accented headline (for aria/meta). */
export const stripAccent = (text: string) => text.replaceAll("*", "");
