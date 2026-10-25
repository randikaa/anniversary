"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Controls a single looping background track rendered via an <audio> element.
 * `play()` must be called from a user gesture (click / key / input) to satisfy
 * mobile autoplay policies — the passcode unlock is a perfect moment for that.
 */
export function useAmbientAudio(targetVolume = 0.55) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef = useRef<number | null>(null);
  const [playing, setPlaying] = useState(false);

  const fadeTo = useCallback((to: number, ms: number, done?: () => void) => {
    const audio = audioRef.current;
    if (!audio) return;
    if (fadeRef.current) cancelAnimationFrame(fadeRef.current);
    const from = audio.volume;
    const start = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, Math.max(0, (t - start) / ms));
      const nextVol = Math.min(1, Math.max(0, from + (to - from) * p));
      audio.volume = nextVol;
      if (p < 1) {
        fadeRef.current = requestAnimationFrame(step);
      } else {
        fadeRef.current = null;
        audio.volume = Math.min(1, Math.max(0, to));
        done?.();
      }
    };
    fadeRef.current = requestAnimationFrame(step);
  }, []);

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0;
    const attempt = audio.play();
    fadeTo(Math.min(1, Math.max(0, targetVolume)), 1800);
    attempt?.catch(() => {
      // Autoplay was blocked — the floating player lets her start it manually.
      setPlaying(false);
    });
  }, [fadeTo, targetVolume]);

  const pause = useCallback(() => {
    fadeTo(0, 500, () => audioRef.current?.pause());
  }, [fadeTo]);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) play();
    else pause();
  }, [play, pause]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      if (fadeRef.current) cancelAnimationFrame(fadeRef.current);
    };
  }, []);

  return { audioRef, playing, play, pause, toggle };
}
