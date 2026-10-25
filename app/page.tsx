"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart } from "lucide-react";
import { couple, gate, music } from "@/config/data";
import { celebrate } from "@/lib/confetti";
import { useAmbientAudio } from "@/hooks/useAmbientAudio";
import { PasscodeGate } from "@/components/PasscodeGate";
import { HeroSection } from "@/components/HeroSection";
import { StoryTimeline } from "@/components/StoryTimeline";
import { PhotoGallery } from "@/components/PhotoGallery";
import { ReasonsDeck } from "@/components/ReasonsDeck";
import { LoveLetter } from "@/components/LoveLetter";
import { AmbientPlayer } from "@/components/AmbientPlayer";
import { Footer } from "@/components/Footer";

export default function Home() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [hasCheckedSession, setHasCheckedSession] = useState(false);
  const { audioRef, playing, play, pause, toggle } = useAmbientAudio(music.volume);

  useEffect(() => {
    if (gate.rememberForSession) {
      const saved = sessionStorage.getItem("anniversary_unlocked");
      if (saved === "true") {
        setIsUnlocked(true);
      }
    }
    setHasCheckedSession(true);
  }, []);

  const handleUnlock = () => {
    setIsUnlocked(true);
    if (gate.rememberForSession) {
      sessionStorage.setItem("anniversary_unlocked", "true");
    }
    // Celebrate with romantic gold/rose confetti hearts
    celebrate();

    // Start background music seamlessly from this user gesture
    if (music.autoplayOnUnlock) {
      play();
    }
  };

  const handleLock = () => {
    setIsUnlocked(false);
    sessionStorage.removeItem("anniversary_unlocked");
    pause();
  };

  return (
    <div className="relative min-h-screen bg-ivory text-charcoal selection:bg-rose/20 selection:text-burgundy">
      {/* Hidden audio element managed by hook */}
      <audio ref={audioRef} src={music.src} loop preload="auto" />

      {/* Passcode Gate Screen */}
      <AnimatePresence mode="wait">
        {!isUnlocked && hasCheckedSession && (
          <PasscodeGate key="gate-modal" onSuccess={handleUnlock} />
        )}
      </AnimatePresence>

      {/* Main Experience (Visible when unlocked) */}
      {isUnlocked && (
        <motion.div
          key="main-experience"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full overflow-hidden"
        >
          {/* Subtle Floating Navigation Bar */}
          <nav
            aria-label="Anniversary navigation"
            className="fixed top-4 left-1/2 z-30 -translate-x-1/2 w-fit max-w-[92vw]"
          >
            <div className="glass flex items-center gap-4 sm:gap-6 rounded-full px-5 py-2.5 shadow-soft">
              <span className="flex items-center gap-1.5 font-serif text-sm font-medium text-burgundy">
                <Heart className="size-3.5 fill-burgundy text-burgundy" />
                <span>Forever</span>
              </span>

              <div className="hidden sm:flex items-center gap-5 text-[0.7rem] uppercase tracking-[0.2em] text-taupe">
                <a
                  href="#story-timeline"
                  className="transition-colors hover:text-burgundy"
                >
                  Story
                </a>
                <a
                  href="#photo-gallery"
                  className="transition-colors hover:text-burgundy"
                >
                  Gallery
                </a>
                <a
                  href="#reasons"
                  className="transition-colors hover:text-burgundy"
                >
                  Reasons
                </a>
                <a
                  href="#love-letter"
                  className="transition-colors hover:text-burgundy"
                >
                  Letter
                </a>
              </div>
            </div>
          </nav>

          <main className="w-full">
            {/* 1. Hero with live counter */}
            <HeroSection />

            {/* 2. Alternating Story Timeline */}
            <StoryTimeline />

            {/* 3. Interactive Bento / Polaroid Photo Gallery with back flip notes */}
            <PhotoGallery />

            {/* 4. Reasons Why I Love You Interactive Deck */}
            <ReasonsDeck />

            {/* 5. The Sealed Love Letter with 3D Wax Seal */}
            <LoveLetter />
          </main>

          {/* 6. Footer */}
          <Footer onLock={handleLock} />

          {/* 7. Floating Ambient Vinyl Player */}
          <AmbientPlayer playing={playing} onToggle={toggle} />
        </motion.div>
      )}
    </div>
  );
}
