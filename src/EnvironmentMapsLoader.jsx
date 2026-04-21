import { useEffect } from "react";
import { useLoader } from "@react-three/fiber";
import { HDRLoader } from "three/examples/jsm/loaders/HDRLoader";

const hdrFiles = [
  "farm_road_1k.hdr",
  "newman_locker_room_1k.hdr",
  "relax_inn_seaview_suite_1k.hdr",
];

export default function EnvironmentMapsLoader({ onReady }) {
  const textures = useLoader(
    HDRLoader,
    hdrFiles.map((file) => `/environment-map/${file}`),
  );

  useEffect(() => {
    if (textures) {
      onReady();
    }
  }, [textures, onReady]);

  return null;
}
