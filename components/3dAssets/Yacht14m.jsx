import { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const MODEL_URL = '/models/boats/yacht_14m.glb';
const TARGET_LENGTH = 6;

export default function Yacht14m(props) {
  const { scene } = useGLTF(MODEL_URL);

  const { model, scale } = useMemo(() => {
    const object = scene.clone(true);
    const bounds = new THREE.Box3().setFromObject(object);
    const size = bounds.getSize(new THREE.Vector3());
    const center = bounds.getCenter(new THREE.Vector3());
    const length = Math.max(size.x, size.z);

    object.position.set(-center.x, -bounds.min.y, -center.z);
    object.traverse((child) => {
      if (!child.isMesh) return;
      child.castShadow = true;
      child.receiveShadow = true;
    });

    return {
      model: object,
      scale: TARGET_LENGTH / length,
    };
  }, [scene]);

  return (
    <group {...props} scale={scale} dispose={null}>
      <primitive object={model} />
    </group>
  );
}

useGLTF.preload(MODEL_URL);
