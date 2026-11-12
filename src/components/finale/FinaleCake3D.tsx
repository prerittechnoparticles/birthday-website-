"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";

interface FinaleSceneProps {
  celebrationPulse: number;
}

function FloatingBalloons() {
  const balloonsRef = useRef<THREE.Group>(null);

  const balloonConfigs = [
    { pos: [-2.4, 0.8, -0.8], color: "#A855F7", speed: 1.4, phase: 0 },
    { pos: [2.4, 1.0, -0.6], color: "#EC4899", speed: 1.7, phase: 1.2 },
    { pos: [-1.8, 1.7, -1.2], color: "#22D3EE", speed: 1.5, phase: 2.4 },
    { pos: [1.9, 1.6, -1.1], color: "#34D399", speed: 1.3, phase: 3.6 },
    { pos: [-2.7, -0.1, -0.3], color: "#FACC15", speed: 1.6, phase: 4.5 },
    { pos: [2.7, 0.0, -0.4], color: "#6366F1", speed: 1.5, phase: 5.2 },
  ] as const;

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (balloonsRef.current) {
      balloonsRef.current.children.forEach((child, idx) => {
        const cfg = balloonConfigs[idx];
        if (!cfg) return;
        child.position.y =
          cfg.pos[1] + Math.sin(t * cfg.speed + cfg.phase) * 0.22;
        child.rotation.z = Math.sin(t * 0.9 + cfg.phase) * 0.08;
      });
    }
  });

  return (
    <group ref={balloonsRef}>
      {balloonConfigs.map((b, idx) => (
        <group key={idx} position={[b.pos[0], b.pos[1], b.pos[2]]}>
          {/* Balloon Sphere */}
          <mesh scale={[1, 1.18, 1]}>
            <sphereGeometry args={[0.32, 24, 24]} />
            <meshStandardMaterial
              color={b.color}
              metalness={0.35}
              roughness={0.2}
              emissive={b.color}
              emissiveIntensity={0.55}
            />
          </mesh>
          {/* Balloon Knot */}
          <mesh position={[0, -0.39, 0]}>
            <coneGeometry args={[0.05, 0.08, 12]} />
            <meshStandardMaterial color={b.color} emissive={b.color} />
          </mesh>
          {/* Balloon String */}
          <mesh position={[0, -0.95, 0]}>
            <cylinderGeometry args={[0.006, 0.006, 1.1, 8]} />
            <meshBasicMaterial color="#FFFFFF" transparent opacity={0.35} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function GrandCakeMesh({ celebrationPulse }: FinaleSceneProps) {
  const cakeGroup = useRef<THREE.Group>(null);
  const flamesGroup = useRef<THREE.Group>(null);
  const outerRing = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (cakeGroup.current) {
      cakeGroup.current.rotation.y = t * 0.4;
    }
    if (outerRing.current) {
      outerRing.current.rotation.z = t * 0.65;
      outerRing.current.rotation.x = Math.PI / 2.3 + Math.sin(t) * 0.1;
    }
    if (flamesGroup.current) {
      flamesGroup.current.children.forEach((flame, i) => {
        const pulse = 1 + Math.sin(t * 11 + i * 1.4) * 0.18;
        flame.scale.set(pulse, pulse * 1.25, pulse);
      });
    }
  });

  const candleCount = 5;
  const candleAngles = Array.from(
    { length: candleCount },
    (_, i) => (Math.PI * 2 * i) / candleCount
  );
  const candleColors = ["#A855F7", "#EC4899", "#22D3EE", "#34D399", "#FACC15"];

  return (
    <Float speed={1.8} rotationIntensity={0.18} floatIntensity={0.4}>
      <group
        ref={cakeGroup}
        position={[0, -0.65, 0]}
        scale={celebrationPulse > 0 ? 1.04 : 1}
      >
        {/* Luxury Platter Base */}
        <mesh position={[0, -0.45, 0]}>
          <cylinderGeometry args={[1.85, 1.98, 0.14, 48]} />
          <meshStandardMaterial
            color="#0E0B19"
            metalness={0.85}
            roughness={0.18}
            emissive="#A855F7"
            emissiveIntensity={0.4}
          />
        </mesh>

        {/* Tier 1 (Bottom) */}
        <mesh position={[0, 0.02, 0]}>
          <cylinderGeometry args={[1.45, 1.52, 0.78, 48]} />
          <meshStandardMaterial
            color="#151225"
            metalness={0.45}
            roughness={0.25}
            emissive="#6366F1"
            emissiveIntensity={0.22}
          />
        </mesh>
        <mesh position={[0, 0.4, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.46, 0.045, 16, 64]} />
          <meshStandardMaterial
            color="#A855F7"
            emissive="#A855F7"
            emissiveIntensity={1.7}
          />
        </mesh>

        {/* Tier 2 (Middle) */}
        <mesh position={[0, 0.72, 0]}>
          <cylinderGeometry args={[1.08, 1.14, 0.65, 48]} />
          <meshStandardMaterial
            color="#1D1732"
            metalness={0.45}
            roughness={0.25}
            emissive="#EC4899"
            emissiveIntensity={0.25}
          />
        </mesh>
        <mesh position={[0, 1.04, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.09, 0.04, 16, 64]} />
          <meshStandardMaterial
            color="#EC4899"
            emissive="#EC4899"
            emissiveIntensity={1.8}
          />
        </mesh>

        {/* Tier 3 (Top) */}
        <mesh position={[0, 1.32, 0]}>
          <cylinderGeometry args={[0.74, 0.78, 0.56, 48]} />
          <meshStandardMaterial
            color="#241D3E"
            metalness={0.45}
            roughness={0.25}
            emissive="#22D3EE"
            emissiveIntensity={0.28}
          />
        </mesh>
        <mesh position={[0, 1.6, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.75, 0.036, 16, 64]} />
          <meshStandardMaterial
            color="#22D3EE"
            emissive="#22D3EE"
            emissiveIntensity={1.9}
          />
        </mesh>

        {/* Orbiting Rainbow Ring */}
        <mesh ref={outerRing} position={[0, 0.7, 0]}>
          <torusGeometry args={[2.1, 0.02, 16, 96]} />
          <meshStandardMaterial
            color="#34D399"
            emissive="#34D399"
            emissiveIntensity={1.6}
          />
        </mesh>

        {/* 5 Candles */}
        {candleAngles.map((ang, i) => {
          const r = 0.42;
          const x = Math.cos(ang) * r;
          const z = Math.sin(ang) * r;
          const color = candleColors[i % candleColors.length];
          return (
            <group key={i} position={[x, 1.84, z]}>
              <mesh>
                <cylinderGeometry args={[0.048, 0.048, 0.5, 16]} />
                <meshStandardMaterial
                  color="#FFFFFF"
                  emissive={color}
                  emissiveIntensity={0.75}
                />
              </mesh>
            </group>
          );
        })}

        {/* 5 Animated Glowing Candle Flames */}
        <group ref={flamesGroup}>
          {candleAngles.map((ang, i) => {
            const r = 0.42;
            const x = Math.cos(ang) * r;
            const z = Math.sin(ang) * r;
            return (
              <mesh key={i} position={[x, 2.18, z]}>
                <sphereGeometry args={[0.095, 16, 16]} />
                <meshStandardMaterial
                  color="#FACC15"
                  emissive="#FACC15"
                  emissiveIntensity={3.2}
                />
              </mesh>
            );
          })}
        </group>
      </group>
    </Float>
  );
}

export default function FinaleCake3D({ celebrationPulse }: FinaleSceneProps) {
  return (
    <div className="relative h-[320px] w-full max-w-2xl sm:h-[380px]">
      <Canvas
        camera={{ position: [0, 1.3, 5.4], fov: 44 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.85} />
        <pointLight position={[4, 5, 4]} intensity={2.6} color="#A855F7" />
        <pointLight position={[-4, 3, 3]} intensity={2.4} color="#22D3EE" />
        <pointLight position={[0, 4, -3]} intensity={2.0} color="#EC4899" />
        <FloatingBalloons />
        <GrandCakeMesh celebrationPulse={celebrationPulse} />
        <Sparkles
          count={65}
          scale={6}
          size={2.8}
          speed={0.8}
          color="#FACC15"
        />
        <Sparkles
          count={45}
          scale={5.5}
          size={2.4}
          speed={0.6}
          color="#22D3EE"
        />
      </Canvas>
    </div>
  );
}
