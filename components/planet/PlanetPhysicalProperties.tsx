import { IPlanet } from '@/types/planet';
import PlanetPhysicalPropertyItem from './PlanetPhysicalPropertyItem';

type PlanetPhysicalPropertiesProps = {
  physicalProperties: IPlanet['physicalProperties'];
};

const PlanetPhysicalProperties = ({ physicalProperties }: PlanetPhysicalPropertiesProps) => (
  <section
    className='w-full md:w-1/3 flex flex-col gap-2 items-center md:items-end md:justify-center mt-16 md:mt-0'
    aria-label='Physical properties'
  >
    <ul className='grid grid-cols-2 gap-2 auto-rows-[1fr]'>
      <li className='flex'>
        <PlanetPhysicalPropertyItem title='Diameter (km)' value={physicalProperties.diameterKm} />
      </li>
      <li className='flex'>
        <PlanetPhysicalPropertyItem
          title='Gravity (m/s²)'
          value={physicalProperties.surfaceGravityMs2}
        />
      </li>
      <li className='flex'>
        <PlanetPhysicalPropertyItem
          title='Temperature (°C)'
          value={physicalProperties.avgTemperatureC}
        />
      </li>
      <li className='flex'>
        <PlanetPhysicalPropertyItem
          title='Orbital Period (days)'
          value={physicalProperties.orbitalPeriodDays}
        />
      </li>
    </ul>
  </section>
);

export default PlanetPhysicalProperties;
