import { create } from "zustand";

interface LayoutNavigationState {
    isOpenModal: boolean;
    shouldCloseModal: boolean;
    setIsOpenModal: (isOpen: boolean) => void;
    setShouldCloseModal: (shouldClose: boolean) => void;
}

export const useLayoutNavigationStore = create<LayoutNavigationState>((set) => ({
    isOpenModal: false,
    shouldCloseModal: false,
    setIsOpenModal: (isOpenModal) => set({ isOpenModal }),
    setShouldCloseModal: (shouldCloseModal) => set({ shouldCloseModal }),
}));
