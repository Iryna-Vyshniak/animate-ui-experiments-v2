'use client';

import React from 'react';
import { Html } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';

import { IPlanet } from '@/types/planet';
import PlanetMesh from '../planet/PlanetMesh';
import { useLayoutNavigationStore } from '@/store/layoutNavigationStore';
import { useLayoutNavigationController } from '@/hooks/useLayoutNavigationController';

interface CelestialBodyProps {
  planet: IPlanet;
}

const CelestialBody: React.FC<CelestialBodyProps> = ({ planet }) => {
  const { hoveredPlanet } = useLayoutNavigationStore();
  const { push } = useLayoutNavigationController();

  // Анімація масштабу планети
  const scaleSpring = useSpring({
    scale: hoveredPlanet === planet.name ? 1.05 : 1,
    config: { mass: 2, tension: 150, friction: 25 },
  });

  return (
    <animated.group scale={scaleSpring.scale} onClick={() => push(planet.name)}>
      <PlanetMesh planet={planet} />
      {hoveredPlanet === planet.name && (
        <Html center pointerEvents='auto'>
          <div className='relative flex justify-center rounded-full p-4'>
            <h2 className='absolute z-10 text-base text-white font-bold drop-shadow-[0px_2px_5px_rgba(8,0,36,1)'>
              {hoveredPlanet}
            </h2>
          </div>
        </Html>
      )}
    </animated.group>
  );
};

export default CelestialBody;
