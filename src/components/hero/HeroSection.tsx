"use client";

import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Sparkles, Compass, Lightbulb, Heart, Crown } from "lucide-react";
import { BRAND } from "@/lib/constants";
import { soundEngine } from "@/lib/sound";
import { triggerRainbowConfetti } from "@/lib/animations";
import { FlutterCrystalIcon } from "@/components/effects/FloatingSymbols";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const HeroCake3D = dynamic(() => import("./HeroCake3D"), {
  ssr: false,
  loading: () => (
    <div className="flex h-44 w-44 items-center justify-center rounded-full border border-white/10 bg-[#151225]/50 font-mono text-xs text-[#22D3EE]">
      3D ENGINE...
    </div>
  ),
});

export function HeroSection() {
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const { prefersReducedMotion, isMobile } = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (prefersReducedMotion || isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setParallax({ x: nx * 16, y: ny * 16 });
  };

  const scrollToSection = (id: string, celebrate = false) => {
    soundEngine.playClick();
    if (celebrate) {
      soundEngine.playCelebrationFanfare();
      triggerRainbowConfetti();
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pt-28 pb-20 md:px-8"
    >
      {/* Background Rainbow Neon Ambient Spheres */}
      <div
        className="pointer-events-none absolute top-1/4 -left-24 h-96 w-96 rounded-full opacity-25 blur-[130px]"
        style={{ background: "radial-gradient(circle, #A855F7, transparent)" }}
      />
      <div
        className="pointer-events-none absolute right-0 bottom-1/4 h-96 w-96 rounded-full opacity-25 blur-[130px]"
        style={{ background: "radial-gradient(circle, #22D3EE, transparent)" }}
      />
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-15 blur-[150px]"
        style={{
          background:
            "conic-gradient(from 90deg, #A855F7, #EC4899, #22D3EE, #34D399, #FACC15, #A855F7)",
        }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-12">
        {/* Left Column: Cinematic Typography & Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center lg:col-span-7 lg:items-start lg:text-left"
        >
          {/* Top Eyebrow Pill */}
          <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-[#151225]/85 px-4 py-1.5 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#EC4899] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#EC4899]" />
            </span>
            <span className="font-mono text-xs font-medium tracking-widest text-[#22D3EE]">
              🎉 SPECIAL BIRTHDAY TRIBUTE // CELEBRATING YASH
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="font-display tracking-tight">
            <span className="block font-mono text-sm font-bold tracking-[0.28em] text-[#EC4899] uppercase sm:text-base md:text-lg">
              HAPPY BIRTHDAY
            </span>
            <span
              className="mt-2 block bg-clip-text text-4xl leading-[1.06] font-extrabold text-transparent sm:text-6xl xl:text-7xl"
              style={{
                backgroundImage:
                  "linear-gradient(125deg, #FFFFFF 15%, #22D3EE 48%, #A855F7 78%, #EC4899 100%)",
              }}
            >
              YASH MANGHNANI
            </span>
          </h1>

          {/* Supporting Tagline */}
          <p className="mt-6 max-w-2xl text-lg font-semibold text-white/95 sm:text-xl md:text-2xl">
            &ldquo;{BRAND.heroTagline}&rdquo;
          </p>

          {/* Additional Text */}
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base md:text-lg">
            {BRAND.heroDescription}
          </p>

          {/* Interactive Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <button
              type="button"
              onClick={() => scrollToSection("decoder", true)}
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full p-[1.5px] font-semibold text-white shadow-[0_0_35px_rgba(168,85,247,0.4)] transition-transform duration-200 hover:scale-105 active:scale-95"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#A855F7] via-[#EC4899] to-[#22D3EE]" />
              <span className="relative flex items-center gap-2.5 rounded-full bg-[#080711]/85 px-7 py-3.5 text-sm transition-colors group-hover:bg-[#080711]/60 sm:text-base">
                <Sparkles className="h-4 w-4 text-[#FACC15]" />
                <span>Start Birthday Surprise</span>
              </span>
            </button>

            <button
              type="button"
              onClick={() => scrollToSection("journey", false)}
              className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-[#151225]/80 px-7 py-3.5 text-sm font-semibold text-white/90 backdrop-blur-md transition-all duration-200 hover:border-[#22D3EE]/60 hover:bg-[#151225] hover:text-white hover:shadow-[0_0_24px_rgba(34,211,238,0.2)] sm:text-base"
            >
              <Compass className="h-4 w-4 text-[#22D3EE]" />
              <span>Explore His Story & Memories</span>
            </button>
          </div>

          {/* Human Character & Birthday Telemetry Pills */}
          <div className="mt-10 grid grid-cols-3 gap-3 border-t border-white/10 pt-6 sm:gap-6">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#22D3EE]/30 bg-[#22D3EE]/10 text-[#22D3EE]">
                <Lightbulb className="h-4 w-4" />
              </div>
              <div className="text-left">
                <div className="font-mono text-xs font-bold text-white">
                  CREATIVE GENIUS
                </div>
                <div className="font-mono text-[10px] text-white/50">
                  Big Dreams &amp; Craft
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#EC4899]/30 bg-[#EC4899]/10 text-[#EC4899]">
                <Heart className="h-4 w-4" />
              </div>
              <div className="text-left">
                <div className="font-mono text-xs font-bold text-white">
                  GOLDEN HEART
                </div>
                <div className="font-mono text-[10px] text-white/50">
                  Kind &amp; Inspiring
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#FACC15]/30 bg-[#FACC15]/10 text-[#FACC15]">
                <Crown className="h-4 w-4" />
              </div>
              <div className="text-left">
                <div className="font-mono text-xs font-bold text-white">
                  TRUE LEADER
                </div>
                <div className="font-mono text-[10px] text-white/50">
                  Lifting Everyone Up
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Central Portrait Core + Rainbow Rings + 3D Birthday Cake + Floating Flutter Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.15 }}
          style={{
            transform: `translate3d(${parallax.x}px, ${parallax.y}px, 0)`,
          }}
          className="relative flex flex-col items-center justify-center lg:col-span-5"
        >
          {/* Outer Rotating Rainbow Neon Rings & Stage Area */}
          <div className="relative flex h-[340px] w-[340px] items-center justify-center sm:h-[420px] sm:w-[420px] lg:h-[460px] lg:w-[460px]">
            {/* Ring 1: Conic Rainbow Glow */}
            <motion.div
              animate={prefersReducedMotion ? {} : { rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              className="pointer-events-none absolute inset-0 rounded-full p-[2px] opacity-75"
              style={{
                background:
                  "conic-gradient(from 0deg, #A855F7, #EC4899, #22D3EE, #34D399, #FACC15, #6366F1, #A855F7)",
              }}
            >
              <div className="h-full w-full rounded-full bg-[#080711]" />
            </motion.div>

            {/* Ring 2: Counter-Rotating Dashed Cyber Ring */}
            <motion.div
              animate={prefersReducedMotion ? {} : { rotate: -360 }}
              transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
              className="pointer-events-none absolute inset-4 rounded-full border-2 border-dashed border-[#22D3EE]/30"
            />

            {/* Ring 3: Pulsing Inner Neon Halo */}
            <div className="pointer-events-none absolute inset-8 rounded-full border border-[#EC4899]/35 shadow-[0_0_50px_rgba(168,85,247,0.3)]" />

            {/* Central Portrait Container (Prominently Highlighted & Unobstructed) */}
            <div className="group relative z-10 h-[260px] w-[260px] overflow-hidden rounded-full border-2 border-[#22D3EE]/60 bg-[#151225] shadow-[0_0_60px_rgba(34,211,238,0.35)] sm:h-[320px] sm:w-[320px] lg:h-[350px] lg:w-[350px]">
              <Image
                src="/images/yash/boss-portrait.png"
                alt="Yash Manghnani — Portrait"
                fill
                priority
                sizes="(max-width: 640px) 260px, (max-width: 1024px) 320px, 350px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Floating Visionary Badge (Moved outward to upper-left orbit) */}
            <motion.div
              animate={
                prefersReducedMotion
                  ? {}
                  : { y: [0, -10, 0], rotate: [0, 4, 0] }
              }
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -left-4 z-20 flex items-center gap-2 rounded-2xl border border-[#22D3EE]/50 bg-[#151225]/95 px-3.5 py-2 shadow-[0_0_30px_rgba(34,211,238,0.35)] backdrop-blur-xl sm:-top-6 sm:-left-8 lg:-left-12"
            >
              <FlutterCrystalIcon className="h-6 w-6 sm:h-7 sm:w-7" />
              <div className="text-left">
                <div className="font-mono text-[11px] font-bold text-white">
                  Visionary Creator
                </div>
                <div className="font-mono text-[9px] text-[#34D399]">
                  ● Spreading Smiles
                </div>
              </div>
            </motion.div>

            {/* Floating Birthday Cheer Pill (Moved outward to upper-right orbit) */}
            <motion.div
              animate={
                prefersReducedMotion ? {} : { y: [0, 10, 0], x: [0, 4, 0] }
              }
              transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-3 -right-3 z-20 rounded-xl border border-[#A855F7]/50 bg-[#151225]/95 px-3 py-1.5 font-mono text-xs text-[#FACC15] shadow-[0_0_25px_rgba(168,85,247,0.35)] backdrop-blur-xl sm:-top-5 sm:-right-6 lg:-right-10"
            >
              {"Forever Young & Bold 🎉"}
            </motion.div>

            {/* 3D Interactive Birthday Cake Floating Pod (Moved cleanly to outer bottom-right) */}
            <div className="absolute -bottom-6 -right-4 z-20 flex flex-col items-center rounded-3xl border border-white/20 bg-[#0E0B19]/90 p-1.5 shadow-[0_16px_40px_rgba(0,0,0,0.85)] backdrop-blur-xl sm:-bottom-8 sm:-right-8 lg:-bottom-8 lg:-right-12">
              <HeroCake3D className="h-24 w-24 sm:h-28 sm:w-28" />
              <span className="mb-1 rounded-full bg-white/5 px-2 py-0.5 font-mono text-[9px] tracking-wider text-[#EC4899]">
                🎂 Tap To Celebrate!
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
