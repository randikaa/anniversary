"use client";

import { motion } from "framer-motion";
import { Disc3, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { music } from "@/config/data";

interface AmbientPlayerProps {
  playing: boolean;
  onToggle: () => void;
}

export function AmbientPlayer({ playing, onToggle }: AmbientPlayerProps) {
  return (
    <motion.aside
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-6 right-6 z-40 flex items-center"
      aria-label="Ambient romantic music player"
    >
      <div className="glass group relative flex items-center gap-3.5 rounded-full p-2 pr-5 shadow-lift transition-all duration-300 hover:shadow-glow">
        {/* Spinning Vinyl Record Disc */}
        <button
          onClick={onToggle}
          className="relative flex size-12 sm:size-14 items-center justify-center rounded-full overflow-hidden focus:outline-none"
          aria-label={playing ? "Pause background music" : "Play our romantic song"}
        >
          {/* Vinyl grooves background with CSS animation */}
          <div
            className={`absolute inset-0 vinyl-grooves rounded-full ${
              playing ? "animate-spin-slow" : ""
            }`}
          />

          {/* Golden Center Label */}
          <div className="relative flex size-5 sm:size-6 items-center justify-center rounded-full border border-gold/60 bg-burgundy shadow-inner">
            <span className="size-1.5 rounded-full bg-ivory" />
          </div>

          {/* Hover / Active Play/Pause overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-charcoal/40 opacity-0 backdrop-blur-2xs transition-opacity group-hover:opacity-100">
            {playing ? (
              <Pause className="size-5 text-ivory fill-ivory" />
            ) : (
              <Play className="size-5 text-gold-soft fill-gold-soft ml-0.5" />
            )}
          </div>
        </button>

        {/* Track details & Equalizer bars */}
        <div className="flex flex-col cursor-pointer" onClick={onToggle}>
          <div className="flex items-center gap-2">
            <span className="text-xs font-serif font-medium text-charcoal sm:text-sm">
              {music.title}
            </span>
            {/* Animated mini equalizer when playing */}
            {playing ? (
              <div className="flex items-end gap-0.5 h-3" aria-hidden="true">
                <span className="w-0.5 bg-burgundy rounded-full animate-[bounce_0.8s_infinite_100ms] h-full" />
                <span className="w-0.5 bg-gold rounded-full animate-[bounce_0.9s_infinite_300ms] h-2/3" />
                <span className="w-0.5 bg-rose rounded-full animate-[bounce_0.7s_infinite_200ms] h-4/5" />
              </div>
            ) : (
              <span className="text-[0.65rem] uppercase tracking-wider text-taupe font-sans">
                Paused
              </span>
            )}
          </div>
          <span className="text-[0.65rem] text-taupe font-sans">
            {music.artist}
          </span>
        </div>

        {/* Volume icon toggle button */}
        <button
          onClick={onToggle}
          className="ml-1 text-taupe transition-colors hover:text-burgundy"
          aria-label={playing ? "Mute" : "Unmute"}
        >
          {playing ? <Volume2 className="size-4 text-burgundy" /> : <VolumeX className="size-4" />}
        </button>
      </div>
    </motion.aside>
  );
}
