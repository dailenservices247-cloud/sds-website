"""Inspect nox.glb structure before rigging.

Run:
  /Applications/Blender.app/Contents/MacOS/Blender --background \
    --python scripts/blender/inspect_nox.py
"""

import bpy
import sys
import os
from mathutils import Vector

GLB_PATH = "/Users/dailenhuntley/Desktop/sds-website/public/brand-v3/nox.glb"


def main():
    # Reset scene to empty
    bpy.ops.wm.read_factory_settings(use_empty=True)

    # Import GLB
    print(f"[inspect] Loading {GLB_PATH}")
    bpy.ops.import_scene.gltf(filepath=GLB_PATH)

    # Find imported mesh objects
    meshes = [o for o in bpy.data.objects if o.type == "MESH"]
    print(f"[inspect] Mesh count: {len(meshes)}")

    for i, obj in enumerate(meshes):
        print(f"\n--- MESH {i}: {obj.name} ---")
        print(f"  Vertices: {len(obj.data.vertices)}")
        print(f"  Polygons: {len(obj.data.polygons)}")
        print(f"  Materials: {[m.name for m in obj.data.materials if m]}")
        print(f"  Location (world): {obj.location}")
        print(f"  Scale: {obj.scale}")
        print(f"  Rotation (Euler XYZ deg): {[round((a*57.2958), 2) for a in obj.rotation_euler]}")

        # Bounding box in world coords
        bbox = [obj.matrix_world @ Vector(corner) for corner in obj.bound_box]
        xs = [v.x for v in bbox]
        ys = [v.y for v in bbox]
        zs = [v.z for v in bbox]
        print(f"  Bounds X: {min(xs):.3f} → {max(xs):.3f}  span={max(xs)-min(xs):.3f}")
        print(f"  Bounds Y: {min(ys):.3f} → {max(ys):.3f}  span={max(ys)-min(ys):.3f}")
        print(f"  Bounds Z: {min(zs):.3f} → {max(zs):.3f}  span={max(zs)-min(zs):.3f}")

        # Longest axis = body axis (where spine should run)
        spans = {"X": max(xs)-min(xs), "Y": max(ys)-min(ys), "Z": max(zs)-min(zs)}
        longest = max(spans, key=spans.get)
        print(f"  Longest axis: {longest} (span {spans[longest]:.3f}) — spine direction")

    # Armatures (should be none for a Meshy gen)
    armatures = [o for o in bpy.data.objects if o.type == "ARMATURE"]
    print(f"\n[inspect] Armature count: {len(armatures)}")

    # Existing animations
    actions = list(bpy.data.actions)
    print(f"[inspect] Action count: {len(actions)}")
    for a in actions:
        print(f"  - {a.name} ({len(a.fcurves)} fcurves)")

    # File size + report
    file_size = os.path.getsize(GLB_PATH)
    print(f"\n[inspect] Source file size: {file_size/1024/1024:.2f} MB")

    print("\n[inspect] DONE")


if __name__ == "__main__":
    main()
