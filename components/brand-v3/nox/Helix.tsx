"use client";

// components/brand-v3/nox/Helix.tsx
//
// Helix, as the ART.
//
// This deliberately reverses an earlier decision. The page ran a 3D GLB
// (Rodin conversion of the R7 sheet) on the theory that geometry would beat a
// flat image. Tested at full size, it did not: the mesh is an APPROXIMATION of
// the drawing — lumpy where the art is sculpted, glossy where the art is matte,
// and the segment interiors reduce to blobs. At the ~135px he occupies on the
// page none of that was visible; blown up it was obvious.
//
// The drawing, meanwhile, is finished work: both heads, every diorama legible,
// the kintsugi seam, the glowing pod. So the page uses the drawing.
//
// WHY THE FRAME IS INVISIBLE. helix-hero.png is not chroma-keyed — keying kept
// failing because the creature's charcoal shell sits at nearly the same value
// as its ground. It does not need to be: the ART'S OWN BACKGROUND IS THE BRAND
// SHELL. Its purple bias is corrected onto #3a3b3d and every edge is feathered,
// so the rectangle dissolves into a page of the same colour. Composited corners
// measure #3a3b3d exactly.
//
// Motion is the same dig path the mesh used — the path was never the problem.
// Frame-rate independent damping: lerp(a, b, 1 - exp(-k·dt)).

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

interface HelixProps {
  /** 0..1 document scroll. */
  scrollProgress: number;
  /** 0..1+ spike when scroll halts. */
  motionKick?: number;
  /** Per-route variation so each page is a different moment of one journey. */
  phase?: number;
}

const ART = "/brand-v3/helix-hero.png";

/**
 * The dig path, in world units.
 *
 * Weighted RIGHT. The left stays a calm void because that is where copy
 * overlays — a creature crossing the headline is a legibility bug wearing art
 * direction. It also ENDS IN FRAME rather than exiting, so the last beat still
 * has him on screen.
 */
function pathAt(t: number) {
  const x = 1.35 - t * 2.6;
  const y = 1.45 - t * 2.7 + Math.sin(t * Math.PI * 1.6) * 0.4;
  const z = -2.0 + Math.sin(t * Math.PI * 2.1) * 1.1;
  return { x, y, z };
}

export function Helix({ scrollProgress, motionKick = 0, phase = 0 }: HelixProps) {
  const group = useRef<THREE.Group>(null);
  const art = useTexture(ART);

  useMemo(() => {
    art.colorSpace = THREE.SRGBColorSpace;
    art.anisotropy = 16;
    art.minFilter = THREE.LinearMipmapLinearFilter;
    art.magFilter = THREE.LinearFilter;
    art.needsUpdate = true;
  }, [art]);

  const eased = useRef({ t: 0, bob: 0 });

  useFrame((_, delta) => {
    if (!group.current) return;
    const dt = Math.min(delta, 0.1);

    // NOT a bare modulo: at the bottom scrollProgress is exactly 1, and with
    // phase 0 `1 % 1 === 0` teleported him back to the start of the path.
    const target = phase === 0 ? Math.min(1, scrollProgress) : (scrollProgress + phase) % 1;
    eased.current.t += (target - eased.current.t) * (1 - Math.exp(-2.6 * dt));

    const t = eased.current.t;
    const p = pathAt(t);

    eased.current.bob += dt * 0.55;
    const bob = Math.sin(eased.current.bob) * 0.08;
    const kick = motionKick * 0.3;

    group.current.position.set(p.x, p.y + bob, p.z - kick);
    // Gentle only. The silhouette is the whole read, so nothing here is allowed
    // to rotate him off profile.
    group.current.rotation.z = Math.sin(t * Math.PI * 1.4) * 0.07;
    group.current.rotation.y = Math.sin(eased.current.bob * 0.5) * 0.05;

    const s = 1 + (p.z + 2.0) * 0.05;
    group.current.scale.setScalar(s);
  });

  // Aspect matches the padded source (1680x533) so the art is never stretched.
  // The padding is feather room — the visible creature occupies the middle, and
  // all four edges composite to exactly #3a3b3d, so the plane has no perceptible
  // boundary against the page.
  const W = 5.0;
  const H = W * (533 / 1680);

  return (
    <group ref={group}>
      <mesh renderOrder={1}>
        <planeGeometry args={[W, H]} />
        <meshBasicMaterial
          map={art}
          transparent
          opacity={0.97}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}
