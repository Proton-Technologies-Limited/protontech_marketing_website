import type { JSX } from "react";
import { Photo } from "@/components/ui/Photo";
import type { ExampleKey } from "@/lib/content";
import type { PhotoKey } from "@/lib/images";

/*
 * Four concept websites, coded as real layouts (not screenshots).
 * Units are container-query widths (cqw) so each site scales with its frame:
 * 1cqw ≈ 14px on a 1440px-wide design.
 */

const SIZES = "(min-width: 1024px) 480px, 60vw";

function Img({ name, className = "", focus = "50% 50%" }: { name: PhotoKey; className?: string; focus?: string }) {
  // Callers may position the frame themselves (e.g. "absolute inset-0"); otherwise it's relative.
  const position = /\b(absolute|fixed)\b/.test(className) ? "" : "relative";
  return (
    <div className={`${position} overflow-hidden ${className}`}>
      <Photo name={name} fill sizes={SIZES} className="object-cover" style={{ objectPosition: focus }} />
    </div>
  );
}

/* ── Atelier Nord · interior design studio ────────────────────── */

function AtelierNord() {
  return (
    <div className="bg-[#F4EFE8] text-[#2F2A26]">
      <div className="flex items-center justify-between border-b border-[#2F2A26]/10 px-[5.5cqw] py-[2.1cqw]">
        <span className="font-serif text-[2.2cqw] tracking-[-0.01em]">Atelier Nord</span>
        <span className="flex gap-[3cqw] text-[1.05cqw] font-medium text-[#6B6358]">
          <span>Projects</span>
          <span>Studio</span>
          <span>Services</span>
          <span>Journal</span>
        </span>
        <span className="rounded-full bg-[#2F2A26] px-[1.9cqw] py-[0.95cqw] text-[1cqw] font-semibold text-[#F4EFE8]">Book a consultation</span>
      </div>
      <div className="grid grid-cols-[1.05fr_1fr] items-end gap-[4cqw] px-[5.5cqw] pb-[5cqw] pt-[4.5cqw]">
        <div className="pb-[2cqw]">
          <p className="font-mono text-[0.85cqw] uppercase tracking-[0.25em] text-[#A47E5C]">Interior design studio · Est. 2014</p>
          <p className="mt-[1.8cqw] font-serif text-[6.3cqw] leading-[0.94] tracking-[-0.02em]">
            Calm, <em>considered</em> interiors for modern living.
          </p>
          <p className="mt-[2.1cqw] max-w-[34cqw] text-[1.2cqw] leading-relaxed text-[#6B6358]">
            We design warm, timeless homes that feel as good as they look, from the first sketch to the final cushion.
          </p>
          <div className="mt-[2.6cqw] flex items-center gap-[1.8cqw]">
            <span className="rounded-full bg-[#2F2A26] px-[2.3cqw] py-[1.15cqw] text-[1.05cqw] font-semibold text-white">View our projects</span>
            <span className="border-b border-[#2F2A26]/40 pb-[0.2cqw] text-[1.05cqw] font-semibold">Our approach</span>
          </div>
        </div>
        <Img name="nordLiving" className="aspect-[4/5] rounded-t-full" />
      </div>
      <div className="grid grid-cols-3 gap-[3cqw] border-y border-[#2F2A26]/10 px-[5.5cqw] py-[4cqw]">
        {[
          ["01", "Full-service design", "Concept to completion, managed end to end."],
          ["02", "Styling & sourcing", "Furniture, art and textiles, curated for you."],
          ["03", "Renovation guidance", "Layouts, finishes and trusted trades."],
        ].map(([n, t, d]) => (
          <div key={n}>
            <p className="font-mono text-[0.85cqw] text-[#A47E5C]">{n}</p>
            <p className="mt-[1cqw] font-serif text-[2.1cqw]">{t}</p>
            <p className="mt-[0.6cqw] text-[1.05cqw] leading-relaxed text-[#6B6358]">{d}</p>
          </div>
        ))}
      </div>
      <div className="px-[5.5cqw] py-[5cqw]">
        <div className="flex items-end justify-between">
          <p className="font-serif text-[3.6cqw] leading-none">Selected projects</p>
          <span className="text-[1.05cqw] font-semibold">All projects →</span>
        </div>
        <div className="mt-[2.6cqw] grid grid-cols-3 gap-[1.6cqw]">
          {(
            [
              ["nordBedroom", "The Linen House", "Bedroom · 2025"],
              ["nordStove", "Birch Cottage", "Living · 2024"],
              ["archLiving", "Arc Apartment", "Full home · 2024"],
            ] as const
          ).map(([p, t, m]) => (
            <div key={t}>
              <Img name={p} className="aspect-[4/5] rounded-[0.8cqw]" />
              <p className="mt-[1.1cqw] font-serif text-[1.7cqw]">{t}</p>
              <p className="text-[0.95cqw] text-[#6B6358]">{m}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-[5.5cqw] mb-[4cqw] flex items-center justify-between rounded-[1.6cqw] bg-[#2F2A26] px-[4cqw] py-[4cqw] text-[#F4EFE8]">
        <p className="font-serif text-[3.6cqw] leading-none">
          Let&apos;s create a home
          <br />
          you&apos;ll love.
        </p>
        <span className="rounded-full bg-[#F4EFE8] px-[2.3cqw] py-[1.15cqw] text-[1.05cqw] font-semibold text-[#2F2A26]">Book a consultation</span>
      </div>
      <div className="flex justify-between px-[5.5cqw] pb-[3cqw] text-[0.95cqw] text-[#6B6358]">
        <span>© Atelier Nord Interiors</span>
        <span>Instagram · Pinterest · Houzz</span>
      </div>
    </div>
  );
}

/* ── Stone & Oak · kitchen & bath renovation ─────────────────── */

function StoneOak() {
  return (
    <div className="bg-white text-[#16241D]">
      <div className="bg-[#1F3A2E] py-[0.8cqw] text-center text-[0.9cqw] font-medium tracking-wide text-[#E8DCC8]">
        Licensed &amp; insured · Free on-site quotes · 10-year workmanship guarantee
      </div>
      <div className="flex items-center justify-between px-[5cqw] py-[1.9cqw]">
        <span className="flex items-center gap-[0.8cqw] text-[1.5cqw] font-extrabold tracking-[0.12em]">
          <span className="grid size-[2.4cqw] place-items-center rounded-[0.4cqw] bg-[#1F3A2E] text-[1.1cqw] text-[#E8DCC8]">S</span>
          STONE &amp; OAK
        </span>
        <span className="flex gap-[2.6cqw] text-[1.05cqw] font-semibold text-[#3C4A43]">
          <span>Kitchens</span>
          <span>Bathrooms</span>
          <span>Renovations</span>
          <span>Gallery</span>
        </span>
        <span className="rounded-[0.6cqw] bg-[#B98A5A] px-[1.8cqw] py-[1cqw] text-[1.05cqw] font-bold text-white">Get a free quote</span>
      </div>
      <div className="relative h-[36cqw]">
        <Img name="pendantDining" className="absolute inset-0" focus="60% 50%" />
        <div className="absolute inset-0 bg-linear-to-r from-[#0F1F18]/90 via-[#0F1F18]/50 to-[#0F1F18]/0" />
        <div className="relative grid h-full grid-cols-[1.25fr_1fr] items-center gap-[4cqw] px-[5cqw]">
          <div className="text-white">
            <p className="text-[1cqw] font-bold uppercase tracking-[0.2em] text-[#D9B48A]">Kitchen &amp; bath renovation</p>
            <p className="mt-[1.4cqw] text-[5cqw] font-extrabold leading-[0.98] tracking-[-0.035em]">Kitchens &amp; bathrooms built to last.</p>
            <p className="mt-[1.6cqw] max-w-[36cqw] text-[1.2cqw] leading-relaxed text-white/80">
              Design, build and project management under one roof, delivered on time, on budget and to a standard you can feel.
            </p>
          </div>
          <div className="rounded-[1.2cqw] bg-white p-[2.2cqw] text-[#16241D] shadow-2xl">
            <p className="text-[1.6cqw] font-extrabold tracking-tight">Get your free quote</p>
            <p className="mt-[0.4cqw] text-[0.95cqw] text-[#5B6B63]">Answer three questions. We&apos;ll reply within a day.</p>
            {[
              ["Project type", "Kitchen renovation"],
              ["Postcode", "e.g. 90210"],
              ["Timeline", "Within 3 months"],
            ].map(([l, v]) => (
              <div key={l} className="mt-[1.2cqw]">
                <p className="text-[0.85cqw] font-semibold text-[#5B6B63]">{l}</p>
                <p className="mt-[0.4cqw] rounded-[0.5cqw] border border-[#16241D]/15 px-[1cqw] py-[0.8cqw] text-[1cqw]">{v}</p>
              </div>
            ))}
            <p className="mt-[1.6cqw] rounded-[0.5cqw] bg-[#1F3A2E] py-[1cqw] text-center text-[1.05cqw] font-bold text-white">Get my quote →</p>
          </div>
        </div>
      </div>
      <div className="px-[5cqw] py-[4.5cqw]">
        <p className="text-[3.2cqw] font-extrabold tracking-[-0.03em]">What we build</p>
        <div className="mt-[2.4cqw] grid grid-cols-3 gap-[1.6cqw]">
          {(
            [
              ["oakKitchen", "Kitchens"],
              ["travertineBath", "Bathrooms"],
              ["archLiving", "Full renovations"],
            ] as const
          ).map(([p, t]) => (
            <div key={t} className="overflow-hidden rounded-[1cqw] bg-[#F3F1EC]">
              <Img name={p} className="aspect-[4/3]" />
              <div className="flex items-center justify-between px-[1.6cqw] py-[1.4cqw]">
                <p className="text-[1.35cqw] font-bold">{t}</p>
                <span className="text-[1.2cqw] text-[#B98A5A]">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-[1fr_1.4fr] items-center gap-[4cqw] bg-[#F3F1EC] px-[5cqw] py-[4.5cqw]">
        <div>
          <p className="text-[1cqw] font-bold uppercase tracking-[0.2em] text-[#B98A5A]">Before &amp; after</p>
          <p className="mt-[1cqw] text-[3.2cqw] font-extrabold leading-none tracking-[-0.03em]">See the difference.</p>
          <p className="mt-[1.4cqw] text-[1.15cqw] leading-relaxed text-[#5B6B63]">Drag to compare a tired 1990s bathroom with its full renovation.</p>
        </div>
        <div className="relative aspect-[16/10] overflow-hidden rounded-[1cqw]">
          <Img name="stoneBath" className="absolute inset-0" />
          <div className="absolute inset-y-0 left-0 w-1/2 overflow-hidden">
            <div className="absolute inset-y-0 left-0 w-[200%] grayscale sepia-[.35] brightness-[.8]">
              <Img name="stoneBath" className="absolute inset-0" />
            </div>
          </div>
          <span className="absolute inset-y-0 left-1/2 w-[0.25cqw] -translate-x-1/2 bg-white" />
          <span className="absolute left-1/2 top-1/2 grid size-[3.6cqw] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-[1.3cqw] font-bold shadow-lg">
            ⟷
          </span>
          <span className="absolute left-[1.2cqw] top-[1.2cqw] rounded-full bg-black/60 px-[1cqw] py-[0.4cqw] text-[0.85cqw] font-bold text-white">Before</span>
          <span className="absolute right-[1.2cqw] top-[1.2cqw] rounded-full bg-white px-[1cqw] py-[0.4cqw] text-[0.85cqw] font-bold">After</span>
        </div>
      </div>
      <div className="flex items-center justify-between bg-[#1F3A2E] px-[5cqw] py-[3.6cqw] text-white">
        <p className="text-[2.8cqw] font-extrabold tracking-[-0.03em]">Planning a renovation? Let&apos;s talk.</p>
        <span className="rounded-[0.6cqw] bg-[#B98A5A] px-[2cqw] py-[1.1cqw] text-[1.05cqw] font-bold">Book a site visit</span>
      </div>
    </div>
  );
}

/* ── Maison Lumière · lighting & décor boutique ──────────────── */

function MaisonLumiere() {
  return (
    <div className="bg-[#0E0D0B] text-[#F2EBDD]">
      <div className="grid grid-cols-3 items-center px-[5cqw] py-[2.2cqw] text-[1cqw] tracking-wide text-[#F2EBDD]/75">
        <span className="flex gap-[2.4cqw]">
          <span>Collections</span>
          <span>Lookbook</span>
          <span>Journal</span>
        </span>
        <span className="text-center font-serif text-[2.1cqw] uppercase tracking-[0.32em] text-[#F2EBDD]">Maison Lumière</span>
        <span className="flex justify-end gap-[2.4cqw]">
          <span>Showroom</span>
          <span>Bag (0)</span>
        </span>
      </div>
      <div className="relative h-[40cqw]">
        <Img name="lumiereDining" className="absolute inset-0" focus="50% 28%" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(14_13_11/0.5),rgb(14_13_11/0.2)_75%)]" />
        <div className="relative flex h-full flex-col items-center justify-center text-center">
          <p className="font-mono text-[0.9cqw] uppercase tracking-[0.35em] text-[#C8A26B]">Autumn collection</p>
          <p className="mt-[1.6cqw] font-serif text-[7cqw] leading-[0.92] tracking-[-0.01em]">
            Light, <em>beautifully</em>
            <br />
            curated.
          </p>
          <span className="mt-[2.8cqw] border border-[#C8A26B] px-[2.6cqw] py-[1.1cqw] text-[0.95cqw] uppercase tracking-[0.25em] text-[#C8A26B]">
            Explore collections
          </span>
        </div>
      </div>
      <div className="px-[5cqw] py-[5cqw]">
        <div className="flex items-end justify-between">
          <p className="font-serif text-[3.6cqw] leading-none">Shop the look</p>
          <span className="text-[1cqw] uppercase tracking-[0.2em] text-[#C8A26B]">View all</span>
        </div>
        <div className="mt-[2.6cqw] grid grid-cols-4 gap-[1.4cqw]">
          {(
            [
              ["pendantDining", "Orb Pendant", "$420"],
              ["lumiereLounge", "Atelier Floor Lamp", "$680"],
              ["archNook", "Alcove Sconce", "$290"],
              ["nordStove", "Hearth Table Lamp", "$340"],
            ] as const
          ).map(([p, t, price]) => (
            <div key={t}>
              <Img name={p} className="aspect-[3/4]" />
              <div className="mt-[1cqw] flex justify-between text-[1.05cqw]">
                <span>{t}</span>
                <span className="text-[#C8A26B]">{price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 items-center border-t border-[#F2EBDD]/10">
        <Img name="lumiereLounge" className="aspect-[5/4]" />
        <div className="px-[5cqw]">
          <p className="font-mono text-[0.9cqw] uppercase tracking-[0.3em] text-[#C8A26B]">By appointment</p>
          <p className="mt-[1.4cqw] font-serif text-[4cqw] leading-[0.95]">Visit our showroom.</p>
          <p className="mt-[1.6cqw] max-w-[34cqw] text-[1.15cqw] leading-relaxed text-[#F2EBDD]/70">
            See, touch and switch on every piece. Our stylists will help you light each room with intention.
          </p>
          <span className="mt-[2.4cqw] inline-block bg-[#C8A26B] px-[2.4cqw] py-[1.1cqw] text-[0.95cqw] uppercase tracking-[0.2em] text-[#0E0D0B]">
            Book an appointment
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── Hue & Co. · painters & decorators ───────────────────────── */

function HueAndCo() {
  const swatches = [
    ["#E0A526", "Mustard Seed"],
    ["#3D5A80", "Harbour Blue"],
    ["#E07A5F", "Terracotta"],
    ["#98B08F", "Sage"],
    ["#EFE8DD", "Chalk"],
  ];
  return (
    <div className="bg-[#FFFDF8] text-[#1D1D1B]">
      <div className="flex items-center justify-between px-[5cqw] py-[2cqw]">
        <span className="text-[2.2cqw] font-extrabold tracking-[-0.04em]">
          hue<span className="text-[#E0A526]">&amp;</span>co.
        </span>
        <span className="flex gap-[2.6cqw] text-[1.05cqw] font-semibold text-[#55534E]">
          <span>Services</span>
          <span>Colours</span>
          <span>Projects</span>
          <span>Reviews</span>
        </span>
        <span className="rounded-full bg-[#E0A526] px-[2cqw] py-[1cqw] text-[1.05cqw] font-bold">Free quote</span>
      </div>
      <div className="grid grid-cols-[1.1fr_1fr] items-center gap-[4cqw] px-[5cqw] pb-[5cqw] pt-[3cqw]">
        <div>
          <p className="text-[6.4cqw] font-extrabold leading-[0.92] tracking-[-0.05em]">
            Colour,
            <br />
            done{" "}
            <span className="relative inline-block">
              properly.
              <svg viewBox="0 0 300 30" preserveAspectRatio="none" className="absolute -bottom-[0.6cqw] left-0 h-[1.4cqw] w-full" aria-hidden="true">
                <path d="M4 20C80 8 190 6 296 14" stroke="#E0A526" strokeWidth="9" strokeLinecap="round" fill="none" />
              </svg>
            </span>
          </p>
          <p className="mt-[2.2cqw] max-w-[36cqw] text-[1.25cqw] leading-relaxed text-[#55534E]">
            Interior and exterior painting, wallpapering and finishes by a tidy, punctual team who treat your home like their own.
          </p>
          <div className="mt-[2.4cqw] flex gap-[1.2cqw]">
            <span className="rounded-full bg-[#1D1D1B] px-[2.2cqw] py-[1.1cqw] text-[1.05cqw] font-bold text-white">Get a free quote</span>
            <span className="rounded-full border-2 border-[#1D1D1B] px-[2.2cqw] py-[1cqw] text-[1.05cqw] font-bold">See our work</span>
          </div>
          <div className="mt-[3cqw] flex gap-[1.2cqw]">
            {swatches.map(([c, n]) => (
              <div key={n} className="text-center">
                <span className="block size-[4.2cqw] rounded-full ring-1 ring-black/10" style={{ background: c }} />
                <span className="mt-[0.6cqw] block text-[0.8cqw] text-[#55534E]">{n}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <Img name="hueRooms" className="aspect-[4/5] rounded-[2cqw]" />
          <div className="absolute -left-[3cqw] bottom-[3cqw] flex items-center gap-[1cqw] rounded-[1.2cqw] bg-white p-[1.2cqw] pr-[2cqw] shadow-xl">
            <span className="size-[3.4cqw] rounded-[0.8cqw] bg-[#3D5A80]" />
            <span>
              <span className="block text-[0.8cqw] font-semibold uppercase tracking-[0.15em] text-[#8A877F]">Colour of the month</span>
              <span className="block text-[1.4cqw] font-extrabold">Harbour Blue</span>
            </span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-[2.4cqw] bg-[#F6F1E7] px-[5cqw] py-[4.5cqw]">
        {[
          ["Interior painting", "Walls, ceilings, woodwork and feature walls with flawless edges."],
          ["Exterior painting", "Weather-tough finishes that protect and refresh your home."],
          ["Wallpaper & finishes", "Wallpaper hanging, limewash and decorative effects."],
        ].map(([t, d], i) => (
          <div key={t}>
            <span className="grid size-[4cqw] place-items-center rounded-full text-[1.6cqw] font-extrabold" style={{ background: swatches[i][0] }}>
              {i + 1}
            </span>
            <p className="mt-[1.4cqw] text-[1.7cqw] font-extrabold tracking-tight">{t}</p>
            <p className="mt-[0.6cqw] text-[1.1cqw] leading-relaxed text-[#55534E]">{d}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-[1.6cqw] px-[5cqw] py-[4.5cqw]">
        {(
          [
            ["hueMustard", "Mustard Seed · Hallway"],
            ["hueBlue", "Harbour Blue · Dining room"],
          ] as const
        ).map(([p, t]) => (
          <div key={t} className="relative">
            <Img name={p} className="aspect-[4/3] rounded-[1.4cqw]" />
            <span className="absolute bottom-[1.4cqw] left-[1.4cqw] rounded-full bg-white px-[1.4cqw] py-[0.6cqw] text-[1cqw] font-bold">{t}</span>
          </div>
        ))}
      </div>
      <div className="mx-[5cqw] mb-[4cqw] flex items-center justify-between rounded-[2cqw] bg-[#E0A526] px-[4cqw] py-[3.6cqw]">
        <p className="text-[3cqw] font-extrabold leading-none tracking-[-0.04em]">Get a free, no-obligation quote.</p>
        <span className="rounded-full bg-[#1D1D1B] px-[2.2cqw] py-[1.1cqw] text-[1.05cqw] font-bold text-white">Book a visit</span>
      </div>
    </div>
  );
}

export const conceptSites: Record<ExampleKey, () => JSX.Element> = {
  nord: AtelierNord,
  stone: StoneOak,
  lumiere: MaisonLumiere,
  hue: HueAndCo,
};
