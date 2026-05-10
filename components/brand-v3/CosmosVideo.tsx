// components/brand-v3/CosmosVideo.tsx
//
// Full-bleed cosmos-dig video backdrop. Higgsfield Kling 3.0 image-to-video
// generated from the locked Nox PNG. The video itself IS the worm — the
// cosmos atmosphere and the worm are baked together in the same frames.
//
// Scroll drives the video's currentTime so the worm's arc choreography
// (horizontal swim → S-curve dive → vertical dive) advances and reverses
// with the read. Top of page = frame 0. Bottom = final frame. Scrolling
// back up rewinds the worm.
//
// Asymmetric dim overlay tints the left ~55% of the viewport so copy stays
// legible while the right side stays clear for the worm to read as the
// primary visual.
//
// Reduced-motion: static poster, no playback. Pointer-events disabled.

"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

interface CosmosVideoProps {
  src?: string;
  reducedMotionPoster?: string;
}

export function CosmosVideo({
  src = "/brand-v3/nox-cosmos-dig.mp4",
  reducedMotionPoster = "/brand-v3/nox-PRIMARY-LOCKED.png",
}: CosmosVideoProps) {
  const reducedMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mounted, setMounted] = useState(false);

  const { scrollY, scrollYProgress } = useScroll();

  // Cosmos persists across the whole document as ambient backdrop. Never
  // fades to 0 — the worm digs throughout the read.
  const opacity = useTransform(
    scrollY,
    [0, 800, 1600, 8000],
    [1, 0.88, 0.75, 0.6],
  );
  const scale = useTransform(scrollY, [0, 4000], [1, 1.05]);

  // Bind video.currentTime to scroll progress. Top = frame 0 (horizontal
  // swim). Bottom = final frame (vertical dive). Scroll up rewinds. The
  // S-curve appears naturally at mid-scroll positions.
  useEffect(() => {
    if (!videoRef.current) return;
    if (reducedMotion) return;
    const v = videoRef.current;

    let unsub: (() => void) | null = null;

    const seekToScroll = () => {
      if (!v.duration || !isFinite(v.duration)) return;
      const p = Math.min(0.99, Math.max(0, scrollYProgress.get()));
      const target = p * v.duration;
      if (Math.abs(v.currentTime - target) > 0.04) {
        v.currentTime = target;
      }
    };

    const onReady = () => {
      v.pause();
      seekToScroll();
      if (!unsub) unsub = scrollYProgress.on("change", seekToScroll);
    };

    if (v.readyState >= 2) onReady();
    else v.addEventListener("loadeddata", onReady, { once: true });

    return () => {
      v.removeEventListener("loadeddata", onReady);
      if (unsub) unsub();
    };
  }, [scrollYProgress, reducedMotion]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (reducedMotion) {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background: `var(--bv3-shell) url(${reducedMotionPoster}) center/cover no-repeat`,
          opacity: 0.4,
        }}
      />
    );
  }

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{ opacity, scale }}
    >
      <video
        ref={videoRef}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="h-full w-full object-cover"
        style={{ background: "var(--bv3-shell)" }}
      />
      {/* Asymmetric dim — left ~55% tinted heavy, right side clear. */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(58,59,61,0.92) 0%, rgba(58,59,61,0.78) 30%, rgba(58,59,61,0.45) 55%, rgba(58,59,61,0.08) 80%, rgba(58,59,61,0) 100%)",
        }}
      />
    </motion.div>
  );
}
