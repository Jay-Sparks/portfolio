import React, {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import * as THREE from 'three';
import {
  OrbitControls,
  Sky,
  Float,
  useProgress,
} from '@react-three/drei';
import { EffectComposer, Vignette } from '@react-three/postprocessing';
import { Canvas, useFrame } from '@react-three/fiber';

import styles from './Experience.module.css';
import Ocean from '../../components/Ocean/Ocean';
import Yacht14m from '../../components/3dAssets/Yacht14m';
import { SailingVesselInfinity } from '../../components/3dAssets/AdditionalVessels';
import Cloudscape from '../../components/3dAssets/Cloudscape';
import CoastalLandscape, {
  BoatLights,
} from '../../components/3dAssets/CoastalLandscape';
import Starfield from '../../components/Starfield/Starfield';

const HERO_CONTENT = {
  name: 'JAY SPENCER',
  headline: 'Product Leader & Builder',
  supporting:
    'Building data, SaaS, fintech and AI products from insight to impact.',
};

const INFINITY_ROUTE = {
  start: [-180, -0.6, -450],
  end: [190, -0.6, -320],
  duration: 90,
  bobHeight: 0.12,
  bobSpeed: 0.7,
};

class SceneErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    this.props.onError(error);
  }

  render() {
    return this.state.hasError ? null : this.props.children;
  }
}

function SceneReady({ onReady }) {
  useEffect(() => {
    onReady();
  }, [onReady]);

  return null;
}

function SceneLoadingIndicator({ hidden }) {
  const { active, progress } = useProgress();
  const showProgress = active && progress > 0 && progress < 100;

  return (
    <div
      className={`${styles.sceneLoader} ${hidden ? styles.sceneLoaderHidden : ''}`}
      role="status"
      aria-live="polite"
      aria-label="Loading the three-dimensional scene"
    >
      <span className={styles.loadingMark} aria-hidden="true" />
      <span>Loading scene{showProgress ? ` · ${Math.round(progress)}%` : ''}</span>
    </div>
  );
}

function MovingInfinity({ isDark }) {
  const vessel = useRef();

  useFrame(({ clock }) => {
    if (!vessel.current) return;

    const elapsed = clock.getElapsedTime();
    const progress = (elapsed % INFINITY_ROUTE.duration) / INFINITY_ROUTE.duration;

    vessel.current.position.x = THREE.MathUtils.lerp(
      INFINITY_ROUTE.start[0],
      INFINITY_ROUTE.end[0],
      progress
    );
    vessel.current.position.y =
      INFINITY_ROUTE.start[1] +
      Math.sin(elapsed * INFINITY_ROUTE.bobSpeed) * INFINITY_ROUTE.bobHeight;
    vessel.current.position.z = THREE.MathUtils.lerp(
      INFINITY_ROUTE.start[2],
      INFINITY_ROUTE.end[2],
      progress
    );
  });

  return (
    <group
      ref={vessel}
      position={INFINITY_ROUTE.start}
      rotation-y={Math.PI * 1.82 - Math.PI / 18}
      scale={1.1}
    >
      <SailingVesselInfinity />
      {isDark && (
        <group name="infinity-navigation-light">
          <mesh position={[0, 1, 0]}>
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshBasicMaterial color="#ffb45f" toneMapped={false} />
          </mesh>
          <pointLight
            color="#ffad55"
            intensity={0.3}
            distance={9}
            decay={2}
            position={[0, 1, 0]}
          />
        </group>
      )}
    </group>
  );
}

