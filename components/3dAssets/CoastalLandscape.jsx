import { useMemo } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';

const LANDSCAPE_LAYERS = {
  background: [
    {
      name: 'hero-mountain-background',
      url: '/models/Mountains/hero_mountain.glb',
      position: [-240, -6.5, -390],
      rotationY: 0.1 + Math.PI / 12 + (Math.PI / 36) * 2,
      targetWidth: 255,
      lightTint: '#bcc6c5',
      darkTint: '#526474',
      lightenAmount: 0.3,
      darkLightenAmount: 0.24,
    },
    {
      name: 'hero-mountain-2',
      url: '/models/Mountains/hero_mountain.glb',
      position: [-520, -10, -570],
      rotationY: 0.1 + Math.PI / 12 + (Math.PI / 36) * 2,
      targetWidth: 510,
      lightTint: '#c6cecd',
      darkTint: '#465967',
      lightenAmount: 0.4,
      darkLightenAmount: 0.22,
    },
  ],
  midground: [
    {
      name: 'mountain-range-midground',
      url: '/models/Mountains/mountain_range_01.glb',
      position: [-170, -6.5, -395],
      rotationY:
        Math.PI / 2 - 0.16 + (Math.PI / 9) * 2 + Math.PI / 12 + Math.PI / 36,
      targetWidth: 150,
      lightTint: '#cbd1cf',
      darkTint: '#506270',
      lightenAmount: 0.5,
      darkLightenAmount: 0.26,
    },
  ],
  settlement: [
    {
      name: 'harbour-and-beacon',
      url: '/models/Mountains/harbor_and_beacon_ver2.0.glb',
      position: [-130, -1.5, -270],
      rotationY:
        Math.PI * 1.5 +
        0.1 -
        Math.PI / 9 +
        Math.PI / 12 +
        (Math.PI / 36) * 2,
      targetWidth: 55,
      lightTint: '#e0d8c8',
      darkTint: '#4a5056',
      lightenAmount: 0.3,
      darkLightenAmount: 0.16,
    },
  ],
};

function NormalizedModel({
  url,
  name,
  position,
  rotationY,
  targetWidth,
  lightTint,
  darkTint,
  lightenAmount = 0,
  darkLightenAmount = 0,
  isDark,
}) {
  const { scene } = useGLTF(url);

  const { model, scale } = useMemo(() => {
    const object = scene.clone(true);

    object.updateMatrixWorld(true);

    const bounds = new THREE.Box3().setFromObject(object);
    const size = bounds.getSize(new THREE.Vector3());
    const center = bounds.getCenter(new THREE.Vector3());
    const normalizedScale = targetWidth / size.x;
    const tint = new THREE.Color(isDark ? darkTint : lightTint);

    object.position.set(-center.x, -bounds.min.y, -center.z);
    object.traverse((child) => {
      if (!child.isMesh) return;

      const hasMaterialArray = Array.isArray(child.material);
      const materials = hasMaterialArray
        ? child.material
        : [child.material];

      const clonedMaterials = materials.map((material) => {
        const clonedMaterial = material.clone();
        if (clonedMaterial.color) {
          if (isDark && darkLightenAmount > 0) {
            clonedMaterial.color.lerp(tint, darkLightenAmount);
          } else if (!isDark && lightenAmount > 0) {
            clonedMaterial.color.lerp(tint, lightenAmount);
          } else {
            clonedMaterial.color.multiply(tint);
          }
        }
        clonedMaterial.roughness = Math.max(clonedMaterial.roughness || 0, 0.82);
        return clonedMaterial;
      });

      child.material = hasMaterialArray ? clonedMaterials : clonedMaterials[0];
      child.receiveShadow = true;
    });

    return { model: object, scale: normalizedScale };
  }, [
    scene,
    targetWidth,
    lightTint,
    darkTint,
    lightenAmount,
    darkLightenAmount,
    isDark,
  ]);

  return (
    <group
      name={name}
      position={position}
      rotation-y={rotationY}
      scale={scale}
    >
      <primitive object={model} />
    </group>
  );
}

function LandscapeLayer({ name, items, isDark }) {
  return (
    <group name={name}>
      {items.map((item) => (
        <NormalizedModel {...item} isDark={isDark} key={item.name} />
      ))}
    </group>
  );
}

export function BoatLights({ isDark }) {
  if (!isDark) return null;

  return (
    <group name="boat-lights">
      <mesh position={[-0.35, 1.05, 0]}>
        <sphereGeometry args={[0.11, 8, 8]} />
        <meshBasicMaterial color="#ffc06a" toneMapped={false} />
      </mesh>
      <mesh position={[0.35, 1.35, 0]}>
        <sphereGeometry args={[0.09, 8, 8]} />
        <meshBasicMaterial color="#ffc06a" toneMapped={false} />
      </mesh>
      <mesh position={[0, 1.8, 0]}>
        <sphereGeometry args={[0.07, 8, 8]} />
        <meshBasicMaterial color="#ffb85e" toneMapped={false} />
      </mesh>
      <pointLight
        color="#ffad55"
        intensity={0.9}
        distance={14}
        decay={2}
        position={[0, 1.2, 0]}
      />
    </group>
  );
}

function HarbourLights() {
  const lights = [
    [-151, 0.35, -264],
    [-145, 0.55, -267],
    [-137, 0.4, -269],
    [-129, 0.65, -271],
    [-120, 0.38, -274],
    [-113, 0.5, -276],
  ];

  return (
    <group name="harbour-lights">
      {lights.map((position, index) => (
        <mesh key={position.join('-')} position={position}>
          <sphereGeometry args={[index === 3 ? 0.2 : 0.14, 8, 8]} />
          <meshBasicMaterial color="#ffb45f" toneMapped={false} />
        </mesh>
      ))}
      <pointLight
        color="#ffad55"
        intensity={0.6}
        distance={28}
        decay={2}
        position={[-132, 2, -270]}
      />
    </group>
  );
}

export default function CoastalLandscape({ isDark }) {
  return (
    <group name="coastline">
      <LandscapeLayer
        name="mountains-background"
        items={LANDSCAPE_LAYERS.background}
        isDark={isDark}
      />
      <LandscapeLayer
        name="mountains-midground"
        items={LANDSCAPE_LAYERS.midground}
        isDark={isDark}
      />
      <LandscapeLayer
        name="shoreline-settlement"
        items={LANDSCAPE_LAYERS.settlement}
        isDark={isDark}
      />
      {isDark && <HarbourLights />}
    </group>
  );
}

useGLTF.preload('/models/Mountains/hero_mountain.glb');
useGLTF.preload('/models/Mountains/mountain_range_01.glb');
useGLTF.preload('/models/Mountains/harbor_and_beacon_ver2.0.glb');
