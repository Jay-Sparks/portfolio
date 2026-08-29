import { useEffect, useMemo, useRef, useState } from 'react';
import { useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const DARK_OPACITY_MULTIPLIER = 5;

const CLOUD_TEXTURES = [
  '/textures/clouds/horizon-bank.png',
  '/textures/clouds/cumulus-formation.png',
  '/textures/clouds/upper-frame.png',
  '/textures/clouds/cumulus-formation-wide.png',
];

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    mediaQuery.addEventListener('change', updatePreference);
    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  return prefersReducedMotion;
}

function getCloudMotion(name, depth) {
  const hash = Array.from(name).reduce(
    (total, character) => total + character.charCodeAt(0),
    0,
  );
  const phase = (hash % 7) * 0.08;
  const variation = 0.9 + (hash % 7) * 0.025;
  const speedVariation = 0.94 + (hash % 5) * 0.03;

  if (depth > -300) {
    return {
      amplitude: 2.4 * variation,
      speed: 0.06 * speedVariation,
      phase,
    };
  }

  if (depth > -450) {
    return {
      amplitude: 1.2 * variation,
      speed: 0.04 * speedVariation,
      phase,
    };
  }

  return {
    amplitude: 0.4 * variation,
    speed: 0.025 * speedVariation,
    phase,
  };
}

