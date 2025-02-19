'use client';

import { useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';

import { IPlanet } from '@/types/planet';
import { useLayoutNavigationController } from '@/hooks/useLayoutNavigationController';

import PlanetDetail from '@/components/planet/PlanetDetail';
import SceneSpaceBackground from '@/components/space/SceneSpaceBackground';

const Modal = ({ planet }: { planet: IPlanet }) => {
  const { isOpenModal, open, setIsOpenModal } = useLayoutNavigationController();

  useEffect(() => {
    open();
    return () => {
      setIsOpenModal(false);
    };
  }, []);

  const modalSpring = useSpring({
    opacity: isOpenModal ? 1 : 0,
    scale: isOpenModal ? 1 : 0.8,
    config: { mass: 1, tension: 250, friction: 20 },
  });

  return (
    isOpenModal && (
      <animated.div style={modalSpring} className='modal w-screen h-screen z-50 absolute inset-0'>
        <div className='absolute w-screen h-screen inset-0 -z-20'>
          <SceneSpaceBackground />
        </div>
        <animated.div className='flex items-center justify-center p-4 h-screen'>
          <PlanetDetail planet={planet} isModal />
        </animated.div>
      </animated.div>
    )
  );
};

export default Modal;
