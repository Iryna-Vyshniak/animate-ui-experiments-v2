'use client';

import { motion } from 'framer-motion';
import { useLayoutNavigationController } from '@/hooks/useLayoutNavigationController';
import { IPlanet } from '@/types/planet';
import Planet3D from '../planet/Planet3D';

type CelestialBodyProps = {
  planet: IPlanet;
};

const CelestialBody = ({ planet }: CelestialBodyProps) => {
  const { push } = useLayoutNavigationController();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      push(planet.name);
    }
  };

  return (
    <motion.article
      layoutId={`planet-${planet.name}`}
      className='cursor-pointer w-full h-full'
      onClick={() => push(planet.name)}
      tabIndex={0}
      role='button'
      aria-label={`View details for ${planet.name}`}
      onKeyDown={handleKeyDown}
    >
      <motion.div
        layoutId={`planet-image-${planet.name}`}
        transition={{ type: 'spring' }}
        className='p-4 relative overflow-hidden group flex items-center justify-center'
      >
        <Planet3D planet={planet} />
        <motion.div className='absolute bottom-0 inset-0 bg-gradient-to-b from-transparent to-black opacity-0 group-hover:opacity-100 transition-all duration-350 flex justify-center rounded-full p-4'>
          <motion.h2
            layoutId={`planet-title-${planet.name}`}
            className='opacity-0 group-hover:opacity-100 text-xl font-bold absolute bottom-3 group-hover:text-4xl transition-all duration-350 delay-100'
          >
            {planet.name}
          </motion.h2>
        </motion.div>
      </motion.div>
    </motion.article>
  );
};

export default CelestialBody;
