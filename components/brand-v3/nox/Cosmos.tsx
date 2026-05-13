// components/brand-v3/nox/Cosmos.tsx
//
// Brand-tinted cosmos backdrop for the Nox stage. NOT generic deep space.
// A full-screen plane behind the worm with a custom fragment shader that
// samples a 2-octave fBm noise field and mixes the brand palette across
// it: matte shell `#3a3b3d` (the void), petrol `#2a6055` (deep nebula),
// wine `#7e303a` (warm gas pocket), antique gold `#c8a23e` (highlight),
// cream `#efede5` (star sparkles only).
//
// Scroll-Y drives a uniform that slowly shifts the noise sample window
// so the nebula gently parallaxes deeper as the user reads. Stars are
// procedurally hashed into discrete bright points using a 800×800 grid.
//
// The shader is intentionally restrained: low contrast, slow gradient
// stops, no bright blooms. Reads as cinematic atmosphere, not "outer
// space." Matches the Editorial Workshop register from DESIGN.md.

"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const VERTEX_SHADER = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const FRAGMENT_SHADER = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform float uTime;
uniform float uScroll;

// Brand palette (linear color space; gamma handled by renderer output).
const vec3 SHELL    = vec3(0.227, 0.231, 0.239);  // #3a3b3d
const vec3 PETROL   = vec3(0.165, 0.376, 0.333);  // #2a6055
const vec3 WINE     = vec3(0.494, 0.188, 0.227);  // #7e303a
const vec3 GOLD     = vec3(0.784, 0.635, 0.243);  // #c8a23e
const vec3 CREAM    = vec3(0.937, 0.929, 0.898);  // #efede5
const vec3 SHELL_DEEP = vec3(0.165, 0.165, 0.176); // #2a2a2d

// Hash + value noise (gpu-cheap; no texture lookups).
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float valueNoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

// 2-octave fBm — cheap nebula gradient.
float fbm(vec2 p) {
  float v = 0.0;
  v += valueNoise(p) * 0.5;
  v += valueNoise(p * 2.0) * 0.25;
  v += valueNoise(p * 4.0) * 0.125;
  return v;
}

void main() {
  vec2 uv = vUv;
  // Sample window slowly shifts on scroll for parallax-deep feel.
  vec2 sampleP = uv * 3.2 + vec2(0.0, uScroll * 0.35 + uTime * 0.012);

  float n = fbm(sampleP);

  // Palette mix — visible nebula gradients, brand-restrained. Stops
  // tuned so petrol + wine + gold appear as clear pockets in the field,
  // not dissolved into shell-monotone.
  vec3 col = SHELL_DEEP;
  col = mix(col, SHELL,   smoothstep(0.15, 0.45, n));
  col = mix(col, PETROL,  smoothstep(0.38, 0.62, n) * 0.78);
  col = mix(col, WINE,    smoothstep(0.55, 0.78, n) * 0.52);
  col = mix(col, GOLD,    smoothstep(0.74, 0.94, n) * 0.42);

  // Star sparkles — sparse, cream-tinted, no bright bloom.
  vec2 starGrid = floor(uv * vec2(800.0, 1200.0));
  float star = step(0.9965, hash(starGrid));
  col += star * CREAM * 0.65;

  // Vignette toward edges — subtle, anchors the eye on the worm region.
  float vignette = 1.0 - smoothstep(0.55, 1.05, length((uv - 0.5) * vec2(1.0, 1.4)));
  col *= mix(0.85, 1.0, vignette);

  gl_FragColor = vec4(col, 1.0);
}
`;

interface CosmosProps {
  /** Document scroll progress 0..1. Drives the nebula parallax. */
  scrollProgress?: number;
}

export function Cosmos({ scrollProgress = 0 }: CosmosProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame((state) => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    materialRef.current.uniforms.uScroll.value = scrollProgress;
  });

  return (
    // Full-bleed plane behind everything. Slightly oversized to absorb
    // any aspect-ratio drift on resize without revealing canvas-clear edges.
    <mesh position={[0, 0, -8]} scale={[40, 40, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={VERTEX_SHADER}
        fragmentShader={FRAGMENT_SHADER}
        uniforms={{
          uTime: { value: 0 },
          uScroll: { value: 0 },
        }}
        depthWrite={false}
        depthTest={false}
        transparent={false}
      />
    </mesh>
  );
}
