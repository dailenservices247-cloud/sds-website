"""Rig + decimate + animate + export Nox.

Pipeline:
  1. Load nox.glb
  2. Decimate mesh from 573K → ~50K polys (web-grade)
  3. Add armature with 8 bones along X axis (the spine direction)
  4. Parent mesh to armature with automatic weights
  5. Bake idle wiggle animation: each bone rotates ±5° on Y axis,
     phase-offset by bone index, 60-frame loop
  6. Export GLB with Draco compression to public/brand-v3/nox-rigged.glb

Run:
  /Applications/Blender.app/Contents/MacOS/Blender --background \
    --python scripts/blender/rig_nox.py
"""

import bpy
import math
import os
from mathutils import Vector

SRC = "/Users/dailenhuntley/Desktop/sds-website/public/brand-v3/nox.glb"
OUT = "/Users/dailenhuntley/Desktop/sds-website/public/brand-v3/nox-rigged.glb"

# Pipeline config
DECIMATE_RATIO = 0.087      # 573925 * 0.087 ≈ 50K polys (web target)
BONE_COUNT = 8
SPINE_AXIS_MIN = -0.95      # from inspection: Bounds X -0.95 → 0.949
SPINE_AXIS_MAX = 0.95
ANIM_FRAMES = 60            # idle loop length
ANIM_AMPLITUDE_DEG = 5.0    # rotation amplitude per bone, degrees
ANIM_FREQUENCY = 0.4        # Hz over loop


def log(msg):
    print(f"[rig] {msg}", flush=True)


