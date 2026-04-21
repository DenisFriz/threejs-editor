import { Canvas } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { Suspense, useState } from "react";

import Experience from "./Experience";
import EnvironmentMapsLoader from "./EnvironmentMapsLoader";
import Loader from "./Loader";

const ENV_MAPS = [
  { id: 1, src: "/environment-map/farm_road_1k.jpg", alt: "Farm road" },
  {
    id: 2,
    src: "/environment-map/newman_locker_room_1k.jpg",
    alt: "Locker room",
  },
  {
    id: 3,
    src: "/environment-map/relax_inn_seaview_suite_1k.jpg",
    alt: "Relax suite",
  },
];

export default function Main() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentEnv, setCurrentEnv] = useState("farm_road_1k.hdr");
  const [modelUrl, setModelUrl] = useState(null);
  const [modelInfo, setModelInfo] = useState(null);
  const [selectedColor, setSelectedColor] = useState("#ffffff");
  const [opacity, setOpacity] = useState(1);
  const [selected, setSelected] = useState(null);

  const [mapFile, setMapFile] = useState(null);
  const [normalMapFile, setNormalMapFile] = useState(null);

  const handleModelUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setModelUrl(url);
  };

  const handleMapUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setMapFile(url);
  };

  const handleNormalMapUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setNormalMapFile(url);
  };

  return (
    <>
      <Canvas
        camera={{
          position: [0, 5, 5],
          fov: 75,
        }}
        onPointerMissed={() => setSelected(null)}
      >
        <Suspense fallback={null}>
          <Experience
            selected={selected}
            setSelected={setSelected}
            envFile={currentEnv}
            modelUrl={modelUrl}
            onModelLoad={(data) => setModelInfo(data)}
            color={selectedColor}
            opacity={opacity}
            mapFile={mapFile}
            normalMapFile={normalMapFile}
          />
          <EnvironmentMapsLoader onReady={() => setIsLoaded(true)} />
        </Suspense>
      </Canvas>
      <div className={`loader__wrapper ${isLoaded ? "end" : ""}`}>
        <div className="loader"></div>
      </div>
      <div className="block">
        <div className="block__item">
          <h3>Select environment map:</h3>
          <div className="block__list" id="envMaps-list">
            {ENV_MAPS.map((map) => (
              <div key={map.id} className="block__list-item">
                <img
                  src={map.src}
                  alt={map.alt}
                  onClick={() => {
                    const hdrName = map.src
                      .split("/")
                      .pop()
                      .replace(".jpg", ".hdr");
                    setCurrentEnv(hdrName);
                  }}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="block__item">
          <h3>Import Model:</h3>
          <label className="block__item-btn">
            Import
            <input
              type="file"
              className="block__item-input"
              accept=".glb,.gltf"
              onChange={handleModelUpload}
            />
          </label>
        </div>
        {modelInfo?.materials?.length > 0 && selected && (
          <div className="block__item">
            <h3>Material</h3>
            <p className="block__item-text">
              The type of material:
              <span> {modelInfo?.materials?.[0]?.type || "—"}</span>
            </p>
            <p className="block__item-text">
              Color:
              <input
                type="color"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
              />
            </p>
            <div className="block__btns">
              <label className="block__item-btn">
                Map
                <input
                  type="file"
                  className="block__item-input"
                  accept="image/*"
                  onChange={handleMapUpload}
                />
              </label>
              <label className="block__item-btn">
                Normal map
                <input
                  type="file"
                  className="block__item-input"
                  accept="image/*"
                  onChange={handleNormalMapUpload}
                />
              </label>
            </div>
            <p className="block__item-text">
              Transparency:
              <input
                className="range"
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={opacity}
                onChange={(e) => setOpacity(parseFloat(e.target.value))}
              />
              <span className="range-value">{opacity.toFixed(2)}</span>
            </p>
          </div>
        )}
      </div>
    </>
  );
}
