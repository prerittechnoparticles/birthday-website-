"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, X, ChevronRight, ChevronLeft } from "lucide-react";
import { soundEngine } from "@/lib/sound";
import { triggerRainbowConfetti } from "@/lib/animations";

interface ScrollQuoteItem {
  id: string;
  quote: string;
  author: string;
  photo: string;
  badge: string;
  accentColor: string;
}

const SCROLL_QUOTES: ScrollQuoteItem[] = [
  {
    id: "quote-1",
    quote:
      "May your upcoming year be as boundless, bright, and extraordinary as the dreams in your heart. Happy Birthday Yash!",
    author: "With love & blessings 🌟",
    photo: "/images/yash/boss-portrait.png",
    badge: "HEARTFELT WISH",
    accentColor: "#22D3EE",
  },
  {
    id: "quote-2",
    quote:
      "To the one who turns every challenge into an opportunity and always wears that reassuring, infectious smile.",
    author: "Keep inspiring us ✨",
    photo: "/images/gallery/memory-03.jpg",
    badge: "PURE INSPIRATION",
    accentColor: "#EC4899",
  },
  {
    id: "quote-3",
    quote:
      "You don't just reach new heights — you lift everyone around you with kindness, humility, and grace.",
    author: "True Leadership 💖",
    photo: "/images/journey/stage-01.jpg",
    badge: "BIG HEART",
    accentColor: "#A855F7",
  },
  {
    id: "quote-4",
    quote:
      "Wishing you 365 days filled with immense happiness, sound health, unforgettable memories, and monumental success!",
    author: "Happy Birthday Yash! 🎂",
    photo: "/images/journey/stage-02.jpg",
    badge: "CELEBRATION",
    accentColor: "#FACC15",
  },
  {
    id: "quote-5",
    quote:
      "May you continue to build things that touch people's lives and bring happiness to those around you.",
    author: "Always cheering for you 🚀",
    photo: "/images/gallery/memory-06.jpg",
    badge: "PROUD OF YOU",
    accentColor: "#34D399",
  },
  {
    id: "quote-6",
    quote:
      "Here's to another fantastic year of laughter, growth, adventures, and chasing every dream without fear!",
    author: "Cheers to you Yash! 🥂",
    photo: "/images/gallery/memory-04.jpg",
    badge: "FOREVER BOLD",
    accentColor: "#EC4899",
  },
];

