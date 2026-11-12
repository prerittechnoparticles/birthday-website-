"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Sparkles, PartyPopper, ArrowUp } from "lucide-react";
import { NEON_PALETTE } from "@/lib/constants";
import { soundEngine } from "@/lib/sound";
import { triggerFireworksBurst, triggerRainbowConfetti } from "@/lib/animations";
import { FlutterCrystalIcon } from "@/components/effects/FloatingSymbols";

const FinaleCake3D = dynamic(() => import("./FinaleCake3D"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[320px] w-full max-w-2xl items-center justify-center rounded-3xl border border-white/10 bg-[#151225]/40 font-mono text-xs text-[#22D3EE] sm:h-[380px]">
      INITIALIZING GRAND 3D FINALE...
    </div>
  ),
});

export function FinaleSection() {
  const [celebrationPulse, setCelebrationPulse] = useState(0);
  const fireworksCanvasRef = useRef<HTMLCanvasElement>(null);

  // Ambient Rainbow Fireworks Canvas behind the Finale
  useEffect(() => {
    const canvas = fireworksCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth || 800);
    let height = (canvas.height = canvas.offsetHeight || 600);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth || 800;
      height = canvas.height = canvas.offsetHeight || 600;
    };
    window.addEventListener("resize", handleResize);

    interface Spark {
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      color: string;
      radius: number;
    }

    const sparks: Spark[] = [];
    const spawnBurst = () => {
      const x = width * (0.15 + Math.random() * 0.7);
      const y = height * (0.12 + Math.random() * 0.55);
      const color =
        NEON_PALETTE[Math.floor(Math.random() * NEON_PALETTE.length)];
      const count = 36;
      for (let i = 0; i < count; i++) {
        const ang = (Math.PI * 2 * i) / count;
        const speed = 1.2 + Math.random() * 2.8;
        sparks.push({
          x,
          y,
          vx: Math.cos(ang) * speed,
          vy: Math.sin(ang) * speed,
          alpha: 1,
          color: i % 4 === 0 ? "#FFFFFF" : color,
          radius: 1.5 + Math.random() * 1.5,
        });
      }
    };

    let lastSpawn = performance.now();
    let rafId: number;

    const animate = (now: number) => {
      ctx.clearRect(0, 0, width, height);
      if (now - lastSpawn > 900) {
        spawnBurst();
        lastSpawn = now;
      }

      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.03;
        s.alpha -= 0.016;
        if (s.alpha <= 0) {
          sparks.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = s.alpha;
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      rafId = requestAnimationFrame(animate);
    };

    spawnBurst();
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(rafId);
    };
  }, [celebrationPulse]);

  const handleCelebrateAgain = () => {
    setCelebrationPulse((p) => p + 1);
    soundEngine.playCelebrationFanfare();
    triggerRainbowConfetti();
    triggerFireworksBurst();
    setTimeout(() => {
      setCelebrationPulse(0);
    }, 1200);
  };

  return (
    <section
      id="finale"
      className="relative flex min-h-screen flex-col items-center justify-between overflow-hidden px-4 pt-24 pb-12 text-center md:px-8"
    >
      {/* Background Rainbow Fireworks Canvas */}
      <canvas
        ref={fireworksCanvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full opacity-75"
        aria-hidden="true"
      />

      {/* Ambient Conic Neon Halo */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 h-[540px] w-[540px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[150px]"
        style={{
          background:
            "conic-gradient(from 0deg, #A855F7, #EC4899, #22D3EE, #34D399, #FACC15, #A855F7)",
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center">
        {/* Finale Pill */}
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#EC4899]/40 bg-[#151225]/85 px-4 py-1.5 font-mono text-xs tracking-widest text-[#EC4899] backdrop-blur-md">
          <PartyPopper className="h-3.5 w-3.5 text-[#FACC15]" />
          <span>🎉 THE GRAND FINALE // CELEBRATE YASH</span>
        </div>

        {/* 3D Birthday Cake & Floating Balloons Stage */}
        <FinaleCake3D celebrationPulse={celebrationPulse} />

        {/* Main Message */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-display mt-2 bg-gradient-to-r from-white via-[#22D3EE] to-[#EC4899] bg-clip-text text-3xl font-extrabold tracking-tight text-transparent drop-shadow-[0_0_30px_rgba(168,85,247,0.35)] sm:text-5xl md:text-6xl"
        >
          Happy Birthday, Yash Manghnani!
        </motion.h2>

        {/* Supporting Message */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.12 }}
          className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg md:text-xl"
        >
          &ldquo;May your next chapter be filled with bigger ideas,
          extraordinary creations and endless success.&rdquo;
        </motion.p>

        {/* CELEBRATE AGAIN CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.22 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            type="button"
            onClick={handleCelebrateAgain}
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full p-[2px] font-mono text-sm font-bold tracking-widest text-white shadow-[0_0_45px_rgba(236,72,153,0.45)] transition-transform duration-200 hover:scale-105 active:scale-95"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#A855F7] via-[#EC4899] to-[#22D3EE]" />
            <span className="relative flex items-center gap-2.5 rounded-full bg-[#080711]/85 px-9 py-4 transition-colors group-hover:bg-[#080711]/55">
              <Sparkles className="h-4 w-4 text-[#FACC15]" />
              <span>CELEBRATE AGAIN</span>
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundEngine.playClick();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#151225]/80 px-6 py-4 font-mono text-xs font-semibold text-white/80 backdrop-blur-md transition hover:border-white/35 hover:text-white"
          >
            <ArrowUp className="h-4 w-4 text-[#22D3EE]" />
            <span>BACK TO TOP</span>
          </button>
        </motion.div>
      </div>

      {/* Footer Signature */}
      <footer className="relative z-10 mt-16 flex w-full max-w-6xl flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 font-mono text-xs text-white/50 sm:flex-row">
        <div className="flex items-center gap-2.5">
          <Sparkles className="h-4 w-4 text-[#FACC15]" />
          <span className="font-bold text-white/90">Yash Manghnani</span>
          <span>• Celebrating an Extraordinary Mind, Leader &amp; Friend</span>
        </div>
        <div>
          A Special Birthday Tribute Crafted With Love &amp; Admiration ❤️
        </div>
      </footer>
    </section>
  );
}
