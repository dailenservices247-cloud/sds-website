// components/brand-v3/NoxModel.tsx
//
// 3D Nox model loaded from public/brand-v3/nox-rigged.glb. Rigged with 8
// spine bones (spine_00 head → spine_07 tail) and ships with an
// `idle_wiggle_NoxArmature` animation track (60-frame loop) that runs
// continuously underneath all other transforms.
//
// Behavior on top of the idle:
//   • Scroll drives the whole worm's rotation from horizontal (top of
//     document) to vertical-dive (bottom). Smooth lerp.
//   • Scroll also drives slight Y translation so the worm visibly
//     descends with the read.
//   • Mouse parallax: subtle ±0.4 rad sway on the head bone
//     (spine_00) and ±0.2 rad on the next two bones, tied to cursor X.
//
// Mounted inside a parent <Canvas> from NoxCanvas. Uses Suspense — parent
// must wrap with <Suspense> to handle the async GLB fetch.

"use client";

import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

const GLB_PATH = "/brand-v3/nox-rigged.glb";

// Pre-fetch the GLB so the first paint is fast.
useGLTF.preload(GLB_PATH);

export function NoxModel() {
  const { scene, animations } = useGLTF(GLB_PATH);
  const { actions, mixer } = useAnimations(animations, scene);
  const groupRef = useRef<THREE.Group>(null);
  // Mouse parallax targets, eased per-frame
  const mouseRef = useRef({ x: 0, y: 0 });
  const easedMouseRef = useRef({ x: 0, y: 0 });

  // Locate the spine bones once on mount so we can drive them per-frame.
  const bonesRef = useRef<THREE.Bone[]>([]);
  useEffect(() => {
    const bones: THREE.Bone[] = [];
    scene.traverse((obj) => {
      if (obj instanceof THREE.Bone && obj.name.startsWith("spine_")) {
        bones.push(obj);
      }
    });
    bones.sort((a, b) => a.name.localeCompare(b.name));
    bonesRef.current = bones;
  }, [scene]);

  // Kick the idle animation. The action name uses Blender's exported
  // convention `idle_wiggle_NoxArmature`. Fall back to first action if the
  // name changes.
  useEffect(() => {
    const actionName = Object.keys(actions).find((n) =>
      n.toLowerCase().includes("idle"),
    ) ?? Object.keys(actions)[0];
    const action = actionName ? actions[actionName] : null;
    if (action) {
      action.reset().setLoop(THREE.LoopRepeat, Infinity).play();
    }
    return () => {
      mixer.stopAllAction();
    };
  }, [actions, mixer]);

  // Mouse listener — global, not per-canvas.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1; // -1..1
      mouseRef.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Scroll progress across the whole document — 0 at top, 1 at bottom.
    const scrollY =
      typeof window !== "undefined" ? window.scrollY : 0;
    const docHeight =
      typeof document !== "undefined"
        ? Math.max(
            1,
            document.documentElement.scrollHeight - window.innerHeight,
          )
        : 1;
    const p = Math.min(1, Math.max(0, scrollY / docHeight));

    // Rotation: horizontal swim → vertical dive (0 → -π/2 on Z).
    const targetRotZ = THREE.MathUtils.lerp(0, -Math.PI / 2, p);
    groupRef.current.rotation.z = THREE.MathUtils.damp(
      groupRef.current.rotation.z,
      targetRotZ,
      4,
      delta,
    );

    // Y translation: descend slightly with scroll.
    const targetY = THREE.MathUtils.lerp(0, -0.6, p);
    groupRef.current.position.y = THREE.MathUtils.damp(
      groupRef.current.position.y,
      targetY,
      3,
      delta,
    );

    // Mouse parallax eased toward target.
    easedMouseRef.current.x = THREE.MathUtils.damp(
      easedMouseRef.current.x,
      mouseRef.current.x,
      4,
      delta,
    );
    easedMouseRef.current.y = THREE.MathUtils.damp(
      easedMouseRef.current.y,
      mouseRef.current.y,
      4,
      delta,
    );

    // Apply mouse parallax to head + 2 leading body bones.
    // The bones taper influence: head=0.4, next=0.2, next=0.1.
    const bones = bonesRef.current;
    if (bones.length >= 3) {
      const headInf = 0.4;
      const b1Inf = 0.2;
      const b2Inf = 0.1;
      // Head (spine_00) bends toward cursor on Y axis
      bones[0].rotation.y =
        easedMouseRef.current.x * headInf;
      bones[1].rotation.y =
        easedMouseRef.current.x * b1Inf;
      bones[2].rotation.y =
        easedMouseRef.current.x * b2Inf;
      // Slight pitch on head from cursor Y
      bones[0].rotation.x =
        -easedMouseRef.current.y * (headInf * 0.6);
    }
  });

  return (
    <group ref={groupRef} position={[1.2, 0.4, 0]} scale={1.6}>
      <primitive object={scene} />
    </group>
  );
}
