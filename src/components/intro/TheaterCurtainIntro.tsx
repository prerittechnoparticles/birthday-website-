"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { soundEngine } from "@/lib/sound";

interface TheaterCurtainIntroProps {
  onComplete: () => void;
}

export function TheaterCurtainIntro({ onComplete }: TheaterCurtainIntroProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const handleOpenCurtain = useCallback(() => {
    if (isOpen) return;
    setIsOpen(true);
    soundEngine.startMusic();
    soundEngine.playCelebrationFanfare();

    // After animation finishes (~2.2s), signal completion to unmount
    setTimeout(() => {
      setIsFinished(true);
      onComplete();
    }, 2200);
  }, [isOpen, onComplete]);

  useEffect(() => {
    // Automatically start opening after a brief cinematic pause (750ms)
    const autoTimer = setTimeout(() => {
      handleOpenCurtain();
    }, 750);

    return () => clearTimeout(autoTimer);
  }, [handleOpenCurtain]);

  if (isFinished) return null;

  return (
    <div
      onClick={handleOpenCurtain}
      aria-label="Theater Curtain Landing"
      className="fixed inset-0 z-[100] flex cursor-pointer select-none overflow-hidden bg-[#080711]"
    >
      {/* Central Ethereal Stage Light Beam (Reveals when parting) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scaleX: 0.1 }}
            animate={{ opacity: [0, 1, 0.7, 0], scaleX: [0.1, 1.4, 2, 2.5] }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            className="pointer-events-none absolute inset-y-0 left-1/2 z-20 w-32 -translate-x-1/2"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(255, 235, 180, 0.85) 0%, rgba(236, 72, 153, 0.45) 35%, rgba(168, 85, 247, 0.25) 60%, transparent 80%)",
              filter: "blur(24px)",
            }}
          />
        )}
      </AnimatePresence>

      {/* Top Theatrical Stage Valance / Pelmet (Framing header with gold fringe) */}
      <motion.div
        initial={{ y: 0, opacity: 1 }}
        animate={isOpen ? { y: -100, opacity: 0 } : { y: 0, opacity: 1 }}
        transition={{ duration: 1.6, delay: 0.3, ease: [0.65, 0.05, 0.36, 1] }}
        className="pointer-events-none absolute top-0 right-0 left-0 z-30 flex flex-col items-center"
      >
        {/* Scalloped velvet top banner */}
        <div
          className="relative h-12 w-full border-b border-[#E5A93C]/40 shadow-[0_12px_30px_rgba(0,0,0,0.85)] md:h-16"
          style={{
            background:
              "linear-gradient(180deg, #2b0409 0%, #580d17 50%, #3b060d 100%)",
          }}
        >
          {/* Subtle gold rope accent */}
          <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-[#E5A93C] to-transparent opacity-85" />
          {/* Subtle drape shadows */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background:
                "repeating-linear-gradient(90deg, rgba(0,0,0,0.6) 0px, transparent 20px, rgba(0,0,0,0.6) 40px)",
            }}
          />
        </div>
      </motion.div>

      {/* LEFT CURTAIN PANEL */}
      <motion.div
        initial={{ x: 0, scaleX: 1 }}
        animate={
          isOpen
            ? {
                x: "-100%",
                scaleX: 0.28,
              }
            : { x: 0, scaleX: 1 }
        }
        transition={{
          duration: 1.95,
          ease: [0.65, 0.05, 0.36, 1],
        }}
        style={{
          transformOrigin: "left center",
          backgroundImage: "url('/images/curtain/curtain-left-hq.png')",
          backgroundSize: "cover",
          backgroundPosition: "right center",
          backgroundRepeat: "no-repeat",
        }}
        className="relative h-full w-1/2 overflow-hidden shadow-[20px_0_50px_rgba(0,0,0,0.9)]"
      >
        {/* Sinusoidal 3D velvet drapery folds overlay */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "repeating-linear-gradient(90deg, rgba(25, 2, 5, 0.65) 0px, rgba(65, 8, 16, 0.2) 25px, rgba(170, 32, 48, 0.38) 55px, rgba(225, 75, 95, 0.28) 65px, rgba(170, 32, 48, 0.38) 75px, rgba(65, 8, 16, 0.2) 105px, rgba(25, 2, 5, 0.65) 130px)",
          }}
        />

        {/* Vertical lighting & shadows: top drop shadow + bottom stage shadow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(15, 1, 3, 0.75) 0%, transparent 15%, transparent 85%, rgba(10, 1, 2, 0.85) 100%)",
          }}
        />

        {/* Center seam shadow (where left meets right) */}
        <div className="pointer-events-none absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-l from-[#120204]/90 to-transparent" />
      </motion.div>

      {/* RIGHT CURTAIN PANEL */}
      <motion.div
        initial={{ x: 0, scaleX: 1 }}
        animate={
          isOpen
            ? {
                x: "100%",
                scaleX: 0.28,
              }
            : { x: 0, scaleX: 1 }
        }
        transition={{
          duration: 1.95,
          ease: [0.65, 0.05, 0.36, 1],
        }}
        style={{
          transformOrigin: "right center",
          backgroundImage: "url('/images/curtain/curtain-right-hq.png')",
          backgroundSize: "cover",
          backgroundPosition: "left center",
          backgroundRepeat: "no-repeat",
        }}
        className="relative h-full w-1/2 overflow-hidden shadow-[-20px_0_50px_rgba(0,0,0,0.9)]"
      >
        {/* Sinusoidal 3D velvet drapery folds overlay */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "repeating-linear-gradient(90deg, rgba(25, 2, 5, 0.65) 0px, rgba(65, 8, 16, 0.2) 25px, rgba(170, 32, 48, 0.38) 55px, rgba(225, 75, 95, 0.28) 65px, rgba(170, 32, 48, 0.38) 75px, rgba(65, 8, 16, 0.2) 105px, rgba(25, 2, 5, 0.65) 130px)",
          }}
        />

        {/* Vertical lighting & shadows: top drop shadow + bottom stage shadow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(15, 1, 3, 0.75) 0%, transparent 15%, transparent 85%, rgba(10, 1, 2, 0.85) 100%)",
          }}
        />

        {/* Center seam shadow (where right meets left) */}
        <div className="pointer-events-none absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-[#120204]/90 to-transparent" />
      </motion.div>

      {/* Center Dividing Split Line (Visible only before opening) */}
      {!isOpen && (
        <div className="pointer-events-none absolute top-0 bottom-0 left-1/2 z-10 w-[2px] -translate-x-1/2 bg-[#120204]/95 shadow-[0_0_8px_rgba(0,0,0,0.9)]" />
      )}
    </div>
  );
}

