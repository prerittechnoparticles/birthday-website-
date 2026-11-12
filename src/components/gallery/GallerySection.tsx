"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Camera, Maximize2, Sparkles } from "lucide-react";
import { GALLERY_DATA } from "@/data/gallery";
import { LightboxModal } from "./LightboxModal";
import { soundEngine } from "@/lib/sound";

export function GallerySection() {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const handlePrev = () => {
    setLightboxIdx((prev) =>
      prev === null ? null : (prev - 1 + GALLERY_DATA.length) % GALLERY_DATA.length
    );
  };

  const handleNext = () => {
    setLightboxIdx((prev) =>
      prev === null ? null : (prev + 1) % GALLERY_DATA.length
    );
  };

  return (
    <section
      id="memories"
      className="relative mx-auto max-w-7xl px-4 py-24 md:px-8"
    >
      {/* Section Header */}
      <div className="mb-14 text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#34D399]/30 bg-[#151225]/80 px-4 py-1.5 font-mono text-xs tracking-widest text-[#34D399]">
          <Camera className="h-3.5 w-3.5" />
          <span>💖 CHERISHED MEMORIES // PHOTO ALBUM</span>
        </div>
        <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
          Moments &amp;{" "}
          <span className="bg-gradient-to-r from-[#34D399] via-[#22D3EE] to-[#A855F7] bg-clip-text text-transparent">
            Memories
          </span>
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-white/70 sm:text-base">
          A heartwarming collection of smiles, triumphs, and unforgettable moments celebrating Yash. Tap any photo to see it in full view!
        </p>
      </div>

      {/* Masonry-Style Floating Photo Grid */}
      <div className="columns-1 gap-7 space-y-7 sm:columns-2 lg:columns-3">
        {GALLERY_DATA.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 30, rotate: photo.rotation }}
            whileInView={{ opacity: 1, y: 0, rotate: photo.rotation }}
            whileHover={{ rotate: 0, scale: 1.025, y: -6 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.45 }}
            onClick={() => {
              soundEngine.playClick();
              setLightboxIdx(index);
            }}
            className="group relative break-inside-avoid cursor-pointer overflow-hidden rounded-3xl border bg-[#151225]/90 p-3 backdrop-blur-xl transition-shadow duration-300"
            style={{
              borderColor: `${photo.accentColor}45`,
              boxShadow: `0 16px 40px -15px ${photo.accentColor}30`,
            }}
          >
            {/* Image Container */}
            <div
              className={`relative w-full overflow-hidden rounded-2xl bg-[#080711] ${photo.aspectClass}`}
            >
              <Image
                src={photo.src}
                alt={photo.title}
                fill
                loading="lazy"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Hover Neon Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-[#080711]/55 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
                <span
                  className="inline-flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-xs font-bold text-white shadow-lg"
                  style={{
                    borderColor: photo.accentColor,
                    backgroundColor: "#0E0B19",
                  }}
                >
                  <Maximize2
                    className="h-3.5 w-3.5"
                    style={{ color: photo.accentColor }}
                  />
                  <span>Expand Lightbox</span>
                </span>
              </div>

              {/* Tag Pill */}
              <span
                className="absolute top-3 left-3 rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-bold tracking-wider backdrop-blur-md"
                style={{
                  borderColor: `${photo.accentColor}65`,
                  backgroundColor: "#080711cc",
                  color: photo.accentColor,
                }}
              >
                {photo.tag}
              </span>
            </div>

            {/* Card Caption */}
            <div className="mt-3.5 px-2 pb-1">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-display text-lg font-bold text-white">
                  {photo.title}
                </h3>
                <span className="font-mono text-[10px] text-white/40">
                  0{index + 1}
                </span>
              </div>
              <p className="mt-1 text-xs leading-relaxed text-white/65">
                {photo.caption}
              </p>
              <div className="mt-2.5 flex items-center gap-1.5 font-mono text-[10px] text-white/50">
                <Sparkles className="h-3 w-3 text-[#FACC15]" />
                <span>Cherished Birthday Memory</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Full-Screen Lightbox Modal */}
      <LightboxModal
        photos={GALLERY_DATA}
        currentIndex={lightboxIdx}
        onClose={() => setLightboxIdx(null)}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </section>
  );
}
