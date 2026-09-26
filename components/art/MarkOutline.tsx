/** Hairline outline of the Proton mark, used at large scale as drawn background art. */
export function MarkOutline({ className }: { className?: string }) {
  return (
    <svg viewBox="-4 -4 108 108" fill="none" stroke="currentColor" strokeWidth=".35" strokeLinecap="round" className={className}>
      <rect data-draw x="0" y="0" width="100" height="100" rx="14" />
      <rect data-draw x="6.25" y="6.25" width="87.5" height="87.5" rx="8" />
      <path data-draw d="M46.2 6.2v12.2a11 11 0 0 0 11 11H72M52.4 6.2v12.2a4.8 4.8 0 0 0 4.8 4.8H72" />
      <path data-draw d="M6.2 31.4H19M6.2 37.6H19M6.2 62.4H19M6.2 68.6H19" />
      <path data-draw d="M46.2 93.8V56.5a11 11 0 0 1 11-11h36.6M52.4 93.8V56.5a4.8 4.8 0 0 1 4.8-4.8h36.6" />
      <path data-draw d="M68.9 93.8V76.4M74.9 93.8V76.4M79 66.4h14.8M79 72.4h14.8" />
      <circle data-draw cx="79.3" cy="26.4" r="7.4" />
      <circle data-draw cx="26.3" cy="34.5" r="7.4" />
      <circle data-draw cx="26.3" cy="65.5" r="7.4" />
      <circle data-draw cx="71.9" cy="69.4" r="7.4" />
    </svg>
  );
}
