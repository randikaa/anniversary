"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Coffee, Gem, Heart, Infinity as InfinityIcon, Moon, Plane } from "lucide-react";
import { milestones, timelineSection, type Milestone, type MilestoneIcon } from "@/config/data";
import { SectionHeading } from "@/components/ui/SectionHeading";

const ICON_MAP: Record<MilestoneIcon, typeof Heart> = {
  coffee: Coffee,
  heart: Heart,
  plane: Plane,
  moon: Moon,
  gem: Gem,
  infinity: InfinityIcon,
};

function MilestoneCard({ milestone, index }: { milestone: Milestone; index: number }) {
  const isEven = index % 2 === 0;
  const IconComponent = ICON_MAP[milestone.icon] || Heart;

  return (
    <div
      className={`relative mb-16 flex w-full flex-col items-center md:mb-28 md:flex-row ${
        isEven ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* Center node with icon on desktop */}
      <div className="absolute left-1/2 top-0 z-20 hidden -translate-x-1/2 -translate-y-1/4 md:flex">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex size-12 items-center justify-center rounded-full border-2 border-gold bg-ivory shadow-[0_0_20px_rgba(212,175,55,0.4)]"
        >
          <IconComponent className="size-5 text-burgundy" strokeWidth={1.75} />
        </motion.div>
      </div>

      {/* Content card */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? 40 : -40, y: 20 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="w-full md:w-[46%]"
      >
        <div className="glass group relative overflow-hidden rounded-3xl p-5 transition-all duration-500 hover:shadow-lift sm:p-7">
          {/* Subtle gold corner accent */}
          <div className="absolute right-4 top-4 size-8 border-r border-t border-gold/40 transition-colors group-hover:border-gold" />

          {/* Photo container with zoom on hover */}
          <div className="relative mb-6 aspect-4/3 w-full overflow-hidden rounded-2xl shadow-inner">
            <Image
              src={milestone.image}
              alt={milestone.imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 45vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent opacity-60" />

            {/* Mobile icon badge */}
            <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-ivory/90 px-3 py-1 shadow-md backdrop-blur-xs md:hidden">
              <IconComponent className="size-3.5 text-burgundy" strokeWidth={1.8} />
              <span className="text-[0.65rem] font-semibold uppercase tracking-wider text-charcoal">
                {milestone.date}
              </span>
            </div>
          </div>

          {/* Date pill (desktop) */}
          <div className="mb-2 hidden items-center gap-2 md:flex">
            <span className="text-[0.7rem] font-medium uppercase tracking-[0.25em] text-gold-deep">
              {milestone.date}
            </span>
          </div>

          {/* Milestone Title */}
          <h3 className="font-serif text-2xl font-light text-charcoal sm:text-3xl">
            {milestone.title}
          </h3>

          {/* Memory Text */}
          <p className="mt-3 font-serif text-base leading-relaxed text-taupe sm:text-lg">
            {milestone.memory}
          </p>
        </div>
      </motion.div>

      {/* Spacer for other side on desktop */}
      <div className="hidden w-[46%] md:block" />
    </div>
  );
}

export function StoryTimeline() {
  return (
    <section id="story-timeline" className="relative w-full py-24 sm:py-32">
      <SectionHeading
        eyebrow={timelineSection.eyebrow}
        title={timelineSection.title}
        subtitle={timelineSection.subtitle}
      />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
        {/* Central connecting line with gradient shimmer */}
        <div
          aria-hidden="true"
          className="absolute bottom-12 left-1/2 top-8 hidden w-0.5 -translate-x-1/2 bg-linear-to-b from-transparent via-gold/40 to-transparent md:block"
        />

        <div className="flex flex-col">
          {milestones.map((milestone, idx) => (
            <MilestoneCard key={milestone.title} milestone={milestone} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
