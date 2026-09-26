import { Magnetic } from "@/components/motion/Magnetic";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { footer } from "@/lib/content";
import { site } from "@/lib/site";
import { withAccent } from "@/lib/utils";
import { BackToTop, FooterWordmark } from "./FooterWordmark";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer data-theme="dark" data-header-theme="dark" className="relative overflow-hidden bg-ink-950 text-white">
      <div aria-hidden="true" className="bg-grid mask-fade-y pointer-events-none absolute inset-0 opacity-50" />

      <div className="container-x relative pt-[clamp(5rem,9vw,8rem)]">
        <div className="grid gap-10 border-b border-white/10 pb-16 lg:grid-cols-12 lg:items-end">
          <p data-reveal="lines" className="display-2 text-white lg:col-span-8">
            {withAccent(footer.closing)}
          </p>
          <div data-reveal="fade-up" className="flex flex-col items-start gap-5 lg:col-span-4 lg:items-end">
            <Magnetic>
              <Button href="#apply" variant="beam">
                Apply for your free website
              </Button>
            </Magnetic>
            <a href={`mailto:${site.email}`} className="link-draw text-lg font-semibold text-steel-200 hover:text-white">
              {site.email}
            </a>
          </div>
        </div>

        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12">
          <div className="sm:col-span-2 lg:col-span-4">
            <a href="#top" aria-label={`${site.legalName}, back to top`} className="inline-block text-[17px]">
              <Logo tone="dark" />
            </a>
            <p className="mt-6 max-w-[34ch] leading-relaxed text-steel-300">{footer.blurb}</p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-2 lg:col-start-6">
            <p className="mono-label text-sky-300">Explore</p>
            <ul className="mt-5 space-y-3">
              {footer.explore.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="link-draw text-steel-200 transition-colors hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <p className="mono-label text-sky-300">Solutions</p>
            <ul className="mt-5 space-y-3 text-steel-200">
              {footer.services.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="mono-label text-sky-300">Contact</p>
            <ul className="mt-5 space-y-3">
              <li>
                <a href={`mailto:${site.email}`} className="link-draw text-steel-200 [overflow-wrap:anywhere] hover:text-white">
                  {site.email}
                </a>
              </li>
              <li>
                <a href="#apply" className="link-draw text-steel-200 hover:text-white">
                  Apply online
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <FooterWordmark />

      <div className="container-x relative flex flex-col gap-5 border-t border-white/10 py-8 text-sm text-steel-400 md:flex-row md:items-center md:justify-between">
        <p>
          © {year} {site.legalName}. All rights reserved.
        </p>
        <p>
          Concept imagery via{" "}
          <a href="https://unsplash.com" className="link-draw text-steel-300 hover:text-white" rel="noopener" target="_blank">
            Unsplash
          </a>
        </p>
        <BackToTop />
      </div>
    </footer>
  );
}
