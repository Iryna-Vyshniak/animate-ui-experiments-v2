'use client';

import { IPlanet } from '@/types/planet';
import CelestialBody from './CelestialBody';

const GalacticView = ({ planets }: { planets: IPlanet[] }) => {
  return (
    <ul
      className='mx-auto max-w-5xl grid gap-3 grid-cols-1 md:grid-cols-2 py-4 px-2'
      aria-label='Planets Gallery'
    >
      {planets.map((planet) => (
        <li key={planet.name} className='p-4 rounded-full w-full'>
          <CelestialBody planet={planet} />
        </li>
      ))}
    </ul>
  );
};

export default GalacticView;