function Experience({ isDark }) {
  const [sunPosition, setSunPosition] = useState([100, 10, -250]);
  const [sceneStatus, setSceneStatus] = useState('loading');

  const handleSceneReady = useCallback(() => setSceneStatus('ready'), []);
  const handleSceneError = useCallback(() => setSceneStatus('error'), []);

  useEffect(() => {
    if (isDark) setSunPosition([-120, 85, -160]);
    else setSunPosition([180, 3, -200]);
  }, [isDark]);

  

  const Moon = ({ size = 1, ...props }) => (
  <group {...props}>
    <mesh>
      <sphereGeometry args={[size, 64, 64]} />
      <meshBasicMaterial
        color="#d8dde2"
        toneMapped
      />
    </mesh>

    <mesh position={[0, 0, -0.1]}>
      <circleGeometry args={[size * 2.2, 64]} />
      <meshBasicMaterial
        color="#b7c8da"
        transparent
        opacity={0.08}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  </group>
);

  return (
    <div className={styles.Experience}>
      <div
        className={`${styles.sceneLayer} ${
          sceneStatus === 'ready' ? styles.sceneLayerReady : ''
        }`}
        aria-hidden={sceneStatus !== 'ready'}
      >
        <SceneErrorBoundary onError={handleSceneError}>
          <Canvas camera={{ fov: 60, position: [0, 6, 20] }}>
            <Suspense fallback={null}>
              <EffectComposer disableNormalPass>
            <Vignette darkness={0.5} />
            <fog
              attach="fog"
              args={[isDark ? '#303b48' : '#b9c9d1', 240, 680]}
            />

            <Sky
              sunPosition={[115, 8, -285]}
              distance={45000}
              inclination={0.6}
              azimuth={0.1}
              turbidity={isDark ? 1 : 3.2}
              rayleigh={isDark ? 0 : 0.9}
              mieDirectionalG={isDark ? 0.4 : 0.65}
              mieCoefficient={isDark ? 0.005 : 0.002}
            />
            {isDark ? (
              <>
                {isDark && <Starfield />}
                <hemisphereLight
                  intensity={0.16}
                  color="#7892b0"
                  groundColor="#080d14"
                />
              </>
            ) : null}
            <Cloudscape isDark={isDark} />
            <ambientLight
              color={isDark ? '#8fa1b5' : '#b8cce0'}
              intensity={isDark ? 0.18 : 0.85}
            />
            <directionalLight
              castShadow
              color={isDark ? '#8fa9c6' : '#ffc978'}
              intensity={isDark ? 0.35 : 1.3}
              position={sunPosition}
              shadow-normalBias={0.04}
            />
            <OrbitControls
              target={[0, 8, 0]}
              minDistance={20}
              maxDistance={20}
              enableRotate={true}
              minAzimuthAngle={-0.16}
              maxAzimuthAngle={0.16}
              minPolarAngle={1.62}
              maxPolarAngle={1.72}
              enableDamping
              dampingFactor={0.04}
              rotateSpeed={0.22}
              enableZoom={false}
              enablePan={false}
            />

            <Float
              speed={0.8} // Animation speed, defaults to 1
              rotationIntensity={0} // XYZ rotation intensity, defaults to 1
              floatIntensity={0.8} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
              floatingRange={[-0.25, -0.05]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
            >
              <group
                position={[15, -1.5, -10]}
                rotation-y={Math.PI + 0.6}
                scale={2.1}
              >
                <Yacht14m />
                <BoatLights isDark={isDark} />
              </group>
            </Float>

            <MovingInfinity isDark={isDark} />

            <CoastalLandscape isDark={isDark} />

                <Ocean isDark={isDark} />
              </EffectComposer>
              <SceneReady onReady={handleSceneReady} />
            </Suspense>
          </Canvas>
        </SceneErrorBoundary>
      </div>
      <SceneLoadingIndicator hidden={sceneStatus !== 'loading'} />
      <header
        className={`${styles.heroContent} ${
          sceneStatus !== 'ready' ? styles.heroContentLoading : ''
        }`}
      >
        <p className={styles.heroName}>{HERO_CONTENT.name}</p>
        <span className={styles.heroAccent} />
        <h1 className={styles.heroHeadline}>{HERO_CONTENT.headline}</h1>
        <p className={styles.heroSupporting}>{HERO_CONTENT.supporting}</p>
      </header>
    </div>
  );
}

export default Experience;
