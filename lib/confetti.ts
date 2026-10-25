"use client";

import type { Options, Shape } from "canvas-confetti";

const PALETTE = ["#d4af37", "#e9d49a", "#8c2d38", "#c4747c", "#f0d6d2", "#fffdf9"];

// Classic heart path from the canvas-confetti docs.
const HEART_PATH =
  "M167 72c19,-38 37,-56 75,-56 42,0 76,33 76,75 0,76 -76,151 -151,227 -76,-76 -151,-151 -151,-227 0,-42 33,-75 75,-75 38,0 57,18 76,56z";

let heartShape: Shape | null = null;

async function load() {
  const mod = await import("canvas-confetti");
  const confetti = mod.default;
  if (!heartShape) {
    try {
      heartShape = confetti.shapeFromPath({ path: HEART_PATH });
    } catch {
      heartShape = null;
    }
  }
  return confetti;
}

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** A soft, elegant gold & rose celebration — used when the passcode unlocks. */
export async function celebrate() {
  if (prefersReducedMotion()) return;
  const confetti = await load();
  const shapes: Shape[] = heartShape ? [heartShape, "circle"] : ["circle"];

  const base: Options = {
    colors: PALETTE,
    disableForReducedMotion: true,
    zIndex: 200,
    ticks: 260,
    gravity: 0.7,
    scalar: 1,
  };

  confetti({ ...base, particleCount: 90, spread: 80, startVelocity: 42, origin: { y: 0.62 }, shapes });
  confetti({ ...base, particleCount: 45, angle: 60, spread: 60, origin: { x: 0, y: 0.75 }, shapes });
  confetti({ ...base, particleCount: 45, angle: 120, spread: 60, origin: { x: 1, y: 0.75 }, shapes });

  // A gentle second wave of drifting hearts.
  setTimeout(() => {
    confetti({
      ...base,
      particleCount: 30,
      spread: 120,
      startVelocity: 22,
      gravity: 0.45,
      scalar: 1.4,
      origin: { y: 0.45 },
      shapes: heartShape ? [heartShape] : ["circle"],
    });
  }, 450);
}

/** A tiny burst of hearts from a specific point (0–1 viewport coordinates). */
export async function heartBurst(x: number, y: number) {
  if (prefersReducedMotion()) return;
  const confetti = await load();
  confetti({
    particleCount: 18,
    spread: 70,
    startVelocity: 20,
    gravity: 0.6,
    ticks: 140,
    scalar: 0.9,
    zIndex: 200,
    colors: ["#8c2d38", "#c4747c", "#d4af37"],
    origin: { x, y },
    shapes: heartShape ? [heartShape] : ["circle"],
    disableForReducedMotion: true,
  });
}
