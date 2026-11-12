"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Code2, Sparkles } from "lucide-react";
import { ProjectItem } from "@/data/projects";
import { soundEngine } from "@/lib/sound";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
  onSelectProject: (project: ProjectItem) => void;
}

export function ProjectCard({
  project,
  index,
  onSelectProject,
}: ProjectCardProps) {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const { prefersReducedMotion, isMobile } = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      rotateX: -y * 10,
      rotateY: x * 10,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay: index * 0.12 }}
      style={{
        perspective: "1100px",
      }}
      className="h-full"
    >
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
          transition: "transform 0.18s ease-out",
        }}
        className="group relative flex h-full flex-col overflow-hidden rounded-3xl p-[1.5px]"
      >
        {/* Animated Distinct Accent Gradient Border */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${project.borderGradient} opacity-45 transition-opacity duration-300 group-hover:opacity-100`}
        />

        {/* Card Inner Body */}
        <div className="relative flex h-full flex-col justify-between rounded-[22.5px] bg-[#151225]/95 p-5 backdrop-blur-2xl sm:p-6">
          <div>
            {/* Top Index & Tagline */}
            <div className="mb-4 flex items-center justify-between">
              <span
                className="rounded-full border px-3 py-1 font-mono text-xs font-bold tracking-widest"
                style={{
                  borderColor: `${project.accentHex}55`,
                  backgroundColor: `${project.accentHex}18`,
                  color: project.accentHex,
                }}
              >
                {project.index}
              </span>
              <span className="font-mono text-[11px] text-white/45">
                {project.tagline}
              </span>
            </div>

            {/* Large Project Thumbnail */}
            <div
              onClick={() => {
                soundEngine.playClick();
                onSelectProject(project);
              }}
              className="relative mb-5 aspect-[16/10] w-full cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-[#080711]"
            >
              <Image
                src={project.thumbnail}
                alt={`${project.name} — Project Thumbnail`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080711] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-lg border border-white/10 bg-[#080711]/85 px-2.5 py-1 font-mono text-[11px] text-white/80 backdrop-blur-md">
                <Sparkles
                  className="h-3 w-3"
                  style={{ color: project.accentHex }}
                />
                <span>{project.name}</span>
              </div>
            </div>

            {/* Project Title & Description */}
            <h3 className="font-display text-2xl font-extrabold text-white transition-colors group-hover:text-[#22D3EE]">
              {project.name}
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-white/70">
              {project.description}
            </p>

            {/* Technology Stack */}
            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg border border-white/10 bg-[#080711]/80 px-2.5 py-1 font-mono text-[11px] text-white/80"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-4">
            <button
              type="button"
              onClick={() => {
                soundEngine.playClick();
                onSelectProject(project);
              }}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 font-mono text-xs font-bold text-white shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: `linear-gradient(135deg, ${project.gradientFrom}, ${project.gradientTo})`,
              }}
            >
              <span>View Project</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </button>

            <button
              type="button"
              onClick={() => {
                soundEngine.playClick();
                onSelectProject(project);
              }}
              aria-label={`Inspect ${project.name} Repository & Config`}
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-[#080711]/80 px-3.5 py-2.5 font-mono text-xs text-white/80 transition hover:border-white/35 hover:text-white"
            >
              <Code2 className="h-4 w-4 text-[#22D3EE]" />
              <span>GitHub</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
