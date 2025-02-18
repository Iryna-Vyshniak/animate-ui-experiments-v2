'use client';

import { useRouter } from 'next/navigation';
import { useShallow } from 'zustand/react/shallow';

import { LayoutNavigationState, useLayoutNavigationStore } from '@/store/layoutNavigationStore';
import { NAVIGATION_DURATION } from '@/constants/navigation';

export const useLayoutNavigationController = () => {
  const router = useRouter();
  const { isOpenModal, setIsOpenModal, setShouldCloseModal, shouldCloseModal, setFollowedPlanet } =
    useLayoutNavigationStore(
      useShallow((state: LayoutNavigationState) => ({
        isOpenModal: state.isOpenModal,
        setIsOpenModal: state.setIsOpenModal,
        setShouldCloseModal: state.setShouldCloseModal,
        shouldCloseModal: state.shouldCloseModal,
        setFollowedPlanet: state.setFollowedPlanet,
      }))
    );

  const push = (name: string) => {
    router.push(`/planets/${name}`);
  };

  const open = () => {
    setIsOpenModal(true);
    setShouldCloseModal(true);
  };

  const close = () => {
    if (shouldCloseModal) {
      setIsOpenModal(false);
      setFollowedPlanet(null);
      setTimeout(() => {
        router.back();
      }, NAVIGATION_DURATION);
    }
  };

  return { isOpenModal, open, close, push, setIsOpenModal, shouldCloseModal };
};
