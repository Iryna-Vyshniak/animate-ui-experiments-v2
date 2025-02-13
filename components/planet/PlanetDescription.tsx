type PlanetDescriptionProps = {
  description: string;
};

const PlanetDescription = ({ description }: PlanetDescriptionProps) => (
  <section className='w-full md:w-2/3 mb-12' aria-label='Planet description'>
    <p className='font-inter text-foreground z-10 text-balance'>{description}</p>
  </section>
);

export default PlanetDescription;
