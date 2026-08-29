import { useMemo } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';


const LANDSCAPE_LAYERS = {
  background: [
    {
      name: 'hero-mountain-background',
      url: '/models/Mountains/hero_mountain_optimized.glb',
      position: [-300, -8, -490],
      rotationY: 0.1 + Math.PI / 12 + (Math.PI / 36) * 2,
      targetWidth: 255,
      lightTint: '#bcc6c5',
      darkTint: '#526474',
      lightenAmount: 0.3,
      darkLightenAmount: 0.24,
    },
    {
      name: 'hero-mountain-2',
      url: '/models/Mountains/hero_mountain_optimized.glb',
      position: [-580, -20, -700],
      rotationY: 0.1 + Math.PI / 12 + Math.PI / 18 + Math.PI,
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
      url: '/models/Mountains/mountain_range_01_optimized.glb',
      position: [-230, -6, -495],
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
      url: '/models/Mountains/harbor_and_beacon_ver2.0_optimized.glb',
      position: [-190, -1.6, -400],
      rotationY: Math.PI + 45,
      targetWidth: 55,
      lightTint: '#e0d8c8',
      darkTint: '#4a5056',
      lightenAmount: 0.05,
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

      {/* 1. MAIN CABIN — warm illumination */}
      <pointLight
        position={[0.23, 1.6, -0.7]}
        color="#ffb45e"
        intensity={3.2}
        distance={3}
        decay={2}
      />

      {/* 2. COCKPIT / AFT — softer warm illumination */}
      <pointLight
        position={[0, 1.6, -1.7]}
        color="#ffc477"
        intensity={2}
        distance={2.3}
        decay={2}
      />

      {/* 3. MASTHEAD — visible white light */}
      <mesh position={[0.2, 7.75, 0.44]}>
        <sphereGeometry args={[0.035, 8, 8]} />
        <meshBasicMaterial
          color="#fff4dc"
          toneMapped={false}
        />
      </mesh>

      {/* Very small illumination around masthead */}
      <pointLight
        position={[0.23, 7.8, 0.45]}
        color="#fff1d0"
        intensity={0.8}
        distance={1.5}
        decay={2}
      />



    </group>
  );
}


function HarbourLights() {
  const lights = [
    // x, y, z, size, brightness
    [-153, 0.35, -263, 0.10, 0.55],
    [-150, 0.65, -265, 0.13, 0.75],
    [-147, 0.40, -267, 0.08, 0.45],

    [-143, 0.85, -266, 0.16, 1.0],
    [-140, 0.45, -269, 0.10, 0.60],
    [-136, 1.10, -268, 0.14, 0.85],
    [-133, 0.55, -271, 0.09, 0.50],

    [-129, 0.75, -270, 0.18, 1.0],
    [-125, 0.38, -273, 0.08, 0.45],
    [-121, 0.90, -272, 0.12, 0.70],
    [-117, 0.42, -275, 0.09, 0.50],

    // More isolated lights towards edge
    [-111, 0.35, -276, 0.07, 0.35],
    [-105, 0.30, -277, 0.06, 0.30],
  ];

  return (
    <group name="harbour-lights" position={[0, 4, 0]}>
      {lights.map(([x, y, z, size, brightness], index) => (
        <group key={index}>
          <mesh position={[x, y, z]}>
            <sphereGeometry args={[size, 8, 8]} />
            <meshBasicMaterial
              color="#ffb45f"
              transparent
              opacity={brightness}
              toneMapped={false}
            />
          </mesh>
        </group>
      ))}

      {/* Subtle warm illumination over the main settlement */}
      <pointLight
        color="#ff9f45"
        intensity={0.8}
        distance={32}
        decay={2}
        position={[-134, 3, -269]}
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

useGLTF.preload('/models/Mountains/hero_mountain_optimized.glb');
useGLTF.preload('/models/Mountains/mountain_range_01_optimized.glb');
useGLTF.preload('/models/Mountains/harbor_and_beacon_ver2.0_optimized.glb');
