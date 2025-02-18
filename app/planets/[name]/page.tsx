import { notFound } from 'next/navigation';

import planetsData from '@/data/planets.json';
import PlanetDetail from '@/components/planet/PlanetDetail';
import { IPlanet } from '@/types/planet';

const Page = async ({ params }: { params: Promise<{ name: string }> }) => {
  const { name } = await params;
  const planets = planetsData.planets as IPlanet[];
  const planet = planets.find((planet) => planet.name.toLowerCase() === name.toLowerCase());
  if (!planet) {
    notFound();
  }

  return (
    <div className='mx-auto remove-scrollbar'>
      <PlanetDetail planet={planet} isModal />
    </div>
  );
};

export default Page;
