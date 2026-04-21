import React from "react";

export default function Lights() {
  return (
    <>
      <ambientLight intensity={1.5} color="#ffffff" />

      <directionalLight
        position={[3.5, 2, -1.25]}
        intensity={4}
        color="#ffffff"
      />
    </>
  );
}
