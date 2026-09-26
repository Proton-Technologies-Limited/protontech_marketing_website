/**
 * Architectural floor plan line drawing. Every stroke carries data-draw so
 * <DrawOnScroll> can draw it progressively. Colour follows `currentColor`.
 */
export function FloorPlan({ className }: { className?: string }) {
  const label = { fontFamily: "var(--font-geist-mono), monospace", fontSize: 9, letterSpacing: "0.14em" };
  return (
    <svg viewBox="0 0 640 470" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Walls */}
      <rect data-draw x="20" y="20" width="600" height="420" strokeWidth="1.6" />
      <rect data-draw x="28" y="28" width="584" height="404" />
      <path data-draw d="M260 28v122M260 196v54" strokeWidth="1.6" />
      <path data-draw d="M28 250h82M156 250h104" strokeWidth="1.6" />
      <path data-draw d="M430 190v110M430 346v86" strokeWidth="1.6" />
      <path data-draw d="M430 190h70M546 190h66" strokeWidth="1.6" />
      {/* Doors */}
      <path data-draw d="M260 150h46M306 150a46 46 0 0 1-46 46" strokeOpacity=".7" />
      <path data-draw d="M110 250v-46M110 204a46 46 0 0 1 46 46" strokeOpacity=".7" />
      <path data-draw d="M430 346h-46M384 346a46 46 0 0 1 46-46" strokeOpacity=".7" />
      <path data-draw d="M546 190v46M546 236a46 46 0 0 1-46-46" strokeOpacity=".7" />
      {/* Windows */}
      <path data-draw d="M80 20v8M200 20v8M80 24h120" />
      <path data-draw d="M330 20v8M520 20v8M330 24h190" />
      <path data-draw d="M20 300h8M20 400h8M24 300v100" />
      <path data-draw d="M612 60h8M612 160h8M616 60v100" />
      {/* Bedroom */}
      <rect data-draw x="70" y="62" width="120" height="150" rx="4" />
      <rect data-draw x="82" y="72" width="44" height="26" rx="6" />
      <rect data-draw x="134" y="72" width="44" height="26" rx="6" />
      <path data-draw d="M70 122h120" strokeOpacity=".6" />
      <rect data-draw x="38" y="64" width="24" height="24" rx="3" />
      <rect data-draw x="198" y="64" width="24" height="24" rx="3" />
      <circle data-draw cx="50" cy="76" r="6" />
      <circle data-draw cx="210" cy="76" r="6" />
      {/* Living */}
      <rect data-draw x="300" y="62" width="170" height="32" rx="6" />
      <rect data-draw x="300" y="94" width="32" height="80" rx="6" />
      <rect data-draw x="352" y="106" width="108" height="66" strokeDasharray="3 4" strokeOpacity=".6" />
      <rect data-draw x="370" y="118" width="72" height="40" rx="8" />
      <rect data-draw x="500" y="112" width="46" height="46" rx="12" />
      <circle data-draw cx="588" cy="54" r="13" />
      <circle data-draw cx="588" cy="54" r="5" />
      {/* Kitchen & dining */}
      <path data-draw d="M40 262h200v28H68v130H40Z" />
      <rect data-draw x="122" y="266" width="40" height="20" rx="4" />
      <circle data-draw cx="200" cy="276" r="6" />
      <circle data-draw cx="222" cy="276" r="6" />
      <rect data-draw x="118" y="332" width="112" height="50" rx="4" />
      <circle data-draw cx="336" cy="352" r="40" />
      <rect data-draw x="328" y="296" width="16" height="12" rx="3" />
      <rect data-draw x="328" y="396" width="16" height="12" rx="3" />
      <rect data-draw x="280" y="344" width="12" height="16" rx="3" />
      <rect data-draw x="380" y="344" width="12" height="16" rx="3" />
      {/* Bath */}
      <rect data-draw x="446" y="206" width="80" height="30" rx="3" />
      <ellipse data-draw cx="486" cy="221" rx="16" ry="8" />
      <rect data-draw x="560" y="206" width="44" height="44" />
      <path data-draw d="M560 206l44 44M604 206l-44 44" strokeOpacity=".5" />
      <rect data-draw x="540" y="330" width="62" height="92" rx="20" />
      <rect data-draw x="548" y="338" width="46" height="76" rx="16" strokeOpacity=".6" />
      <circle data-draw cx="466" cy="374" r="12" />
      <rect data-draw x="454" y="388" width="24" height="12" rx="2" />
      {/* Dimension line */}
      <path data-draw d="M20 456h268M352 456h268M20 450v12M620 450v12" strokeOpacity=".7" />
      <g fill="currentColor" stroke="none" style={label}>
        <text data-draw-label x="320" y="459" textAnchor="middle">
          12.60 M
        </text>
        <text data-draw-label x="70" y="236">
          BED 01 · 4.2 × 3.8
        </text>
        <text data-draw-label x="300" y="232">
          LIVING · 6.4 × 4.6
        </text>
        <text data-draw-label x="120" y="424">
          KITCHEN / DINING
        </text>
        <text data-draw-label x="446" y="270">
          BATH
        </text>
      </g>
    </svg>
  );
}
