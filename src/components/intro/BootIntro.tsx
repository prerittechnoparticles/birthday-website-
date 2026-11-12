"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Sparkles, FastForward, Terminal } from "lucide-react";
import { BOOT_MESSAGES } from "@/lib/constants";
import { soundEngine } from "@/lib/sound";
import { FlutterCrystalIcon } from "@/components/effects/FloatingSymbols";

interface BootIntroProps {
  onComplete: () => void;
}

export function BootIntro({ onComplete }: BootIntroProps) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [showSymbol, setShowSymbol] = useState(false);
  const [sfxOn, setSfxOn] = useState(true);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    setSfxOn(soundEngine.isSfxEnabled());
    return soundEngine.subscribe(() => {
      setSfxOn(soundEngine.isSfxEnabled());
    });
  }, []);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    BOOT_MESSAGES.forEach((_, idx) => {
      const t = setTimeout(() => {
        setVisibleCount(idx + 1);
        soundEngine.playBootBeep(idx);
      }, 280 + idx * 320);
      timers.push(t);
    });

    const symbolTimer = setTimeout(() => {
      setShowSymbol(true);
    }, 280 + BOOT_MESSAGES.length * 320);
    timers.push(symbolTimer);

    return () => {
      timers.forEach((t) => clearTimeout(t));
    };
  }, []);

  const handleEnter = () => {
    if (exiting) return;
    setExiting(true);
    soundEngine.playEnterChime();
    setTimeout(() => {
      onComplete();
    }, 450);
  };

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="boot-intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04, filter: "blur(12px)" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex flex-col justify-between overflow-hidden bg-[#080711] p-6 text-white md:p-10"
        >
          {/* Ambient radial glow */}
          <div
            className="pointer-events-none absolute top-1/2 left-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-[130px]"
            style={{
              background:
                "radial-gradient(circle, #A855F7 0%, #22D3EE 50%, transparent 75%)",
            }}
          />

          {/* Top Bar: Telemetry + Mute/Unmute + Skip */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2 font-mono text-xs tracking-widest text-white/60">
              <Terminal className="h-4 w-4 text-[#22D3EE]" />
              <span>KERNEL // YASH.EXE BOOTLOADER</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => soundEngine.toggleSfx()}
                className="flex items-center gap-1.5 rounded-full border border-white/15 bg-[#151225]/80 px-3.5 py-1.5 font-mono text-xs text-white/80 transition hover:border-[#22D3EE]/50 hover:text-white"
              >
                {sfxOn ? (
                  <>
                    <Volume2 className="h-3.5 w-3.5 text-[#22D3EE]" />
                    <span>SOUND: ON</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="h-3.5 w-3.5 text-white/40" />
                    <span>SOUND: MUTED</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleEnter}
                className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 font-mono text-xs text-white/75 transition hover:border-white/35 hover:bg-white/10 hover:text-white"
              >
                <span>SKIP INTRO</span>
                <FastForward className="h-3.5 w-3.5 text-[#EC4899]" />
              </button>
            </div>
          </div>

          {/* Center Boot Console */}
          <div className="relative z-10 mx-auto my-auto w-full max-w-xl">
            <div className="overflow-hidden rounded-2xl border border-white/15 bg-[#0E0B19]/90 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.85)] backdrop-blur-xl md:p-8">
              {/* Window traffic lights */}
              <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#EC4899]/80" />
                  <span className="h-3 w-3 rounded-full bg-[#FACC15]/80" />
                  <span className="h-3 w-3 rounded-full bg-[#34D399]/80" />
                </div>
                <span className="font-mono text-[11px] tracking-widest text-white/45">
                  yash@flutter-engine:~
                </span>
              </div>

              {/* Primary command line with animated cursor */}
              <div className="mb-5 flex items-center gap-2 font-mono text-sm font-semibold tracking-wider text-[#22D3EE] md:text-base">
                <span className="text-[#A855F7]">❯</span>
                <span>INITIALIZING YASH.EXE...</span>
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="inline-block h-4 w-2.5 bg-[#22D3EE] shadow-[0_0_8px_#22D3EE]"
                />
              </div>

              {/* System messages */}
              <div className="space-y-2.5 font-mono text-xs md:text-sm">
                {BOOT_MESSAGES.map((msg, index) => {
                  const isShown = index < visibleCount;
                  return (
                    <motion.div
                      key={msg.text}
                      initial={{ opacity: 0, x: -10 }}
                      animate={
                        isShown ? { opacity: 1, x: 0 } : { opacity: 0.15, x: 0 }
                      }
                      transition={{ duration: 0.25 }}
                      className="flex items-center justify-between rounded-lg border border-white/5 bg-[#151225]/60 px-3.5 py-2"
                    >
                      <span className="text-white/85">{msg.text}</span>
                      <span
                        className="rounded px-2 py-0.5 text-[11px] font-bold"
                        style={{
                          color: isShown ? msg.color : "rgba(255,255,255,0.2)",
                          backgroundColor: isShown
                            ? `${msg.color}18`
                            : "transparent",
                        }}
                      >
                        [{isShown ? msg.status : "WAIT"}]
                      </span>
                    </motion.div>
                  );
                })}
              </div>

              {/* Animated Flutter-inspired symbol + Enter button */}
              <div className="mt-7 flex flex-col items-center justify-center border-t border-white/10 pt-6 text-center">
                <motion.div
                  initial={{ scale: 0.7, opacity: 0, rotate: -12 }}
                  animate={
                    showSymbol
                      ? { scale: 1, opacity: 1, rotate: 0 }
                      : { scale: 0.85, opacity: 0.35, rotate: 0 }
                  }
                  transition={{ type: "spring", stiffness: 220, damping: 18 }}
                  className="relative mb-5 flex h-20 w-20 items-center justify-center rounded-2xl border border-white/15 bg-[#151225] shadow-[0_0_40px_rgba(34,211,238,0.25)]"
                >
                  <FlutterCrystalIcon className="h-12 w-12" />
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="pointer-events-none absolute -inset-1.5 rounded-2xl border border-dashed border-[#22D3EE]/35"
                  />
                </motion.div>

                <button
                  type="button"
                  onClick={handleEnter}
                  className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-full p-[1.5px] font-mono text-sm font-bold tracking-widest text-white shadow-[0_0_30px_rgba(168,85,247,0.35)] transition-transform duration-200 hover:scale-[1.02] active:scale-[0.99]"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-[#A855F7] via-[#EC4899] to-[#22D3EE]" />
                  <span className="relative flex w-full items-center justify-center gap-2.5 rounded-full bg-[#080711]/90 px-8 py-3.5 transition-colors group-hover:bg-[#080711]/70">
                    <Sparkles className="h-4 w-4 text-[#FACC15]" />
                    <span>ENTER THE EXPERIENCE</span>
                    <span className="text-[#22D3EE] transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Bottom status bar */}
          <div className="relative z-10 flex items-center justify-between font-mono text-[11px] text-white/40">
            <span>TARGET: YASH MANGHNANI</span>
            <span>FLUTTER ENGINE // READY</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
