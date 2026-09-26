/** PCB-style traces (the Proton logo motif) used as a section backdrop. Strokes carry data-draw. */
export function CircuitBackdrop({ className }: { className?: string }) {
  const traces = [
    "M0 180h220a20 20 0 0 1 20 20v220a20 20 0 0 0 20 20h300",
    "M1440 260h-260a20 20 0 0 0-20 20v240",
    "M0 900h140a20 20 0 0 0 20-20V720a20 20 0 0 1 20-20h160",
    "M1440 980h-180a20 20 0 0 1-20-20V820",
    "M720 0v90a20 20 0 0 0 20 20h240",
    "M300 1200v-120a20 20 0 0 1 20-20h300",
    "M1100 1200v-90a20 20 0 0 0-20-20H900",
    "M1440 600h-120a20 20 0 0 0-20 20v80a20 20 0 0 1-20 20h-140",
  ];
  const nodes: [number, number][] = [
    [560, 440],
    [1160, 520],
    [340, 700],
    [1240, 820],
    [980, 110],
    [620, 1060],
    [900, 1090],
    [1140, 720],
  ];

  return (
    <svg
      viewBox="0 0 1440 1200"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      className={className}
    >
      {traces.map((d) => (
        <path key={d} data-draw d={d} />
      ))}
      {nodes.map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} data-draw cx={cx} cy={cy} r="5" />
      ))}
    </svg>
  );
}
