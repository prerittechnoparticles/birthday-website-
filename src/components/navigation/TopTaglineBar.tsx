"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Music, Volume2, VolumeX } from "lucide-react";
import { soundEngine } from "@/lib/sound";

export function TopTaglineBar() {
  const [sfxOn, setSfxOn] = useState(true);
  const [musicOn, setMusicOn] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setSfxOn(soundEngine.isSfxEnabled());
    setMusicOn(soundEngine.isMusicEnabled());
    return soundEngine.subscribe(() => {
      setSfxOn(soundEngine.isSfxEnabled());
      setMusicOn(soundEngine.isMusicEnabled());
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-4 right-0 left-0 z-50 mx-auto max-w-4xl px-4 flex justify-center">
      <motion.div
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`relative flex items-center justify-between gap-3 sm:gap-6 rounded-full border px-4 py-2 sm:px-6 sm:py-2.5 transition-all duration-300 ${
          scrolled
            ? "border-white/20 bg-[#0E0B19]/90 shadow-[0_12px_36px_rgba(0,0,0,0.7)] backdrop-blur-xl"
            : "border-white/15 bg-[#151225]/75 shadow-[0_8px_28px_rgba(0,0,0,0.45)] backdrop-blur-md"
        }`}
      >
        {/* Subtle glowing rainbow top border */}
        <div
          className="pointer-events-none absolute inset-x-8 -top-px h-px opacity-80"
          style={{
            background:
              "linear-gradient(90deg, transparent, #A855F7, #EC4899, #22D3EE, #34D399, transparent)",
          }}
        />

        {/* Left Glow Beacon & Sparkle */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#34D399] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#34D399]" />
          </span>
          <Sparkles className="h-3.5 w-3.5 text-[#FACC15]" />
        </div>

        {/* Cinematic Tagline Text */}
        <div className="flex items-center text-center">
          {/* Desktop & Tablet Full Tagline */}
          <div className="hidden sm:flex items-center gap-2 font-mono text-xs md:text-sm tracking-wide">
            <span className="font-medium text-white/90">
              The Mind Behind the Code
            </span>
            <span className="text-[#22D3EE]/70 text-[10px]">✦</span>
            <span className="font-medium text-white/90">
              The Vision Behind the Products
            </span>
            <span className="text-[#EC4899]/70 text-[10px]">✦</span>
            <span className="bg-gradient-to-r from-[#EC4899] via-[#FACC15] to-[#22D3EE] bg-clip-text font-bold text-transparent">
              Happy Birthday, Yash! 🎉
            </span>
          </div>

          {/* Mobile Compact Tagline */}
          <div className="flex sm:hidden items-center gap-1.5 font-mono text-[11px] tracking-wide">
            <span className="font-medium text-white/90">
              The Mind Behind the Code
            </span>
            <span className="text-[#EC4899]/70 text-[9px]">✦</span>
            <span className="bg-gradient-to-r from-[#EC4899] via-[#FACC15] to-[#22D3EE] bg-clip-text font-bold text-transparent">
              HBD Yash! 🎉
            </span>
          </div>
        </div>

        {/* Right Subtle Audio Controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Music Toggle */}
          <button
            type="button"
            onClick={() => soundEngine.toggleMusic()}
            aria-label={musicOn ? "Pause Birthday Song" : "Play Birthday Song"}
            title={
              musicOn
                ? "Birthday Song: Playing (Click to pause)"
                : "Birthday Song: Paused (Click to play)"
            }
            className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs transition-all ${
              musicOn
                ? "border-[#EC4899]/70 bg-[#EC4899]/20 text-[#EC4899] shadow-[0_0_16px_rgba(236,72,153,0.45)]"
                : "border-white/10 bg-white/5 text-white/50 hover:border-white/25 hover:text-white"
            }`}
          >
            <Music className={`h-3 w-3 ${musicOn ? "animate-bounce text-[#EC4899]" : ""}`} />
            <span className="hidden sm:inline font-mono text-[10px] font-bold">
              {musicOn ? "MUSIC: ON 🎵" : "MUSIC: OFF"}
            </span>
          </button>

          {/* SFX Toggle */}
          <button
            type="button"
            onClick={() => soundEngine.toggleSfx()}
            aria-label={sfxOn ? "Mute SFX" : "Unmute SFX"}
            title={sfxOn ? "Sound Effects: ON" : "Sound Effects: MUTED"}
            className={`flex h-7 w-7 items-center justify-center rounded-full border transition-all ${
              sfxOn
                ? "border-[#22D3EE]/50 bg-[#22D3EE]/15 text-[#22D3EE]"
                : "border-white/10 bg-white/5 text-white/40 hover:border-white/25 hover:text-white"
            }`}
          >
            {sfxOn ? (
              <Volume2 className="h-3 w-3" />
            ) : (
              <VolumeX className="h-3 w-3" />
            )}
          </button>
        </div>
      </motion.div>
    </header>
  );
}

