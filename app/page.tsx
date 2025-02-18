import GalacticView from '@/components/galactic/GalacticView';
import SceneSpaceBackground from '@/components/space/SceneSpaceBackground';
import ToggleAudio from '@/components/ToggleAudio';
import planetsData from '@/data/planets.json';
import { IPlanet } from '@/types/planet';

export default function Home() {
  const planets: IPlanet[] = planetsData.planets as IPlanet[];
  return (
    <div className='relative min-h-screen w-screen overflow-hidden'>
      <div className='absolute inset-0 -z-10'>
        <SceneSpaceBackground />
      </div>
      <div className='grid place-items-center items-center justify-items-center min-h-screen gap-16'>
        <main className='relative flex flex-col gap-8 items-center sm:items-start'>
          <ToggleAudio />
          <GalacticView planets={planets} />
        </main>
      </div>
    </div>
  );
}
