import { ImageResponse } from "next/og";

export const alt = "Proton Technologies: free professional websites for decoration companies";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const HEADLINE = "Get a professional website";
const ACCENT = "for free.";
const SUB = "Custom websites for decoration companies · $0 build · $150/yr care";
const BRAND = "PROTONTECHNOLOGIES LIMITED";

/** Fetch a subset of a Google Font as TTF for Satori (falls back to the default font offline). */
async function loadGoogleFont(family: string, text: string) {
  try {
    const css = await (
      await fetch(`https://fonts.googleapis.com/css2?family=${family}&text=${encodeURIComponent(text)}`)
    ).text();
    const src = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1];
    if (!src) return null;
    const res = await fetch(src);
    return res.ok ? await res.arrayBuffer() : null;
  } catch {
    return null;
  }
}

const grid =
  "linear-gradient(rgba(160,208,252,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(160,208,252,0.08) 1px, transparent 1px)";

export default async function OpengraphImage() {
  const [sansBold, sansMedium, serifItalic] = await Promise.all([
    loadGoogleFont("Plus+Jakarta+Sans:wght@800", HEADLINE + BRAND),
    loadGoogleFont("Plus+Jakarta+Sans:wght@500", SUB),
    loadGoogleFont("Instrument+Serif:ital@1", ACCENT),
  ]);

  const fonts = [
    sansBold && { name: "Jakarta", data: sansBold, weight: 800 as const, style: "normal" as const },
    sansMedium && { name: "Jakarta", data: sansMedium, weight: 500 as const, style: "normal" as const },
    serifItalic && { name: "Instrument", data: serifItalic, weight: 400 as const, style: "italic" as const },
  ].filter((f): f is NonNullable<typeof f> => Boolean(f));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          color: "white",
          backgroundColor: "#030d1c",
          backgroundImage: `radial-gradient(circle at 85% 20%, rgba(16,140,232,0.45), transparent 55%), ${grid}`,
          backgroundSize: "100% 100%, 60px 60px, 60px 60px",
          fontFamily: "Jakarta",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="64" height="64" viewBox="0 0 100 100" fill="none">
            <rect x="3.125" y="3.125" width="93.75" height="93.75" rx="11" stroke="#50CCFC" strokeWidth="6.25" />
            <path d="M49.3 3.1v15.3a8 8 0 0 0 8 8H79" stroke="#A0D0FC" strokeWidth="6.25" />
            <path d="M3.1 34.5H26M3.1 65.5H26" stroke="#78BCF4" strokeWidth="6.25" />
            <path d="M49.3 96.9V56.5a8 8 0 0 1 8-8h39.6" stroke="#18C4FC" strokeWidth="6.25" />
            <path d="M71.9 96.9V69.4h25" stroke="#68B8F0" strokeWidth="6" />
            <circle cx="79.3" cy="26.4" r="7.4" fill="#A0D0FC" />
            <circle cx="26.3" cy="34.5" r="7.4" fill="#78BCF4" />
            <circle cx="26.3" cy="65.5" r="7.4" fill="#80D0FC" />
            <circle cx="71.9" cy="69.4" r="7.4" fill="#68B8F0" />
          </svg>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 36, fontWeight: 800, letterSpacing: 1 }}>PROTON</span>
            <span style={{ fontSize: 14, fontWeight: 800, letterSpacing: 3, color: "#50CCFC" }}>TECHNOLOGIES LIMITED</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 84, fontWeight: 800, lineHeight: 1.02, letterSpacing: -3.5 }}>
            <span>{HEADLINE}</span>
            <span
              style={{
                fontFamily: "Instrument",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: 96,
                letterSpacing: -1,
                color: "#50CCFC",
              }}
            >
              {ACCENT}
            </span>
          </div>
          <div style={{ marginTop: 28, fontSize: 28, fontWeight: 500, color: "#9db0c8" }}>{SUB}</div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
