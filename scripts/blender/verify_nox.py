"""Verify nox-rigged.glb has the expected structure."""
import bpy
import os

GLB = "/Users/dailenhuntley/Desktop/sds-website/public/brand-v3/nox-rigged.glb"


def main():
    bpy.ops.wm.read_factory_settings(use_empty=True)
    print(f"[verify] Loading {GLB}")
    bpy.ops.import_scene.gltf(filepath=GLB)

    meshes = [o for o in bpy.data.objects if o.type == "MESH"]
    armatures = [o for o in bpy.data.objects if o.type == "ARMATURE"]
    actions = list(bpy.data.actions)
    materials = [m for m in bpy.data.materials]

    print(f"[verify] Meshes: {len(meshes)}")
    for m in meshes:
        print(f"  - {m.name}  polys={len(m.data.polygons)}  verts={len(m.data.vertices)}  vgroups={len(m.vertex_groups)}")
    print(f"[verify] Armatures: {len(armatures)}")
    for a in armatures:
        print(f"  - {a.name}  bones={len(a.data.bones)}")
        for b in a.data.bones:
            print(f"    · {b.name}")
    print(f"[verify] Actions: {len(actions)}")
    for a in actions:
        print(f"  - {a.name}  fcurves={len(a.fcurves)}  frame_range={a.frame_range}")
    print(f"[verify] Materials: {len(materials)}")
    for m in materials:
        print(f"  - {m.name}")
    print(f"[verify] File size: {os.path.getsize(GLB)/1024/1024:.2f} MB")
    print("[verify] DONE")


if __name__ == "__main__":
    main()
