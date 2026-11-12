"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  RotateCcw,
  Terminal,
  Sparkles,
  CheckCircle2,
  FastForward,
  Code2,
} from "lucide-react";
import { useBirthdaySequence } from "@/hooks/useBirthdaySequence";
import { ParticleCanvas } from "./ParticleCanvas";
import { FlutterCrystalIcon } from "@/components/effects/FloatingSymbols";
import { triggerFireworksBurst, triggerRainbowConfetti } from "@/lib/animations";
import { soundEngine } from "@/lib/sound";

const CELEBRATION_PHOTOS = [
  {
    id: "trade-01",
    src: "/images/decoder/photo-01.jpg",
    title: "Passion & Drive",
    tag: "VISIONARY",
    accentColor: "#22D3EE",
    rotation: -1.8,
  },
  {
    id: "trade-02",
    src: "/images/decoder/photo-02.jpg",
    title: "Global Impact",
    tag: "MILESTONES",
    accentColor: "#EC4899",
    rotation: 1.6,
  },
  {
    id: "trade-03",
    src: "/images/decoder/photo-03.jpg",
    title: "Leading With Grace",
    tag: "LEADERSHIP",
    accentColor: "#A855F7",
    rotation: -1.4,
  },
  {
    id: "trade-04",
    src: "/images/decoder/photo-04.jpg",
    title: "The Journey Ahead",
    tag: "INSPIRATION",
    accentColor: "#34D399",
    rotation: 1.8,
  },
];

function highlightDartLine(line: string) {
  // Tokenize a line of Dart code into syntax-colored spans
  if (line.trim().startsWith("import ")) {
    const parts = line.split("'");
    return (
      <>
        <span className="text-[#EC4899]">import </span>
        <span className="text-[#34D399]">&apos;{parts[1] ?? ""}&apos;</span>
        <span className="text-white/70">{parts[2] ?? ""}</span>
      </>
    );
  }

  if (line.trim().startsWith("@override")) {
    return <span className="text-[#FACC15]">{line}</span>;
  }

  if (line.includes("'Happy Birthday Yash Manghnani!'")) {
    const idx = line.indexOf("'");
    const leading = line.slice(0, idx);
    const trailing = line.slice(idx);
    return (
      <>
        <span>{leading}</span>
        <span className="font-bold text-[#34D399] drop-shadow-[0_0_8px_rgba(52,211,153,0.45)]">
          {trailing}
        </span>
      </>
    );
  }

  // Highlight keywords & class identifiers via regex split
  const tokens = line.split(
    /(\b(?:void|class|extends|const|return|super)\b|\b(?:BirthdayApp|StatelessWidget|Widget|BuildContext|MaterialApp|BirthdayScreen|Center|Text)\b|\b(?:main|runApp|build|home|child|key|context)\b)/g
  );

  return (
    <>
      {tokens.map((tok, i) => {
        if (
          ["void", "class", "extends", "const", "return", "super"].includes(tok)
        ) {
          return (
            <span key={i} className="text-[#A855F7]">
              {tok}
            </span>
          );
        }
        if (
          [
            "BirthdayApp",
            "StatelessWidget",
            "Widget",
            "BuildContext",
            "MaterialApp",
            "BirthdayScreen",
            "Center",
            "Text",
          ].includes(tok)
        ) {
          return (
            <span key={i} className="text-[#22D3EE]">
              {tok}
            </span>
          );
        }
        if (
          ["main", "runApp", "build", "home", "child", "key", "context"].includes(
            tok
          )
        ) {
          return (
            <span key={i} className="text-[#EC4899]">
              {tok}
            </span>
          );
        }
        return (
          <span key={i} className="text-white/90">
            {tok}
          </span>
        );
      })}
    </>
  );
}

