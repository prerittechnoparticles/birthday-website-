"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const SYMBOLS = [
  { text: "<Widget />", top: "14%", left: "7%", color: "#22D3EE", delay: 0 },
  { text: "@override", top: "24%", left: "86%", color: "#A855F7", delay: 1.2 },
  { text: "runApp()", top: "68%", left: "6%", color: "#EC4899", delay: 0.6 },
  { text: "{ super.key }", top: "74%", left: "84%", color: "#34D399", delay: 1.8 },
  { text: "BuildContext", top: "44%", left: "4%", color: "#6366F1", delay: 2.3 },
  { text: "=> const", top: "52%", left: "90%", color: "#FACC15", delay: 0.9 },
];

export function FlutterCrystalIcon({
  className = "w-10 h-10",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Flutter Geometric Symbol"
    >
      <defs>
        <linearGradient id="flutterBeamTop" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22D3EE" />
          <stop offset="55%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#A855F7" />
        </linearGradient>
        <linearGradient id="flutterBeamMid" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#A855F7" />
          <stop offset="50%" stopColor="#EC4899" />
          <stop offset="100%" stopColor="#22D3EE" />
        </linearGradient>
        <linearGradient id="flutterBeamLow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="100%" stopColor="#22D3EE" />
        </linearGradient>
      </defs>
      {/* Upper folded beam */}
      <polygon
        points="72,10 22,60 38,76 104,10"
        fill="url(#flutterBeamTop)"
      />
      {/* Lower folded beam */}
      <polygon
        points="72,56 45,83 61,99 104,56"
        fill="url(#flutterBeamMid)"
      />
      {/* Bottom crystal facet */}
      <polygon
        points="61,99 73,111 104,111 77,83"
        fill="url(#flutterBeamLow)"
      />
    </svg>
  );
}

export function FloatingSymbols() {
  const { prefersReducedMotion, isMobile } = useReducedMotion();

  if (isMobile) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {SYMBOLS.map((item, idx) => (
        <motion.div
          key={idx}
          style={{
            top: item.top,
            left: item.left,
            color: item.color,
          }}
          initial={{ opacity: 0.14, y: 0 }}
          animate={
            prefersReducedMotion
              ? { opacity: 0.18 }
              : {
                  opacity: [0.12, 0.28, 0.12],
                  y: [0, -16, 0],
                  rotate: [-2, 2, -2],
                }
          }
          transition={{
            duration: 7 + idx * 0.8,
            repeat: Infinity,
            delay: item.delay,
            ease: "easeInOut",
          }}
          className="absolute font-mono text-xs tracking-wider"
        >
          <span className="rounded-md border border-white/5 bg-[#151225]/40 px-2.5 py-1 backdrop-blur-sm">
            {item.text}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
