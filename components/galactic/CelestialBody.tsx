'use client';

import React from 'react';
import { Html } from '@react-three/drei';
import { motion } from 'framer-motion';
import { IPlanet } from '@/types/planet';
import PlanetMesh from '../planet/PlanetMesh';
import { useLayoutNavigationStore } from '@/store/layoutNavigationStore';

interface CelestialBodyProps {
  planet: IPlanet;
}

const CelestialBody: React.FC<CelestialBodyProps> = ({ planet }) => {
  const { hoveredPlanet } = useLayoutNavigationStore();
  return (
    <group>
      <PlanetMesh planet={planet} />
      {hoveredPlanet === planet.name && (
        <Html center pointerEvents='none'>
          <motion.div className='relative flex justify-center rounded-full p-4'>
            <motion.h2
              layoutId={`planet-title-${hoveredPlanet}`}
              className='text-base text-white/60 font-bold'
            >
              {hoveredPlanet}
            </motion.h2>
          </motion.div>
        </Html>
      )}
    </group>
  );
};

export default CelestialBody;
