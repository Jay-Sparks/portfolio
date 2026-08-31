import { useEffect, useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const MODEL_URL = '/models/boats/yacht_14m_optimized.glb';
const TARGET_LENGTH = 6;
const FLAG_NODE_NAME = 'Object_35';
const FLAG_MATERIAL_NAME = 'acmat_27';

function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReducedMotion(query.matches);
    updatePreference();
    query.addEventListener('change', updatePreference);
    return () => query.removeEventListener('change', updatePreference);
  }, []);

  return reducedMotion;
}

function createWindMaterial(sourceMaterial, uniforms) {
  const material = sourceMaterial.clone();
  material.side = THREE.DoubleSide;
  material.onBeforeCompile = (shader) => {
    shader.uniforms.flagTime = uniforms.flagTime;
    shader.uniforms.flagMotion = uniforms.flagMotion;
    shader.vertexShader = shader.vertexShader
      .replace(
        '#include <common>',
        `#include <common>
        uniform float flagTime;
        uniform float flagMotion;`
      )
      .replace(
        '#include <begin_vertex>',
        `#include <begin_vertex>
        // uv.x = 1 is the pole edge, so displacement grows toward uv.x = 0.
        float flagReach = 1.0 - uv.x;
        float flagAnchor = smoothstep(0.0, 0.16, flagReach);
        float flagPhase = flagTime * 0.95 - flagReach * 5.2;
        float flagGust = 0.78 + 0.22 * sin(flagTime * 0.37 + 1.7);
        float flagWave =
          sin(flagPhase + uv.y * 1.3) * 0.280 +
          sin(flagTime * 1.60 - flagReach * 8.4 + uv.y * 2.1) * 0.104 +
          sin(flagTime * 0.60 + flagReach * 3.1 - uv.y * 4.0) * 0.056;
        transformed.x += flagAnchor * flagReach * flagWave * flagGust * flagMotion;
        transformed.y += flagAnchor * flagReach *
          sin(flagTime * 0.80 - flagReach * 4.1) * 0.048 * flagMotion;`
      );
  };
  material.customProgramCacheKey = () => 'yacht-wind-flag-v1';
  material.needsUpdate = true;
  return material;
}

function addProceduralFlag(model) {
  const candidate = model.getObjectByName(FLAG_NODE_NAME);
  if (!candidate?.isMesh || candidate.material?.name !== FLAG_MATERIAL_NAME) {
    return null;
  }

  candidate.geometry.computeBoundingBox();
  const bounds = candidate.geometry.boundingBox;
  const size = bounds.getSize(new THREE.Vector3());
  const center = bounds.getCenter(new THREE.Vector3());
  const dimensions = [size.x, size.y, size.z].sort((a, b) => a - b);
  const isThinSurface = dimensions[0] < dimensions[1] * 0.15;
  const isAtMasthead = candidate.position.y > 90;

  // Fail closed if a future yacht asset changes its mesh layout.
  if (!isThinSurface || !isAtMasthead || candidate.geometry.attributes.position.count !== 172) {
    return null;
  }

  const geometry = new THREE.PlaneGeometry(size.y, size.z, 12, 6);
  const positions = geometry.attributes.position;

  // Map the plane into the original flag's thin X, wide Y, tall Z bounds.
  for (let index = 0; index < positions.count; index += 1) {
    const planeX = positions.getX(index);
    const planeY = positions.getY(index);
    positions.setXYZ(index, center.x, center.y + planeX, center.z + planeY);
  }
  positions.needsUpdate = true;
  geometry.computeVertexNormals();
  geometry.computeBoundingSphere();

  const uniforms = {
    flagTime: { value: 0 },
    flagMotion: { value: 1 },
  };
  const flag = new THREE.Mesh(
    geometry,
    createWindMaterial(candidate.material, uniforms)
  );
  flag.name = 'ProceduralYachtFlag';
  flag.position.copy(candidate.position);
  flag.quaternion.copy(candidate.quaternion);
  flag.scale.copy(candidate.scale);
  flag.castShadow = true;
  flag.receiveShadow = true;

  candidate.visible = false;
  candidate.parent.add(flag);

  return { uniforms };
}

export default function Yacht14m(props) {
  const { scene } = useGLTF(MODEL_URL);
  const yachtRef = useRef();
  const reducedMotion = useReducedMotion();

  const { model, scale, flagAnimation } = useMemo(() => {
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
      flagAnimation: addProceduralFlag(object),
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

    if (flagAnimation) {
      flagAnimation.uniforms.flagTime.value = reducedMotion ? 0.65 : t;
      flagAnimation.uniforms.flagMotion.value = reducedMotion ? 0.18 : 1;
    }
  });

  return (
    <group ref={yachtRef} {...props} scale={scale} dispose={null}>
      <primitive object={model} />
    </group>
  );
}

useGLTF.preload(MODEL_URL);