export function ScrollMemoriesPopup() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dismissed, setDismissed] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Auto-switch quotes based on scroll progress
  useEffect(() => {
    let lastSection = -1;
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;

      const progress = Math.min(Math.max(scrollY / docHeight, 0), 1);
      const index = Math.min(
        Math.floor(progress * SCROLL_QUOTES.length),
        SCROLL_QUOTES.length - 1
      );

      if (index !== lastSection && !hasInteracted) {
        lastSection = index;
        setActiveIndex(index);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasInteracted]);

  const current = SCROLL_QUOTES[activeIndex] || SCROLL_QUOTES[0];

  const handleNext = () => {
    setHasInteracted(true);
    soundEngine.playClick();
    setActiveIndex((prev) => (prev + 1) % SCROLL_QUOTES.length);
  };

  const handlePrev = () => {
    setHasInteracted(true);
    soundEngine.playClick();
    setActiveIndex(
      (prev) => (prev - 1 + SCROLL_QUOTES.length) % SCROLL_QUOTES.length
    );
  };

  const handleReact = () => {
    soundEngine.playCelebrationFanfare();
    triggerRainbowConfetti();
  };

  if (dismissed) return null;

  return (
    <aside
      aria-label="Birthday Wishes & Memories"
      className="fixed bottom-4 right-4 z-40 max-w-sm sm:max-w-md pointer-events-auto"
    >
      <AnimatePresence mode="wait">
        {isMinimized ? (
          // Minimized Floating Pill Button
          <motion.button
            key="minimized-pill"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={() => {
              soundEngine.playClick();
              setIsMinimized(false);
            }}
            className="flex items-center gap-2 rounded-full border border-white/20 bg-[#0E0B19]/90 px-4 py-2 text-xs font-mono text-white shadow-[0_8px_30px_rgba(0,0,0,0.6)] backdrop-blur-xl transition hover:border-[#22D3EE] hover:scale-105"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#EC4899] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#EC4899]" />
            </span>
            <Sparkles className="h-3.5 w-3.5 text-[#FACC15]" />
            <span className="font-semibold">Birthday Memories & Quotes 💌</span>
          </motion.button>
        ) : (
          // Full Expanded Memory & Quote Capsule
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.94 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="group relative overflow-hidden rounded-2xl border bg-[#0E0B19]/95 p-3.5 sm:p-4 shadow-[0_16px_50px_rgba(0,0,0,0.85)] backdrop-blur-2xl transition-all duration-300"
            style={{
              borderColor: `${current.accentColor}55`,
              boxShadow: `0 16px 45px -10px ${current.accentColor}30`,
            }}
          >
            {/* Top Accent Gradient Line */}
            <div
              className="absolute inset-x-0 top-0 h-[2px]"
              style={{
                background: `linear-gradient(90deg, transparent, ${current.accentColor}, transparent)`,
              }}
            />

            {/* Header: Tag + Close / Minimize */}
            <div className="mb-2.5 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <span
                  className="rounded-full border px-2 py-0.5 font-mono text-[9px] font-bold tracking-wider"
                  style={{
                    borderColor: `${current.accentColor}60`,
                    color: current.accentColor,
                    backgroundColor: `${current.accentColor}15`,
                  }}
                >
                  {current.badge}
                </span>
                <span className="font-mono text-[10px] text-white/40">
                  {activeIndex + 1} / {SCROLL_QUOTES.length}
                </span>
              </div>

              <div className="flex items-center gap-1">
                {/* Minimize Button */}
                <button
                  type="button"
                  onClick={() => setIsMinimized(true)}
                  aria-label="Minimize"
                  title="Minimize"
                  className="flex h-6 w-6 items-center justify-center rounded-full text-white/50 transition hover:bg-white/10 hover:text-white"
                >
                  <span className="text-xs leading-none">─</span>
                </button>
                {/* Dismiss Button */}
                <button
                  type="button"
                  onClick={() => setDismissed(true)}
                  aria-label="Close"
                  title="Close"
                  className="flex h-6 w-6 items-center justify-center rounded-full text-white/50 transition hover:bg-white/10 hover:text-[#EC4899]"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Main Content: Thumbnail + Quote Side-by-Side */}
            <div className="flex items-center gap-3">
              {/* Photo Thumbnail */}
              <div
                onClick={handleReact}
                title="Click to celebrate!"
                className="relative h-16 w-16 shrink-0 cursor-pointer overflow-hidden rounded-xl border border-white/20 bg-[#151225] shadow-lg transition-transform duration-300 hover:scale-105 active:scale-95 sm:h-20 sm:w-20"
              >
                <Image
                  src={current.photo}
                  alt="Yash Memory"
                  fill
                  sizes="80px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity hover:opacity-100 flex items-end justify-center pb-1">
                  <Heart className="h-3.5 w-3.5 fill-[#EC4899] text-[#EC4899]" />
                </div>
              </div>

              {/* Heartfelt Quote Prose */}
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-[13px] leading-relaxed font-medium text-white/95 line-clamp-3">
                  &ldquo;{current.quote}&rdquo;
                </p>
                <div className="mt-1 flex items-center justify-between text-[11px] text-white/60">
                  <span className="font-mono text-[10px] text-[#22D3EE]">
                    {current.author}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Controls: Previous / Next / React */}
            <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-2 text-xs">
              <button
                type="button"
                onClick={handleReact}
                className="group flex items-center gap-1.5 rounded-full border border-[#EC4899]/30 bg-[#EC4899]/10 px-2.5 py-1 font-mono text-[10px] font-bold text-white transition hover:bg-[#EC4899]/25 hover:border-[#EC4899]"
              >
                <Heart className="h-3 w-3 fill-[#EC4899] text-[#EC4899] transition-transform group-hover:scale-125" />
                <span>Send Love 🎉</span>
              </button>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous Quote"
                  className="flex h-6 w-6 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/70 transition hover:bg-white/15 hover:text-white"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next Quote"
                  className="flex h-6 w-6 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/70 transition hover:bg-white/15 hover:text-white"
                >
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
}

