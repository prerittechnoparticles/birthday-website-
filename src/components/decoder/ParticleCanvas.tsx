"use client";

import { useEffect, useRef } from "react";
import { FLUTTER_BIRTHDAY_CODE, NEON_PALETTE } from "@/lib/constants";
import { DecoderPhase } from "@/hooks/useBirthdaySequence";

interface Particle {
  x: number;
  y: number;
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  color: string;
  targetColor: string;
  size: number;
  angle: number;
  orbitRadius: number;
  delay: number;
}

interface FireworkSpark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  size: number;
}

interface ParticleCanvasProps {
  phase: DecoderPhase;
}

export function ParticleCanvas({ phase }: ParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -9999,
    y: -9999,
    active: false,
  });

  useEffect(() => {
    if (phase !== "disintegrating" && phase !== "celebrating") return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const width = Math.max(320, Math.floor(rect.width));
    const height = Math.max(420, Math.floor(rect.height));
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // 1. Sample Code Character Pixels from Offscreen Canvas
    const codeCanvas = document.createElement("canvas");
    codeCanvas.width = width;
    codeCanvas.height = height;
    const codeCtx = codeCanvas.getContext("2d");

    const codeLines = FLUTTER_BIRTHDAY_CODE.split("\n");
    const codeColors = [
      "#EC4899",
      "#22D3EE",
      "#A855F7",
      "#34D399",
      "#FACC15",
      "#6366F1",
    ];

    if (codeCtx) {
      const fontSize = width < 600 ? 11 : 13;
      codeCtx.font = `600 ${fontSize}px monospace`;
      const startX = width < 600 ? 24 : 56;
      const startY = 36;
      const lineHeight = fontSize * 1.45;

      codeLines.forEach((line, idx) => {
        codeCtx.fillStyle = codeColors[idx % codeColors.length];
        codeCtx.fillText(line, startX, startY + idx * lineHeight);
      });
    }

    const codePoints: { x: number; y: number; color: string }[] = [];
    if (codeCtx) {
      const imgData = codeCtx.getImageData(0, 0, width, height).data;
      const step = width < 600 ? 3 : 2;
      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const i = (y * width + x) * 4;
          if (imgData[i + 3] > 90) {
            const r = imgData[i];
            const g = imgData[i + 1];
            const b = imgData[i + 2];
            codePoints.push({ x, y, color: `rgb(${r},${g},${b})` });
          }
        }
      }
    }

    // 2. Sample Target Birthday Message Pixels from Offscreen Canvas
    const targetCanvas = document.createElement("canvas");
    targetCanvas.width = width;
    targetCanvas.height = height;
    const targetCtx = targetCanvas.getContext("2d");

    if (targetCtx) {
      targetCtx.textAlign = "center";
      targetCtx.textBaseline = "middle";

      const titleSize =
        width < 480 ? 26 : width < 768 ? 38 : width < 1024 ? 50 : 60;
      const nameSize =
        width < 480 ? 30 : width < 768 ? 44 : width < 1024 ? 58 : 70;

      targetCtx.font = `900 ${titleSize}px sans-serif`;
      targetCtx.fillStyle = "#FFFFFF";
      targetCtx.fillText("HAPPY BIRTHDAY", width / 2, height * 0.17);

      targetCtx.font = `900 ${nameSize}px sans-serif`;
      targetCtx.fillText("YASH MANGHNANI", width / 2, height * 0.28);
    }

    const targetPoints: { x: number; y: number; color: string }[] = [];
    if (targetCtx) {
      const imgData = targetCtx.getImageData(0, 0, width, height).data;
      const step = width < 600 ? 3 : 3;
      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const i = (y * width + x) * 4;
          if (imgData[i + 3] > 110) {
            const ratio = x / width;
            const paletteIdx = Math.floor(ratio * NEON_PALETTE.length);
            const color =
              y < height * 0.23
                ? NEON_PALETTE[paletteIdx % NEON_PALETTE.length]
                : NEON_PALETTE[(paletteIdx + 2) % NEON_PALETTE.length];
            targetPoints.push({ x, y, color });
          }
        }
      }
    }

    // 3. Construct Particle Array matching Code -> Target
    const totalParticles = Math.max(targetPoints.length, 1400);
    const particles: Particle[] = [];
    const cx = width / 2;
    const cy = height * 0.23;

    for (let i = 0; i < totalParticles; i++) {
      const src =
        codePoints.length > 0
          ? codePoints[i % codePoints.length]
          : {
              x: Math.random() * width,
              y: Math.random() * height,
              color: NEON_PALETTE[i % NEON_PALETTE.length],
            };

      const tgt =
        targetPoints.length > 0
          ? targetPoints[i % targetPoints.length]
          : {
              x: cx + (Math.random() - 0.5) * 260,
              y: cy + (Math.random() - 0.5) * 120,
              color: NEON_PALETTE[i % NEON_PALETTE.length],
            };

      const dx = src.x - cx;
      const dy = src.y - cy;

      particles.push({
        x: src.x,
        y: src.y,
        startX: src.x,
        startY: src.y,
        targetX: tgt.x,
        targetY: tgt.y,
        vx: (Math.random() - 0.5) * 7,
        vy: (Math.random() - 0.5) * 7,
        color: src.color,
        targetColor: tgt.color,
        size: width < 600 ? 1.8 : 2.2,
        angle: Math.atan2(dy, dx),
        orbitRadius: Math.max(25, Math.sqrt(dx * dx + dy * dy)),
        delay: (src.y / height) * 0.35,
      });
    }

    // 4. Fireworks sparks in background during celebration
    const sparks: FireworkSpark[] = [];
    const spawnFirework = () => {
      const fx = width * (0.15 + Math.random() * 0.7);
      const fy = height * (0.15 + Math.random() * 0.65);
      const baseColor =
        NEON_PALETTE[Math.floor(Math.random() * NEON_PALETTE.length)];
      const count = 34;
      for (let i = 0; i < count; i++) {
        const ang = (Math.PI * 2 * i) / count;
        const speed = 1.4 + Math.random() * 3.2;
        sparks.push({
          x: fx,
          y: fy,
          vx: Math.cos(ang) * speed,
          vy: Math.sin(ang) * speed,
          alpha: 1,
          color: i % 3 === 0 ? "#FFFFFF" : baseColor,
          size: 1.6 + Math.random() * 1.4,
        });
      }
    };

    const startTime = performance.now();
    let lastFirework = startTime;
    let rafId: number;

    const render = (now: number) => {
      const elapsed = (now - startTime) / 1000;

      // Trail fade effect
      ctx.fillStyle = "rgba(8, 7, 17, 0.28)";
      ctx.fillRect(0, 0, width, height);

      // Ambient center radial glow as particles converge
      if (elapsed > 0.8) {
        const glowAlpha = Math.min(0.26, (elapsed - 0.8) * 0.14);
        const grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, width * 0.45);
        grad.addColorStop(0, `rgba(168, 85, 247, ${glowAlpha})`);
        grad.addColorStop(0.5, `rgba(34, 211, 238, ${glowAlpha * 0.6})`);
        grad.addColorStop(1, "rgba(8, 7, 17, 0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      }

      // Spawn periodic fireworks once converged
      if (elapsed > 1.8 && now - lastFirework > 680) {
        spawnFirework();
        lastFirework = now;
      }

      // Update & draw firework sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const sp = sparks[i];
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.vy += 0.04; // gentle gravity
        sp.alpha -= 0.018;
        if (sp.alpha <= 0) {
          sparks.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = sp.alpha;
        ctx.fillStyle = sp.color;
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, sp.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // Update & draw code-to-message particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const localT = Math.max(0, elapsed - p.delay);

        if (localT <= 0) {
          // Still sitting as code character
          ctx.fillStyle = p.color;
          ctx.fillRect(p.startX, p.startY, p.size, p.size);
          continue;
        }

        if (localT < 0.95) {
          // Stage 1: Disintegrate code & swirl toward center vortex
          const progress = localT / 0.95;
          p.angle += 0.095;
          const currentRadius = p.orbitRadius * (1 - progress * 0.72);
          const vortexX =
            cx + Math.cos(p.angle) * currentRadius + p.vx * (1 - progress) * 4;
          const vortexY =
            cy + Math.sin(p.angle) * currentRadius + p.vy * (1 - progress) * 4;
          p.x += (vortexX - p.x) * 0.22;
          p.y += (vortexY - p.y) * 0.22;
          ctx.fillStyle = progress > 0.5 ? p.targetColor : p.color;
        } else {
          // Stage 2: Converge smoothly onto HAPPY BIRTHDAY YASH MANGHNANI
          const ease = 0.13;
          let destX = p.targetX;
          let destY = p.targetY;

          // Subtle interactive cursor repulsion
          if (mouseRef.current.active) {
            const mdx = p.x - mouseRef.current.x;
            const mdy = p.y - mouseRef.current.y;
            const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
            if (mDist < 75 && mDist > 0.1) {
              const force = ((75 - mDist) / 75) * 28;
              destX += (mdx / mDist) * force;
              destY += (mdy / mDist) * force;
            }
          }

          p.x += (destX - p.x) * ease;
          p.y += (destY - p.y) * ease;
          ctx.fillStyle = p.targetColor;
        }

        ctx.fillRect(p.x, p.y, p.size, p.size);
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [phase]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    };
  };

  const handleMouseLeave = () => {
    mouseRef.current.active = false;
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="h-full w-full cursor-crosshair"
      aria-label="Interactive Particle Transformation revealing Happy Birthday Yash Manghnani"
    />
  );
}
