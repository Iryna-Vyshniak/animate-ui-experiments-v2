
import { create } from "zustand";
import { IPlanet } from "@/types/planet";

export interface LayoutNavigationState {
    isOpenModal: boolean;
    shouldCloseModal: boolean;
    hoveredPlanet: string | null;
    followedPlanet: IPlanet | null;

    setIsOpenModal: (isOpen: boolean) => void;
    setShouldCloseModal: (shouldClose: boolean) => void;
    setHoveredPlanet: (planetName: string | null) => void;
    setFollowedPlanet: (planet: IPlanet | null) => void;
}

export const useLayoutNavigationStore = create<LayoutNavigationState>((set) => ({
    isOpenModal: false,
    shouldCloseModal: false,
    hoveredPlanet: null,
    followedPlanet: null,
    setIsOpenModal: (isOpenModal) => set({ isOpenModal }),
    setShouldCloseModal: (shouldCloseModal) => set({ shouldCloseModal }),
    setHoveredPlanet: (planetName) => set({ hoveredPlanet: planetName }),
    setFollowedPlanet: (planet) => set({ followedPlanet: planet }),
}));
