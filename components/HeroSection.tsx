"use client";

import { motion } from "framer-motion";
import { ChevronDown, Heart, Sparkles } from "lucide-react";
import { hero } from "@/config/data";
import { LoveCounter } from "@/components/LoveCounter";
import { Starfield } from "@/components/ui/Starfield";

export function HeroSection() {
  const scrollToTimeline = () => {
    document.getElementById("story-timeline")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-between overflow-hidden px-4 py-16 sm:px-6 sm:py-24">
      {/* Background starlight particles */}
      <Starfield variant="light" density={1.2} />

      {/* Soft romantic ambient gradient spheres */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 size-[32rem] -translate-x-1/2 rounded-full bg-linear-to-b from-rose/15 via-gold/10 to-transparent blur-[100px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 right-10 size-[24rem] rounded-full bg-linear-to-t from-blush/20 via-sand/20 to-transparent blur-[90px]"
      />

      {/* Top spacing */}
      <div className="h-4" />

      {/* Main hero content */}
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-linen/80 px-4 py-1.5 shadow-[0_2px_15px_-4px_rgba(212,175,55,0.25)] backdrop-blur-md"
        >
          <Sparkles className="size-3.5 text-gold-deep" />
          <span className="text-[0.7rem] font-medium uppercase tracking-[0.3em] text-burgundy">
            {hero.eyebrow}
          </span>
          <Sparkles className="size-3.5 text-gold-deep" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-5xl font-light tracking-tight text-charcoal sm:text-6xl md:text-7xl lg:text-8xl"
        >
          {hero.titleLead}{" "}
          <span className="block font-normal italic text-burgundy sm:inline">
            {hero.titleAccent}
          </span>
        </motion.h1>

        {/* Poetic Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-6 max-w-2xl font-serif text-lg italic text-taupe sm:text-xl md:text-2xl"
        >
          &ldquo;{hero.subtitle}&rdquo;
        </motion.p>

        {/* Live Counter Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 w-full sm:mt-14"
        >
          <div className="mb-3 flex items-center justify-center gap-2">
            <Heart className="size-3.5 fill-burgundy text-burgundy animate-pulse" />
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-burgundy-deep">
              {hero.counterLabel}
            </span>
            <Heart className="size-3.5 fill-burgundy text-burgundy animate-pulse" />
          </div>
          <LoveCounter />
        </motion.div>
      </div>

      {/* Scroll Down Cue */}
      <motion.button
        onClick={scrollToTimeline}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="group relative z-10 mt-12 flex flex-col items-center gap-2 text-taupe transition-colors hover:text-burgundy focus:outline-none"
        aria-label={hero.scrollCue}
      >
        <span className="text-[0.65rem] font-medium uppercase tracking-[0.3em]">
          {hero.scrollCue}
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex size-8 items-center justify-center rounded-full border border-gold/30 bg-linen/60 shadow-xs backdrop-blur-xs group-hover:border-gold"
        >
          <ChevronDown className="size-4 text-gold-deep" />
        </motion.div>
      </motion.button>
    </section>
  );
}
