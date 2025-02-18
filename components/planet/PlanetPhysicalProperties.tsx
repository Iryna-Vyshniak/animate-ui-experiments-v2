import { IPlanet } from '@/types/planet';
import PlanetPhysicalPropertyItem from './PlanetPhysicalPropertyItem';

type PlanetPhysicalPropertiesProps = {
  physicalProperties: IPlanet['physicalProperties'];
};

const PlanetPhysicalProperties = ({ physicalProperties }: PlanetPhysicalPropertiesProps) => (
  <section
    className='w-full md:w-1/3 flex flex-col gap-2 items-center md:items-end md:justify-center'
    aria-label='Physical properties'
  >
    <ul className='grid grid-cols-2 sm:grid-cols-3 gap-2 auto-rows-[1fr]'>
      {physicalProperties.map((property, index) => (
        <li key={index} className='flex '>
          <PlanetPhysicalPropertyItem title={property.label} value={property.value} />
        </li>
      ))}
    </ul>
  </section>
);

export default PlanetPhysicalProperties;
