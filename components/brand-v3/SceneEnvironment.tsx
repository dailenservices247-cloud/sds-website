// components/brand-v3/SceneEnvironment.tsx
// R3F environmental layer for V1 Immersive Garden.
//
// Per shape brief Q1 (best-outcome answer):
//   - Volumetric petrol-green fog plane drifting slowly behind Nox
//   - 1-2 floating bas-relief capsule "ghosts" (echoes of Nox segments)
//   - Cinematic 3-point lighting matching Nox PNG bake
//   - Subtle camera Y-dolly tied to scroll progress
//   - NO particles, NO sparkles
//
// Mount as a fixed-position canvas behind the v1-garden page content.
// Hidden on mobile per shape brief Key States.
//
// Refs:
// - DESIGN.md Components.Mascot — Nox (3D bas-relief register)
// - shape brief: docs/shape/v1-immersive-garden-shape.md
// - awa-v3-immersive-garden-spec.md (Three.js / WebGL bas-relief mandate)

"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, PerspectiveCamera, RoundedBox } from "@react-three/drei";
import { useRef, useEffect, useState, Suspense } from "react";
import * as THREE from "three";

// ---------------------------------------------------------------------------
// Brand-v3 palette mirrored to THREE color space (avoids importing tokens.ts
// because R3F materials need raw THREE.Color, not CSS strings)
// ---------------------------------------------------------------------------
const C = {
  shell: "#3a3b3d",
  shellDeep: "#2a2a2d",
  spine: "#2a6055",
  gold: "#c8a23e",
  cream: "#efede5",
};

// ---------------------------------------------------------------------------
// Volumetric fog plane — large translucent plane behind everything,
// petrol-green at low opacity. Drifts slowly via uv offset over time.
// ---------------------------------------------------------------------------
function FogPlane() {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshBasicMaterial>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    // Subtle Y drift — plane never moves enough to feel jittery.
    meshRef.current.position.y =
      Math.sin(state.clock.elapsedTime * 0.05) * 0.4;
    // Subtle rotation for ambient breath.
    meshRef.current.rotation.z =
      Math.sin(state.clock.elapsedTime * 0.03) * 0.02;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -8]} renderOrder={-1}>
      <planeGeometry args={[40, 25, 1, 1]} />
      <meshBasicMaterial
        ref={matRef}
        color={C.spine}
        transparent
        opacity={0.18}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// ---------------------------------------------------------------------------
// Floating bas-relief capsule ghosts — segments echoing the Nox body.
// Two capsules at deeper parallax layer, slowly drifting + rotating.
// Material picks up the petrol+gold register; subtle but present.
// ---------------------------------------------------------------------------
interface CapsuleGhostProps {
  position: [number, number, number];
  scale?: number;
  hue?: "petrol" | "gold";
  driftSpeed?: number;
}

function CapsuleGhost({
  position,
  scale = 1,
  hue = "petrol",
  driftSpeed = 0.2,
}: CapsuleGhostProps) {
  const groupRef = useRef<THREE.Group>(null);
  const baseY = position[1];

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.position.y =
      baseY + Math.sin(state.clock.elapsedTime * driftSpeed) * 0.3;
    groupRef.current.rotation.x =
      Math.sin(state.clock.elapsedTime * driftSpeed * 0.7) * 0.08;
    groupRef.current.rotation.y +=
      driftSpeed * 0.002;
  });

  const color = hue === "petrol" ? C.spine : C.gold;
  const emissive = hue === "petrol" ? "#1a4035" : "#7a601f";

  return (
    <Float
      speed={0.5}
      rotationIntensity={0.3}
      floatIntensity={0.4}
    >
      <group ref={groupRef} position={position} scale={scale}>
        {/* Body shell — matte rounded capsule */}
        <RoundedBox args={[0.8, 1.2, 0.8]} radius={0.32} smoothness={6}>
          <meshStandardMaterial
            color={C.shell}
            roughness={0.85}
            metalness={0.05}
          />
        </RoundedBox>
        {/* Inner glow — represents the "interior world" of a Nox segment */}
        <mesh position={[0, 0, 0.42]}>
          <circleGeometry args={[0.18, 32]} />
          <meshStandardMaterial
            color={color}
            emissive={emissive}
            emissiveIntensity={0.4}
            roughness={0.6}
            metalness={0.2}
          />
        </mesh>
        {/* Antique-gold filament rim around the aperture */}
        <mesh position={[0, 0, 0.43]}>
          <ringGeometry args={[0.18, 0.21, 64]} />
          <meshStandardMaterial
            color={C.gold}
            emissive="#5c4818"
            emissiveIntensity={0.2}
            roughness={0.4}
            metalness={0.6}
          />
        </mesh>
      </group>
    </Float>
  );
}

