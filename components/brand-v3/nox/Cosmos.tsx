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
uniform float uKick;  // 0..1.6+ — scroll-stop motion boost

// Brand palette
const vec3 SHELL       = vec3(0.227, 0.231, 0.239);  // #3a3b3d
const vec3 SHELL_DEEP  = vec3(0.110, 0.114, 0.125);  // deeper than shell for void
const vec3 PETROL      = vec3(0.165, 0.376, 0.333);  // #2a6055
const vec3 PETROL_BR   = vec3(0.235, 0.494, 0.435);  // brighter petrol for arm highlights
const vec3 WINE        = vec3(0.494, 0.188, 0.227);  // #7e303a
const vec3 WINE_BR     = vec3(0.643, 0.255, 0.298);  // brighter wine
const vec3 GOLD        = vec3(0.784, 0.635, 0.243);  // #c8a23e
const vec3 GOLD_BR     = vec3(0.937, 0.792, 0.357);  // brighter gold for core + sparkles
const vec3 CREAM       = vec3(0.937, 0.929, 0.898);  // #efede5

const float PI = 3.14159265359;
const float TAU = 6.28318530718;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

// Smooth radial falloff
float falloff(float d, float r) {
  return 1.0 - smoothstep(0.0, r, d);
}

// Anime "diamond star" — 4-point sparkle, brighter than round dot.
// Returns 0..1 brightness centered at p with size s.
float diamondSparkle(vec2 fragP, vec2 starP, float s, float jitter) {
  vec2 d = abs(fragP - starP);
  // Diamond shape (L1 norm) — brighter at center, sharp edges
  float dia = 1.0 - clamp((d.x + d.y) / s, 0.0, 1.0);
  // Cross streak — horizontal + vertical thin bright rays
  float streakH = (1.0 - clamp(d.y / (s * 0.15), 0.0, 1.0)) * (1.0 - clamp(d.x / (s * 2.2), 0.0, 1.0));
  float streakV = (1.0 - clamp(d.x / (s * 0.15), 0.0, 1.0)) * (1.0 - clamp(d.y / (s * 2.2), 0.0, 1.0));
  return (dia * dia + max(streakH, streakV) * 0.7) * (0.6 + jitter * 0.4);
}

