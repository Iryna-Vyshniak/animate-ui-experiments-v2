import StarrySpace from '@/components/space/StarrySpace';
import ToggleAudio from '@/components/ToggleAudio';
import planetsData from '@/data/planets.json';

export default function Home() {
  const { planets } = planetsData;
  console.log('planets : ', planets);
  return (
    <div className='relative min-h-screen w-full overflow-hidden'>
      <div className='absolute inset-0 -z-10'>
        <StarrySpace />
        <div className='stars'></div>
      </div>

      <div className='grid place-items-center items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20'>
        <main className='relative flex flex-col gap-8 items-center sm:items-start'>
          <ToggleAudio />
        </main>
      </div>
    </div>
  );
}
