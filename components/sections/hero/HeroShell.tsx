"use client";

import { useRef, type ReactNode } from "react";
import { gsap, MQ, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { scrollToTarget } from "@/lib/lenis-store";

type Q = (selector: string) => HTMLElement[];

/** The rest pose lives in CSS (.hero-plane --ry/--rx) so it renders before hydration; read it back here. */
function restPose(plane: HTMLElement) {
  const style = getComputedStyle(plane);
  return {
    rotationY: parseFloat(style.getPropertyValue("--ry")) || 0,
    rotationX: parseFloat(style.getPropertyValue("--rx")) || 0,
  };
}

/** Layout position of `el` inside `ancestor`, ignoring transforms. */
function offsetWithin(el: HTMLElement, ancestor: HTMLElement) {
  let left = 0;
  let top = 0;
  for (let node: HTMLElement | null = el; node && node !== ancestor; node = node.offsetParent as HTMLElement | null) {
    left += node.offsetLeft;
    top += node.offsetTop;
  }
  return { left, top };
}

/**
 * Hero timelines render their start states eagerly. With GSAP's default lazy rendering,
 * a start state queued by a build that is reverted in the same task (React Strict Mode,
 * a breakpoint change) can flush later and wipe the rebuilt state.
 */
const EAGER = { lazy: false } as const;

/**
 * Act 1 · the drawing sets up, Act 2 · a scan line renders it, Act 3 · the live UI arrives.
 * Built paused; `from` tweens apply the undrawn state immediately.
 */
function buildIntro(q: Q) {
  const sheet = q("[data-sheet]");
  gsap.set(sheet, { autoAlpha: 1 });

  return gsap
    .timeline({ paused: true, defaults: { ease: "power2.inOut", ...EAGER } })
    .fromTo(q("[data-stage]"), { opacity: 0 }, { opacity: 1, duration: 0.7, ease: "power1.out" }, 0)
    .addLabel("setup", 0)
    .from(q("[data-guide='x']"), { scaleX: 0, duration: 1.4, stagger: 0.12, ease: "expo.inOut" }, "setup")
    .from(q("[data-guide='y']"), { scaleY: 0, duration: 1.4, stagger: 0.1, ease: "expo.inOut" }, "setup+=0.12")
    .from(q("[data-dim]"), { scaleY: 0, duration: 1.1, ease: "expo.inOut" }, "setup+=0.55")
    .from(q("[data-mark-tick]"), { scaleX: 0, duration: 0.6, ease: "expo.out" }, "setup+=0.5")
    .from(q("[data-mark]"), { scale: 0, rotation: -90, duration: 0.8, stagger: 0.07, ease: "expo.out" }, "setup+=0.75")
    .from(q("[data-annot]"), { opacity: 0, duration: 0.6, stagger: 0.08, ease: "power1.out" }, "setup+=1.05")

    .addLabel("draw", 0.3)
    .from(q("[data-bp='frame']"), { drawSVG: 0, duration: 1.2, stagger: 0.05 }, "draw")
    .fromTo(q("[data-col]"), { scaleY: 0, opacity: 0 }, { scaleY: 1, opacity: 1, duration: 0.8, stagger: 0.035, ease: "expo.out" }, "draw+=0.4")
    .from(q("[data-bp='ui']"), { drawSVG: 0, duration: 0.85, stagger: 0.018 }, "draw+=0.6")
    .from(q("[data-bp='art']"), { drawSVG: 0, duration: 1, stagger: 0.02 }, "draw+=1")
    .from(q("[data-bp-label]"), { opacity: 0, duration: 0.6, ease: "power1.out" }, "draw+=1.5")
    .to(q("[data-col]"), { opacity: 0, duration: 0.7, stagger: 0.025, ease: "power1.in" }, "draw+=1.55")

    // The sheet and its contents move in opposite directions, so the drawing stays put while
    // its top edge sweeps down: a moving clip built from transforms, with no repaint.
    .addLabel("render", "draw+=2.1")
    .fromTo(sheet, { yPercent: 0 }, { yPercent: 100, duration: 1.3 }, "render")
    .fromTo(q("[data-sheet-inner]"), { yPercent: 0 }, { yPercent: -100, duration: 1.3 }, "render")
    .fromTo(q("[data-scan]"), { yPercent: 0 }, { yPercent: 100, duration: 1.3 }, "render")
    .fromTo(q("[data-scan]"), { opacity: 0 }, { opacity: 1, duration: 0.2, ease: "none" }, "render")
    .to(q("[data-scan]"), { opacity: 0, duration: 0.4, ease: "power1.out" }, "render+=1.15")
    .set(sheet, { autoAlpha: 0 }, "render+=1.3")
    .fromTo(q("[data-frame-shadow]"), { opacity: 0 }, { opacity: 1, duration: 1.1, ease: "power1.out" }, "render+=0.8")
    .fromTo(q("[data-guides]"), { opacity: 1 }, { opacity: 0.5, duration: 1.2, ease: "power1.inOut" }, "render+=0.8")

    .addLabel("live", "render+=1.1")
    .from(q("[data-arrive]"), { y: 32, opacity: 0, duration: 1.1, stagger: 0.14, ease: "expo.out" }, "live")
    .fromTo(q("[data-perf-num]"), { innerText: 0 }, { innerText: 98, snap: { innerText: 1 }, duration: 1.6, ease: "power3.out" }, "live+=0.3")
    .fromTo(q("[data-perf-ring]"), { strokeDasharray: "0 100" }, { strokeDasharray: "98 100", duration: 1.6, ease: "power3.out" }, "<");
}

/**
 * Ambient loop with a point: a visitor clicks "Book a consultation" and a new
 * enquiry lands. One pass per message, so the timeline repeats seamlessly.
 */
function buildIdle(q: Q) {
  const track = q("[data-cursor-track]")[0];
  const cta = q("[data-site-cta]")[0];
  const ripple = q("[data-site-ripple]")[0];
  const messages = q("[data-enquiry-msg]");
  const ping = q("[data-enquiry-ping]")[0];
  const glow = q("[data-enquiry-glow]")[0];
  const at = { rest: { xPercent: 60, yPercent: 46 }, cta: { xPercent: 11.5, yPercent: 60 } };

  gsap.set(track, at.rest);
  const tl = gsap.timeline({ paused: true, repeat: -1, defaults: { ease: "power2.inOut", ...EAGER } });

  messages.forEach((message, i) => {
    const next = messages[(i + 1) % messages.length];
    tl.to(track, { ...at.cta, duration: 1.5 }, "+=1.4")
      .to(cta, { scale: 0.95, duration: 0.12, ease: "power2.out" })
      .fromTo(ripple, { scale: 0.2, opacity: 0.6 }, { scale: 1, opacity: 0, duration: 0.9, ease: "expo.out", immediateRender: false }, "<")
      .to(cta, { scale: 1, duration: 0.4, ease: "power3.out" }, ">-0.02")
      .addLabel(`enquiry${i}`, "+=0.2")
      .to(message, { yPercent: -100, opacity: 0, duration: 0.45, ease: "power2.in" }, `enquiry${i}`)
      .fromTo(next, { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.8, ease: "expo.out", immediateRender: false }, `enquiry${i}+=0.3`)
      .fromTo(ping, { scale: 1, opacity: 0.9 }, { scale: 3, opacity: 0, duration: 1, ease: "expo.out", immediateRender: false }, "<")
      .fromTo(glow, { opacity: 0 }, { opacity: 1, duration: 0.3, repeat: 1, yoyo: true, ease: "power1.inOut", immediateRender: false }, "<")
      .to(track, { ...at.rest, duration: 1.9 }, "+=0.5");
  });

  return tl;
}

/**
 * Desktop scroll act: the section pins, the copy lifts away, the canvas swings flat
 * to face the viewer and splits into desktop, phone and live cards.
 */
function buildPinned(q: Q, rest: ReturnType<typeof restPose>) {
  const pin = q("[data-hero-pin]")[0];
  const plane = q("[data-plane]")[0];
  const copy = q("[data-hero-copy]");

  // Composition bounds of the presented pose, in frame units (caption, cards and phone hang outside the frame).
  const bounds = { x0: -0.16, x1: 1.08, y0: -0.09, y1: 1.06 };

  const presented = () => {
    const w = plane.offsetWidth;
    const h = plane.offsetHeight;
    const origin = offsetWithin(plane, pin);
    const vw = pin.clientWidth;
    const vh = window.innerHeight;
    const s = Math.min(0.8, (vw * 0.88) / ((bounds.x1 - bounds.x0) * w), (vh - 150) / ((bounds.y1 - bounds.y0) * h));
    const cx = ((bounds.x0 + bounds.x1) / 2) * w;
    const cy = ((bounds.y0 + bounds.y1) / 2) * h;
    // Target: composition centred in the visible part of the pinned panel. Transform origin is the plane's left-centre.
    return {
      s,
      x: vw / 2 - origin.left - s * cx,
      y: pin.offsetHeight - vh / 2 - origin.top - h / 2 - s * (cy - h / 2),
    };
  };
  const w = () => plane.offsetWidth;
  const h = () => plane.offsetHeight;

  const tl = gsap.timeline({
    defaults: { ease: "none", ...EAGER },
    scrollTrigger: {
      trigger: pin,
      pin: true,
      // A panel taller than the viewport scrolls normally until its bottom is reached, then pins.
      start: "bottom bottom",
      end: () => `+=${Math.round(window.innerHeight * 1.2)}`,
      scrub: 0.6,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => pin.classList.toggle("is-presenting", self.progress > 0.12),
    },
  });

  // Offsets are rest → presented positions in frame fractions (see .hero-float-* / .hero-phone in globals.css).
  tl.to(copy, { y: (i) => -40 - i * 18, opacity: 0, duration: 0.18, stagger: 0.02, ease: "power2.in" }, 0)
    .to(q("[data-hero-cue]"), { autoAlpha: 0, duration: 0.08 }, 0)
    .to(q("[data-guides]"), { autoAlpha: 0, duration: 0.2 }, 0.04)
    .fromTo(
      plane,
      { x: 0, y: 0, scale: 1, ...rest },
      { x: () => presented().x, y: () => presented().y, scale: () => presented().s, rotationY: 0, rotationX: 0, duration: 0.5, ease: "power2.inOut" },
      0.08,
    )
    .fromTo(
      q("[data-float='perf']"),
      { x: 0, y: 0, z: 150 },
      { x: () => -0.57 * w(), y: () => 0.14 * h(), z: 90, duration: 0.42, ease: "power2.inOut" },
      0.4,
    )
    .fromTo(
      q("[data-float='enquiry']"),
      { x: 0, y: 0, z: 110 },
      { x: () => -0.42 * w(), y: () => 0.31 * h(), z: 170, duration: 0.42, ease: "power2.inOut" },
      0.44,
    )
    // The phone slides out from behind the desktop frame, then comes forward to overlap it.
    .fromTo(
      q("[data-phone]"),
      { x: 0, y: 0, z: -60, autoAlpha: 0 },
      { x: () => 0.32 * w(), autoAlpha: 1, duration: 0.22, ease: "power2.out" },
      0.46,
    )
    .to(q("[data-phone]"), { x: () => 0.2 * w(), y: () => 0.06 * h(), z: 150, duration: 0.26, ease: "power2.inOut" }, 0.66)
    .fromTo(q("[data-present]"), { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.14, stagger: 0.03, ease: "power2.out" }, 0.8)
    .to({}, { duration: 0.12 });

  return tl;
}

/** Below the desktop breakpoint: no pin. The canvas turns to face the reader as it scrolls through. */
function buildScrolled(q: Q, rest: ReturnType<typeof restPose>) {
  gsap.fromTo(
    q("[data-plane]"),
    { ...rest },
    {
      rotationY: rest.rotationY * 0.25,
      rotationX: 0,
      ease: "none",
      ...EAGER,
      scrollTrigger: { trigger: q("[data-stage]")[0], start: "top 90%", end: "bottom 35%", scrub: true },
    },
  );
}

/** Hero <section>: owns every hero animation (intro, ambient loop, scroll choreography, pointer depth). */
export function HeroShell({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const introDone = useRef(false);

  useGSAP(
    () => {
      const root = ref.current;
      const q = gsap.utils.selector(root) as Q;
      const stage = q("[data-stage]")[0];
      const plane = q("[data-plane]")[0];
      if (!root || !stage || !plane) return;

      gsap.matchMedia().add({ motion: MQ.motion, desktop: MQ.desktop, fine: MQ.finePointer }, (context) => {
        const { motion, desktop, fine } = context.conditions as Record<"motion" | "desktop" | "fine", boolean>;
        if (!motion) {
          stage.classList.add("is-ready");
          return;
        }

        const rest = restPose(plane);
        const intro = buildIntro(q);
        const idle = buildIdle(q);
        stage.classList.add("is-ready");

        // Scroll triggers are created top to bottom: the pin first, so later measurements include its spacing.
        const pinned = desktop ? buildPinned(q, rest) : undefined;
        if (!desktop) buildScrolled(q, rest);

        // Everything ambient sleeps while the hero is off-screen.
        const onScreen = ScrollTrigger.create({
          trigger: root,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => {
            if (introDone.current) idle.paused(!self.isActive);
          },
        });

        intro.eventCallback("onComplete", () => {
          introDone.current = true;
          gsap.to(q("[data-cursor]"), { opacity: 1, duration: 0.5, ease: "power1.out" });
          if (onScreen.isActive) idle.play();
        });

        // If the CSS fallback already revealed the stage (very slow hydration), or this is a
        // breakpoint change, skip straight to the finished state instead of replaying it.
        if (introDone.current || performance.now() > 3800) {
          intro.progress(1);
        } else if (desktop) {
          // Start in step with the CSS headline intro, which began at first paint.
          gsap.delayedCall(Math.max(0, 0.45 - performance.now() / 1000), () => {
            intro.play();
          });
        } else {
          ScrollTrigger.create({ trigger: stage, start: "top 85%", once: true, onEnter: () => intro.play() });
        }

        // Keyboard users tabbing into the (faded) copy get scrolled back to it.
        const onFocus = (e: FocusEvent) => {
          const inCopy = (e.target as Element).closest("[data-hero-copy]");
          const st = pinned?.scrollTrigger;
          if (inCopy && st && st.progress > 0.02) scrollToTarget(0);
        };
        root.addEventListener("focusin", onFocus);

        // Pointer: the whole scene tilts gently toward the cursor; depth does the parallax.
        let onMove: ((e: PointerEvent) => void) | undefined;
        if (desktop && fine) {
          const tilt = q("[data-tilt]")[0];
          const rotY = gsap.quickTo(tilt, "rotationY", { duration: 1.4, ease: "power3" });
          const rotX = gsap.quickTo(tilt, "rotationX", { duration: 1.4, ease: "power3" });
          onMove = (e) => {
            if (!onScreen.isActive) return;
            rotY((e.clientX / window.innerWidth - 0.5) * 7);
            rotX(-(e.clientY / window.innerHeight - 0.5) * 5);
          };
          window.addEventListener("pointermove", onMove, { passive: true });
        }

        return () => {
          root.removeEventListener("focusin", onFocus);
          if (onMove) window.removeEventListener("pointermove", onMove);
          // GSAP can't restore text it tweened, so put the score back for the static state.
          q("[data-perf-num]")[0].textContent = "98";
        };
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      id="top"
      data-theme="dark"
      data-header-theme="dark"
      aria-labelledby="hero-title"
      className="grain relative isolate overflow-hidden bg-ink-950"
    >
      {children}
    </section>
  );
}
