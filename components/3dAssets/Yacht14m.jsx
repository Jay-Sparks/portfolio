import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const MODEL_URL = '/models/boats/yacht_14m.glb';
const TARGET_LENGTH = 6;

export default function Yacht14m(props) {
  const { scene } = useGLTF(MODEL_URL);
  const yachtRef = useRef();

  const { model, scale } = useMemo(() => {
    const object = scene.clone(true);
    const bounds = new THREE.Box3().setFromObject(object);
    const size = bounds.getSize(new THREE.Vector3());
    const center = bounds.getCenter(new THREE.Vector3());
    const length = Math.max(size.x, size.z);

    object.position.set(-center.x, -bounds.min.y, -center.z);

    object.traverse((child) => {
      if (!child.isMesh) return;

  console.log('YACHT MATERIAL', {
    mesh: child.name,
    material: child.material?.name,
    type: child.material?.type,
    color: child.material?.color?.getHexString(),
    emissive: child.material?.emissive?.getHexString(),
    metalness: child.material?.metalness,
    roughness: child.material?.roughness,
  });


      child.castShadow = true;
      child.receiveShadow = true;
    });

    return {
      model: object,
      scale: TARGET_LENGTH / length,
    };
  }, [scene]);

  useFrame(({ clock }) => {
    if (!yachtRef.current) return;

    const t = clock.getElapsedTime();

    yachtRef.current.position.y =
      (props.position?.[1] ?? 0) +
      Math.sin(t * 0.55) * 0.035;

    yachtRef.current.rotation.z =
      (props.rotation?.[2] ?? 0) +
      Math.sin(t * 0.38) * 0.008;

    yachtRef.current.rotation.x =
      (props.rotation?.[0] ?? 0) +
      Math.sin(t * 0.27) * 0.004;
  });

  return (
    <group
      ref={yachtRef}
      {...props}
      scale={scale}
      dispose={null}
    >
      <primitive object={model} />

    </group>
  );
}

useGLTF.preload(MODEL_URL);