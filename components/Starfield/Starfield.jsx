import { useMemo } from 'react';
import * as THREE from 'three';

export default function Starfield() {
  const positions = useMemo(() => {
    const count = 650;
    const radius = 700;
    const data = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Horizontal angle around the scene
      const theta = Math.random() * Math.PI * 2;

      // ONLY upper sky.
      // Avoid right on the horizon and avoid clustering at the zenith.
      const elevation = THREE.MathUtils.randFloat(
        THREE.MathUtils.degToRad(5),
        THREE.MathUtils.degToRad(75)
      );

      const r = radius + THREE.MathUtils.randFloat(-40, 40);

      const horizontalRadius = Math.cos(elevation) * r;

      data[i * 3] = Math.cos(theta) * horizontalRadius;
      data[i * 3 + 1] = Math.sin(elevation) * r;
      data[i * 3 + 2] = Math.sin(theta) * horizontalRadius;
    }

    return data;
  }, []);

  return (
    <points renderOrder={-20}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        color="#d9e2ea"
        size={0.75}
        sizeAttenuation
        transparent
        opacity={0.5}
        depthWrite={false}
      />
    </points>
  );
}