const CLOUD_PLANES = [
  {
    name: 'horizon-bank',
    texture: 0,
    position: [-24, -4, -560],
    size: [560, 126],
    rotationZ: 0.,
    lightColor: '#d9e0e5',
    darkColor: '#46525e',
    lightOpacity: 0.23,
    darkOpacity: 0.08,
    renderOrder: 0,
  },
  {
    name: 'cumulus-left',
    texture: 1,
    position: [84, 62, -365],
    size: [190, 62],
    rotationZ: 0.02,
    lightColor: '#e8e9e8',
    darkColor: '#33485c',
    lightOpacity: 0.3,
    darkOpacity: 0.065,
    renderOrder: 1,
  },
  {
    name: 'cumulus-right',
    texture: 3,
    position: [-140, 68, -320],
    size: [260, 76],
    rotationZ: 0.022,
    lightColor: '#eef0ed',
    darkColor: '#2f5278',
    lightOpacity: 0.26,
    darkOpacity: 0.065,
    renderOrder: 1,
  },
  // {
  //   name: 'upper-right-bank-core',
  //   texture: 2,
  //   position: [105, 5, -605],
  //   size: [760, 300],
  //   rotationZ: 0.075,
  //   lightColor: '#f4e8d8',
  //   darkColor: '#404c59',
  //   lightOpacity: 0.56,
  //   darkOpacity: 0.11,
  //   renderOrder: 2,
  // },
  // {
  //   name: 'upper-right-bank-underside',
  //   texture: 3,
  //   position: [92, 0, -238],
  //   size: [590, 168],
  //   rotationZ: 0.085,
  //   lightColor: '#c9c9c8',
  //   darkColor: '#354454',
  //   lightOpacity: 0.38,
  //   darkOpacity: 0.1,
  //   renderOrder: 2,
  // },
  // {
  //   name: 'upper-right-bank-sunward-edge',
  //   texture: 1,
  //   position: [16, 153, -275],
  //   size: [350, 118],
  //   rotationZ: 0.065,
  //   lightColor: '#e8e9e8',
  //   darkColor: '#43505d',
  //   lightOpacity: 0.25,
  //   darkOpacity: 0.075,
  //   renderOrder: 2,
  // },
  {
    name: 'mid-fragment-centre',
    texture: 3,
    position: [-126, 80, -185],
    size: [126, 26],
    rotationZ: -0.018,
    lightColor: '#dce2e5',
    darkColor: '#45515d',
    lightOpacity: 0.26,
    darkOpacity: 0.045,
    renderOrder: 1,
  },
  {
    name: 'mid-fragment-sunward',
    texture: 2,
    position: [-30, 85, -265],
    size: [152, 34],
    rotationZ: 0.02,
    lightColor: '#e8e9e8',
    darkColor: '#46525e',
    lightOpacity: 0.28,
    darkOpacity: 0.05,
    renderOrder: 1,
  },
  {
    name: 'top-left-cropped',
    texture: 2,
    position: [-244, 166, -240],
    size: [390, 148],
    rotationZ: -0.055,
    lightColor: '#e8e7e3',
    darkColor: '#465461',
    lightOpacity: 0.26,
    darkOpacity: 0.09,
    renderOrder: 2,
  },
  // {
  //   name: 'upper-centre-bridge',
  //   texture: 1,
  //   position: [78, 106, -330],
  //   size: [210, 54],
  //   rotationZ: 0.035,
  //   lightColor: '#ece9e2',
  //   darkColor: '#475461',
  //   lightOpacity: 0.2,
  //   darkOpacity: 0.065,
  //   renderOrder: 1,
  // },
  // {
  //   name: 'upper-left-secondary',
  //   texture: 3,
  //   position: [-58, 10, -265],
  //   size: [-188, 52],
  //   rotationZ: -0.03,
  //   lightColor: '#dfe4e6',
  //   darkColor: '#43515d',
  //   lightOpacity: 0.8,
  //   darkOpacity: 0.055,
  //   renderOrder: 1,
  // },
  {
    name: 'left-mid-support',
    texture: 3,
    position: [80, 72, -135],
    size: [170, 52],
    rotationZ: -0.018,
    lightColor: '#dfe4e6',
    darkColor: '#43515d',
    lightOpacity: 0.22,
    darkOpacity: 0.055,
    renderOrder: 1,
  },
  // {
  //   name: 'left-far-support',
  //   texture: 1,
  //   position: [-218, 30, -255],
  //   size: [108, 32],
  //   rotationZ: 0.012,
  //   lightColor: '#dce2e5',
  //   darkColor: '#45515d',
  //   lightOpacity: 0.13,
  //   darkOpacity: 0.045,
  //   renderOrder: 1,
  // },
  {
    name: 'right-mid-support',
    texture: 3,
    position: [274, 112, -395],
    size: [-168, 48],
    rotationZ: 0.018,
    lightColor: '#e8e9e8',
    darkColor: '#46525e',
    lightOpacity: 0.2,
    darkOpacity: 0.05,
    renderOrder: 1,
  },
  {
    name: 'right-far-support',
    texture: 1,
    position: [238, 76, -475],
    size: [112, 30],
    rotationZ: -0.01,
    lightColor: '#dce2e5',
    darkColor: '#45515d',
    lightOpacity: 0.13,
    darkOpacity: 0.045,
    renderOrder: 1,
  },
  {
    name: 'horizon-fragment-left',
    texture: 0,
    position: [-172, 38, -530],
    size: [124, 22],
    rotationZ: -0.01,
    lightColor: '#d4dde2',
    darkColor: '#3f4c58',
    lightOpacity: 0.1,
    darkOpacity: 0.025,
    renderOrder: 0,
  },
  {
    name: 'horizon-fragment-centre',
    texture: 3,
    position: [-46, 43, -495],
    size: [-104, 21],
    rotationZ: 0.008,
    lightColor: '#dce2e4',
    darkColor: '#414e5a',
    lightOpacity: 0.11,
    darkOpacity: 0.028,
    renderOrder: 0,
  },
  {
    name: 'horizon-fragment-right',
    texture: 2,
    position: [850, 130, -800],
    size: [448, 88],
    rotationZ: -0.006,
    lightColor: '#ece1d2',
    darkColor: '#424f5b',
    lightOpacity: 0.2,
    darkOpacity: 0.025,
    renderOrder: 3,
  },
  {
    name: 'upper-left-secondary-1',
    texture: 3,
    position: [-328, 80, -205],
    size: [-188, 52],
    rotationZ: -0.03,
    lightColor: '#dfe4e6',
    darkColor: '#43515d',
    lightOpacity: 0.22,
    darkOpacity: 0.055,
    renderOrder: 1,
  },
  {
    name: 'horizon-fragment-far-left',
    texture: 0,
    position: [400, 38, -430],
    size: [124, 22],
    rotationZ: -0.01,
    lightColor: '#d4dde2',
    darkColor: '#3f4c58',
    lightOpacity: 0.1,
    darkOpacity: 0.025,
    renderOrder: 0,
  },
  {
    name: 'horizon-fragment-far-centre',
    texture: 3,
    position: [106, 23, -195],
    size: [-104, 21],
    rotationZ: 0.008,
    lightColor: '#dce2e4',
    darkColor: '#414e5a',
    lightOpacity: 0.11,
    darkOpacity: 0.028,
    renderOrder: 0,
  },
    {
    name: 'horizon-fragment-far-right',
    texture: 2,
    position: [0, 4, 100],
    size: [112, 22],
    rotationZ: -0.006,
    lightColor: '#ece1d2',
    darkColor: '#424f5b',
    lightOpacity: 0.1,
    darkOpacity: 0.025,
    renderOrder: 0,
    },
    {
    name: 'cumulus-left',
    texture: 1,
    position: [504, 58, -755],
    size: [190, 62],
    rotationZ: -0.028,
    lightColor: '#e8e9e8',
    darkColor: '#33485c',
    lightOpacity: 0.18,
    darkOpacity: 0.08,
    renderOrder: 1,
  },
];

