import { create } from "zustand";

interface FilterState {
    filter: string;
    setFilter: (f: string) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
    filter: "",
    setFilter: (filter) => set({ filter }),
}));
