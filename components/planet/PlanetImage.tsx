'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useSpring, animated } from '@react-spring/web';

import { IPlanet } from '@/types/planet';
import Download from '@/public/icons/download.svg';

import Planet3D from './Planet3D';

type PlanetImageProps = {
  planet: IPlanet;
  mouseOffset: { x: number; y: number };
  isModal?: boolean;
};

const PlanetImage = ({ planet, mouseOffset, isModal }: PlanetImageProps) => {
  const [isView, setIsView] = useState<boolean>(false);

  const handleView = () => setIsView(!isView);

  const imageSpring = useSpring({
    transform: `scale(1.05) translate(${-mouseOffset.x}px, ${-mouseOffset.y}px)`,
    config: { mass: 1, tension: 350, friction: 20 },
  });

  const fadeIn = useSpring({
    opacity: isView ? 0 : 1,
    scale: isView ? 0.8 : 1,
    config: { mass: 2, tension: 150, friction: 25 },
  });

  return (
    <>
      <a
        href={planet.imageUrl}
        download
        className='absolute z-[60] top-4 right-8 p-2 bg-gradient-to-br from-slate-500/20 to-zinc-300/30 rounded-full shadow-sm hover:shadow-lg backdrop-blur cursor-crosshair active:scale-95 transition-all'
      >
        <Image src={Download} alt='download icon' />
      </a>{' '}
      <figure
        className={`flex items-center justify-center w-full   ${
          !isView ? 'relative' : 'fixed inset-0 z-[70]'
        }`}
      >
        {!isView ? (
          <animated.div style={fadeIn} className='relative flex items-center justify-center p-8'>
            <animated.div style={imageSpring}>
              <Image
                src={planet.imageUrl}
                alt={`Image of ${planet.name}`}
                width={500}
                height={500}
                className='scale-[1.05] cursor-pointer '
                onClick={handleView}
              />
            </animated.div>
          </animated.div>
        ) : (
          <Planet3D planet={planet} onView={handleView} isModal={isModal} />
        )}
      </figure>
    </>
  );
};

export default PlanetImage;
