import * as THREE from "three";
import { useGLTF } from "@react-three/drei";

import { useEffect } from "react";

export default function LoadedModel({
  url,
  onModelLoad,
  color,
  opacity,
  onSelect,
  mapTexture,
  normalTexture,
}) {
  const { scene, materials } = useGLTF(url);

  useEffect(() => {
    if (!scene) return;

    const materialDetails = Object.entries(materials || {}).map(
      ([name, material]) => ({
        name,
        type: material.type,
        color: material.color?.getHexString?.() || null,
        opacity: material.opacity,
        transparent: material.transparent,
      }),
    );

    scene.traverse((child) => {
      if (child.isMesh) {
        child.userData.selectable = true;
      }
    });

    onModelLoad?.({
      materials: materialDetails,
    });
  }, [scene]);

  useEffect(() => {
    if (!scene) return;

    scene.traverse((child) => {
      if (!child.isMesh) return;

      const mat = child.material;
      if (!mat) return;

      if (mat.color && color) {
        mat.color.set(color);
      }

      mat.opacity = opacity;
      mat.transparent = opacity < 1;

      if (mapTexture) {
        mat.map = mapTexture || null;
        mat.map.colorSpace = THREE.SRGBColorSpace;
      }

      if (normalTexture) {
        mat.normalMap = normalTexture || null;
        mat.normalMap.colorSpace = THREE.NoColorSpace;
      }

      mat.needsUpdate = true;
    });
  }, [scene, color, opacity, mapTexture, normalTexture]);

  return (
    <primitive
      object={scene}
      onClick={(e) => {
        e.stopPropagation();
        onSelect?.(e.object);
      }}
    />
  );
}
