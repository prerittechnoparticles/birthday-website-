"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";

function CyberCakeMesh() {
  const groupRef = useRef<THREE.Group>(null);
  const flamesRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.45;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = -t * 0.8;
    }
    if (flamesRef.current) {
      flamesRef.current.children.forEach((flame, idx) => {
        const s = 1 + Math.sin(t * 9 + idx * 2) * 0.16;
        flame.scale.set(s, s * 1.15, s);
      });
    }
  });

  const candleAngles = [0, (Math.PI * 2) / 3, (Math.PI * 4) / 3];

  return (
    <Float speed={2.2} rotationIntensity={0.25} floatIntensity={0.55}>
      <group ref={groupRef} position={[0, -0.35, 0]}>
        {/* Glowing Base Plate */}
        <mesh position={[0, -0.55, 0]}>
          <cylinderGeometry args={[1.55, 1.65, 0.12, 48]} />
          <meshStandardMaterial
            color="#151225"
            metalness={0.8}
            roughness={0.2}
            emissive="#6366F1"
            emissiveIntensity={0.35}
          />
        </mesh>

        {/* Bottom Tier */}
        <mesh position={[0, -0.1, 0]}>
          <cylinderGeometry args={[1.25, 1.3, 0.78, 40]} />
          <meshStandardMaterial
            color="#1A1530"
            metalness={0.45}
            roughness={0.3}
            emissive="#A855F7"
            emissiveIntensity={0.22}
          />
        </mesh>

        {/* Bottom Tier Neon Trim Ring */}
        <mesh position={[0, 0.28, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.26, 0.045, 16, 64]} />
          <meshStandardMaterial
            color="#EC4899"
            emissive="#EC4899"
            emissiveIntensity={1.6}
          />
        </mesh>

        {/* Top Tier */}
        <mesh position={[0, 0.62, 0]}>
          <cylinderGeometry args={[0.88, 0.92, 0.65, 40]} />
          <meshStandardMaterial
            color="#221B3A"
            metalness={0.4}
            roughness={0.28}
            emissive="#22D3EE"
            emissiveIntensity={0.25}
          />
        </mesh>

        {/* Top Tier Cyan Trim Ring */}
        <mesh position={[0, 0.94, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.89, 0.04, 16, 64]} />
          <meshStandardMaterial
            color="#22D3EE"
            emissive="#22D3EE"
            emissiveIntensity={1.8}
          />
        </mesh>

        {/* Orbiting Holographic Ring */}
        <mesh
          ref={ringRef}
          position={[0, 0.3, 0]}
          rotation={[Math.PI / 2.6, 0.3, 0]}
        >
          <torusGeometry args={[1.75, 0.018, 12, 80]} />
          <meshStandardMaterial
            color="#34D399"
            emissive="#34D399"
            emissiveIntensity={1.4}
          />
        </mesh>

        {/* Candles */}
        {candleAngles.map((ang, i) => {
          const x = Math.cos(ang) * 0.45;
          const z = Math.sin(ang) * 0.45;
          const candleColors = ["#A855F7", "#22D3EE", "#EC4899"];
          return (
            <group key={i} position={[x, 1.18, z]}>
              <mesh>
                <cylinderGeometry args={[0.055, 0.055, 0.48, 16]} />
                <meshStandardMaterial
                  color="#FFFFFF"
                  emissive={candleColors[i]}
                  emissiveIntensity={0.65}
                />
              </mesh>
            </group>
          );
        })}

        {/* Flickering Candle Flames */}
        <group ref={flamesRef}>
          {candleAngles.map((ang, i) => {
            const x = Math.cos(ang) * 0.45;
            const z = Math.sin(ang) * 0.45;
            return (
              <mesh key={i} position={[x, 1.5, z]}>
                <sphereGeometry args={[0.09, 16, 16]} />
                <meshStandardMaterial
                  color="#FACC15"
                  emissive="#FACC15"
                  emissiveIntensity={2.8}
                />
              </mesh>
            );
          })}
        </group>
      </group>
    </Float>
  );
}

export default function HeroCake3D({ className }: { className?: string }) {
  return (
    <div className={`relative ${className || "h-28 w-28 sm:h-32 sm:w-32"}`}>
      <Canvas
        camera={{ position: [0, 1.4, 4.4], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.75} />
        <pointLight position={[3, 4, 3]} intensity={2.2} color="#A855F7" />
        <pointLight position={[-3, 2, 2]} intensity={2.0} color="#22D3EE" />
        <pointLight position={[0, 3, -2]} intensity={1.5} color="#EC4899" />
        <CyberCakeMesh />
        <Sparkles
          count={28}
          scale={3.6}
          size={2.2}
          speed={0.5}
          color="#FACC15"
        />
      </Canvas>
    </div>
  );
}
