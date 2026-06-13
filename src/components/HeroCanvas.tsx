"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { Shards, type ShardVariant } from "./Shards";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  z: number;
}

function readRgb(varName: string, fallback: string): string {
  if (typeof window === "undefined") return fallback;
  const v = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  return v || fallback;
}

/**
 * Cybernetic hero: a zero-dependency Canvas 2D particle/grid network with depth
 * layers + glow and eased pointer influence (repulsion + parallax). Height is
 * content-driven (not full-screen). SSR-safe, pauses offscreen, static under
 * prefers-reduced-motion.
 *
 * Layout: wrap is `isolate` (the backdrop root), decorative layers sit at -z-10,
 * and the content carries NO z-index — so the glass cards' backdrop-filter can
 * reach the canvas/mesh behind them and actually frost.
 */
export function HeroCanvas({
  children,
  className = "",
  shardVariant,
}: {
  children: ReactNode;
  className?: string;
  shardVariant?: ShardVariant;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let isMobile = window.matchMedia("(max-width: 767px)").matches;
    let particles: Particle[] = [];
    let raf = 0;
    let running = false;

    const primary = readRgb("--color-primary", "34 211 238");
    const accent = readRgb("--color-accent", "99 102 241");

    const ptr = { tx: 0, ty: 0, cx: 0, cy: 0, ts: 0, cs: 0 };

    const seed = () => {
      width = wrap.clientWidth;
      height = wrap.clientHeight;
      isMobile = window.matchMedia("(max-width: 767px)").matches;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const target = isMobile ? 28 : 70;
      const count = Math.max(16, Math.min(target, Math.round((width * height) / 16000)));
      particles = Array.from({ length: count }, () => {
        const z = 0.35 + Math.random() * 0.65;
        const speed = 0.12 + z * 0.22;
        const ang = Math.random() * Math.PI * 2;
        return { x: Math.random() * width, y: Math.random() * height, vx: Math.cos(ang) * speed, vy: Math.sin(ang) * speed, z };
      });
      ptr.cx = ptr.tx = width / 2;
      ptr.cy = ptr.ty = height / 2;
    };

    const frame = () => {
      const linkDist = isMobile ? 116 : 158;
      const drawLines = !isMobile || width > 360;

      ptr.cx += (ptr.tx - ptr.cx) * 0.08;
      ptr.cy += (ptr.ty - ptr.cy) * 0.08;
      ptr.cs += (ptr.ts - ptr.cs) * 0.06;
      const s = ptr.cs;
      const paX = ((ptr.cx - width / 2) / width) * 60 * s;
      const paY = ((ptr.cy - height / 2) / height) * 60 * s;

      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -20) p.x += width + 40;
        else if (p.x > width + 20) p.x -= width + 40;
        if (p.y < -20) p.y += height + 40;
        else if (p.y > height + 20) p.y -= height + 40;

        if (s > 0.001) {
          const dx = p.x - ptr.cx;
          const dy = p.y - ptr.cy;
          const d2 = dx * dx + dy * dy;
          if (d2 < 16000 && d2 > 0.01) {
            const f = (1 - d2 / 16000) * 0.9 * s;
            const d = Math.sqrt(d2);
            p.x += (dx / d) * f;
            p.y += (dy / d) * f;
          }
        }
      }

      if (drawLines) {
        for (let i = 0; i < particles.length; i++) {
          const a = particles[i]!;
          const ax = a.x + paX * a.z;
          const ay = a.y + paY * a.z;
          for (let j = i + 1; j < particles.length; j++) {
            const b = particles[j]!;
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const dist = Math.hypot(dx, dy);
            if (dist < linkDist) {
              const alpha = (1 - dist / linkDist) * 0.28 * ((a.z + b.z) / 2);
              ctx.strokeStyle = `rgb(${primary} / ${alpha})`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(ax, ay);
              ctx.lineTo(b.x + paX * b.z, b.y + paY * b.z);
              ctx.stroke();
            }
          }
        }
      }

      for (const p of particles) {
        const x = p.x + paX * p.z;
        const y = p.y + paY * p.z;
        const r = 1 + p.z * 2.2;
        ctx.beginPath();
        ctx.arc(x, y, r * 2.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgb(${accent} / ${0.06 * p.z})`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgb(${accent} / ${0.35 + p.z * 0.5})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    seed();
    start();

    const onPointerMove = (e: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      ptr.tx = e.clientX - rect.left;
      ptr.ty = e.clientY - rect.top;
      ptr.ts = 1;
    };
    const onPointerLeave = () => {
      ptr.ts = 0;
      ptr.tx = width / 2;
      ptr.ty = height / 2;
    };
    wrap.addEventListener("pointermove", onPointerMove);
    wrap.addEventListener("pointerleave", onPointerLeave);

    const io = new IntersectionObserver(([entry]) => (entry?.isIntersecting ? start() : stop()), { threshold: 0 });
    io.observe(wrap);

    let resizeRaf = 0;
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(seed);
    });
    ro.observe(wrap);

    return () => {
      stop();
      cancelAnimationFrame(resizeRaf);
      io.disconnect();
      ro.disconnect();
      wrap.removeEventListener("pointermove", onPointerMove);
      wrap.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <div ref={wrapRef} className={`relative isolate w-full overflow-hidden ${className}`}>
      {/* Always-on depth layer: radial brand mesh + faint grid. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(60% 55% at 18% 12%, rgb(var(--color-primary) / 0.18), transparent 62%), radial-gradient(55% 50% at 85% 22%, rgb(var(--color-accent) / 0.14), transparent 60%), radial-gradient(70% 60% at 60% 100%, rgb(var(--color-primary) / 0.08), transparent 65%), linear-gradient(rgb(var(--border-subtle) / 0.04) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--border-subtle) / 0.04) 1px, transparent 1px)",
          backgroundSize: "100% 100%, 100% 100%, 100% 100%, 64px 64px, 64px 64px",
        }}
      />
      {/* Vignette to seat the content. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: "radial-gradient(120% 90% at 50% 45%, transparent 55%, rgb(var(--bg-app) / 0.7) 100%)" }}
      />
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 -z-10 h-full w-full" aria-hidden="true" />
      {shardVariant ? <Shards variant={shardVariant} /> : null}
      <div className="relative">{children}</div>
    </div>
  );
}
