import Image from "next/image";
import wordmarkPositive from "@/public/brand/wordmark-positive.png";
import wordmarkReversed from "@/public/brand/wordmark-reversed.png";
import { cn } from "@/lib/utils";

/**
 * The Proton mark, rebuilt as vector from the supplied logo so it stays crisp
 * and its circuit traces can be animated (paths: data-trace, nodes: data-node).
 */
export function LogoMark({ className, title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <rect data-trace x="3.125" y="3.125" width="93.75" height="93.75" rx="11" stroke="#50CCFC" strokeWidth="6.25" />
      <path data-trace d="M49.3 3.1v15.3a8 8 0 0 0 8 8H79" stroke="#A0D0FC" strokeWidth="6.25" />
      <path data-trace d="M3.1 34.5H26" stroke="#78BCF4" strokeWidth="6.25" />
      <path data-trace d="M3.1 65.5H26" stroke="#80D0FC" strokeWidth="6.25" />
      <path data-trace d="M49.3 96.9V56.5a8 8 0 0 1 8-8h39.6" stroke="#18C4FC" strokeWidth="6.25" />
      <path data-trace d="M71.9 96.9V69.4h25" stroke="#68B8F0" strokeWidth="6" />
      <circle data-node cx="79.3" cy="26.4" r="7.4" fill="#A0D0FC" />
      <circle data-node cx="26.3" cy="34.5" r="7.4" fill="#78BCF4" />
      <circle data-node cx="26.3" cy="65.5" r="7.4" fill="#80D0FC" />
      <circle data-node cx="71.9" cy="69.4" r="7.4" fill="#68B8F0" />
    </svg>
  );
}

/** Mark + original wordmark lockup. `tone` picks the wordmark for dark or light backgrounds. */
export function Logo({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className="h-[2.35em] w-[2.35em] shrink-0" />
      <span className="relative block h-[2.05em] w-[6.9em]">
        <Image
          src={wordmarkReversed}
          alt=""
          fill
          sizes="160px"
          className={cn("object-contain object-left transition-opacity duration-500", tone === "dark" ? "opacity-100" : "opacity-0")}
        />
        <Image
          src={wordmarkPositive}
          alt=""
          fill
          sizes="160px"
          className={cn("object-contain object-left transition-opacity duration-500", tone === "light" ? "opacity-100" : "opacity-0")}
        />
      </span>
    </span>
  );
}
