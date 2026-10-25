"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Heart, RotateCcw, Sparkles } from "lucide-react";
import { gallery, gallerySection, type GalleryItem } from "@/config/data";
import { SectionHeading } from "@/components/ui/SectionHeading";

function FlipCard({ item, index }: { item: GalleryItem; index: number }) {
  const [flipped, setFlipped] = useState(false);

  // Bento span classes depending on item.size
  const sizeClasses: Record<GalleryItem["size"], string> = {
    large: "col-span-1 sm:col-span-2 row-span-2 min-h-[380px] sm:min-h-[460px]",
    tall: "col-span-1 row-span-2 min-h-[380px] sm:min-h-[460px]",
    wide: "col-span-1 sm:col-span-2 row-span-1 min-h-[260px] sm:min-h-[280px]",
    square: "col-span-1 row-span-1 min-h-[260px] sm:min-h-[280px]",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={`relative [perspective:1200px] ${sizeClasses[item.size]}`}
    >
      <motion.div
        onClick={() => setFlipped(!flipped)}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative h-full w-full cursor-pointer select-none"
      >
        {/* FRONT: Photo Side */}
        <div
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
          className="absolute inset-0 overflow-hidden rounded-3xl border border-gold/35 bg-linen p-2.5 shadow-soft transition-all duration-300 hover:shadow-lift"
        >
          <div className="relative h-full w-full overflow-hidden rounded-2xl">
            <Image
              src={item.image}
              alt={item.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-charcoal/85 via-charcoal/25 to-transparent opacity-85" />

            {/* Bottom Caption & Flip Prompt */}
            <div className="absolute bottom-0 left-0 right-0 p-5 text-ivory">
              <div className="flex items-end justify-between gap-2">
                <div>
                  <span className="text-[0.65rem] font-medium uppercase tracking-[0.25em] text-gold-soft">
                    {item.date}
                  </span>
                  <p className="font-serif text-xl font-normal sm:text-2xl drop-shadow-sm">
                    {item.caption}
                  </p>
                </div>
                <div className="flex size-9 items-center justify-center rounded-full border border-gold/50 bg-charcoal/60 text-gold-soft shadow-md backdrop-blur-xs transition-transform duration-300 hover:rotate-45">
                  <RotateCcw className="size-4" />
                </div>
              </div>
            </div>

            {/* Subtle tap prompt badge */}
            <div className="absolute right-3 top-3 rounded-full bg-ivory/90 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-widest text-burgundy shadow-sm backdrop-blur-md">
              Tap to read note ♡
            </div>
          </div>
        </div>

        {/* BACK: Intimate handwritten love note side */}
        <div
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
          className="absolute inset-0 flex flex-col justify-between overflow-y-auto rounded-3xl border-2 border-gold/50 bg-[#fffcf7] paper-lined p-6 shadow-lift sm:p-8 z-10"
        >
          {/* Top header */}
          <div className="flex items-center justify-between border-b border-gold/30 pb-3">
            <div className="flex items-center gap-2">
              <Heart className="size-4 fill-burgundy text-burgundy" />
              <span className="font-serif text-xs uppercase tracking-[0.25em] font-semibold text-burgundy">
                Hidden Note
              </span>
            </div>
            <div className="flex items-center gap-1 text-gold-deep">
              <Sparkles className="size-3.5" />
              <span className="text-[0.7rem] font-mono font-medium">{item.date}</span>
            </div>
          </div>

          {/* Note content in handwritten font */}
          <div className="my-auto py-4">
            <p className="font-hand text-2xl leading-relaxed text-burgundy-deep sm:text-3xl font-medium">
              &ldquo;{item.note}&rdquo;
            </p>
          </div>

          {/* Bottom signoff & tap to flip back */}
          <div className="flex items-center justify-between pt-3 border-t border-gold/30">
            <div className="flex items-center gap-1.5 text-xs text-taupe font-serif italic">
              <span>{item.caption}</span>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-sand/40 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-burgundy hover:bg-sand/60">
              <RotateCcw className="size-3" /> Flip to Photo
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function PhotoGallery() {
  return (
    <section id="photo-gallery" className="relative w-full py-24 sm:py-32 bg-champagne/40">
      <SectionHeading
        eyebrow={gallerySection.eyebrow}
        title={gallerySection.title}
        subtitle={gallerySection.subtitle}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Bento Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
          {gallery.map((item, index) => (
            <FlipCard key={item.caption + index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
