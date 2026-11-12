"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Code2,
  Cpu,
  Layers,
  Users,
  Crown,
  Image as ImageIcon,
  ChevronDown,
} from "lucide-react";
import { JOURNEY_DATA, JourneyMilestone } from "@/data/journey";
import { soundEngine } from "@/lib/sound";

const ICON_MAP = {
  Sparkles,
  Code2,
  Cpu,
  Layers,
  Users,
  Crown,
};

function MilestoneCard({
  milestone,
  index,
}: {
  milestone: JourneyMilestone;
  index: number;
}) {
  const [showPhoto, setShowPhoto] = useState(false);
  const IconComponent = ICON_MAP[milestone.iconName] || Sparkles;
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, delay: index * 0.06 }}
      className={`relative flex flex-col md:flex-row ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      } items-start md:items-center`}
    >
      {/* Card Side */}
      <div className="w-full pl-12 md:w-1/2 md:px-8">
        <div
          className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#151225]/85 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/25"
          style={{
            boxShadow: `0 16px 40px -12px ${milestone.accentColor}22`,
          }}
        >
          {/* Top Gradient Accent Bar */}
          <div
            className="absolute inset-x-0 top-0 h-[2px] opacity-80 transition-opacity group-hover:opacity-100"
            style={{
              background: `linear-gradient(90deg, ${milestone.accentColor}, ${milestone.secondaryColor})`,
            }}
          />

          <div className="flex items-start justify-between gap-4">
            <div>
              <span
                className="font-mono text-xs font-bold tracking-widest uppercase"
                style={{ color: milestone.accentColor }}
              >
                {milestone.phase}
              </span>
              <h3 className="font-display mt-1 text-2xl font-extrabold text-white">
                {milestone.title}
              </h3>
              <p className="mt-0.5 text-xs font-medium text-white/60">
                {milestone.subtitle}
              </p>
            </div>

            {/* Animated Milestone Icon */}
            <motion.div
              whileHover={{ rotate: 12, scale: 1.1 }}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-[#080711]"
              style={{
                boxShadow: `0 0 24px ${milestone.accentColor}35`,
                color: milestone.accentColor,
              }}
            >
              <IconComponent className="h-6 w-6" />
            </motion.div>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-white/75 sm:text-base">
            {milestone.description}
          </p>

          {/* Footer: Code Tag + Optional Photograph Reveal */}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
            <code className="rounded-md bg-[#080711]/90 px-2.5 py-1 font-mono text-xs text-[#22D3EE]">
              {milestone.codeTag}
            </code>

            {milestone.optionalPhoto && (
              <button
                type="button"
                onClick={() => {
                  soundEngine.playClick();
                  setShowPhoto((prev) => !prev);
                }}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono text-xs text-white/75 transition hover:border-white/30 hover:text-white"
              >
                <ImageIcon className="h-3.5 w-3.5 text-[#EC4899]" />
                <span>{showPhoto ? "Hide Memory" : "View Memory"}</span>
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform ${
                    showPhoto ? "rotate-180" : ""
                  }`}
                />
              </button>
            )}
          </div>

          {/* Optional Photograph Preview Drawer */}
          <AnimatePresence>
            {showPhoto && milestone.optionalPhoto && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="relative mt-4 aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/15 bg-[#080711]">
                  <Image
                    src={milestone.optionalPhoto}
                    alt={`${milestone.title} — Memory`}
                    fill
                    sizes="(max-width: 768px) 100vw, 480px"
                    className="object-cover"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Center Timeline Node */}
      <div className="absolute top-6 left-4 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border-2 border-white/30 bg-[#080711] md:top-1/2 md:left-1/2 md:-translate-y-1/2">
        <span
          className="h-3 w-3 rounded-full"
          style={{
            backgroundColor: milestone.accentColor,
            boxShadow: `0 0 12px ${milestone.accentColor}`,
          }}
        />
      </div>

      {/* Opposite Milestone Photo Card filling the empty space on desktop */}
      <div className="hidden w-full md:block md:w-1/2 md:px-8">
        <motion.div
          whileHover={{ scale: 1.03, rotate: 0, y: -4 }}
          style={{
            transform: `rotate(${isEven ? 1.5 : -1.5}deg)`,
            borderColor: `${milestone.accentColor}40`,
            boxShadow: `0 16px 40px -15px ${milestone.accentColor}30`,
          }}
          className="group relative overflow-hidden rounded-3xl border bg-[#151225]/85 p-3 backdrop-blur-xl transition-all duration-300"
        >
          {/* Subtle Accent Glow Ring */}
          <div
            className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: `radial-gradient(600px circle at center, ${milestone.accentColor}25, transparent 60%)`,
            }}
          />

          <div className="relative aspect-[16/11] w-full overflow-hidden rounded-2xl bg-[#080711]">
            <Image
              src={milestone.optionalPhoto || "/images/journey/stage-01.jpg"}
              alt={`${milestone.title} Snapshot`}
              fill
              sizes="(max-width: 1024px) 50vw, 480px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Tag Badge */}
            <div
              className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-bold tracking-wider backdrop-blur-md"
              style={{
                borderColor: `${milestone.accentColor}60`,
                backgroundColor: "#080711cc",
                color: milestone.accentColor,
              }}
            >
              <Sparkles className="h-3 w-3" />
              <span>{milestone.phase} // MEMORY</span>
            </div>

            {/* Bottom Caption Pill */}
            <div className="absolute inset-x-3 bottom-3 flex items-center justify-between rounded-xl border border-white/10 bg-[#080711]/85 px-3 py-1.5 font-mono text-[11px] text-white/90 backdrop-blur-md">
              <span className="font-semibold">{milestone.title}</span>
              <span className="text-[10px] text-white/50">{milestone.subtitle}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function JourneySection() {
  return (
    <section
      id="journey"
      className="relative mx-auto max-w-6xl px-4 py-24 md:px-8"
    >
      {/* Section Header */}
      <div className="mb-16 text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#A855F7]/30 bg-[#151225]/80 px-4 py-1.5 font-mono text-xs tracking-widest text-[#A855F7]">
          <Sparkles className="h-3.5 w-3.5" />
          <span>🌟 HIS INSPIRING PATH // 06 CHAPTERS</span>
        </div>
        <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
          The Story of{" "}
          <span className="bg-gradient-to-r from-[#A855F7] via-[#EC4899] to-[#22D3EE] bg-clip-text text-transparent">
            His Journey
          </span>
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-white/70 sm:text-base">
          From the first spark of ambition to building impactful creations and elevating everyone around him—a heartfelt tribute to Yash&apos;s continuous growth and leadership.
        </p>
      </div>

      {/* Timeline Spine & Milestones */}
      <div className="relative">
        {/* Glowing Vertical Spine */}
        <div
          className="pointer-events-none absolute top-0 bottom-0 left-4 w-[2px] -translate-x-1/2 md:left-1/2"
          style={{
            background:
              "linear-gradient(180deg, transparent, #22D3EE 12%, #A855F7 50%, #EC4899 88%, transparent)",
          }}
        />

        <div className="space-y-12">
          {JOURNEY_DATA.map((milestone, index) => (
            <MilestoneCard
              key={milestone.id}
              milestone={milestone}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
