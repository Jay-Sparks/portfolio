import React, { useEffect, useState } from 'react';
import * as THREE from 'three';
import {
  OrbitControls,
  Sky,
  Sparkles,
  Cloud,
  Clouds,
  Stars,
} from '@react-three/drei';
import { EffectComposer, Vignette } from '@react-three/postprocessing';
import { Canvas } from '@react-three/fiber';

import styles from './Experience.module.css';
import NameText from '../../components/NameText/NameText';
import Ocean from '../../components/Ocean/Ocean';

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
      <div className={styles.scrollDowns}>
        <div className={styles.mousey}>
          <div className={styles.scroller}></div>
        </div>
      </div>
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
              <Moon
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
                position={[-150, 30, 150]}
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
              />
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
          />
          <NameText content={`Jay Spencer`} positionY={3} />
          <NameText content={`Creative Developer`} positionY={1.5} />

          {/* <mesh receiveShadow position={ [100, 1, 100] } >
                        <boxGeometry args={ [ 10, 0.5, 10 ] } />
                        <meshStandardMaterial color="#8f4111" />
                    </mesh> */}
          <Ocean />
        </EffectComposer>
      </Canvas>
      <h1>/jayspencer</h1>
    </div>
  );
}

export default Experience;