void main() {
  vec2 uv = vUv;

  // ============================================================
  // POLAR SETUP — galaxy is anchored at a center point (top-right
  // of canvas so the worm dig-line on the left side of the canvas
  // travels DOWN the page through the cosmos arm structure).
  // ============================================================
  vec2 center = vec2(0.62, 0.42 + uScroll * 0.18);
  vec2 p = uv - center;
  // Scale Y to compensate for non-square canvas (right half of 16:9).
  p.x *= 1.25;
  float r = length(p);
  // Whole-galaxy slow rotation — visible drift over ~80s for full
  // revolution. Combined with the per-frame arm phase rotation, this
  // creates layered motion. The motion-kick multiplier briefly boosts
  // rotation speed after scroll stops so the cosmos "wakes up."
  float motionBoost = 1.0 + uKick * 2.5;
  float galaxyRotation = uTime * 0.08 * motionBoost;
  float a = atan(p.y, p.x) - galaxyRotation;

  // ============================================================
  // SPIRAL ARM FIELD — logarithmic-spiral 4-armed galaxy. The arm
  // brightness is a cosine of (angle - log(radius) * twist), with
  // additional radius-based falloff so the field decays toward the
  // edge instead of becoming uniform mush.
  // ============================================================
  float twist = 4.6;
  float arms = 4.0;
  // Arm phase rotation: ~5x faster than before so the spiral
  // visibly twists/breathes. Full arm cycle ~30s.
  float armPhase = a * arms - log(r * 9.0 + 0.05) * twist - uTime * 0.22 * motionBoost;
  float armWave = cos(armPhase);
  // Sharpen the arms — pow brings the bright bands forward and
  // dims the dark inter-arm gaps. This is the cel-shaded read.
  float armField = pow(max(armWave * 0.5 + 0.5, 0.0), 1.6);
  // Multiply by a radial falloff envelope so arms exist mostly in
  // the mid-disc (0.05 to ~0.5 in radius), not at extreme edges.
  float armEnvelope = smoothstep(0.04, 0.12, r) * (1.0 - smoothstep(0.32, 0.78, r));
  armField *= armEnvelope;

  // ============================================================
  // PALETTE — cel-shaded layered mix. Dark void → wine arms →
  // petrol mid → gold core → cream hot center.
  // ============================================================
  vec3 col = SHELL;  // base elevation — shell (the page ground tone)

  // Outer arm haze — wine, restrained
  col = mix(col, WINE, armField * 0.38);

  // Arm highlights — DARK DEPTH WELLS instead of bright accents.
  // Where the spiral arms peak, mix toward SHELL_DEEP so the arms
  // read as etched-in shadow grooves rather than glowing energy
  // streaks. This is the "elevated card / depth shift" register
  // applied to a cosmic backdrop.
  col = mix(col, SHELL_DEEP, smoothstep(0.45, 0.95, armField) * 0.85);

  // Inter-arm petrol pool, broader
  float petrolHaze = falloff(r, 0.55) * (1.0 - armEnvelope * 0.5);
  col = mix(col, PETROL, petrolHaze * 0.22);

  // ============================================================
  // CORE — restored to prominent structure, but recolored to
  // SHELL_DEEP. Reads as a deep dark well at the galaxy nucleus
  // rather than a bright bloom. Pulses subtly via sin(uTime) so
  // the nucleus visibly breathes — adds slow ambient motion.
  // ============================================================
  float corePulse = 0.92 + 0.12 * sin(uTime * 0.45 * motionBoost) + uKick * 0.18;
  float core = falloff(r, 0.18 * corePulse);
  col = mix(col, SHELL_DEEP, core * 0.88);

  float hotCore = falloff(r, 0.07 * corePulse);
  col = mix(col, SHELL_DEEP, hotCore * 0.95);

  // ============================================================
  // RADIAL RAYS — restored to 16 rays with full intensity, but
  // recolored to SHELL_DEEP. These read as dark spokes radiating
  // outward, like depth grooves carved into the shell ground.
  // ============================================================
  float rayCount = 16.0;
  // Ray rotation: ~4x faster than before so the spokes visibly
  // sweep around the core. Direction is opposite to galaxy
  // rotation for counter-rotating texture.
  float rays = pow(max(cos(a * rayCount * 0.5 + uTime * 0.32 * motionBoost), 0.0), 8.0);
  float rayFalloff = smoothstep(0.04, 0.0, abs(r - 0.18))
                   + smoothstep(0.32, 0.0, abs(r - 0.10)) * 0.5;
  col = mix(col, SHELL_DEEP, rays * rayFalloff * 0.62);

  // ============================================================
  // DIAMOND SPARKLES — sparse 4-point anime stars scattered
  // across the canvas. Larger than the previous pinpoint dots.
  // Density and positions are deterministic per cell of a 8x12
  // grid so they don't shimmer/twinkle in distracting ways.
  // ============================================================
  vec2 sparkleGrid = floor(uv * vec2(8.0, 12.0));
  float sparkleHash = hash(sparkleGrid);
  // Only ~22% of cells host a sparkle
  if (sparkleHash > 0.78) {
    vec2 cellOrigin = sparkleGrid / vec2(8.0, 12.0);
    vec2 cellOffset = vec2(
      hash(sparkleGrid + 11.3),
      hash(sparkleGrid + 47.1)
    );
    vec2 starPos = cellOrigin + cellOffset / vec2(8.0, 12.0);
    float twinkle = 0.5 + 0.5 * sin(uTime * 0.8 + sparkleHash * TAU);
    float sparkBright = diamondSparkle(uv, starPos, 0.013, sparkleHash) * (0.5 + twinkle * 0.3);
    // Sparkle color: cream only (gold removed — darker register).
    col += CREAM * sparkBright * 0.55;
  }

  // ============================================================
  // STREAMING COSMIC DUST — sparse ribbon striations drifting
  // downward as user scrolls. Reduced from 14 → 5 bands so it
  // reads as "occasional dust passing the worm" rather than
  // "uniform vertical-line texture." High threshold = only the
  // brightest dust peaks make it through.
  // ============================================================
  // Dust flows downward visibly even without scroll. Time multiplier
  // boosted so dust drifts past the viewer ~2.5x faster.
  float dustFlow = uv.y * 8.0 + uTime * 0.85 + uScroll * 4.0;
  float dustBand = sin(uv.x * 5.0 + dustFlow * 0.25) * 0.5 + 0.5;
  float dustMask = smoothstep(0.82, 0.98, dustBand);  // tight threshold
  // Modulate so dust appears in patches, not uniform stripes
  float dustNoise = hash(floor(vec2(uv.x * 12.0, uv.y * 4.0 - uTime * 0.8)));
  dustMask *= smoothstep(0.55, 0.9, dustNoise);
  vec3 dustColor = mix(PETROL_BR, WINE_BR, hash(floor(uv * 6.0)));
  col += dustColor * dustMask * 0.22;

  // ============================================================
  // SECONDARY DEEP CLOUDS — large, slow-drifting wine + petrol
  // pools that extend past the galaxy structure. Anchor the
  // composition AND extend visually toward the canvas's left edge
  // so the cosmos bleeds into the column seam.
  // ============================================================
  // Clouds drift slowly via uTime even without scroll, giving the
  // left-side atmosphere persistent motion. The orbit Y also gets
  // scroll bias for the dig-progresses effect.
  vec2 cloudCenter = vec2(
    0.18 + sin(uTime * 0.07) * 0.04,
    0.65 - uScroll * 0.2 + cos(uTime * 0.09) * 0.05
  );
  float cloudField = 1.0 - smoothstep(0.0, 0.55, length(uv - cloudCenter));
  col = mix(col, WINE, cloudField * 0.22);

  vec2 cloud2Center = vec2(
    0.08 + cos(uTime * 0.05) * 0.05,
    0.25 + uScroll * 0.15 + sin(uTime * 0.08) * 0.06
  );
  float cloud2Field = 1.0 - smoothstep(0.0, 0.45, length(uv - cloud2Center));
  col = mix(col, PETROL, cloud2Field * 0.30);

  // ============================================================
  // VIGNETTE + final shell-grade tint.
  // ============================================================
  float edgeFade = 1.0 - smoothstep(0.55, 1.05, length((uv - 0.5) * vec2(1.0, 1.3)));
  col = mix(SHELL_DEEP, col, mix(0.78, 1.0, edgeFade));

  // ============================================================
  // LEFT-HALF DIMMING — canvas now spans full viewport, but content
  // text lives in the left half. Mix more aggressively toward SHELL
  // on the left so atmospheric color flows under text but never
  // competes with it for reading. The right half stays full cosmos.
  // The smoothstep means: 0..0.45 of canvas (left content area) is
  // mostly shell with subtle atmospheric tint bleeding through;
  // 0.5..1.0 (where worm + wordmark live) is full cosmos.
  // ============================================================
  float readability = smoothstep(0.35, 0.55, uv.x);
  col = mix(SHELL, col, mix(0.18, 1.0, readability));

  gl_FragColor = vec4(col, 1.0);
}
`;

interface CosmosProps {
  /** Document scroll progress 0..1. Drives the nebula parallax. */
  scrollProgress?: number;
  /** Motion-kick intensity (0..~1.6). Boosts time-based rotation
   * briefly after scroll stops so the cosmos visibly wakes up. */
  motionKick?: number;
}

export function Cosmos({ scrollProgress = 0, motionKick = 0 }: CosmosProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame((state) => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    materialRef.current.uniforms.uScroll.value = scrollProgress;
    materialRef.current.uniforms.uKick.value = motionKick;
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
          uKick: { value: 0 },
        }}
        depthWrite={false}
        depthTest={false}
        transparent={false}
      />
    </mesh>
  );
}
