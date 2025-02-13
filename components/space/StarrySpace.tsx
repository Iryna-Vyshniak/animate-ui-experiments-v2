'use client';
import { Canvas } from '@react-three/fiber';
import React, { Suspense } from 'react';
import StarryBackground from './StarryBackground';
import { OrbitControls } from '@react-three/drei';

const StarrySpace = () => {
  return (
    <Canvas className='canvas' camera={{ position: [0, 0, 10], fov: 75 }}>
      <Suspense fallback={'loading'}>
        <StarryBackground />
        <StarryBackground reverse />
      </Suspense>
      <OrbitControls
        autoRotate
        autoRotateSpeed={0.5}
        enablePan={true}
        enableZoom={false}
        minPolarAngle={0}
        maxPolarAngle={Math.PI}
      />
    </Canvas>
  );
};

export default StarrySpace;
