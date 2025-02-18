'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';

import { IPlanet } from '@/types/planet';
import { useLayoutNavigationController } from '@/hooks/useLayoutNavigationController';
import { NAVIGATION_DURATION } from '@/constants/navigation';
import PlanetDetail from '@/components/planet/PlanetDetail';
import SceneSpaceBackground from '@/components/space/SceneSpaceBackground';

const duration = NAVIGATION_DURATION / 1000;
// Navigation_duration => 250 = example: 250 means that the duration of animation 250 milliseconds (MS). Division by 1000 converts it into seconds (0.25 sec).

const Modal = ({ planet }: { planet: IPlanet }) => {
  const { isOpenModal, open, setIsOpenModal } = useLayoutNavigationController();

  useEffect(() => {
    open();

    return () => {
      setIsOpenModal(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      {isOpenModal && (
        <div className='modal w-screen h-screen z-50 absolute inset-0'>
          <div className='absolute w-screen h-screen inset-0 -z-20'>
            <SceneSpaceBackground />
          </div>
          <motion.div className='mx-auto max-w-5xl' transition={{ duration }}>
            <PlanetDetail planet={planet} isModal />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
