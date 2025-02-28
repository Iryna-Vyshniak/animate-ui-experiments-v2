import { notFound } from 'next/navigation';
import planetsData from '@/data/planets.json';
import Modal from './modal';
import { IPlanet } from '@/types/planet';

const Page = async ({ params }: { params: Promise<{ name: string }> }) => {
  const { name } = await params;
  const planets = planetsData.planets as IPlanet[];
  const planet = planets.find((planet) => planet.name.toLowerCase() === name.toLowerCase());
  if (!planet) {
    notFound();
  }

  return <Modal planet={planet} />;
};

export default Page;
