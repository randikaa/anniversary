"use client";

import { useEffect, useRef } from "react";

interface StarfieldProps {
  /** "light" = gold & rose dust for ivory backgrounds, "dark" = starlight for night. */
  variant?: "light" | "dark";
  /** Particles per 10,000 px² (scaled down automatically on small screens). */
  density?: number;
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  phase: number;
  speed: number;
  color: string;
  glow: boolean;
}

const COLORS = {
  light: ["212,175,55", "196,116,124", "169,134,42", "233,212,154", "140,45,56"],
  dark: ["255,250,240", "233,212,154", "212,175,55", "240,214,210"],
};

/**
 * A lightweight canvas of drifting, twinkling motes. Everything (including
 * randomness) happens inside effects, so nothing runs during server prerender.
 */
export function Starfield({ variant = "light", density = 1.1, className = "" }: StarfieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const palette = COLORS[variant];
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let raf = 0;
    let visible = true;

    const spawn = (anywhere: boolean): Particle => {
      const big = Math.random() < 0.08;
      return {
        x: Math.random() * width,
        y: anywhere ? Math.random() * height : height + 10,
        r: big ? 1.6 + Math.random() * 1.6 : 0.5 + Math.random() * 1.1,
        vx: (Math.random() - 0.5) * 0.12,
        vy: -(0.05 + Math.random() * 0.22),
        phase: Math.random() * Math.PI * 2,
        speed: 0.6 + Math.random() * 1.4,
        color: palette[Math.floor(Math.random() * palette.length)],
        glow: big,
      };
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const mobileFactor = width < 640 ? 0.65 : 1;
      const count = Math.round(((width * height) / 10_000) * density * mobileFactor);
      particles = Array.from({ length: Math.min(count, 260) }, () => spawn(true));
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);
      const time = t / 1000;
      for (const p of particles) {
        if (!reduced) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.y < -10 || p.x < -10 || p.x > width + 10) Object.assign(p, spawn(false));
        }
        const twinkle = 0.35 + 0.65 * Math.abs(Math.sin(time * p.speed + p.phase));
        const alpha = (variant === "dark" ? 0.9 : 0.55) * twinkle;
        if (p.glow) {
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6);
          g.addColorStop(0, `rgba(${p.color},${alpha * 0.55})`);
          g.addColorStop(1, `rgba(${p.color},0)`);
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 6, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = `rgba(${p.color},${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = (t: number) => {
      draw(t);
      if (visible && !reduced) raf = requestAnimationFrame(loop);
    };

    resize();
    raf = requestAnimationFrame(loop);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Pause the animation when it scrolls out of view to save battery.
    const io = new IntersectionObserver(([entry]) => {
      const was = visible;
      visible = entry.isIntersecting;
      if (visible && !was && !reduced) raf = requestAnimationFrame(loop);
    });
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [variant, density]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
