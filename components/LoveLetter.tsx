"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Mail, X } from "lucide-react";
import { letter, letterSection, couple } from "@/config/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { heartBurst } from "@/lib/confetti";

export function LoveLetter() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleLetter = (e: React.MouseEvent) => {
    if (!isOpen) {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      heartBurst(
        (rect.left + rect.width / 2) / window.innerWidth,
        (rect.top + rect.height / 2) / window.innerHeight
      );
    }
    setIsOpen(!isOpen);
  };

  return (
    <section id="love-letter" className="relative w-full py-24 sm:py-32 bg-champagne/30">
      <SectionHeading
        eyebrow={letterSection.eyebrow}
        title={letterSection.title}
        subtitle={letterSection.subtitle}
      />

      <div className="mx-auto flex max-w-3xl flex-col items-center px-4 sm:px-6">
        {/* Envelope & Letter Container */}
        <div className="relative w-full max-w-xl">
          <AnimatePresence mode="wait">
            {!isOpen ? (
              /* SEALED ENVELOPE (CLOSED) */
              <motion.div
                key="closed-envelope"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                onClick={toggleLetter}
                className="group relative mx-auto aspect-16/10 w-full max-w-lg cursor-pointer overflow-hidden rounded-3xl border-2 border-gold/40 bg-linen shadow-lift transition-all duration-500 hover:scale-[1.02] hover:border-gold hover:shadow-[0_25px_60px_-15px_rgba(212,175,55,0.4)]"
              >
                {/* Envelope background paper texture */}
                <div className="absolute inset-0 bg-linear-to-b from-linen via-champagne/60 to-linen" />

                {/* Envelope fold diagonal lines */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-40 [clip-path:polygon(0_0,50%_55%,100%_0)] bg-sand/60 border-b border-gold/30"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-30 [clip-path:polygon(0_100%,50%_45%,100%_100%)] bg-sand/80 border-t border-gold/30"
                />

                {/* Envelope To / From Label */}
                <div className="absolute bottom-6 left-8 z-10">
                  <p className="text-[0.65rem] uppercase tracking-[0.25em] text-taupe">To my wife,</p>
                  <p className="font-serif text-2xl italic text-burgundy">{couple.herName}</p>
                </div>

                {/* Golden Wax Seal in Center */}
                <div className="absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative flex size-20 items-center justify-center rounded-full bg-linear-to-br from-burgundy-deep via-burgundy to-rose p-1 shadow-[0_10px_25px_rgba(94,26,36,0.5)] border-2 border-gold"
                  >
                    {/* Golden inner ring */}
                    <div className="flex size-full items-center justify-center rounded-full border border-gold/60 bg-burgundy shadow-inner">
                      <Heart className="size-8 fill-gold text-gold animate-pulse" />
                    </div>
                  </motion.div>

                  <span className="mt-4 rounded-full bg-ivory/90 px-3.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-burgundy shadow-md backdrop-blur-xs transition-colors group-hover:bg-burgundy group-hover:text-ivory">
                    {letterSection.tapToOpen}
                  </span>
                </div>
              </motion.div>
            ) : (
              /* OPENED LETTER (READING VIEW) */
              <motion.div
                key="open-letter"
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 30, scale: 0.95 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full rounded-3xl border-2 border-gold/40 paper-lined p-8 sm:p-14 shadow-lift"
              >
                {/* Close / Fold Button */}
                <button
                  onClick={toggleLetter}
                  className="absolute right-6 top-6 flex size-10 items-center justify-center rounded-full border border-gold/30 bg-ivory/80 text-taupe transition-colors hover:border-gold hover:text-burgundy"
                  aria-label={letterSection.closeLabel}
                >
                  <X className="size-5" />
                </button>

                {/* Letter Header */}
                <div className="mb-8 border-b border-gold/30 pb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-[0.3em] text-gold-deep font-medium">
                      Anniversary Letter
                    </span>
                    <span className="text-sm font-serif italic text-taupe">
                      {letter.date}
                    </span>
                  </div>
                </div>

                {/* Salutation */}
                <h3 className="font-serif text-3xl italic text-burgundy sm:text-4xl">
                  {letter.salutation}
                </h3>

                {/* Letter Paragraphs */}
                <div className="mt-6 space-y-5 font-serif text-lg leading-relaxed text-charcoal/90 sm:text-xl">
                  {letter.paragraphs.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>

                {/* Closing & Handwritten Signature */}
                <div className="mt-12 pt-6 border-t border-gold/25 flex flex-col items-end">
                  <p className="font-serif italic text-taupe text-lg">
                    {letter.closing}
                  </p>
                  <p className="font-script text-5xl text-burgundy mt-2 tracking-wide">
                    {letter.signature}
                  </p>
                </div>

                {/* Fold Back Button */}
                <div className="mt-10 text-center">
                  <button
                    onClick={toggleLetter}
                    className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-linen/90 px-6 py-2.5 text-xs uppercase tracking-[0.2em] text-burgundy transition-all hover:bg-burgundy hover:text-ivory"
                  >
                    <Mail className="size-3.5" />
                    <span>{letterSection.closeLabel}</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
