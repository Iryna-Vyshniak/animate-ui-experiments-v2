import { useRouter } from 'next/navigation';

import { useLayoutNavigationStore } from '@/store/layoutNavigationStore';
import { NAVIGATION_DURATION } from '@/constants/navigation';

export const useLayoutNavigationController = () => {
  const router = useRouter();
  const { isOpenModal, setIsOpenModal, setShouldCloseModal, shouldCloseModal } =
    useLayoutNavigationStore();

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
      setTimeout(() => {
        router.back();
      }, NAVIGATION_DURATION);
    }
  };

  return { isOpenModal, open, close, push, setIsOpenModal, shouldCloseModal };
};
