"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, X, CheckCircle2, Sparkles } from "lucide-react";
import { PROJECTS_DATA, ProjectItem } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { soundEngine } from "@/lib/sound";

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
    null
  );

  return (
    <section
      id="projects"
      className="relative mx-auto max-w-7xl px-4 py-24 md:px-8"
    >
      {/* Section Header */}
      <div className="mb-16 text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#EC4899]/30 bg-[#151225]/80 px-4 py-1.5 font-mono text-xs tracking-widest text-[#EC4899]">
          <Layers className="h-3.5 w-3.5" />
          <span>🚀 HIS CREATIVE WORK // SIGNATURE CREATIONS</span>
        </div>
        <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
          The{" "}
          <span className="bg-gradient-to-r from-[#EC4899] via-[#A855F7] to-[#22D3EE] bg-clip-text text-transparent">
            Project Universe
          </span>
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-white/70 sm:text-base">
          A showcase of the visionary platforms and creations brought to life by Yash&apos;s boundless imagination and dedication.
        </p>
      </div>

      {/* 3-Card Responsive Grid */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {PROJECTS_DATA.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            onSelectProject={(p) => setSelectedProject(p)}
          />
        ))}
      </div>

      {/* Interactive Project Spotlight Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 280, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-white/20 bg-[#0E0B19] p-6 shadow-2xl sm:p-8"
            >
              {/* Top Gradient Accent */}
              <div
                className="absolute inset-x-0 top-0 h-1.5"
                style={{
                  background: `linear-gradient(90deg, ${selectedProject.gradientFrom}, ${selectedProject.gradientTo})`,
                }}
              />

              <div className="flex items-start justify-between gap-4">
                <div>
                  <span
                    className="font-mono text-xs font-bold tracking-widest"
                    style={{ color: selectedProject.accentHex }}
                  >
                    {selectedProject.index} • {selectedProject.tagline}
                  </span>
                  <h3 className="font-display mt-1 text-3xl font-extrabold text-white">
                    {selectedProject.name}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    soundEngine.playClick();
                    setSelectedProject(null);
                  }}
                  aria-label="Close Project Modal"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/75 transition hover:border-white/35 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Thumbnail Preview */}
              <div className="relative mt-5 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/15 bg-[#080711]">
                <Image
                  src={selectedProject.thumbnail}
                  alt={selectedProject.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 640px"
                  className="object-cover"
                />
              </div>

              <p className="mt-5 text-sm leading-relaxed text-white/80 sm:text-base">
                {selectedProject.description}
              </p>

              {/* Highlights */}
              <div className="mt-5 space-y-2">
                {selectedProject.highlights.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2.5 text-xs text-white/75 sm:text-sm"
                  >
                    <CheckCircle2
                      className="h-4 w-4 shrink-0"
                      style={{ color: selectedProject.accentHex }}
                    />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Tech Stack */}
              <div className="mt-5 flex flex-wrap gap-2">
                {selectedProject.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-lg border border-white/15 bg-[#151225] px-3 py-1 font-mono text-xs text-white/90"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Modal Footer Note */}
              <div className="mt-6 flex items-center justify-between rounded-xl border border-white/10 bg-[#151225]/80 px-4 py-3 font-mono text-xs text-white/70">
                <span className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-[#FACC15]" />
                  <span>
                    Crafted with pride by <strong className="text-white">Yash Manghnani</strong>
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="rounded-lg bg-white/10 px-3 py-1 font-semibold text-white transition hover:bg-white/20"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
