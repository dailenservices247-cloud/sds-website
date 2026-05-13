// components/brand-v3/nox/WormPlaceholder.tsx
//
// Phase 1 placeholder for Nox. An 8-capsule kinematic chain that proves
// the motion architecture before any 3D asset lands. Algorithm locked in
// the shape brief, derived from Codrops "Endless Procedural Snake"
// (https://tympanus.net/codrops/2026/02/10/...):
//
//   1. HEAD spring follow with a hard MIN_GAP leash:
//      head.lerp(target, 0.04)  // slow, never catches
//      if (dist < MIN_GAP) target += awayDir * (MIN_GAP - dist)
//
//   2. TURN-RATE cap on heading angle (prevents whiplash):
//      yaw = damp(yaw, targetYaw, 4, dt)
//
//   3. BODY chain via positional history (FIFO of past head positions —
//      cheaper than IK, gives smooth snake-like trailing motion):
//      body[i].position = history[i * STRIDE]
//
//   4. BOUNDARY clamp — head.x cannot cross the right canvas's left
//      edge in world space. When the user drags the cursor into the
//      left content half, head sticks to the wall and emits a
//      `boundary-hit` event for the Phase 2 state machine.
//
//   5. SCROLL DESCENT — world Y is biased by document scroll progress
//      so the worm visually digs down the page as the user reads.
//
//   6. IDLE WIGGLE — when mouse hasn't moved for IDLE_MS, the target
//      drifts in a slow figure-8 around the worm's current head
//      position. Phase 2 will replace this with the state machine.
//
// Visual treatment in Phase 1 is intentionally raw: dark petrol capsules
// with a gold emissive head, no textures, no internal organs. The point
// is the MOTION reading right, not the surface.

"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Brand palette
const C_HEAD = new THREE.Color("#c8a23e");      // gold — head sentinel
const C_HEAD_EMISSIVE = new THREE.Color("#c8a23e");
const C_BODY = new THREE.Color("#2a6055");      // petrol — body segments
const C_BODY_EMISSIVE = new THREE.Color("#0a1e1a");
const C_TAIL = new THREE.Color("#c8a23e");      // tail brain emphasis (ouroboros)
const C_TAIL_EMISSIVE = new THREE.Color("#7e303a");

// Chain geometry
const SEG_COUNT = 8;
const SEG_RADIUS_HEAD = 0.42;
const SEG_RADIUS_TAIL = 0.22;
const SEG_DIST = 0.62;       // gap between segment centers in world units
const HISTORY_STRIDE = 4;     // body[i] reads head_history[i*stride]

// Motion constants (locked from shape brief)
const FOLLOW_LERP = 0.04;
const MIN_GAP = 1.2;
const YAW_DAMP = 4;
const IDLE_MS = 1800;
const BOUNDARY_PAD = 0.4;
const SCROLL_DESCENT_RANGE = 8;  // world units head travels top→bottom

interface WormPlaceholderProps {
  /** Document scroll progress, 0..1. Drives Y descent. */
  scrollProgress: number;
  /** Called when the head hits the right-canvas left boundary. Throttled
   * to fire at most once per 600ms. Hook for Phase 2 state machine. */
  onBoundaryHit?: () => void;
}