function CloudPlane({ cloud, textures, isDark }) {
  const meshRef = useRef();
  const [width, height] = cloud.size;
  const [baseX, baseY, baseZ] = cloud.position;
  const prefersReducedMotion = usePrefersReducedMotion();
  const motion = useMemo(
    () => getCloudMotion(cloud.name, baseZ),
    [cloud.name, baseZ],
  );

  const opacity = isDark
    ? Math.min(cloud.darkOpacity * DARK_OPACITY_MULTIPLIER, 0.55)
    : cloud.lightOpacity;

  useFrame(({ clock }) => {
    if (!meshRef.current) return;

    if (prefersReducedMotion) {
      meshRef.current.position.set(baseX, baseY, baseZ);
      return;
    }

    const elapsed = clock.getElapsedTime();
    const introduction = Math.min(elapsed / 8, 1);
    const offsetX =
      Math.sin(elapsed * motion.speed + motion.phase) *
      motion.amplitude *
      introduction;

    meshRef.current.position.set(baseX + offsetX, baseY, baseZ);
  });

  return (
    <mesh
      ref={meshRef}
      name={cloud.name}
      position={cloud.position}
      rotation-z={cloud.rotationZ}
      scale-x={Math.sign(width)}
      renderOrder={cloud.renderOrder}
    >
      <planeGeometry args={[Math.abs(width), height]} />

      <meshBasicMaterial
        map={textures[cloud.texture]}
        color={isDark ? cloud.darkColor : cloud.lightColor}
        opacity={opacity}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
        toneMapped
      />
    </mesh>
  );
}

export default function Cloudscape({ isDark }) {
  const textures = useTexture(CLOUD_TEXTURES);

  useEffect(() => {
    textures.forEach((texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.wrapS = THREE.ClampToEdgeWrapping;
      texture.wrapT = THREE.ClampToEdgeWrapping;
      texture.needsUpdate = true;
    });
  }, [textures]);

  return (
    <group name="cloudscape">
      {CLOUD_PLANES.map((cloud) => (
        <CloudPlane
          key={cloud.name}
          cloud={cloud}
          textures={textures}
          isDark={isDark}
        />
      ))}
    </group>
  );
}

useTexture.preload(CLOUD_TEXTURES);
