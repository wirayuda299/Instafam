import { create } from "zustand";

type DarkMode = {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
};
export const useDarkModeStore = create<DarkMode>((set) => ({
  darkMode: false,
  setDarkMode: (darkMode: boolean) => set({ darkMode }),
}));
