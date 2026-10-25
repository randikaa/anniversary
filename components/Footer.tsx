"use client";

import { Heart, Sparkles, Lock } from "lucide-react";
import { couple, footer } from "@/config/data";
import { celebrate } from "@/lib/confetti";

export function Footer({ onLock }: { onLock: () => void }) {
  return (
    <footer className="relative w-full border-t border-gold/25 bg-ivory py-16 text-center">
      <div className="mx-auto max-w-xl px-4">
        {/* Heart icon with confetti trigger */}
        <button
          onClick={() => celebrate()}
          title="Click for a burst of love ♡"
          className="group mx-auto mb-6 flex size-12 items-center justify-center rounded-full border border-gold/40 bg-linen shadow-xs transition-all duration-300 hover:scale-110 hover:border-gold hover:shadow-soft"
          aria-label="Celebrate with confetti"
        >
          <Heart className="size-6 fill-burgundy text-burgundy transition-transform group-hover:scale-110" />
        </button>

        <p className="font-serif text-2xl font-light italic text-charcoal sm:text-3xl">
          {footer.line}
        </p>

        <div className="mt-4 flex items-center justify-center gap-2 text-xs uppercase tracking-[0.3em] text-gold-deep">
          <span>{couple.herName}</span>
          <span className="font-serif italic lowercase text-taupe">&</span>
          <span>{couple.yourName}</span>
        </div>

        <p className="mt-2 text-xs font-serif text-taupe">
          {footer.signoff}
        </p>

        {/* Lock Screen option */}
        <div className="mt-8 pt-6 border-t border-gold/15">
          <button
            onClick={onLock}
            className="inline-flex items-center gap-1.5 text-xs text-taupe transition-colors hover:text-burgundy"
          >
            <Lock className="size-3" />
            <span>Lock Screen</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
