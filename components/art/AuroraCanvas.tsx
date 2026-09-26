"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

// Domain-warped gradient noise tinted with the Proton palette, plus a soft
// pointer glow. It's all soft gradients, so it renders at a fraction of the
// display resolution and is upscaled by the browser (film grain comes from CSS).
const FRAG = `
precision mediump float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_focus;
uniform float u_strength;

vec2 hash(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(dot(hash(i), f), dot(hash(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
             mix(dot(hash(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)), dot(hash(i + vec2(1.0)), f - vec2(1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) { v += a * noise(p); p *= 2.03; a *= 0.5; }
  return v;
}
float fbm3(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 3; i++) { v += a * noise(p); p *= 2.03; a *= 0.5; }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  float aspect = u_res.x / u_res.y;
  vec2 p = vec2(uv.x * aspect, uv.y);
  float t = u_time * 0.035;

  vec2 q = vec2(fbm3(p * 1.25 + vec2(0.0, t)), fbm3(p * 1.25 + vec2(5.2, -t)));
  float n = fbm(p * 1.1 + 1.7 * q + vec2(t * 0.6, t * 0.25)) * 0.5 + 0.5;

  vec2 focus = vec2(u_focus.x * aspect, u_focus.y);
  vec2 m = vec2(u_mouse.x * aspect, u_mouse.y);
  float g1 = smoothstep(1.2, 0.0, distance(p, focus)) * u_strength;
  float g2 = smoothstep(0.95, 0.0, distance(p, vec2(aspect * 0.04, -0.08)));
  float gm = smoothstep(0.5, 0.0, distance(p, m));

  vec3 ink  = vec3(0.012, 0.051, 0.110);
  vec3 navy = vec3(0.031, 0.282, 0.486);
  vec3 blue = vec3(0.063, 0.549, 0.910);
  vec3 cyan = vec3(0.094, 0.769, 0.988);

  vec3 col = ink;
  col = mix(col, navy, clamp(g1 * n * 1.3, 0.0, 1.0) * 0.8);
  col = mix(col, blue, clamp(pow(g1, 2.3) * n, 0.0, 1.0) * 0.5);
  col = mix(col, cyan, clamp(pow(g1, 4.5) * n * n, 0.0, 1.0) * 0.3);
  col = mix(col, navy, clamp(g2 * n, 0.0, 1.0) * 0.4);
  col += cyan * gm * 0.07 * n;
  col *= mix(0.72, 1.0, smoothstep(1.25, 0.25, distance(uv, vec2(0.55, 0.5))));
  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

/**
 * Ambient brand aurora. Pure WebGL (no three.js), so it's only a few KB.
 * It pauses off-screen and on hidden tabs, and renders a single still frame for reduced motion.
 */
export function AuroraCanvas({ className, focusX = 0.78, focusY = 0.62 }: { className?: string; focusX?: number; focusY?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" });
    if (!gl || gl.isContextLost()) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    const program = gl.createProgram();
    if (!vs || !fs || !program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(program, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "u_res");
    const uTime = gl.getUniformLocation(program, "u_time");
    const uMouse = gl.getUniformLocation(program, "u_mouse");
    const uFocus = gl.getUniformLocation(program, "u_focus");
    const uStrength = gl.getUniformLocation(program, "u_strength");
    gl.uniform2f(uFocus, focusX, focusY);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // ~0.35 buffer pixels per CSS pixel regardless of DPR: roughly 1/6 of the
    // previous fill cost on retina screens with no visible difference.
    const scale = 0.35;
    const FRAME_MS = 1000 / 30; // the drift is slow, so 30fps is indistinguishable
    const mouse = { x: 0.7, y: 0.6, tx: 0.7, ty: 0.6 };
    const pointer = { x: -1, y: -1, dirty: false };

    const resize = () => {
      const w = Math.max(1, Math.round(canvas.clientWidth * scale));
      const h = Math.max(1, Math.round(canvas.clientHeight * scale));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
      gl.uniform2f(uRes, w, h);
      // Tall, narrow screens: the glow would flood everything, so tone it down.
      gl.uniform1f(uStrength, Math.min(1, Math.max(0.55, w / h)));
    };

    let raf = 0;
    let running = false;
    let lastDraw = 0;
    const start = performance.now() - 20000;
    const frame = (now: number) => {
      if (running && now - lastDraw < FRAME_MS) {
        raf = requestAnimationFrame(frame);
        return;
      }
      lastDraw = now;
      // Map the pointer once per drawn frame instead of on every pointermove.
      if (pointer.dirty) {
        const r = canvas.getBoundingClientRect();
        mouse.tx = (pointer.x - r.left) / r.width;
        mouse.ty = 1 - (pointer.y - r.top) / r.height;
        pointer.dirty = false;
      }
      mouse.x += (mouse.tx - mouse.x) * 0.08;
      mouse.y += (mouse.ty - mouse.y) * 0.08;
      gl.uniform1f(uTime, (now - start) / 1000);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (running) raf = requestAnimationFrame(frame);
    };
    const play = () => {
      if (running || reduce) return;
      running = true;
      raf = requestAnimationFrame(frame);
    };
    const pause = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    resize();
    frame(performance.now());
    canvas.dataset.ready = "true";

    const ro = new ResizeObserver(() => {
      resize();
      if (!running) frame(performance.now());
    });
    ro.observe(canvas);

    let inView = true;
    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView && !document.hidden) play();
      else pause();
    });
    io.observe(canvas);

    const onVisibility = () => (document.hidden || !inView ? pause() : play());
    document.addEventListener("visibilitychange", onVisibility);

    const onPointer = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.dirty = true;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    return () => {
      pause();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointer);
      // Release GPU resources but keep the context alive (Strict Mode remounts reuse this canvas).
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      delete canvas.dataset.ready;
    };
  }, [focusX, focusY]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={cn("pointer-events-none opacity-0 transition-opacity duration-[1.6s] data-[ready=true]:opacity-100", className)}
    />
  );
}
