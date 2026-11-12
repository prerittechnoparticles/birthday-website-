"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Heart,
} from "lucide-react";
import { GalleryPhoto } from "@/data/gallery";
import { soundEngine } from "@/lib/sound";

interface LightboxModalProps {
  photos: GalleryPhoto[];
  currentIndex: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export function LightboxModal({
  photos,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: LightboxModalProps) {
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    setZoomed(false);
  }, [currentIndex]);

  useEffect(() => {
    if (currentIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, onClose, onPrev, onNext]);

  const activePhoto = currentIndex !== null ? photos[currentIndex] : null;

  return (
    <AnimatePresence>
      {activePhoto && currentIndex !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[70] flex flex-col items-center justify-center bg-[#080711]/95 p-4 backdrop-blur-xl md:p-8"
        >
          {/* Top Controls Bar */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="mb-4 flex w-full max-w-5xl items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <span
                className="rounded-full border px-3 py-1 font-mono text-xs font-bold"
                style={{
                  borderColor: `${activePhoto.accentColor}60`,
                  color: activePhoto.accentColor,
                  backgroundColor: `${activePhoto.accentColor}15`,
                }}
              >
                {activePhoto.tag}
              </span>
              <span className="font-mono text-xs text-white/55">
                {currentIndex + 1} / {photos.length}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  soundEngine.playClick();
                  setZoomed((z) => !z);
                }}
                aria-label={zoomed ? "Zoom Out" : "Zoom In"}
                className="flex items-center gap-1.5 rounded-full border border-white/15 bg-[#151225] px-3.5 py-2 font-mono text-xs text-white/85 transition hover:border-white/35 hover:text-white"
              >
                {zoomed ? (
                  <>
                    <ZoomOut className="h-4 w-4 text-[#22D3EE]" />
                    <span>100%</span>
                  </>
                ) : (
                  <>
                    <ZoomIn className="h-4 w-4 text-[#22D3EE]" />
                    <span>Zoom</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  soundEngine.playClick();
                  onClose();
                }}
                aria-label="Close Lightbox"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-[#151225] text-white transition hover:border-[#EC4899] hover:text-[#EC4899]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Main Image Stage with Prev / Next Buttons */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex w-full max-w-5xl items-center justify-center"
          >
            <button
              type="button"
              onClick={() => {
                soundEngine.playClick();
                onPrev();
              }}
              aria-label="Previous Photograph"
              className="absolute left-2 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-[#0E0B19]/90 text-white shadow-xl transition hover:scale-105 hover:border-[#22D3EE] md:-left-5"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <motion.div
              key={activePhoto.id}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.25 }}
              onClick={() => setZoomed((z) => !z)}
              className="relative aspect-[16/10] w-full max-w-4xl cursor-zoom-in overflow-hidden rounded-3xl border-2 bg-[#0E0B19] shadow-2xl"
              style={{
                borderColor: `${activePhoto.accentColor}75`,
                boxShadow: `0 0 60px -15px ${activePhoto.accentColor}50`,
              }}
            >
              <div
                className={`relative h-full w-full transition-transform duration-300 ${
                  zoomed ? "scale-135 cursor-zoom-out" : "scale-100"
                }`}
              >
                <Image
                  src={activePhoto.src}
                  alt={activePhoto.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 900px"
                  className="object-contain"
                />
              </div>
            </motion.div>

            <button
              type="button"
              onClick={() => {
                soundEngine.playClick();
                onNext();
              }}
              aria-label="Next Photograph"
              className="absolute right-2 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-[#0E0B19]/90 text-white shadow-xl transition hover:scale-105 hover:border-[#22D3EE] md:-right-5"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Caption & Replaceable File Path Footer */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="mt-5 flex w-full max-w-4xl flex-col items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[#151225]/90 px-6 py-4 text-center sm:flex-row sm:text-left"
          >
            <div>
              <h3 className="font-display text-xl font-bold text-white">
                {activePhoto.title}
              </h3>
              <p className="mt-0.5 text-sm text-white/70">
                {activePhoto.caption}
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#080711] px-3.5 py-2 font-mono text-xs text-[#EC4899]">
              <Heart className="h-3.5 w-3.5 fill-[#EC4899] text-[#EC4899] shrink-0" />
              <span>Special Memory ❤️</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