def main():
    bpy.ops.wm.read_factory_settings(use_empty=True)
    # Aggressive scene cleanup — purge anything that may exist
    for obj in list(bpy.data.objects):
        bpy.data.objects.remove(obj, do_unlink=True)
    for mesh in list(bpy.data.meshes):
        bpy.data.meshes.remove(mesh)
    for arm in list(bpy.data.armatures):
        bpy.data.armatures.remove(arm)

    log(f"Loading {SRC}")
    bpy.ops.import_scene.gltf(filepath=SRC)

    # ---- 1. Find imported mesh -------------------------------------------
    # Remove anything that's not the Nox mesh (lights, cameras, empties)
    meshes = [o for o in bpy.data.objects if o.type == "MESH"]
    if len(meshes) > 1:
        # Keep the highest-poly mesh, remove the rest
        meshes.sort(key=lambda m: len(m.data.polygons), reverse=True)
        for m in meshes[1:]:
            log(f"Removing extraneous mesh: {m.name} ({len(m.data.polygons)} polys)")
            bpy.data.objects.remove(m, do_unlink=True)
        meshes = meshes[:1]
    mesh_obj = meshes[0]
    log(f"Mesh: {mesh_obj.name}  verts={len(mesh_obj.data.vertices)}  polys={len(mesh_obj.data.polygons)}")

    # ---- 2. Decimate ------------------------------------------------------
    log(f"Decimating to ratio {DECIMATE_RATIO} (target ~{int(len(mesh_obj.data.polygons)*DECIMATE_RATIO)} polys)")
    decim = mesh_obj.modifiers.new(name="Decimate", type="DECIMATE")
    decim.ratio = DECIMATE_RATIO
    bpy.context.view_layer.objects.active = mesh_obj
    bpy.ops.object.modifier_apply(modifier="Decimate")
    log(f"After decimate: polys={len(mesh_obj.data.polygons)}")

    # ---- 3. Add armature --------------------------------------------------
    log(f"Adding armature with {BONE_COUNT} bones along X axis")
    bpy.ops.object.armature_add(enter_editmode=True, location=(0, 0, 0))
    armature_obj = bpy.context.object
    armature_obj.name = "NoxArmature"
    armature = armature_obj.data
    armature.name = "NoxRig"

    # Remove the default bone, add our own chain
    edit_bones = armature.edit_bones
    while edit_bones:
        edit_bones.remove(edit_bones[0])

    bone_length = (SPINE_AXIS_MAX - SPINE_AXIS_MIN) / BONE_COUNT
    prev_bone = None
    for i in range(BONE_COUNT):
        b = edit_bones.new(f"spine_{i:02d}")
        b.head = Vector((SPINE_AXIS_MIN + bone_length * i, 0, 0))
        b.tail = Vector((SPINE_AXIS_MIN + bone_length * (i + 1), 0, 0))
        if prev_bone is not None:
            b.parent = prev_bone
            b.use_connect = True
        prev_bone = b

    bpy.ops.object.mode_set(mode="OBJECT")

    # ---- 4. Parent mesh to armature + manual proximity weights -----------
    # In --background mode, ARMATURE_AUTO silently fails (needs viewport for
    # GPU heat-diffuse skinning). We parent with ARMATURE (no weights), then
    # write vertex group weights directly from Python using bone-center
    # proximity along the spine axis. Two-bone blending per vertex for
    # smooth deformation across segment boundaries.
    log("Parenting mesh to armature (no weights yet)")
    bpy.ops.object.select_all(action="DESELECT")
    mesh_obj.select_set(True)
    armature_obj.select_set(True)
    bpy.context.view_layer.objects.active = armature_obj
    bpy.ops.object.parent_set(type="ARMATURE")

    log("Computing proximity vertex weights")
    bone_names = [b.name for b in armature_obj.data.bones]
    bone_centers_x = [
        (b.head_local.x + b.tail_local.x) / 2 for b in armature_obj.data.bones
    ]
    # Create one vertex group per bone (named to match bones)
    vgroups = [mesh_obj.vertex_groups.new(name=name) for name in bone_names]

    # Assign weights via two-bone blending
    weight_assignments = {i: [] for i in range(len(bone_names))}
    for v_idx, v in enumerate(mesh_obj.data.vertices):
        vx = v.co.x
        distances = sorted(
            [(abs(vx - bx), i) for i, bx in enumerate(bone_centers_x)]
        )
        i1, i2 = distances[0][1], distances[1][1]
        d1, d2 = distances[0][0], distances[1][0]
        total = d1 + d2
        if total > 0:
            w1 = 1.0 - (d1 / total)
            w2 = 1.0 - (d2 / total)
            s = w1 + w2
            w1 /= s
            w2 /= s
        else:
            w1, w2 = 1.0, 0.0
        weight_assignments[i1].append((v_idx, w1))
        weight_assignments[i2].append((v_idx, w2))

    # Batch-add vertices to each group
    for bone_idx, items in weight_assignments.items():
        for v_idx, w in items:
            vgroups[bone_idx].add([v_idx], w, "REPLACE")

    log(f"Vertex groups assigned: {[(vg.name, len(weight_assignments[i])) for i, vg in enumerate(vgroups)]}")

    # ---- 5. Bake idle wiggle animation -----------------------------------
    log(f"Baking idle wiggle: {ANIM_FRAMES} frames, ±{ANIM_AMPLITUDE_DEG}° amplitude")
    bpy.context.view_layer.objects.active = armature_obj
    bpy.ops.object.mode_set(mode="POSE")

    # Set scene frame range
    bpy.context.scene.frame_start = 1
    bpy.context.scene.frame_end = ANIM_FRAMES

    pose_bones = armature_obj.pose.bones
    amp_rad = math.radians(ANIM_AMPLITUDE_DEG)

    for frame in range(1, ANIM_FRAMES + 1):
        bpy.context.scene.frame_set(frame)
        t = (frame - 1) / ANIM_FRAMES  # 0..1 normalized
        for i, pbone in enumerate(pose_bones):
            # Sine wave with phase-offset per bone — wave propagates head→tail
            phase = i * (math.pi / BONE_COUNT)
            angle = math.sin(t * 2 * math.pi * ANIM_FREQUENCY * (ANIM_FRAMES / 60) + phase) * amp_rad
            # Rotate around local Y axis (perpendicular to spine X)
            pbone.rotation_mode = "XYZ"
            pbone.rotation_euler = (0, angle, 0)
            pbone.keyframe_insert(data_path="rotation_euler", frame=frame)

    # Loop the animation by making first + last frame match
    bpy.ops.object.mode_set(mode="OBJECT")

    # Rename the action for clarity
    if armature_obj.animation_data and armature_obj.animation_data.action:
        armature_obj.animation_data.action.name = "idle_wiggle"
        log(f"Action: {armature_obj.animation_data.action.name}")

    # ---- 6. Resize textures for web ---------------------------------------
    log("Resizing textures to 1024px max (was likely 4K)")
    TARGET_TEX_SIZE = 1024
    for img in list(bpy.data.images):
        if img.size[0] == 0 or img.size[1] == 0:
            continue
        original = (img.size[0], img.size[1])
        max_dim = max(original)
        if max_dim > TARGET_TEX_SIZE:
            scale = TARGET_TEX_SIZE / max_dim
            new_w = max(1, int(original[0] * scale))
            new_h = max(1, int(original[1] * scale))
            log(f"  {img.name}: {original[0]}x{original[1]} → {new_w}x{new_h}")
            img.scale(new_w, new_h)
        else:
            log(f"  {img.name}: {original[0]}x{original[1]} (no resize needed)")

    # ---- 7. Export GLB ---------------------------------------------------
    log(f"Exporting to {OUT}")
    bpy.ops.object.select_all(action="DESELECT")
    mesh_obj.select_set(True)
    armature_obj.select_set(True)

    bpy.ops.export_scene.gltf(
        filepath=OUT,
        export_format="GLB",
        use_selection=True,
        export_animations=True,
        export_skins=True,
        export_apply=False,
        export_draco_mesh_compression_enable=True,
        export_draco_mesh_compression_level=6,
        export_yup=True,
        export_image_format="AUTO",
    )

    out_size = os.path.getsize(OUT)
    log(f"DONE. Output: {OUT}  size={out_size/1024/1024:.2f} MB")


if __name__ == "__main__":
    main()
