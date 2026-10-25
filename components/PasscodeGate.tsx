"use client";

import { AnimatePresence, motion, useAnimate } from "framer-motion";
import { ArrowRight, Heart, LockKeyhole, LockOpen } from "lucide-react";
import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { gate } from "@/config/data";
import { Starfield } from "@/components/ui/Starfield";

type Status = "idle" | "error" | "success";

const LENGTH = gate.passcode.length;
// Visual grouping DD · MM · YYYY
const GROUPS = LENGTH === 8 ? [[0, 1], [2, 3], [4, 5, 6, 7]] : [Array.from({ length: LENGTH }, (_, i) => i)];

interface PasscodeGateProps {
  /** Fired synchronously inside the user's gesture (so audio is allowed to start). */
  onSuccess: () => void;
}

export function PasscodeGate({ onSuccess }: PasscodeGateProps) {
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [attempts, setAttempts] = useState(0);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [slotsScope, animate] = useAnimate<HTMLDivElement>();

  // Autofocus on devices with a mouse/trackpad; on phones we let her tap first
  // so the keyboard doesn't cover the screen before she's even seen it.
  useEffect(() => {
    if (window.matchMedia("(pointer: fine)").matches) inputRef.current?.focus();
  }, []);

  const verify = (code: string) => {
    if (status === "success") return;
    if (code === gate.passcode) {
      setStatus("success");
      inputRef.current?.blur();
      onSuccess();
      return;
    }
    setStatus("error");
    setAttempts((a) => a + 1);
    navigator.vibrate?.([30, 40, 30]);
    animate(slotsScope.current, { x: [0, -14, 12, -9, 7, -4, 2, 0] }, { duration: 0.55, ease: "easeOut" });
    setTimeout(() => {
      setValue("");
      setStatus((s) => (s === "error" ? "idle" : s));
    }, 900);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (status === "success") return;
    const digits = e.target.value.replace(/\D/g, "").slice(0, LENGTH);
    setValue(digits);
    if (status === "error") setStatus("idle");
    if (digits.length === LENGTH) verify(digits);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (value.length === LENGTH) verify(value);
    else inputRef.current?.focus();
  };

  const showHint = attempts >= 2 && status !== "success";

  return (
    <motion.section
      key="gate"
      aria-labelledby="gate-title"
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden px-5 py-10"
      style={{
        background:
          "radial-gradient(120% 80% at 50% 0%, #6e1f2a 0%, #3a151b 45%, #1a0b0e 100%)",
      }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.06, filter: "blur(10px)" }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <Starfield variant="dark" density={1.4} />

      {/* Ambient glows */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 size-[36rem] -translate-x-1/2 rounded-full bg-gold/15 blur-[120px]"
        animate={{ opacity: [0.5, 0.85, 0.5], scale: [1, 1.08, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -right-20 size-[28rem] rounded-full bg-rose/20 blur-[120px]"
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="glass-dark relative w-full max-w-lg sm:max-w-xl rounded-[2rem] px-4 py-8 text-center sm:px-8 sm:py-10"
      >
        {/* Lock emblem */}
        <div className="relative mx-auto mb-7 flex size-20 items-center justify-center">
          <span className="absolute inset-0 animate-spin-slow rounded-full border border-dashed border-gold/40" />
          <span className="absolute inset-2 rounded-full bg-linear-to-br from-gold/25 to-burgundy/30 shadow-[0_0_40px_-5px_rgba(212,175,55,0.5)]" />
          <AnimatePresence mode="wait" initial={false}>
            {status === "success" ? (
              <motion.span
                key="open"
                initial={{ scale: 0.4, opacity: 0, rotate: -20 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 16 }}
                className="relative"
              >
                <LockOpen className="size-8 text-gold-soft" strokeWidth={1.4} />
              </motion.span>
            ) : (
              <motion.span key="closed" exit={{ scale: 0.4, opacity: 0 }} className="relative">
                <LockKeyhole className="size-8 text-gold-soft" strokeWidth={1.4} />
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <p className="mb-3 text-[0.65rem] font-medium uppercase tracking-[0.4em] text-gold-soft/80">
          {gate.eyebrow}
        </p>
        <h1 id="gate-title" className="font-serif text-[2.6rem] font-light leading-none text-ivory sm:text-5xl">
          {gate.title.split(" ").slice(0, -1).join(" ")}{" "}
          <span className="text-gold-shimmer italic">{gate.title.split(" ").slice(-1)}</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xs font-serif text-lg italic text-ivory/70">{gate.prompt}</p>

        {/* Digit slots — centered with responsive proportions */}
        <div className="relative mx-auto mt-8 flex w-full max-w-md items-center justify-center">
          <div ref={slotsScope} className="flex items-center justify-center gap-1 sm:gap-1.5" aria-hidden="true">
            {GROUPS.map((group, gi) => (
              <div key={gi} className="flex items-center gap-1 sm:gap-1.5">
                {gi > 0 && <span className="w-1.5 sm:w-2.5 text-center font-serif text-sm text-gold/60">·</span>}
                {group.map((i) => {
                  const char = value[i];
                  const active = focused && status === "idle" && i === Math.min(value.length, LENGTH - 1);
                  return (
                    <motion.span
                      key={i}
                      animate={
                        status === "success"
                          ? { y: [0, -6, 0], transition: { delay: i * 0.05, duration: 0.5 } }
                          : { y: 0 }
                      }
                      className={[
                        "relative flex h-11 w-8 sm:h-13 sm:w-10 md:h-14 md:w-11 items-center justify-center rounded-lg sm:rounded-xl border font-serif text-lg sm:text-xl md:text-2xl transition-all duration-300",
                        status === "success"
                          ? "border-gold bg-gold/20 text-gold-soft shadow-[0_0_20px_-4px_rgba(212,175,55,0.7)]"
                          : status === "error"
                            ? "border-rose/80 bg-rose/10 text-blush"
                            : active
                              ? "border-gold/80 bg-white/[0.07] text-ivory"
                              : char
                                ? "border-gold/40 bg-white/[0.05] text-ivory"
                                : "border-white/15 bg-white/[0.03] text-ivory/40",
                      ].join(" ")}
                    >
                      {char ?? ""}
                      {active && !char && (
                        <motion.span
                          className="absolute h-5 w-px bg-gold-soft"
                          animate={{ opacity: [1, 0, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                      )}
                    </motion.span>
                  );
                })}
              </div>
            ))}
          </div>
          <input
            ref={inputRef}
            id="passcode-input"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            autoComplete="off"
            maxLength={LENGTH}
            value={value}
            onChange={handleChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            disabled={status === "success"}
            aria-label={`${gate.prompt} (${gate.format})`}
            aria-invalid={status === "error"}
            className="absolute inset-0 h-full w-full cursor-pointer bg-transparent text-base text-transparent caret-transparent opacity-0 outline-none"
          />
        </div>

        <p className="mt-3 text-[0.65rem] uppercase tracking-[0.35em] text-ivory/40">{gate.format}</p>

        {/* Feedback line */}
        <div className="mt-5 min-h-12" aria-live="polite">
          <AnimatePresence mode="wait">
            {status === "error" && (
              <motion.p
                key="err"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="font-serif text-base italic text-blush"
              >
                {gate.wrongMessage}
              </motion.p>
            )}
            {status === "success" && (
              <motion.p
                key="ok"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center gap-2 font-serif text-lg italic text-gold-soft"
              >
                <Heart className="size-4 fill-rose text-rose" /> {gate.successMessage}
              </motion.p>
            )}
            {status === "idle" && showHint && (
              <motion.p
                key="hint"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="font-serif text-base italic text-ivory/60"
              >
                {gate.hint}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <motion.button
          id="unlock-button"
          type="submit"
          whileHover={{ scale: value.length === LENGTH ? 1.02 : 1 }}
          whileTap={{ scale: 0.97 }}
          disabled={status === "success"}
          className={`group mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium tracking-wide transition-all duration-500 ${
            value.length === LENGTH || status === "success"
              ? "bg-linear-to-r from-gold-deep via-gold to-gold-deep text-wine shadow-[0_10px_30px_-10px_rgba(212,175,55,0.8)]"
              : "border border-white/15 bg-white/5 text-ivory/60 hover:border-gold/40 hover:text-ivory"
          }`}
        >
          {status === "success" ? "Opening your gift…" : "Unlock"}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </motion.button>
      </motion.form>

      <p className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-1.5 text-[0.65rem] uppercase tracking-[0.3em] text-ivory/30">
        Made with <Heart className="size-3 fill-rose/60 text-rose/60" /> for you
      </p>
    </motion.section>
  );
}
