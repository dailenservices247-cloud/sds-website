"use client";

// components/brand-v3/Helix.tsx
//
// Helix, as actual geometry.
//
// This replaces the textured-plane billboard that shipped while the GLB was
// blocked. The mesh is helix.glb — the R7 sheet converted through Hyper3D
// Rodin (fuse, quality=high, PBR), and it is the first version that carries a
// HEAD AT BOTH ENDS: the awake glass head at the front, and Nox asleep at the
// back. That second head is what the whole split narrative depends on.
//
// WHY THERE IS NO SKELETON.
//
// The obvious plan was a spine chain — bones down the long axis, the shape
// NoxModel.tsx already expects. The mesh's bounding box killed it: X 1.68,
// Y 0.82, Z 1.895. The creature was generated in the curved pose it was drawn
// in, so it has no straight rest axis to lay bones along; both X and Z carry
// body. Rigging a curved rest pose means first solving for the centreline and
// unbending it, which is a large amount of machinery for motion this page does
// not need.
//
// What the page needs is a creature that TRAVELS. At the scale Helix appears —
// background, behind floating content — the read comes from the path, the
// banking into turns, and the depth changes. Articulated undulation is a
// refinement, not the thing that sells it. So the whole body moves as one and
// the secondary motion is applied at the transform level.
//
// Frame-rate independent damping throughout: lerp(a, b, 1 - exp(-k·dt)).
// A naive per-frame lerp is speed-dependent and reads differently at 120Hz.

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

interface HelixProps {
  /** 0..1 document scroll. */
  scrollProgress: number;
  /** 0..1+ spike when scroll halts; briefly deepens the dive. */
  motionKick?: number;
  /** Per-route variation so each page is a different moment of one journey. */
  phase?: number;
}

// Locked brand values (DESIGN.md). These are the ACTUAL colours the creature
// wears — not a tint over the bake, but the values the shader writes.
const SHELL = "#3a3b3d"; // matte warm charcoal
const RING = "#c8a23e"; // antique gold
const CREST_FRONT = "#2a6055"; // petrol green — Lux's half
const CREST_REAR = "#7e303a"; // wine — Nox's half

/**
 * Live material uniforms.
 *
 * `uNoxWake` is the whole point of doing this in a shader rather than baking:
 * Nox is dormant and her crests must BRIGHTEN as she wakes. A baked texture
 * cannot change. Drive this 0 → 1 and her half of the body comes alive.
 *
 * `uSplitZ` is where the body divides, in local model space. The mesh runs
 * head-to-head along local Z (bbox Z 1.895 is its longest axis, and the
 * model-preview "SIDE" view at yaw 0 looks straight down it), with the awake
 * glass head at +Z and Nox asleep at -Z.
 */
export const helixUniforms = {
  uCrestFront: { value: new THREE.Color(CREST_FRONT) },
  uCrestRear: { value: new THREE.Color(CREST_REAR) },
  uShell: { value: new THREE.Color(SHELL) },
  uRing: { value: new THREE.Color(RING) },
  uNoxWake: { value: 0 },
  uSplitZ: { value: 0 },
};

const MODEL = "/brand-v3/helix.glb";
// The bake that ships inside the GLB is dark and flat — measured median
// luminance 65/255, p95 136, saturation 0.18. It was never pale; it was
// UNDER-EXPOSED, and the first attempt to fix it by cranking lights and tone
// exposure just blew out the midtones.
//
// This is the same texture, corrected deterministically: levels stretched
// (27..136 -> 12..238), saturation lifted 1.25x, and the channel means equalised
// to kill a measured +11.3 warm bias (R-B) that was rendering a charcoal
// creature as copper. Now +1.0, i.e. neutral. A 1.75x saturation lift was tried
// first and amplified that same bias — saturation before white balance is
// backwards.
const BASECOLOR = "/brand-v3/helix-basecolor.png?v=2";
useGLTF.preload(MODEL);

/**
 * The dig path, in world units.
 *
 * Weighted to the RIGHT two-thirds of frame. The left stays a calm void
 * because that is where copy overlays — the same composition rule the hero
 * uses, and the reason the headline is readable. A creature crossing the copy
 * is a legibility bug wearing art direction.
 */
