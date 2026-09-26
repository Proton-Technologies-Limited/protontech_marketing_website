import { cn } from "@/lib/utils";

const paths = {
  badge: (
    <>
      <path d="M12 3.2 19 6v5.2c0 4.4-2.9 8.2-7 9.6-4.1-1.4-7-5.2-7-9.6V6l7-2.8Z" />
      <path d="m9 11.8 2.1 2.1 4-4.4" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-6.2-5.6-6.2-10.7a6.2 6.2 0 0 1 12.4 0C18.2 15.4 12 21 12 21Z" />
      <circle cx="12" cy="10.3" r="2.3" />
    </>
  ),
  spark: (
    <>
      <rect x="4.5" y="5.5" width="15" height="14" rx="2.5" />
      <path d="M4.5 10h15M9 3.5v4M15 3.5v4" />
      <path d="m9.4 14.6 1.8 1.8 3.6-3.9" />
    </>
  ),
  check: <path d="m5 12.5 4.2 4.2L19 7" />,
} as const;

export type IconName = keyof typeof paths;

export function LineIcon({ name, className }: { name: IconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("size-6", className)}
    >
      {paths[name]}
    </svg>
  );
}
