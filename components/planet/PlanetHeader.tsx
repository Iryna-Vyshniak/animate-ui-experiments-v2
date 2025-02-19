type PlanetHeaderProps = {
  name: string;
  shouldClose: boolean;
  onClose: () => void;
};

const PlanetHeader = ({ name, shouldClose, onClose }: PlanetHeaderProps) => (
  <header className='flex w-full  md:w-2/3 justify-between gap-4 items-center p-4'>
    <h2 className='font-space-mono text-6xl font-bold drop-shadow-[0px_10px_5px_rgba(8,0,36,1)]'>
      {name}
    </h2>
    {shouldClose && (
      <button
        className='relative z-[80] rounded bg-white/10 px-2 py-1 font-semibold text-white shadow-sm hover:bg-white/20 font-inter cursor-pointer pointer-events-auto'
        onClick={onClose}
        aria-label='Close planet details'
      >
        Close
      </button>
    )}
  </header>
);

export default PlanetHeader;
