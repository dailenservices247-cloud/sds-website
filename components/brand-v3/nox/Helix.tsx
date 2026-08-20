"use client";

// components/brand-v3/nox/Helix.tsx
//
// Helix, in the scene, for real.
//
// This replaces WormPlaceholder — the 8-capsule kinematic stand-in that shipped
// because the rigged GLB (nox-rigged.glb) lives on an unmerged branch and the
// Higgsfield conversion is blocked on credits. Rather than wait for either, the
// creature is the LOCKED ART: helix-side.webp, keyed out of
// helix-SHEET-LOCKED.jpg on chroma distance from neutral (the sheet background
// is grey, Helix is warm/teal, so the two separate cleanly).
//
// It is a textured plane, not geometry. That is a deliberate trade: a billboard
// that travels a considered path through a parallaxed cosmos reads far more like
// "digging through the cosmos" than an untextured capsule chain does, and it
// costs one 224 KB texture instead of a rig.
//
// Motion:
//   • scroll drives position along a dig path — enters upper-right, arcs down
//     and across, exits lower-left. Scroll up and it reverses.
//   • the plane rotates to the tangent of that path, so it always points where
//     it is going rather than sliding sideways.
//   • depth (z) oscillates so it passes nearer and further through the star
//     field instead of gliding on a single plane.
//   • an idle bob keeps it alive when the page is still.
//
// Frame-rate independent damping throughout: lerp(a, b, 1 - exp(-k·dt)).
// Immersive Garden uses the same form; naive per-frame lerp is speed-dependent
// and feels different on a 120Hz display than a 60Hz one.

import { useRef, useMemo } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

interface HelixProps {
  /** 0..1 document scroll. */
  scrollProgress: number;
  /** 0..1+ spike when scroll halts; briefly deepens the dive. */
  motionKick?: number;
  /** Per-route variation so each page is a different moment of the same journey. */
  phase?: number;
}

const TEXTURE = "/brand-v3/helix-side.webp";

/**
 * The dig path, in world units.
 *
 * Weighted to the RIGHT two-thirds of frame. The left third stays a calm void
 * because that is where the headline overlays — the same composition rule the
 * old LuxShowpiece hero used and the reason it was readable. A creature that
 * crosses the copy is a legibility bug wearing an art direction.
 */
function pathAt(t: number) {
  const x = 4.3 - t * 5.6; // enters far right, exits centre-left
  const y = 2.2 - t * 4.8 + Math.sin(t * Math.PI * 1.6) * 0.6;
  // Depth swing — passes through the star field rather than gliding on one plane.
  const z = -2.2 + Math.sin(t * Math.PI * 2.1) * 1.35;
  return { x, y, z };
}

export function Helix({ scrollProgress, motionKick = 0, phase = 0 }: HelixProps) {
  const group = useRef<THREE.Group>(null);
  const texture = useLoader(THREE.TextureLoader, TEXTURE);

  useMemo(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 8;
    texture.needsUpdate = true;
  }, [texture]);

  // Eased followers so the creature lags the scroll slightly — it is heavy, and
  // instant response reads as a sticker glued to the scrollbar.
  const eased = useRef({ t: 0, bob: 0 });

  useFrame((state, delta) => {
    if (!group.current) return;
    const dt = Math.min(delta, 0.1);

    // Target position along the path, offset by the route's phase.
    const target = (scrollProgress + phase) % 1;
    const k = 2.6;
    eased.current.t += (target - eased.current.t) * (1 - Math.exp(-k * dt));

    const t = eased.current.t;
    const p = pathAt(t);

    // Tangent, so the body points along its direction of travel.
    const ahead = pathAt(Math.min(1, t + 0.02));
    const angle = Math.atan2(ahead.y - p.y, ahead.x - p.x);

    // Idle bob keeps it breathing when the page is still.
    eased.current.bob += dt * 0.6;
    const bob = Math.sin(eased.current.bob) * 0.09;

    // A halt briefly deepens the dive — the "wake up" cue.
    const kick = motionKick * 0.35;

    group.current.position.set(p.x, p.y + bob, p.z - kick);
    group.current.rotation.z = angle + Math.PI; // texture faces left by default
    group.current.rotation.y = Math.sin(t * Math.PI * 2) * 0.18;

    // Slight scale breathing with depth so nearer passes read larger.
    const s = 2.15 + (p.z + 2.2) * 0.2;
    group.current.scale.setScalar(s);
  });

  return (
    <group ref={group}>
      <mesh>
        <planeGeometry args={[2.2, 0.97]} />
        <meshBasicMaterial
          map={texture}
          transparent
          opacity={0.62}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}
