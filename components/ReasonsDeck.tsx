"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Shuffle, ArrowRight } from "lucide-react";
import { reasons, reasonsSection } from "@/config/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { heartBurst } from "@/lib/confetti";

export function ReasonsDeck() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const nextReason = (e?: React.MouseEvent) => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % reasons.length);

    // Heart burst at button / click position
    if (e) {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;
      heartBurst(x, y);
    } else {
      heartBurst(0.5, 0.6);
    }
  };

  const prevReason = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + reasons.length) % reasons.length);
  };

  const currentReason = reasons[currentIndex];

  return (
    <section id="reasons" className="relative w-full py-24 sm:py-32 overflow-hidden">
      {/* Background romantic glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 size-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-tr from-blush/30 via-gold/15 to-rose/10 blur-[100px]"
      />

      <SectionHeading
        eyebrow={reasonsSection.eyebrow}
        title={reasonsSection.title}
        subtitle={reasonsSection.subtitle}
      />

      <div className="relative mx-auto flex max-w-xl flex-col items-center px-4 sm:px-6">
        {/* Stacked Card Container */}
        <div className="relative h-[290px] sm:h-[320px] w-full max-w-md">
          {/* Background card 2 (deepest) */}
          <div
            aria-hidden="true"
            className="absolute inset-0 translate-y-4 scale-[0.92] rounded-3xl border border-gold/20 bg-linen/50 shadow-xs"
          />

          {/* Background card 1 (middle) */}
          <div
            aria-hidden="true"
            className="absolute inset-0 translate-y-2 scale-[0.96] rounded-3xl border border-gold/30 bg-linen/80 shadow-soft"
          />

          {/* Active Top Card */}
          <AnimatePresence mode="popLayout" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              initial={{
                opacity: 0,
                x: direction > 0 ? 100 : -100,
                rotate: direction > 0 ? 8 : -8,
                scale: 0.95,
              }}
              animate={{ opacity: 1, x: 0, rotate: 0, scale: 1 }}
              exit={{
                opacity: 0,
                x: direction > 0 ? -120 : 120,
                rotate: direction > 0 ? -12 : 12,
                scale: 0.9,
              }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => nextReason(e)}
              className="glass absolute inset-0 flex cursor-pointer flex-col justify-between rounded-3xl p-7 sm:p-9 shadow-lift transition-all hover:scale-[1.01]"
            >
              {/* Card top bar */}
              <div className="flex items-center justify-between border-b border-gold/20 pb-4">
                <span className="flex items-center gap-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-burgundy">
                  <Sparkles className="size-3.5 text-gold-deep" />
                  Reason #{currentIndex + 1}
                </span>
                <span className="text-xs font-mono text-taupe">
                  {currentIndex + 1} / {reasons.length}
                </span>
              </div>

              {/* Card Reason Body */}
              <div className="my-auto py-2">
                <p className="font-serif text-2xl font-light leading-snug text-charcoal sm:text-3xl">
                  &ldquo;{currentReason}&rdquo;
                </p>
              </div>

              {/* Card bottom bar */}
              <div className="flex items-center justify-between pt-4 border-t border-gold/15">
                <div className="flex items-center gap-1 text-xs text-rose">
                  <Heart className="size-4 fill-burgundy text-burgundy animate-pulse" />
                  <span className="font-serif italic text-burgundy">Forever yours</span>
                </div>
                <span className="text-[0.65rem] uppercase tracking-wider text-taupe">
                  Tap card for next
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Action Controls */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={(e) => nextReason(e)}
            className="group inline-flex items-center gap-2 rounded-full bg-linear-to-r from-burgundy via-rose to-burgundy px-7 py-3.5 text-sm font-medium tracking-wide text-ivory shadow-[0_10px_25px_-5px_rgba(140,45,56,0.4)] transition-all hover:shadow-[0_15px_30px_-5px_rgba(140,45,56,0.5)]"
          >
            <Heart className="size-4 fill-ivory text-ivory" />
            <span>{reasonsSection.button}</span>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </motion.button>
        </div>

        <p className="mt-4 text-xs italic text-taupe">
          {reasonsSection.swipeHint}
        </p>
      </div>
    </section>
  );
}
