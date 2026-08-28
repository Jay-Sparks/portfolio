import React, { Suspense, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  OrbitControls,
  Sky,
  Sparkles,
  Stars,
  Float,
} from '@react-three/drei';
import { EffectComposer, Vignette } from '@react-three/postprocessing';
import { Canvas, useFrame } from '@react-three/fiber';

import styles from './Experience.module.css';
import NameText from '../../components/NameText/NameText';
import Ocean from '../../components/Ocean/Ocean';
import Yacht14m from '../../components/3dAssets/Yacht14m';
import { SailingVesselInfinity } from '../../components/3dAssets/AdditionalVessels';
import Cloudscape from '../../components/3dAssets/Cloudscape';
import CoastalLandscape, {
  BoatLights,
} from '../../components/3dAssets/CoastalLandscape';
import Dock from '../3dAssets/Dock';

const HERO_CONTENT = {
  name: 'JAY SPENCER',
  headline: 'Product Leader & Builder',
  supporting:
    'Building data, SaaS, fintech and AI products from insight to impact.',
};

const INFINITY_ROUTE = {
  start: [-260, -0.6, -405],
  end: [190, -0.6, -320],
  duration: 90,
  bobHeight: 0.12,
  bobSpeed: 0.7,
};

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
      scale={1.5}
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

  useEffect(() => {
    if (isDark) setSunPosition([-120, 85, -160]);
    else setSunPosition([180, 3, -200]);
  }, [isDark]);

  const Moon = ({
    size = 1,
    amount = 50,
    color = 'white',
    emissive,
    glow,
    ...props
  }) => (
    <mesh {...props}>
      <sphereGeometry args={[size, 64, 64]} />
      <meshPhysicalMaterial
        roughness={5}
        color={color}
        emissive={emissive || color}
        envMapIntensity={0.2}
      />
    </mesh>
  );

  return (
    <div className={styles.Experience}>
      {/* <div className={styles.scrollDowns}>
        <div className={styles.mousey}>
          <div className={styles.scroller}></div>
        </div>
      </div> */}
      {/* <Suspense fallback={<h2 className={styles.Loading}>Loading...</h2>}> */}
      <Suspense fallback={null}>
        <Canvas camera={{ fov: 60, position: [0, 6, 20] }}>
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
                <Stars
                  radius={100}
                  depth={50}
                  count={5000}
                  factor={4}
                  saturation={1}
                  fade
                  speed={1}
                />
                <hemisphereLight
                  intensity={0.34}
                  color="#7892b0"
                  groundColor="#080d14"
                />
                {/* <Moon
                  color="purple"
                  amount={0}
                  emissive="black"
                  size={0.8}
                  position={[20, 45, -200]}
                />
                <Moon
                  color="blue"
                  amount={3}
                  emissive="black"
                  size={1}
                  position={[-90, 30, -230]}
                />
                <Moon
                  color="white"
                  amount={0}
                  emissive="black"
                  size={1.1}
                  position={[-120, 60, -120]}
                />
                <Moon
                  color="cyan"
                  amount={6}
                  emissive="black"
                  size={2}
                  position={[-250, 30, 250]}
                />
                <Moon
                  color="#D42B07"
                  amount={0}
                  emissive="black"
                  size={0.8}
                  position={[-250, 60, 30]}
                />
                <Moon
                  color="#CEB32A"
                  amount={10}
                  emissive="black"
                  size={2.8}
                  position={[180, 152, 350]}
                />
                <Moon
                  color="white"
                  amount={0}
                  emissive="black"
                  size={1.1}
                  position={[120, 60, -120]}
                />
                <Moon
                  color="red"
                  amount={20}
                  emissive="grey"
                  size={10}
                  position={[850, 1, 10]}
                />
                <Moon
                  color="black"
                  amount={0}
                  emissive="#D7D59D"
                  size={1.1}
                  position={[250, 60, 180]}
                /> */}
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
              intensity={isDark ? 0.72 : 1.3}
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

            {/* From previous 3D hero text
            <Float
              speed={1} // Animation speed, defaults to 1
              rotationIntensity={0} // XYZ rotation intensity, defaults to 1
              floatIntensity={1} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
              floatingRange={[1, 3]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
            >
              <NameText content={`Jay Spencer`} positionY={3} />
              <NameText content={`Snr Product Owner &`} positionY={2} />
              <NameText content={`Software Engineer`} positionY={1}/>
            </Float>
            */}

            <Float
              speed={0.8} // Animation speed, defaults to 1
              rotationIntensity={0} // XYZ rotation intensity, defaults to 1
              floatIntensity={0.8} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
              floatingRange={[-0.25, -0.05]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
            >
              <group
                position={[15, -1.5, -10]}
                rotation-y={Math.PI * 1.8 - Math.PI / 2}
                scale={2.1}
              >
                <Yacht14m />
                <BoatLights isDark={isDark} />
              </group>
            </Float>

            <MovingInfinity isDark={isDark} />

            <CoastalLandscape isDark={isDark} />

            {/* <Dock
              scale={[1.5, 1.5, 1.5]}
              position={[-22, -0.2, -10]}
              rotation-y={Math.PI * 2.25}
            />
            <Dock 
              scale={[1.5, 1.5, 1.5]}
              position={[-21, -0.2, -11]}
              rotation-y={Math.PI * 1.25}
            /> */}


            {/* <mesh receiveShadow position={ [100, 1, 100] } >
                <boxGeometry args={ [ 10, 0.5, 10 ] } />
                <meshStandardMaterial color="#8f4111" />
            </mesh> */}
            <Ocean />
          </EffectComposer>
        </Canvas>
      </Suspense>
      <header className={styles.heroContent}>
        <p className={styles.heroName}>{HERO_CONTENT.name}</p>
        <span className={styles.heroAccent} />
        <h1 className={styles.heroHeadline}>{HERO_CONTENT.headline}</h1>
        <p className={styles.heroSupporting}>{HERO_CONTENT.supporting}</p>
      </header>
    </div>
  );
}

export default Experience;
