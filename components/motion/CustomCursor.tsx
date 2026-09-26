"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, MQ } from "@/lib/gsap";

type CursorState = "default" | "link" | "view" | "drag" | "text";

const INTERACTIVE = "a, button, [role='button'], summary, label, [data-cursor]";
const TEXT_INPUT = "input:not([type='checkbox']):not([type='radio']):not([type='submit']), textarea, select";

/**
 * A "circuit node" cursor: a precise dot plus a trailing ring.
 * States are declared in markup with data-cursor="view|drag|link|hide"
 * and data-cursor-label="View". Colours follow the [data-theme] under the pointer.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const mq = window.matchMedia(`${MQ.finePointer} and ${MQ.motion}`);
    const sync = () => setEnabled(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!enabled || !root || !dot || !ring || !label) return;

    const html = document.documentElement;
    html.classList.add("has-cursor");

    const dotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.55, ease: "power3" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.55, ease: "power3" });

    let visible = false;
    const setState = (state: CursorState, text = "") => {
      root.dataset.state = state;
      label.textContent = text;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      if (!visible) {
        gsap.set([dot, ring], { x: e.clientX, y: e.clientY });
        root.dataset.visible = "true";
        visible = true;
      }
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const onOver = (e: PointerEvent) => {
      const target = e.target as Element | null;
      if (!target) return;
      const themed = target.closest<HTMLElement>("[data-theme]");
      root.dataset.theme = themed?.dataset.theme ?? "dark";

      if (target.closest(TEXT_INPUT)) return setState("text");
      const el = target.closest<HTMLElement>(INTERACTIVE);
      if (!el) return setState("default");
      const kind = el.dataset.cursor;
      if (kind === "hide") return setState("text");
      if (kind === "view" || kind === "drag") return setState(kind, el.dataset.cursorLabel ?? (kind === "view" ? "View" : "Drag"));
      setState("link");
    };

    const onLeaveWindow = () => {
      root.dataset.visible = "false";
      visible = false;
    };
    const onDown = () => (root.dataset.pressed = "true");
    const onUp = () => (root.dataset.pressed = "false");

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("pointerdown", onDown, { passive: true });
    document.addEventListener("pointerup", onUp, { passive: true });
    html.addEventListener("pointerleave", onLeaveWindow);

    return () => {
      html.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointerup", onUp);
      html.removeEventListener("pointerleave", onLeaveWindow);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div ref={rootRef} className="cursor" aria-hidden="true" data-state="default" data-theme="dark" data-visible="false">
      <div ref={ringRef} className="cursor__ring">
        <span>
          <span ref={labelRef} className="cursor__label" />
        </span>
      </div>
      <div ref={dotRef} className="cursor__dot">
        <span />
      </div>
    </div>
  );
}
