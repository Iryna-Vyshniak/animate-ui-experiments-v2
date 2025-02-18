'use client';
import { Canvas } from '@react-three/fiber';
import React, { Suspense } from 'react';
import { OrbitControls, Stars } from '@react-three/drei';
import SceneStars from './SceneStars';

const SceneSpaceBackground = () => {
  return (
    <Canvas
      className='fixed inset-0 w-full h-full'
      camera={{ position: [0, 0, 0], fov: 75 }}
      dpr={[1, 1.5]} // Оптимізація для мобільних
      gl={{
        powerPreference: 'high-performance',
        antialias: false,
        preserveDrawingBuffer: true, // Запобігає очищенню WebGL-контексту
      }}
    >
      <Suspense fallback={null}>
        <SceneStars />
        <SceneStars reverse />
        <Stars radius={1000} depth={50} count={10000} factor={4} saturation={0} fade speed={1.5} />
      </Suspense>

      <OrbitControls
        autoRotate
        autoRotateSpeed={0.5}
        enablePan
        enableZoom={false}
        minPolarAngle={0}
        maxPolarAngle={Math.PI}
      />
    </Canvas>
  );
};

export default SceneSpaceBackground;