// ---------------------------------------------------------------------------
// Camera dolly — subtle Y movement tied to a normalized scroll value (0..1).
// Listens to a shared CSS custom property `--bv3-scroll-progress`
// (set by GSAP ScrollTrigger in the page) to keep the canvas decoupled
// from React state churn.
// ---------------------------------------------------------------------------
function ScrollCamera() {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const baseY = 0;
  const dollyAmount = 1.2; // total Y travel across 0..1 scroll

  useFrame(() => {
    if (typeof document === "undefined") return;
    const raw = getComputedStyle(document.documentElement)
      .getPropertyValue("--bv3-scroll-progress")
      .trim();
    const progress = parseFloat(raw || "0") || 0;
    if (cameraRef.current) {
      // Scroll downward → camera dollies upward (parallax depth feel)
      cameraRef.current.position.y = baseY + progress * dollyAmount;
    }
  });

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      fov={45}
      position={[0, 0, 7]}
      near={0.1}
      far={50}
    />
  );
}

// ---------------------------------------------------------------------------
// SceneContents — everything inside the Canvas. Suspense-wrapped for
// async asset loading (fonts, env maps if added later).
// ---------------------------------------------------------------------------
function SceneContents() {
  return (
    <>
      <ScrollCamera />

      {/* Cinematic 3-point lighting matching the Nox PNG bake */}
      {/* Warm directional key from upper-left */}
      <directionalLight
        position={[-4, 5, 4]}
        intensity={1.2}
        color="#fff5dc"
        castShadow={false}
      />
      {/* Cool fill from upper-right */}
      <directionalLight
        position={[5, 3, 2]}
        intensity={0.5}
        color="#a8b5b0"
      />
      {/* Petrol rim from below-back */}
      <pointLight
        position={[0, -3, -3]}
        intensity={0.6}
        color={C.spine}
      />
      {/* Soft ambient so shadows stay readable but not crushed */}
      <ambientLight intensity={0.35} color={C.cream} />

      {/* Volumetric fog plane */}
      <FogPlane />

      {/* Two capsule ghosts at different parallax depths */}
      <CapsuleGhost
        position={[-3.6, 1.4, -3.5]}
        scale={1.2}
        hue="petrol"
        driftSpeed={0.18}
      />
      <CapsuleGhost
        position={[3.2, -1.8, -5]}
        scale={0.9}
        hue="gold"
        driftSpeed={0.22}
      />

      {/* Exponential fog in scene space — fades distant elements into shell */}
      <fog attach="fog" args={[C.shellDeep, 6, 20]} />
    </>
  );
}

// ---------------------------------------------------------------------------
// SceneEnvironment — the public component. Wraps Canvas + reduced-motion
// fallback (returns null when reduced-motion is set; page renders fine
// without the canvas).
// ---------------------------------------------------------------------------
export function SceneEnvironment() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  if (!mounted || reducedMotion) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 hidden md:block"
      style={{ background: C.shell }}
    >
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        style={{ width: "100%", height: "100%" }}
      >
        <Suspense fallback={null}>
          <SceneContents />
        </Suspense>
      </Canvas>
    </div>
  );
}

