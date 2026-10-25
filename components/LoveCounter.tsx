"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo } from "react";
import { relationshipStart } from "@/config/data";
import { getElapsed, useNowSeconds } from "@/lib/time";

const UNITS = [
  { key: "years", label: "Years", pad: false },
  { key: "months", label: "Months", pad: false },
  { key: "days", label: "Days", pad: false },
  { key: "hours", label: "Hours", pad: true },
  { key: "minutes", label: "Minutes", pad: true },
  { key: "seconds", label: "Seconds", pad: true },
] as const;

function RollingNumber({ value }: { value: string }) {
  return (
    <span className="relative inline-flex h-[1.1em] overflow-hidden tabular-nums">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ y: "70%", opacity: 0, filter: "blur(4px)" }}
          animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-70%", opacity: 0, filter: "blur(4px)" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="block leading-[1.1]"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function LoveCounter() {
  const now = useNowSeconds();
  const start = useMemo(() => new Date(relationshipStart), []);
  const elapsed = now === null ? null : getElapsed(start, new Date(now * 1000));

  return (
    <div className="w-full">
      <div
        role="timer"
        aria-live="off"
        aria-label={
          elapsed
            ? `${elapsed.years} years, ${elapsed.months} months, ${elapsed.days} days together`
            : "Time together"
        }
        className="glass mx-auto grid max-w-3xl grid-cols-3 gap-y-6 rounded-[1.75rem] px-4 py-6 sm:px-8 sm:py-8 md:grid-cols-6 md:gap-y-0"
      >
        {UNITS.map((u, i) => {
          const raw = elapsed ? elapsed[u.key] : null;
          const display = raw === null ? "—" : u.pad ? String(raw).padStart(2, "0") : String(raw);
          return (
            <div
              key={u.key}
              className={`relative flex flex-col items-center ${
                i % 3 !== 0 ? "max-md:border-l max-md:border-gold/15" : ""
              } ${i !== 0 ? "md:border-l md:border-gold/15" : ""}`}
            >
              <span
                className={`font-serif text-4xl font-light sm:text-5xl ${
                  i < 3 ? "text-burgundy" : "text-charcoal"
                }`}
              >
                <RollingNumber value={display} />
              </span>
              <span className="mt-2 text-[0.6rem] font-medium uppercase tracking-[0.28em] text-taupe sm:text-[0.65rem]">
                {u.label}
              </span>
            </div>
          );
        })}
      </div>
      {elapsed && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="mt-4 text-center text-xs tracking-wide text-taupe"
        >
          That&rsquo;s <span className="font-semibold text-burgundy">{elapsed.totalDays.toLocaleString()}</span> days of
          choosing each other.
        </motion.p>
      )}
    </div>
  );
}
