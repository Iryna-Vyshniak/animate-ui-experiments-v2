'use client';

import { useState, useEffect, useRef } from 'react';
import { Parallax, ParallaxLayer, IParallax } from '@react-spring/parallax';

import PlanetImage from './PlanetImage';
import PlanetHeader from './PlanetHeader';
import PlanetDescription from './PlanetDescription';
import PlanetPhysicalProperties from './PlanetPhysicalProperties';

import { useLayoutNavigationController } from '@/hooks/useLayoutNavigationController';
import { IPlanet } from '@/types/planet';

const PlanetDetail = ({ planet, isModal }: { planet: IPlanet; isModal: boolean }) => {
  const { shouldCloseModal, close } = useLayoutNavigationController();
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const parallax = useRef<IParallax>(null!);
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
    <Parallax ref={parallax} pages={2} className='relative z-20 remove-scrollbar '>
      <ParallaxLayer
        sticky={{ start: 0, end: 0 }}
        factor={1}
        offset={0}
        speed={0}
        className='sticky inset-0 flex justify-center items-center z-10 pointer-events-auto'
      >
        <PlanetImage planet={planet} mouseOffset={mouseOffset} isModal={isModal} />
      </ParallaxLayer>

      {/* 🔹 Інші деталі з’являються поступово при скролі */}
      <ParallaxLayer
        sticky={{ start: 0.5, end: 1.5 }}
        offset={1.5}
        speed={0.8}
        className=' z-30 w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-b from-transparent via-[#1f0049]/90 to-transparent pointer-events-none'
      >
        <PlanetHeader name={planet.name} shouldClose={shouldCloseModal} onClose={close} />
        <main className='relative z-50 flex flex-col gap-4 justify-between items-center px-3'>
          <PlanetDescription description={planet.description} />
          <PlanetPhysicalProperties physicalProperties={planet.physicalProperties} />
        </main>
      </ParallaxLayer>
    </Parallax>
  );
};

export default PlanetDetail;
