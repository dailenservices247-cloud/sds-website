// TEMPORARY inspection route for the fal.ai Hunyuan3D output. Delete after review.
"use client";

import { Canvas } from "@react-three/fiber";
import { useGLTF, Center, Bounds, Environment } from "@react-three/drei";
import { Suspense } from "react";

function Model({ rotY }: { rotY: number }) {
  const { scene } = useGLTF("/brand-v3/helix-r7b.glb");
  return <primitive object={scene.clone()} rotation={[0, rotY, 0]} />;
}

const VIEWS = [
  { label: "SIDE", rotY: 0 },
  { label: "THREE-QUARTER", rotY: -Math.PI / 4 },
  { label: "AWAKE HEAD", rotY: -Math.PI / 2 },
  { label: "SLEEPING HEAD", rotY: Math.PI / 2 },
];

export default function ModelPreview() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#e8e6e0",
        zIndex: 999,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "1fr 1fr",
      }}
    >
      {VIEWS.map((v) => (
        <div key={v.label} style={{ position: "relative", borderRight: "1px solid #cfccc4", borderBottom: "1px solid #cfccc4" }}>
          <span
            style={{
              position: "absolute", top: 10, left: 12, zIndex: 2,
              font: "600 11px/1 ui-sans-serif, system-ui", letterSpacing: ".14em",
              color: "#5c5d60",
            }}
          >
            {v.label}
          </span>
          <Canvas camera={{ position: [0, 0, 6], fov: 40, near: 0.01, far: 1000 }} gl={{ preserveDrawingBuffer: true }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.35} />
              <directionalLight position={[4, 5, 5]} intensity={1.1} />
              <directionalLight position={[-4, 1, 3]} intensity={0.4} />
              <Environment preset="studio" background={false} />
              <Bounds fit observe margin={1.2}>
                <Center>
                  <Model rotY={v.rotY} />
                </Center>
              </Bounds>
            </Suspense>
          </Canvas>
        </div>
      ))}
    </div>
  );
}
