"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  id?: string;
  tone?: "light" | "dark";
}

export function Ornament({ tone = "light" }: { tone?: "light" | "dark" }) {
  const line = tone === "dark" ? "via-gold/60" : "via-gold/70";
  return (
    <div className="flex items-center justify-center gap-3" aria-hidden="true">
      <span className={`h-px w-12 bg-linear-to-r from-transparent ${line} to-gold/80 sm:w-20`} />
      <span className="relative flex size-6 items-center justify-center">
        <span className="absolute size-3 rotate-45 border border-gold/70" />
        <Heart className="size-2.5 fill-burgundy text-burgundy" strokeWidth={0} />
      </span>
      <span className={`h-px w-12 bg-linear-to-l from-transparent ${line} to-gold/80 sm:w-20`} />
    </div>
  );
}

export function SectionHeading({ eyebrow, title, subtitle, id, tone = "light" }: SectionHeadingProps) {
  const dark = tone === "dark";
  return (
    <motion.header
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto mb-14 max-w-2xl px-6 text-center sm:mb-20"
    >
      <p
        className={`mb-4 text-[0.7rem] font-medium uppercase tracking-[0.35em] ${
          dark ? "text-gold-soft" : "text-gold-deep"
        }`}
      >
        {eyebrow}
      </p>
      <h2
        id={id}
        className={`font-serif text-4xl font-light leading-[1.05] sm:text-5xl md:text-6xl ${
          dark ? "text-ivory" : "text-charcoal"
        }`}
      >
        {title}
      </h2>
      <div className="my-6">
        <Ornament tone={tone} />
      </div>
      {subtitle && (
        <p
          className={`mx-auto max-w-md font-serif text-lg italic leading-relaxed sm:text-xl ${
            dark ? "text-ivory/70" : "text-taupe"
          }`}
        >
          {subtitle}
        </p>
      )}
    </motion.header>
  );
}
