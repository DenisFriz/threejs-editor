import * as THREE from "three";
import {
  TransformControls,
  OrbitControls,
  useEnvironment,
} from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";

import Floor from "./Floor";
import Lights from "./Lights";
import Loader from "./Loader";
import LoadedModel from "./LoadedModel";

export default function Experience({
  selected,
  setSelected,
  envFile,
  modelUrl,
  onModelLoad,
  color,
  opacity,
  mapFile,
  normalMapFile,
}) {
  const transformRef = useRef();

  const mapTexture = mapFile ? new THREE.TextureLoader().load(mapFile) : null;

  const normalTexture = normalMapFile
    ? new THREE.TextureLoader().load(normalMapFile)
    : null;

  const farm = useEnvironment({
    files: "/environment-map/farm_road_1k.hdr",
  });

  const locker = useEnvironment({
    files: "/environment-map/newman_locker_room_1k.hdr",
  });

  const relax = useEnvironment({
    files: "/environment-map/relax_inn_seaview_suite_1k.hdr",
  });

  const envMap = useMemo(() => {
    switch (envFile) {
      case "farm_road_1k.hdr":
        return farm;
      case "newman_locker_room_1k.hdr":
        return locker;
      case "relax_inn_seaview_suite_1k.hdr":
        return relax;
      default:
        return farm;
    }
  }, [envFile, farm, locker, relax]);

  return (
    <>
      <OrbitControls makeDefault enabled={!selected} />

      <Lights />
      <Floor />

      <primitive object={envMap} attach="background" />
      <primitive object={envMap} attach="environment" />

      {selected && (
        <TransformControls
          ref={transformRef}
          object={selected}
          mode="translate"
        />
      )}

      {modelUrl ? (
        <Suspense fallback={<Loader />}>
          <LoadedModel
            url={modelUrl}
            onModelLoad={onModelLoad}
            color={color}
            opacity={opacity}
            onSelect={setSelected}
            mapTexture={mapFile ? mapTexture : null}
            normalTexture={normalMapFile ? normalTexture : null}
          />
        </Suspense>
      ) : (
        <mesh
          onClick={(e) => {
            e.stopPropagation();
            setSelected(e.object);
          }}
        >
          <boxGeometry />
          <meshStandardMaterial color="orange" />
        </mesh>
      )}
    </>
  );
}
