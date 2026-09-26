import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** A minimal browser chrome used to present website concepts. */
export function BrowserFrame({
  url,
  children,
  tone = "light",
  className,
}: {
  url: string;
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[clamp(10px,1.2vw,16px)] border",
        dark ? "border-white/10 bg-ink-900" : "border-ink-900/10 bg-white",
        className,
      )}
    >
      <div
        className={cn(
          "flex h-[clamp(26px,2.6vw,36px)] items-center gap-3 border-b px-3",
          dark ? "border-white/10 bg-ink-850" : "border-ink-900/8 bg-[#f7f6f3]",
        )}
      >
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-[#ff5f57]/85" />
          <span className="size-2.5 rounded-full bg-[#febc2e]/85" />
          <span className="size-2.5 rounded-full bg-[#28c840]/85" />
        </div>
        <div
          className={cn(
            "mx-auto flex h-[70%] min-w-0 max-w-[60%] items-center gap-1.5 rounded-full px-3 font-mono text-[clamp(9px,0.75vw,11px)] tracking-tight",
            dark ? "bg-white/8 text-steel-300" : "bg-ink-900/[0.06] text-steel-600",
          )}
        >
          <svg viewBox="0 0 12 12" className="size-2.5 shrink-0" aria-hidden="true">
            <path d="M3.5 5V3.8a2.5 2.5 0 0 1 5 0V5M2.8 5h6.4v4.6H2.8z" fill="none" stroke="currentColor" strokeWidth="1.1" />
          </svg>
          <span className="truncate">{url}</span>
        </div>
        <div className="w-10" aria-hidden="true" />
      </div>
      {children}
    </div>
  );
}