export function FlutterDecoderSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const {
    phase,
    typedCode,
    progress,
    terminalLogs,
    executeBirthdayProtocol,
    replaySequence,
    completeTypingImmediately,
  } = useBirthdaySequence(isInView);

  const lines = typedCode.split("\n");
  const isParticleMode =
    phase === "disintegrating" || phase === "celebrating";

  return (
    <section
      id="decoder"
      ref={sectionRef}
      className="relative mx-auto max-w-6xl px-4 py-24 md:px-8"
    >
      {/* Section Header */}
      <div className="mb-12 text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#22D3EE]/30 bg-[#151225]/80 px-4 py-1.5 font-mono text-xs tracking-widest text-[#22D3EE]">
          <Sparkles className="h-3.5 w-3.5 text-[#FACC15]" />
          <span>✨ THE BIRTHDAY SURPRISE // INTERACTIVE TRIBUTE</span>
        </div>
        <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
          A Magical{" "}
          <span className="bg-gradient-to-r from-[#22D3EE] via-[#A855F7] to-[#EC4899] bg-clip-text text-transparent">
            Birthday Wish
          </span>
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-white/70 sm:text-base">
          Written with love and celebrating every milestone. Click the surprise button below to watch the words dissolve into glowing confetti and radiant fireworks!
        </p>
      </div>

      {/* VS Code / Flutter IDE Window */}
      <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-[#0E0B19]/95 shadow-[0_30px_100px_rgba(0,0,0,0.85)] backdrop-blur-2xl">
        {/* Top Rainbow Accent Line */}
        <div
          className="h-[2px] w-full"
          style={{
            background:
              "linear-gradient(90deg, #A855F7, #EC4899, #22D3EE, #34D399, #FACC15)",
          }}
        />

        {/* IDE Titlebar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-[#151225]/90 px-4 py-3 md:px-6">
          {/* Left Traffic Lights & File Tab */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#EC4899]" />
              <span className="h-3 w-3 rounded-full bg-[#FACC15]" />
              <span className="h-3 w-3 rounded-full bg-[#34D399]" />
            </div>

            <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-[#080711] px-3 py-1 font-mono text-xs text-white">
              <FlutterCrystalIcon className="h-4 w-4" />
              <span>🎂 Yash&apos;s Birthday Message</span>
              <span className="rounded bg-[#EC4899]/15 px-1.5 py-0.5 text-[10px] text-[#EC4899]">
                Special Edition
              </span>
            </div>
          </div>

          {/* Right Toolbar: Typing status + Run / Replay Buttons */}
          <div className="flex items-center gap-2.5">
            {phase === "typing" && (
              <button
                type="button"
                onClick={completeTypingImmediately}
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 font-mono text-xs text-white/75 transition hover:border-white/30 hover:text-white"
              >
                <FastForward className="h-3.5 w-3.5 text-[#22D3EE]" />
                <span>Fast Forward ({progress}%)</span>
              </button>
            )}

            {(phase === "typing" || phase === "ready") && (
              <button
                type="button"
                onClick={executeBirthdayProtocol}
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-lg bg-gradient-to-r from-[#EC4899] via-[#A855F7] to-[#22D3EE] p-[1px] font-mono text-xs font-bold text-white shadow-[0_0_25px_rgba(236,72,153,0.35)] transition-transform hover:scale-105 active:scale-95"
              >
                <span className="flex items-center gap-2 rounded-[7px] bg-[#080711]/85 px-4 py-1.5 transition group-hover:bg-[#080711]/60">
                  <Sparkles className="h-3.5 w-3.5 text-[#FACC15]" />
                  <span>🎁 Reveal Birthday Surprise</span>
                </span>
              </button>
            )}

            {phase === "compiling" && (
              <span className="inline-flex items-center gap-2 rounded-lg border border-[#FACC15]/40 bg-[#FACC15]/10 px-3.5 py-1.5 font-mono text-xs text-[#FACC15]">
                <span className="h-2 w-2 animate-ping rounded-full bg-[#FACC15]" />
                Preparing Birthday Fireworks...
              </span>
            )}

            {isParticleMode && (
              <button
                type="button"
                onClick={replaySequence}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#22D3EE]/50 bg-[#22D3EE]/15 px-3.5 py-1.5 font-mono text-xs font-semibold text-white transition hover:bg-[#22D3EE]/25"
              >
                <RotateCcw className="h-3.5 w-3.5 text-[#22D3EE]" />
                <span>Replay Birthday Magic</span>
              </button>
            )}
          </div>
        </div>

        {/* Main Stage: Either Code Editor + Terminal OR Particle Transformation Canvas */}
        <div className="relative min-h-[520px] w-full bg-[#080711]">
          {/* Code Editor View (Visible during typing, ready, compiling) */}
          <AnimatePresence mode="wait">
            {!isParticleMode && (
              <motion.div
                key="code-editor-pane"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{
                  opacity: 0,
                  scale: 1.02,
                  filter: "blur(6px)",
                  transition: { duration: 0.25 },
                }}
                className="flex flex-col justify-between p-4 sm:p-6"
              >
                <div className="overflow-x-auto font-mono text-xs leading-6 sm:text-sm sm:leading-7">
                  {lines.map((line, index) => {
                    const isLastLine = index === lines.length - 1;
                    return (
                      <div
                        key={index}
                        className="flex items-baseline hover:bg-white/[0.02]"
                      >
                        <span className="mr-4 w-7 shrink-0 text-right text-xs text-white/25 select-none sm:mr-6">
                          {index + 1}
                        </span>
                        <pre className="whitespace-pre">
                          {highlightDartLine(line)}
                          {isLastLine &&
                            (phase === "typing" || phase === "ready") && (
                              <motion.span
                                animate={{ opacity: [1, 0, 1] }}
                                transition={{ duration: 0.75, repeat: Infinity }}
                                className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-[#22D3EE] shadow-[0_0_8px_#22D3EE]"
                              />
                            )}
                        </pre>
                      </div>
                    );
                  })}
                </div>

                {/* Call-to-action bar once code finishes typing */}
                {phase === "ready" && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#A855F7]/40 bg-gradient-to-r from-[#151225] via-[#A855F7]/15 to-[#151225] px-4 py-3"
                  >
                    <div className="flex items-center gap-2.5 font-mono text-xs text-white/90">
                      <CheckCircle2 className="h-4 w-4 text-[#34D399]" />
                      <span>
                        Tribute ready! Click{" "}
                        <strong className="text-[#22D3EE]">
                          REVEAL SURPRISE
                        </strong>{" "}
                        to celebrate Yash!
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={executeBirthdayProtocol}
                      className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#A855F7] via-[#EC4899] to-[#22D3EE] px-4 py-2 font-mono text-xs font-bold text-white shadow-[0_0_20px_rgba(236,72,153,0.4)] transition hover:scale-105"
                    >
                      <Sparkles className="h-3.5 w-3.5 text-[#FACC15]" />
                      <span>REVEAL SURPRISE 🎉</span>
                    </button>
                  </motion.div>
                )}

                {/* Integrated Terminal Output Panel */}
                {terminalLogs.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 rounded-xl border border-white/15 bg-[#0E0B19] p-4 font-mono text-xs shadow-inner"
                  >
                    <div className="mb-2 flex items-center justify-between border-b border-white/10 pb-2 text-[11px] text-white/45">
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="h-3.5 w-3.5 text-[#EC4899]" />
                        BIRTHDAY CELEBRATION CONSOLE
                      </span>
                      <span className="text-[#34D399]">love &amp; wishes</span>
                    </div>
                    <div className="space-y-1.5">
                      {terminalLogs.map((log) => (
                        <div
                          key={log.id}
                          className={
                            log.type === "command"
                              ? "font-bold text-[#22D3EE]"
                              : log.type === "success"
                                ? "font-bold text-[#34D399]"
                                : log.type === "protocol"
                                  ? "font-bold text-[#EC4899]"
                                  : "text-white/70"
                          }
                        >
                          {log.text}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Canvas Particle Disintegration & Celebration Reveal */}
          {isParticleMode && (
            <div className="relative min-h-[580px] sm:min-h-[660px] md:min-h-[720px] w-full overflow-hidden">
              <ParticleCanvas phase={phase} />

              {/* Accessible & Sharp Holographic Overlay Controls during Celebration */}
              <AnimatePresence>
                {phase === "celebrating" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="pointer-events-none absolute inset-0 flex flex-col items-center justify-between p-4 sm:p-6 text-center"
                  >
                    {/* Top Status Badge */}
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#34D399]/40 bg-[#0E0B19]/85 px-4 py-1.5 font-mono text-xs text-[#34D399] shadow-[0_0_20px_rgba(52,211,153,0.25)] backdrop-blur-md">
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>
                        BUILD SUCCESSFUL • BIRTHDAY PROTOCOL ACTIVATED
                      </span>
                    </div>

                    {/* Screen-reader and Glowing Subtitle Frame */}
                    <div className="sr-only">
                      <h3>HAPPY BIRTHDAY YASH MANGHNANI</h3>
                    </div>

                    {/* 4 Floating Photos Side-by-Side */}
                    <div className="pointer-events-auto my-auto w-full max-w-5xl px-2 py-2 sm:py-4">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-5 items-center">
                        {CELEBRATION_PHOTOS.map((photo, index) => (
                          <motion.div
                            key={photo.id}
                            initial={{
                              opacity: 0,
                              y: 35,
                              scale: 0.88,
                              rotate: photo.rotation,
                            }}
                            animate={{
                              opacity: 1,
                              scale: 1,
                              y: [0, -10, 0],
                              rotate: [
                                photo.rotation,
                                photo.rotation + (index % 2 === 0 ? 1.5 : -1.5),
                                photo.rotation,
                              ],
                            }}
                            transition={{
                              opacity: {
                                duration: 0.6,
                                delay: 0.2 + index * 0.12,
                              },
                              scale: {
                                duration: 0.6,
                                delay: 0.2 + index * 0.12,
                              },
                              y: {
                                duration: 3.6 + index * 0.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: index * 0.2,
                              },
                              rotate: {
                                duration: 4.8 + index * 0.6,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: index * 0.2,
                              },
                            }}
                            whileHover={{
                              scale: 1.08,
                              y: -14,
                              rotate: 0,
                              zIndex: 30,
                            }}
                            onClick={() => {
                              soundEngine.playClick();
                              triggerFireworksBurst();
                              triggerRainbowConfetti();
                            }}
                            className="group relative cursor-pointer overflow-hidden rounded-2xl border bg-[#0E0B19]/90 p-2 shadow-2xl backdrop-blur-xl transition-shadow duration-300"
                            style={{
                              borderColor: `${photo.accentColor}55`,
                              boxShadow: `0 14px 35px -10px ${photo.accentColor}35`,
                            }}
                          >
                            {/* Photo Container */}
                            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-[#080711]">
                              <Image
                                src={photo.src}
                                alt={photo.title}
                                fill
                                sizes="(max-width: 640px) 140px, (max-width: 1024px) 200px, 240px"
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                              />

                              {/* Hover Glow Gradient */}
                              <div className="absolute inset-0 bg-gradient-to-t from-[#080711]/85 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                              {/* Tag Pill */}
                              <span
                                className="absolute top-2 left-2 rounded-full border px-2 py-0.5 font-mono text-[9px] font-bold tracking-wider backdrop-blur-md"
                                style={{
                                  borderColor: `${photo.accentColor}65`,
                                  backgroundColor: "#080711cc",
                                  color: photo.accentColor,
                                }}
                              >
                                {photo.tag}
                              </span>
                            </div>

                            {/* Card Title */}
                            <div className="mt-2 px-1 text-left">
                              <p className="font-display truncate text-xs font-bold text-white transition-colors group-hover:text-[#22D3EE]">
                                {photo.title}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Interactive Celebration Bar */}
                    <div className="pointer-events-auto flex flex-wrap items-center justify-center gap-3 rounded-2xl border border-white/15 bg-[#0E0B19]/85 px-5 py-3 shadow-2xl backdrop-blur-xl">
                      <span className="font-mono text-xs text-white/65">
                        Move cursor across particles to interact •
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          soundEngine.playCelebrationFanfare();
                          triggerRainbowConfetti();
                          triggerFireworksBurst();
                        }}
                        className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#A855F7] via-[#EC4899] to-[#22D3EE] px-4 py-1.5 font-mono text-xs font-bold text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] transition hover:scale-105"
                      >
                        <Sparkles className="h-3.5 w-3.5 text-[#FACC15]" />
                        <span>Launch Fireworks</span>
                      </button>

                      <button
                        type="button"
                        onClick={replaySequence}
                        className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 font-mono text-xs font-semibold text-white transition hover:bg-white/20"
                      >
                        <RotateCcw className="h-3.5 w-3.5 text-[#22D3EE]" />
                        <span>Replay Sequence</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* IDE Bottom Status Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 bg-[#151225] px-4 py-2 font-mono text-[11px] text-white/55">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-[#22D3EE]">
              <span className="h-2 w-2 rounded-full bg-[#EC4899]" />
              Birthday Edition • With Love &amp; Respect
            </span>
            <span className="hidden sm:inline">Special Tribute</span>
            <span className="hidden sm:inline">Yash Manghnani</span>
          </div>
          <div>
            {phase === "typing" && `PREPARING WISHES (${progress}%)`}
            {phase === "ready" && "READY: Click Reveal Birthday Surprise"}
            {phase === "compiling" && "LIGHTING FIREWORKS & CELEBRATION..."}
            {phase === "disintegrating" && "TRANSFORMING INTO PARTICLES..."}
            {phase === "celebrating" &&
              "HAPPY BIRTHDAY YASH MANGHNANI! 🎉"}
          </div>
        </div>
      </div>
    </section>
  );
}
