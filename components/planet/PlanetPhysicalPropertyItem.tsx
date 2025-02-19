type PhysicalPropertyItemProps = {
  title: string;
  value: string | number;
};

const PlanetPhysicalPropertyItem = ({ title, value }: PhysicalPropertyItemProps) => {
  return (
    <div className='border border-foreground/5 rounded-md p-2 min-h-[4rem] w-48 bg-slate-500/10 backdrop-blur-md'>
      <div className='flex flex-col gap-2'>
        <h3 className='font-space-mono text-sm font-bold flex-auto'>{title}</h3>
        <p className='font-inter text-sm text-foreground/70'>{value}</p>
      </div>
    </div>
  );
};

export default PlanetPhysicalPropertyItem;