function pathAt(t: number) {
  // Entry pulled in twice: 4.3 -> 3.7 -> 2.9. Each scale increase costs frame
  // room, and at 2.6 world units he was still half off the right edge during
  // the hero. 2.9 keeps him whole while staying clear of the copy column, which
  // caps at 48ch on the left.
  const x = 2.9 - t * 4.4;
  const y = 2.2 - t * 4.8 + Math.sin(t * Math.PI * 1.6) * 0.6;
  const z = -2.2 + Math.sin(t * Math.PI * 2.1) * 1.35;
  return { x, y, z };
}

export function Helix({ scrollProgress, motionKick = 0, phase = 0 }: HelixProps) {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF(MODEL);
  const baseColor = useTexture(BASECOLOR);

  // Clone once so this instance owns its transforms, and normalise the model:
  // Rodin output arrives roughly unit-scale and arbitrarily oriented, so centre
  // it on its own bounding box and scale to a known height rather than
  // hard-coding numbers that break the next time the mesh is regenerated.
  const model = useMemo(() => {
    const root = scene.clone(true);
    const box = new THREE.Box3().setFromObject(root);
    const size = new THREE.Vector3();
    const centre = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(centre);
    root.position.sub(centre);

    const wrapper = new THREE.Group();
    wrapper.add(root);
    // Longest axis normalised to 2.05 world units.
    //
    // At 1.45 he measured ~190 css px across — ~15px per segment, so the
    // diorama inside a window was ~8px and physically unreadable. Dailen:
    // "I can't see what's inside the segments." At 2.6 the windows read, but he
    // ran across the services copy, which is the legibility rule the dig path
    // exists to protect. 2.05 is the compromise: segments legible, copy clear.
    //
    // If he needs to be bigger than this, the answer is a scroll-driven dolly —
    // bring him NEAR at moments where no copy is on screen (the stop beats) —
    // not a larger constant scale.
    const longest = Math.max(size.x, size.y, size.z) || 1;
    wrapper.scale.setScalar(2.05 / longest);

    root.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (!mesh.isMesh) return;
      mesh.castShadow = false;
      mesh.receiveShadow = false;
      const mat = mesh.material as THREE.MeshStandardMaterial;
      if (mat) {
        // Swap in the level-corrected base colour. glTF textures are authored
        // with flipY already applied, so it must be disabled or the atlas maps
        // upside down onto the UVs.
        baseColor.colorSpace = THREE.SRGBColorSpace;
        baseColor.flipY = false;
        baseColor.needsUpdate = true;
        mat.map = baseColor;
        // Matte and non-metallic, per the brand's "no glossy or wet surfaces".
        // No emissive fudge — that was propping up an under-exposed texture and
        // is unnecessary now the levels are right.
        mat.roughness = 0.9;
        mat.metalness = 0.0;

        // ---------------------------------------------------------------
        // PER-REGION BRAND COLOUR, without per-region geometry.
        //
        // The GLB is ONE material and ONE primitive — there is nothing to
        // address by name. But the regions are separable in the texture by
        // hue: measured on the corrected atlas, teal crest 7.1%, wine crest
        // 9.3%, gold ring 1.9%, neutral shell 81.7%. So the mask is computed
        // in the fragment shader from the sampled colour, and the replacement
        // colours come from uniforms.
        //
        // That is what makes Nox able to wake. Crest colour is now a live
        // value, not pixels.
        // ---------------------------------------------------------------
        mat.onBeforeCompile = (shader) => {
          Object.assign(shader.uniforms, helixUniforms);

          shader.vertexShader = shader.vertexShader
            .replace("#include <common>", "#include <common>\nvarying vec3 vLocalPos;")
            .replace(
              "#include <begin_vertex>",
              "#include <begin_vertex>\n  vLocalPos = position;",
            );

          shader.fragmentShader = shader.fragmentShader
            .replace(
              "#include <common>",
              `#include <common>
varying vec3 vLocalPos;
uniform vec3 uCrestFront;
uniform vec3 uCrestRear;
uniform vec3 uShell;
uniform vec3 uRing;
uniform float uNoxWake;
uniform float uSplitZ;
vec3 helixRgb2hsv(vec3 c) {
  vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
  vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
  vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
  float d = q.x - min(q.w, q.y);
  float e = 1.0e-10;
  return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}`,
            )
            .replace(
              "#include <map_fragment>",
              `#include <map_fragment>
{
  vec3 hsv = helixRgb2hsv(diffuseColor.rgb);
  float hueDeg = hsv.x * 360.0;
  float sat = hsv.y;
  float val = hsv.z;
  float saturated = smoothstep(0.16, 0.30, sat);

  // crest = teal band OR wine band (wine wraps through 0)
  float teal = step(140.0, hueDeg) * step(hueDeg, 200.0);
  float wine = max(step(330.0, hueDeg), step(hueDeg, 15.0));
  float isCrest = clamp(teal + wine, 0.0, 1.0) * saturated;
  float isGold = step(35.0, hueDeg) * step(hueDeg, 62.0) * saturated;
  float isShell = (1.0 - isCrest) * (1.0 - isGold) * (1.0 - saturated);

  // Which half of the body is this fragment on?
  float front = step(uSplitZ, vLocalPos.z);
  vec3 crest = mix(uCrestRear, uCrestFront, front);

  // Nox dormant: her crests sit dark. They come up as uNoxWake rises.
  float rearLevel = mix(0.4, 1.15, uNoxWake);
  float level = mix(rearLevel, 1.0, front);

  // Keep the bake's luminance so sculpted form survives the recolour —
  // replacing hue wholesale would flatten the creature into a decal.
  float shade = 0.45 + val * 1.05;

  diffuseColor.rgb = mix(diffuseColor.rgb, crest * shade * level, isCrest * 0.92);
  diffuseColor.rgb = mix(diffuseColor.rgb, uRing * shade * 1.15, isGold * 0.9);
  diffuseColor.rgb = mix(diffuseColor.rgb, uShell * shade, isShell * 0.7);
}`,
            );
        };
        mat.needsUpdate = true;
        // NOT transparent. At 0.9 the creature blended with the dark cosmos
        // behind it and read as a silhouette — the opposite of the intent.
        mat.transparent = false;
        mat.opacity = 1;
      }
    });
    return wrapper;
  }, [scene, baseColor]);

  // Eased followers so the creature lags the scroll slightly — it is heavy,
  // and instant response reads as a sticker glued to the scrollbar.
  const eased = useRef({ t: 0, bob: 0 });

  useFrame((state, delta) => {
    if (!group.current) return;
    const dt = Math.min(delta, 0.1);

    const target = (scrollProgress + phase) % 1;
    const k = 2.6;
    eased.current.t += (target - eased.current.t) * (1 - Math.exp(-k * dt));

    const t = eased.current.t;
    const p = pathAt(t);

    // Tangent, so the body points where it is going rather than sliding.
    const ahead = pathAt(Math.min(1, t + 0.02));
    const angle = Math.atan2(ahead.y - p.y, ahead.x - p.x);

    // Idle bob keeps it breathing when the page is still.
    eased.current.bob += dt * 0.6;
    const bob = Math.sin(eased.current.bob) * 0.09;

    // A halt briefly deepens the dive — the "notices you" cue.
    const kick = motionKick * 0.35;

    group.current.position.set(p.x, p.y + bob, p.z - kick);

    // ORIENTATION — the silhouette is the whole read, so protect it.
    //
    // The first version stacked three rotations and destroyed the creature:
    // a 90° yaw turned a long body END-ON to camera, then the path tangent
    // (which points steeply down-left, ≈ -2.4 rad) was halved into a ~69° roll
    // on top, plus an x-wobble. The result was an unrecognisable blob — Dailen:
    // "it doesn't even look remotely close, not even the shape."
    //
    // Helix reads from ONE angle: side profile, where both heads and every
    // segment are visible. Everything here is a small perturbation around that
    // pose, never a departure from it.
    const PROFILE_YAW = -Math.PI / 2; // side-on; matches the model-preview "AWAKE HEAD" view

    // Bank into the descent, but CLAMPED. The tangent is only a hint — an
    // unclamped roll is what flipped him before.
    const bank = THREE.MathUtils.clamp(angle * 0.18, -0.35, 0.35);

    group.current.rotation.z = bank;
    group.current.rotation.y = PROFILE_YAW + Math.sin(t * Math.PI * 2) * 0.12;
    group.current.rotation.x = Math.sin(eased.current.bob * 0.7) * 0.06;

    const s = 1 + (p.z + 2.2) * 0.06;
    group.current.scale.setScalar(s);
  });

  return (
    <group ref={group}>
      <primitive object={model} />
    </group>
  );
}
