import { Html, useProgress } from "@react-three/drei";

export default function Loader() {
  const { progress } = useProgress();

  return (
    <Html center>
      <div style={{ color: "white", fontSize: 20 }}>
        Loading... {progress.toFixed(0)}%
      </div>
    </Html>
  );
}
