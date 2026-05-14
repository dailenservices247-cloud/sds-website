// components/brand-v3/NoxCanvas.tsx
//
// Fixed full-bleed R3F <Canvas> that renders the 3D Nox worm + cosmos
// atmosphere behind it. Replaces the prior 2D <CosmosVideo /> approach.
//
// Stack (back → front, inside the Canvas):
//   • drei <Stars> — bioluminescent star field, depth 60, gentle drift
//   • Custom <CosmosAtmosphere> mesh — large sphere with subtle radial
//     gradient (gold center on navy) for the deep-space backdrop glow
//   • <NoxModel /> — the rigged + animated Nox, suspended on load
//
// Lighting:
//   • ambient — low gold tint
//   • directional warm key (gold-amber)
//   • directional cool fill (petrol-teal) from the opposite side
//
// The Canvas sits at zIndex -10, pointer-events disabled so all click
// targets pass through to the page content.
//
// Honors prefers-reduced-motion via Suspense fallback (static blank).

"use client";

import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { Suspense } from "react";
import { NoxModel } from "./NoxModel";

export function NoxCanvas() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10"
      style={{ background: "var(--bv3-shell)" }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        {/* Ambient warm tint */}
        <ambientLight intensity={0.35} color="#3a2a14" />
        {/* Gold key light */}
        <directionalLight
          position={[5, 3, 4]}
          intensity={2.2}
          color="#f4d97a"
        />
        {/* Petrol cool fill */}
        <directionalLight
          position={[-4, -2, -3]}
          intensity={0.6}
          color="#2a6055"
        />
        {/* Rim from above */}
        <directionalLight
          position={[0, 5, -2]}
          intensity={0.8}
          color="#7e303a"
        />

        {/* Cosmos backdrop */}
        <Stars
          radius={60}
          depth={40}
          count={2500}
          factor={4}
          fade
          speed={0.25}
        />
        <CosmosBackdrop />

        {/* The worm */}
        <Suspense fallback={null}>
          <NoxModel />
        </Suspense>
      </Canvas>

      {/* Asymmetric left dim — copy legibility against the cosmos. Sits
          above the canvas on the DOM but below content. */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(58,59,61,0.88) 0%, rgba(58,59,61,0.7) 30%, rgba(58,59,61,0.35) 55%, rgba(58,59,61,0.05) 80%, rgba(58,59,61,0) 100%)",
        }}
      />
    </div>
  );
}

/** Large back-facing sphere with a soft gold→navy radial gradient for the
 * deep-space ambient backdrop. Pure shader, no texture, zero file cost. */
function CosmosBackdrop() {
  return (
    <mesh position={[0, 0, -8]} scale={20}>
      <sphereGeometry args={[1, 32, 32]} />
      <shaderMaterial
        side={2 /* THREE.BackSide */}
        uniforms={{
          colorCenter: { value: [0.94, 0.85, 0.48] },
          colorEdge: { value: [0.09, 0.1, 0.16] },
          colorAccent: { value: [0.49, 0.19, 0.23] },
        }}
        vertexShader={`
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform vec3 colorCenter;
          uniform vec3 colorEdge;
          uniform vec3 colorAccent;
          varying vec3 vNormal;
          void main() {
            float t = dot(normalize(vNormal), vec3(0.0, 0.4, 1.0));
            t = clamp(t * 0.5 + 0.5, 0.0, 1.0);
            vec3 col = mix(colorEdge, colorCenter, smoothstep(0.4, 0.85, t)) * 0.45;
            // Wine accent in the lower-left quadrant
            float accent = smoothstep(0.6, 1.0, dot(normalize(vNormal), vec3(-0.6, -0.6, 1.0)));
            col = mix(col, colorAccent * 0.55, accent * 0.4);
            gl_FragColor = vec4(col, 1.0);
          }
        `}
      />
    </mesh>
  );
}
