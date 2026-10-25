"use client";

import { useSyncExternalStore } from "react";

export interface Elapsed {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalDays: number;
}

/**
 * Calendar-accurate difference between two dates (handles month lengths and
 * leap years), e.g. "8 years, 11 months, 30 days…".
 */
export function getElapsed(start: Date, now: Date): Elapsed {
  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();
  let days = now.getDate() - start.getDate();
  let hours = now.getHours() - start.getHours();
  let minutes = now.getMinutes() - start.getMinutes();
  let seconds = now.getSeconds() - start.getSeconds();

  if (seconds < 0) {
    seconds += 60;
    minutes--;
  }
  if (minutes < 0) {
    minutes += 60;
    hours--;
  }
  if (hours < 0) {
    hours += 24;
    days--;
  }
  if (days < 0) {
    // Borrow the number of days in the month before `now`'s month.
    days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    months--;
  }
  if (months < 0) {
    months += 12;
    years--;
  }

  const totalDays = Math.max(
    0,
    Math.floor((now.getTime() - start.getTime()) / 86_400_000),
  );

  return {
    years: Math.max(0, years),
    months: Math.max(0, months),
    days: Math.max(0, days),
    hours: Math.max(0, hours),
    minutes: Math.max(0, minutes),
    seconds: Math.max(0, seconds),
    totalDays,
  };
}

/* ── A tiny shared 1-second clock ───────────────────────────────────────────
   Uses useSyncExternalStore so the current time is only ever read in the
   browser. On the server (and during prerender with Cache Components) the
   snapshot is `null`, which keeps the static shell free of `Date` reads.   */

const listeners = new Set<() => void>();
let timer: ReturnType<typeof setInterval> | null = null;
let currentSecond = 0;

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (!timer) {
    currentSecond = Math.floor(Date.now() / 1000);
    timer = setInterval(() => {
      currentSecond = Math.floor(Date.now() / 1000);
      listeners.forEach((l) => l());
    }, 250);
  }
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0 && timer) {
      clearInterval(timer);
      timer = null;
    }
  };
}

function getSnapshot() {
  if (!timer) currentSecond = Math.floor(Date.now() / 1000);
  return currentSecond;
}

function getServerSnapshot() {
  return null;
}

/** Returns the current Unix second (updates every second), or null on the server. */
export function useNowSeconds(): number | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
