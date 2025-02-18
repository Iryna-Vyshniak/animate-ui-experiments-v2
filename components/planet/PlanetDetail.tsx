'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import { IPlanet } from '@/types/planet';
import PlanetImage from './PlanetImage';
import PlanetHeader from './PlanetHeader';
import PlanetDescription from './PlanetDescription';
import PlanetPhysicalProperties from './PlanetPhysicalProperties';

import { useLayoutNavigationController } from '@/hooks/useLayoutNavigationController';

const PlanetDetail = ({ planet, isModal }: { planet: IPlanet; isModal: boolean }) => {
  const { shouldCloseModal, close } = useLayoutNavigationController();
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseOffset({
        x: (e.clientX - window.innerWidth / 2) * 0.04,
        y: (e.clientY - window.innerHeight / 2) * 0.04,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.article
      className='w-full h-screen overflow-x-hidden flex flex-col items-center relative p-4 remove-scrollbar'
      layoutId={`planet-${planet.name}`}
    >
      <PlanetImage planet={planet} mouseOffset={mouseOffset} isModal={isModal} />
      <div className='flex flex-col z-10 w-full h-full p-4 mt-96 absolute bottom-0 inset-0 bg-gradient-to-b from-transparent via-[#1f0049]/90 to-slate-950 opacity-100 justify-end pointer-events-none'>
        <PlanetHeader name={planet.name} shouldClose={shouldCloseModal} onClose={close} />
        <main className='flex flex-col gap-4  justify-between items-center px-3'>
          <PlanetDescription description={planet.description} />
          <PlanetPhysicalProperties physicalProperties={planet.physicalProperties} />
        </main>
      </div>
    </motion.article>
  );
};

export default PlanetDetail;
