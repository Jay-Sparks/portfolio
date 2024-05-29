import React, { Suspense, useEffect, useState } from 'react';
import * as THREE from 'three';
import {
  OrbitControls,
  Sky,
  Sparkles,
  Cloud,
  Clouds,
  Stars,
  Float,
} from '@react-three/drei';
import { EffectComposer, Vignette } from '@react-three/postprocessing';
import { Canvas } from '@react-three/fiber';

import styles from './Experience.module.css';
import NameText from '../../components/NameText/NameText';
import Ocean from '../../components/Ocean/Ocean';
import SmallShip from '../../components/3dAssets/SmallShip';
import Dock from '../3dAssets/Dock';

function Experience({ isDark }) {
  const [sunPosition, setSunPosition] = useState([100, 10, -250]);

  useEffect(() => {
    if (isDark) setSunPosition([1, -5, 3]);
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

            <Sky
              sunPosition={[100, 10, -250]}
              distance={45000}
              inclination={0.6}
              azimuth={0.1}
              turbidity={isDark ? 1 : 1}
              rayleigh={isDark ? 0 : 0.5}
              mieDirectionalG={isDark ? 0.4 : 0.8}
              mieCoefficient={0.005}
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
                  intensity={0.5}
                  color="#c7c7c7"
                  groundColor="black"
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
                <Cloud
                  segments={15}
                  bounds={[1000, 7, 1100]}
                  volume={200}
                  color="white"
                  position={[0, 100, -5]}
                  fade={30}
                />
                <Cloud
                  segments={50}
                  bounds={[800, 8, 800]}
                  volume={230}
                  color="white"
                  position={[0, 200, 0]}
                  fade={10}
                />
                <Clouds material={THREE.MeshBasicMaterial}></Clouds>
              </>
            ) : (
              <Clouds material={THREE.MeshBasicMaterial}>
                <Cloud
                  segments={50}
                  bounds={[1000, 4, 1000]}
                  volume={100}
                  color="#FCF5E5"
                  position={[0, 100, -4]}
                  fade={60}
                />
                <Cloud
                  segments={50}
                  bounds={[800, 8, 800]}
                  volume={250}
                  color="#FCF5E5"
                  position={[0, 200, 0]}
                  fade={30}
                />
              </Clouds>
            )}
            <ambientLight intensity={isDark ? 0.3 : 2} />
            <directionalLight
              castShadow
              intensity={isDark ? 0.5 : 1}
              position={sunPosition}
              shadow-normalBias={0.04}
            />
            <OrbitControls
              target={[0, 3, 0]}
              minDistance={20}
              maxDistance={20}
              enableRotate={true}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 6}
              enableZoom={false}
              enablePan={false}
            />
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

            <Float
              speed={0.8} // Animation speed, defaults to 1
              rotationIntensity={0} // XYZ rotation intensity, defaults to 1
              floatIntensity={0.8} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
              floatingRange={[-0.25, -0.05]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
            >
              <SmallShip 
                position={[70, -0.2, -180]}
                rotation-y={Math.PI * 1.8}
              />
            </Float>

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
      <h1>/jayspencer</h1>
    </div>
  );
}

export default Experience;