export function WormPlaceholder({
  scrollProgress,
  onBoundaryHit,
}: WormPlaceholderProps) {
  const { viewport, camera, size } = useThree();

  // Refs for mesh instances + motion state
  const headRef = useRef<THREE.Mesh>(null);
  const segmentRefs = useRef<(THREE.Mesh | null)[]>([]);
  const historyRef = useRef<THREE.Vector3[]>([]);
  const targetRef = useRef(new THREE.Vector3());
  const headPosRef = useRef(new THREE.Vector3(viewport.width * 0.3, viewport.height * 0.25, 0));
  const yawRef = useRef(0);
  const mouseRef = useRef({ ndcX: 0, ndcY: 0, lastMove: 0, seen: false });
  const boundaryLastHitRef = useRef(0);
  const startTimeRef = useRef(performance.now());

  // Initialize positional history with the head's start position.
  useEffect(() => {
    historyRef.current = Array.from({ length: SEG_COUNT * HISTORY_STRIDE + 4 }, () =>
      headPosRef.current.clone(),
    );
  }, []);

  // Global mousemove → store NDC relative to the CANVAS rect (not the
  // full viewport). The canvas is sticky on the right half, so mouse X
  // on the left side of the viewport maps to negative NDC X here
  // (outside canvas) which the boundary clamp catches per design.
  useEffect(() => {
    if (typeof window === "undefined") return;
    // Find the canvas element once; it lives inside the Stage's wrapper.
    const onMove = (e: MouseEvent) => {
      const canvas = document.querySelector("canvas");
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      // NDC relative to the canvas viewport. Mouse over left content
      // half gives NDC X < -1 which unprojects to a world X beyond the
      // canvas's left edge — boundary clamp then handles it.
      mouseRef.current.ndcX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.ndcY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseRef.current.seen = true;
      mouseRef.current.lastMove = performance.now();
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame((state, delta) => {
    const now = performance.now();
    const elapsed = (now - startTimeRef.current) / 1000;

    // ---- 1. Compute target in world space ----------------------------
    // Stage's camera lives over the right half of the screen, but mouse
    // NDC is full-viewport. We use the mouse's NDC directly through THIS
    // camera's projection — meaning a mouse in the left half of the
    // viewport projects to a world position with negative X (off-screen
    // for our camera) which our boundary clamp then catches.
    const dwellMs = now - mouseRef.current.lastMove;
    let targetX: number;
    let targetY: number;

    if (mouseRef.current.seen && dwellMs < IDLE_MS) {
      // Active follow — convert NDC to world coords via camera
      const tmp = new THREE.Vector3(
        mouseRef.current.ndcX,
        mouseRef.current.ndcY,
        0.5,
      );
      tmp.unproject(camera);
      targetX = tmp.x;
      targetY = tmp.y;
    } else {
      // Idle wiggle — figure-8 around the current head position
      const cx = headPosRef.current.x;
      const cy = headPosRef.current.y;
      targetX = cx + Math.cos(elapsed * 0.6) * 0.6;
      targetY = cy + Math.sin(elapsed * 1.2) * 0.35;
    }

    // ---- 2. Apply scroll descent bias to target Y --------------------
    // Worm should dig DOWN as user scrolls. Bias the target Y downward
    // based on scrollProgress so the worm naturally settles deeper.
    const scrollYBias = -scrollProgress * SCROLL_DESCENT_RANGE;
    targetY += scrollYBias;

    targetRef.current.set(targetX, targetY, 0);

    // ---- 3. Enforce MIN_GAP leash (target is never closer than gap) -
    const headPos = headPosRef.current;
    const toTarget = new THREE.Vector3().subVectors(targetRef.current, headPos);
    const dist = toTarget.length();
    if (dist < MIN_GAP && dist > 0.0001) {
      const awayDir = toTarget.clone().normalize().negate();
      targetRef.current.add(awayDir.multiplyScalar(MIN_GAP - dist));
    }

    // ---- 4. Damped follow ------------------------------------------
    headPos.lerp(targetRef.current, FOLLOW_LERP);

    // ---- 5. Boundary clamp — right canvas only ---------------------
    // The Stage canvas is sticky on the right half of the viewport.
    // Camera looks straight at world origin; with the right canvas's
    // viewport, world X=0 is roughly the LEFT EDGE of the canvas (since
    // the right canvas's CSS center is at viewport-X = 75%).
    // We compute the canvas-left-edge in world space dynamically.
    const leftEdgeNDC = new THREE.Vector3(-1, 0, 0.5);
    leftEdgeNDC.unproject(camera);
    const leftBound = leftEdgeNDC.x + BOUNDARY_PAD;

    if (headPos.x < leftBound) {
      headPos.x = leftBound;
      // Throttle boundary-hit events to once per 600ms
      if (now - boundaryLastHitRef.current > 600) {
        boundaryLastHitRef.current = now;
        onBoundaryHit?.();
      }
    }

    // ---- 6. Turn-rate cap on heading angle -------------------------
    const targetYaw = Math.atan2(toTarget.y, toTarget.x);
    // Damp toward target yaw (THREE.MathUtils.damp handles angle wrap
    // poorly with large deltas; for first-pass we accept occasional
    // long-way-around rotations — Phase 2 can refine).
    yawRef.current = THREE.MathUtils.damp(yawRef.current, targetYaw, YAW_DAMP, delta);

    // ---- 7. Push current head position into history FIFO -----------
    historyRef.current.unshift(headPos.clone());
    if (historyRef.current.length > SEG_COUNT * HISTORY_STRIDE + 4) {
      historyRef.current.pop();
    }

    // ---- 8. Apply transforms to meshes ----------------------------
    if (headRef.current) {
      headRef.current.position.copy(headPos);
      headRef.current.rotation.z = yawRef.current;
    }

    for (let i = 0; i < SEG_COUNT; i++) {
      const mesh = segmentRefs.current[i];
      if (!mesh) continue;
      const histIdx = (i + 1) * HISTORY_STRIDE;
      const histPos = historyRef.current[histIdx] || headPos;
      mesh.position.copy(histPos);

      // Each segment also orients toward the segment AHEAD of it
      const prevHistIdx = i * HISTORY_STRIDE;
      const prevPos = historyRef.current[prevHistIdx] || headPos;
      const segYaw = Math.atan2(prevPos.y - histPos.y, prevPos.x - histPos.x);
      mesh.rotation.z = segYaw;
    }
  });

  // Segment radii taper from head to tail. Tail (final segment) gets
  // a slight bump back up for the ouroboros emphasis.
  const segRadii = Array.from({ length: SEG_COUNT }, (_, i) => {
    const u = (i + 1) / SEG_COUNT;
    const base = THREE.MathUtils.lerp(SEG_RADIUS_HEAD * 0.95, SEG_RADIUS_TAIL, u);
    // Bump the last segment 12% larger — ouroboros tail-brain emphasis
    return i === SEG_COUNT - 1 ? base * 1.18 : base;
  });

  return (
    <group>
      {/* Head — gold sentinel, slightly larger, emissive */}
      <mesh ref={headRef}>
        <sphereGeometry args={[SEG_RADIUS_HEAD, 24, 16]} />
        <meshStandardMaterial
          color={C_HEAD}
          emissive={C_HEAD_EMISSIVE}
          emissiveIntensity={0.45}
          roughness={0.45}
          metalness={0.35}
        />
      </mesh>

      {/* 8 body capsules. Final (i=7) gets ouroboros gold emissive. */}
      {segRadii.map((r, i) => {
        const isTail = i === SEG_COUNT - 1;
        return (
          <mesh
            key={`seg-${i}`}
            ref={(el) => {
              segmentRefs.current[i] = el;
            }}
          >
            <sphereGeometry args={[r, 20, 14]} />
            <meshStandardMaterial
              color={isTail ? C_TAIL : C_BODY}
              emissive={isTail ? C_TAIL_EMISSIVE : C_BODY_EMISSIVE}
              emissiveIntensity={isTail ? 0.55 : 0.18}
              roughness={0.55}
              metalness={isTail ? 0.42 : 0.2}
            />
          </mesh>
        );
      })}
    </group>
  );
}
