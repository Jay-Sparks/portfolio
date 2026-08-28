import { useEffect } from 'react';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

const CLOUD_TEXTURES = [
  '/textures/clouds/horizon-bank.png',
  '/textures/clouds/cumulus-formation.png',
  '/textures/clouds/upper-frame.png',
  '/textures/clouds/cumulus-formation-wide.png',
];

const CLOUD_PLANES = [
  {
    name: 'horizon-bank',
    texture: 0,
    position: [-18, 26, -540],
    size: [520, 146],
    rotationZ: 0,
    lightColor: '#d9e0e5',
    darkColor: '#46525e',
    lightOpacity: 0.26,
    darkOpacity: 0.08,
    renderOrder: 0,
  },
  {
    name: 'cumulus-left',
    texture: 1,
    position: [-194, 94, -305],
    size: [198, 76],
    rotationZ: -0.018,
    lightColor: '#e8e9e8',
    darkColor: '#4d5965',
    lightOpacity: 0.6,
    darkOpacity: 0.18,
    renderOrder: 1,
  },
  {
    name: 'cumulus-right',
    texture: 3,
    position: [38, 48, -430],
    size: [218, 68],
    rotationZ: 0.012,
    lightColor: '#eef0ed',
    darkColor: '#48545f',
    lightOpacity: 0.38,
    darkOpacity: 0.11,
    renderOrder: 1,
  },
  {
    name: 'upper-frame',
    texture: 2,
    position: [184, 90, -225],
    size: [278, 78],
    rotationZ: 0.028,
    lightColor: '#f5eee4',
    darkColor: '#4a5662',
    lightOpacity: 0.38,
    darkOpacity: 0.1,
    renderOrder: 2,
  },
  {
    name: 'mid-fragment-centre',
    texture: 3,
    position: [-52, 61, -405],
    size: [96, 22],
    rotationZ: -0.012,
    lightColor: '#dce2e5',
    darkColor: '#45515d',
    lightOpacity: 0.15,
    darkOpacity: 0.045,
    renderOrder: 1,
  },
  {
    name: 'mid-fragment-sunward',
    texture: 2,
    position: [116, 58, -420],
    size: [112, 24],
    rotationZ: 0.015,
    lightColor: '#eee8df',
    darkColor: '#46525e',
    lightOpacity: 0.17,
    darkOpacity: 0.05,
    renderOrder: 1,
  },
  {
    name: 'upper-left-fragment-inner',
    texture: 3,
    position: [-126, 78, -350],
    size: [62, 14],
    rotationZ: -0.018,
    lightColor: '#dfe4e6',
    darkColor: '#46525d',
    lightOpacity: 0.1,
    darkOpacity: 0.03,
    renderOrder: 1,
  },
  {
    name: 'upper-left-fragment-outer',
    texture: 2,
    position: [-220, 66, -390],
    size: [72, 15],
    rotationZ: 0.012,
    lightColor: '#d9e0e4',
    darkColor: '#44505b',
    lightOpacity: 0.075,
    darkOpacity: 0.022,
    renderOrder: 1,
  },
  {
    name: 'top-left-cropped',
    texture: 2,
    position: [-155, 154, -190],
    size: [250, 70],
    rotationZ: -0.025,
    lightColor: '#e8e7e3',
    darkColor: '#465461',
    lightOpacity: 0.32,
    darkOpacity: 0.09,
    renderOrder: 2,
  },
  {
    name: 'top-centre-cropped',
    texture: 3,
    position: [4, 142, -255],
    size: [-194, 58],
    rotationZ: 0.018,
    lightColor: '#e3e7e8',
    darkColor: '#43515e',
    lightOpacity: 0.28,
    darkOpacity: 0.075,
    renderOrder: 2,
  },
  {
    name: 'upper-centre-bridge',
    texture: 1,
    position: [66, 108, -320],
    size: [142, 44],
    rotationZ: -0.012,
    lightColor: '#ece9e2',
    darkColor: '#475461',
    lightOpacity: 0.24,
    darkOpacity: 0.065,
    renderOrder: 1,
  },
  {
    name: 'upper-left-secondary',
    texture: 3,
    position: [-82, 105, -345],
    size: [-126, 36],
    rotationZ: 0.022,
    lightColor: '#dfe4e6',
    darkColor: '#43515d',
    lightOpacity: 0.21,
    darkOpacity: 0.055,
    renderOrder: 1,
  },
  {
    name: 'horizon-fragment-left',
    texture: 0,
    position: [-156, 42, -515],
    size: [108, 24],
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
    position: [-28, 45, -480],
    size: [-86, 20],
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
    position: [116, 47, -500],
    size: [94, 20],
    rotationZ: -0.006,
    lightColor: '#e8e2d9',
    darkColor: '#424f5b',
    lightOpacity: 0.1,
    darkOpacity: 0.025,
    renderOrder: 0,
  },
];

function CloudPlane({ cloud, textures, isDark }) {
  const [width, height] = cloud.size;

  return (
    <mesh
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
        opacity={isDark ? cloud.darkOpacity : cloud.lightOpacity}
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
