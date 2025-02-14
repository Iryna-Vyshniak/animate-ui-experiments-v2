'use client';
import { Canvas } from '@react-three/fiber';
import React, { Suspense } from 'react';
import StarryBackground from './StarryBackground';
import { OrbitControls } from '@react-three/drei';

const StarrySpace = () => {
  return (
    <Canvas
      className='fixed top-0 left-0 w-full h-full'
      camera={{ position: [0, 0, 10], fov: 75 }}
      dpr={[1, 1.5]} // Оптимізація для мобільних
      gl={{
        powerPreference: 'high-performance',
        antialias: false,
        preserveDrawingBuffer: true, // Запобігає очищенню WebGL-контексту
      }}
    >
      <Suspense fallback={null}>
        <StarryBackground />
        <StarryBackground reverse />
      </Suspense>

      <OrbitControls
        autoRotate
        autoRotateSpeed={0.5}
        enablePan={false}
        enableZoom={false}
        minPolarAngle={0}
        maxPolarAngle={Math.PI}
      />
    </Canvas>
  );
};

export default StarrySpace;
