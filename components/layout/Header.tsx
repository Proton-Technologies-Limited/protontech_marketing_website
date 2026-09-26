"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { getLenis, scrollToTarget } from "@/lib/lenis-store";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type Tone = "dark" | "light";

export function Header() {
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const [tone, setTone] = useState<Tone>("dark");
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  // On scroll (Lenis drives native scroll, so window events fire):
  // compact state, hide-on-scroll-down, and adopt the theme of the section under the header.
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-header-theme]"));
    let lastY = window.scrollY;
    let frame = 0;

    const probe = () => {
      const line = 44; // vertical centre of the header bar
      for (const section of sections) {
        const r = section.getBoundingClientRect();
        if (r.top <= line && r.bottom > line) {
          setTone(section.dataset.headerTheme as Tone);
          setActive(section.id);
          return;
        }
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 24);
        if (Math.abs(y - lastY) > 8) {
          setHidden(y > lastY && y > 560);
          lastY = y;
        }
        probe();
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const closeMenu = useCallback((focusToggle = true) => {
    setOpen(false);
    if (focusToggle) toggleRef.current?.focus();
  }, []);

  // Menu side effects: lock scroll, make the page inert, Escape to close.
  useEffect(() => {
    const main = document.getElementById("main");
    if (open) {
      getLenis()?.stop();
      document.documentElement.style.overflow = "hidden";
      main?.setAttribute("inert", "");
      menuRef.current?.querySelector<HTMLElement>("a")?.focus();
    } else {
      getLenis()?.start();
      document.documentElement.style.overflow = "";
      main?.removeAttribute("inert");
    }
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && open && closeMenu();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeMenu]);

  const onMenuLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    closeMenu(false);
    // Let the menu start closing (and Lenis restart) before scrolling.
    requestAnimationFrame(() => scrollToTarget(href));
  };

  const light = tone === "light" && !open;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "container-x transition-[padding,translate] duration-700 ease-out-expo",
          scrolled ? "pt-3" : "pt-5",
          hidden && !open ? "-translate-y-[120%]" : "translate-y-0",
        )}
      >
        <div
          className={cn(
            "mx-auto flex h-16 items-center justify-between gap-6 rounded-full pl-5 pr-2 transition-[max-width,background-color,border-color,box-shadow] duration-700 ease-out-expo",
            "border",
            scrolled || open ? "max-w-[76rem]" : "max-w-full",
            !scrolled || open
              ? "border-transparent bg-transparent"
              : light
                ? "border-ink-900/10 bg-white/75 shadow-[0_10px_40px_-18px_rgb(7_26_51/0.35)] backdrop-blur-xl"
                : "border-white/10 bg-ink-900/65 shadow-[0_10px_40px_-18px_rgb(0_0_0/0.6)] backdrop-blur-xl",
          )}
        >
          <a href="#top" aria-label={`${site.legalName}, back to top`} className="relative z-10 shrink-0 text-[15px]">
            <Logo tone={light ? "light" : "dark"} />
          </a>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {site.nav.map((item) => {
                const isActive = active === item.href.slice(1);
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "group relative flex items-center gap-2 rounded-full px-4 py-2 text-[0.9rem] font-medium transition-colors duration-300",
                        light ? "text-steel-700 hover:text-ink-950" : "text-steel-300 hover:text-white",
                        isActive && (light ? "text-ink-950" : "text-white"),
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          "size-1.5 rounded-full transition-all duration-500 ease-out-expo",
                          light ? "bg-blue-500" : "bg-cyan-400",
                          isActive ? "scale-100 opacity-100" : "scale-0 opacity-0",
                        )}
                      />
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="relative z-10 flex items-center gap-2">
            <Button
              href="#apply"
              size="sm"
              variant={light ? "solid" : "beam"}
              className="hidden sm:inline-flex"
            >
              Apply free
            </Button>
            <button
              ref={toggleRef}
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
              className={cn(
                "grid size-11 place-items-center rounded-full border transition-colors duration-300 lg:hidden",
                light ? "border-ink-900/15 text-ink-950" : "border-white/15 text-white",
              )}
            >
              <span className="relative block h-3 w-5" aria-hidden="true">
                <span
                  className={cn(
                    "absolute left-0 h-[1.5px] w-full bg-current transition-transform duration-500 ease-out-expo",
                    open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 h-[1.5px] w-full bg-current transition-transform duration-500 ease-out-expo",
                    open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        ref={menuRef}
        data-theme="dark"
        aria-hidden={!open}
        inert={!open}
        className={cn(
          "bg-grid fixed inset-0 -z-10 flex flex-col bg-ink-950 px-[var(--gutter)] pb-10 pt-32 transition-[clip-path] duration-700 ease-out-expo lg:hidden",
          open ? "[clip-path:inset(0_0_0_0)]" : "[clip-path:inset(0_0_100%_0)]",
        )}
      >
        <nav aria-label="Mobile">
          <ul className="flex flex-col">
            {[...site.nav, { label: "Apply", href: "#apply" }].map((item, i) => (
              <li key={item.href} className="overflow-hidden border-b border-white/10">
                <a
                  href={item.href}
                  onClick={(e) => onMenuLink(e, item.href)}
                  className={cn(
                    "flex items-baseline justify-between py-5 text-[clamp(2rem,9vw,3.25rem)] font-extrabold tracking-[-0.04em] transition-transform duration-700 ease-out-expo",
                    open ? "translate-y-0" : "translate-y-full",
                  )}
                  style={{ transitionDelay: open ? `${120 + i * 60}ms` : "0ms" }}
                >
                  {item.label}
                  <span className="font-mono text-xs tracking-[0.14em] text-sky-300">0{i + 1}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto flex flex-col gap-4 pt-10">
          <p className="mono-label text-steel-300">Free website program for decoration businesses</p>
          <a href={`mailto:${site.email}`} className="text-lg font-semibold text-white">
            {site.email}
          </a>
        </div>
      </div>
    </header>
  );
}
