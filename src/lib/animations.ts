import confetti from "canvas-confetti";
import { NEON_PALETTE } from "./constants";

export const fadeInUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

export function triggerRainbowConfetti() {
  if (typeof window === "undefined") return;
  const colors = [...NEON_PALETTE, "#FFFFFF"];

  confetti({
    particleCount: 70,
    spread: 75,
    origin: { x: 0.25, y: 0.65 },
    colors,
  });

  confetti({
    particleCount: 70,
    spread: 75,
    origin: { x: 0.75, y: 0.65 },
    colors,
  });

  setTimeout(() => {
    confetti({
      particleCount: 90,
      spread: 110,
      startVelocity: 42,
      origin: { x: 0.5, y: 0.5 },
      colors,
    });
  }, 240);
}

export function triggerFireworksBurst() {
  if (typeof window === "undefined") return;
  const colors = [...NEON_PALETTE, "#FFFFFF"];
  const duration = 2600;
  const end = Date.now() + duration;

  const frame = () => {
    confetti({
      particleCount: 6,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.65 },
      colors,
    });
    confetti({
      particleCount: 6,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.65 },
      colors,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };
  frame();
}
