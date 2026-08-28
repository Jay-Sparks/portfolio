import { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function NormalizedVessel({ url, targetLength, ...props }) {
  const { scene } = useGLTF(url);

  const { model, scale } = useMemo(() => {
    const object = scene.clone(true);
    const bounds = new THREE.Box3().setFromObject(object);
    const size = bounds.getSize(new THREE.Vector3());
    const center = bounds.getCenter(new THREE.Vector3());
    const length = Math.max(size.x, size.z);

    object.position.set(-center.x, -bounds.min.y, -center.z);
    object.traverse((child) => {
      if (!child.isMesh) return;
      const materials = Array.isArray(child.material)
        ? child.material
        : [child.material];
      const darkenedMaterials = materials.map((material) => {
        const darkenedMaterial = material.clone();
        if (darkenedMaterial.color) {
          darkenedMaterial.color.multiply(new THREE.Color('#555b60'));
        }
        return darkenedMaterial;
      });

      child.material = Array.isArray(child.material)
        ? darkenedMaterials
        : darkenedMaterials[0];
      child.castShadow = true;
      child.receiveShadow = true;
    });

    return { model: object, scale: targetLength / length };
  }, [scene, targetLength]);

  return (
    <group {...props} scale={scale} dispose={null}>
      <primitive object={model} />
    </group>
  );
}

export function SailingVesselInfinity(props) {
  return (
    <NormalizedVessel
      {...props}
      url="/models/boats/sailing_vessel_infinity.glb"
      targetLength={10}
    />
  );
}

useGLTF.preload('/models/boats/sailing_vessel_infinity.glb');
