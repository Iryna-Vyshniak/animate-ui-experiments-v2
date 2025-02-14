'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { IPlanet } from '@/types/planet';

import StarryBackground from '../space/StarryBackground';
import CelestialBody from './CelestialBody';

const GalacticView = ({ planets }: { planets: IPlanet[] }) => {
  return (
    <div className='relative w-screen h-screen'>
      {/* Three.js Canvas для фону та 3D-об'єктів */}
      <Canvas
        className='fixed inset-0 w-full h-full -z-10'
        camera={{ position: [0, 0, 10], fov: 75 }}
        gl={{
          antialias: false,
          alpha: true, // Прозорість, щоб уникнути проблем на мобільних
        }}
      >
        <Suspense fallback={'loading'}>
          {/* Фон із зірками */}
          <StarryBackground />
        </Suspense>

        <OrbitControls
          autoRotate
          autoRotateSpeed={0.3}
          enablePan={true}
          enableZoom={false}
          minPolarAngle={0}
          maxPolarAngle={Math.PI}
        />
      </Canvas>

      {/* Окремий шар для HTML (інтерфейсного) контенту */}
      <ul
        className='remove-scrollbar absolute z-50 inset-0 mx-auto my-10 max-w-5xl grid gap-3 grid-cols-1 md:grid-cols-2 py-4 px-2 overflow-scroll'
        aria-label='Planets Gallery'
      >
        {planets.map((planet) => (
          <li key={planet.name} className='p-4 rounded-full w-full  pointer-events-none'>
            {' '}
            <CelestialBody planet={planet} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GalacticView;
