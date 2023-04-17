import { IUserPostProps } from "@/types/post";
import { IUser } from "@/types/user";
import { create } from "zustand";
type ExtraListStore = {
  extraList: boolean;
  setExtraList: (extraList: boolean) => void;
};
type DrawerStore = {
  drawer: boolean;
  setDrawer: (drawer: boolean) => void;
};
type ResultStore = {
  result: IUser[];
  setResult: (result: IUser[]) => void;
};
type MenuModalStore = {
  menuModal: boolean;
  setMenuModal: (menuModal: boolean) => void;
};
export const useMenuModalStore = create<MenuModalStore>((set) => ({
  menuModal: false,
  setMenuModal: (menuModal: boolean) => set({ menuModal }),
}));
type ReportModalStore = {
  reportModal: boolean;
  setReportModal: (reportModal: boolean) => void;
};
export const useReportModalStore = create<ReportModalStore>((set) => ({
  reportModal: false,
  setReportModal: (reportModal: boolean) => set({ reportModal }),
}));
type SelectedPostStore = {
  selectedPost: IUserPostProps | null;
  setSelectedPost: (selectedPost: IUserPostProps | null) => void;
};
export const useSelectedPostStore = create<SelectedPostStore>((set) => ({
  selectedPost: null,
  setSelectedPost: (selectedPost: IUserPostProps | null) =>
    set({ selectedPost }),
}));
export const useResultStore = create<ResultStore>((set) => ({
  result: [],
  setResult: (result: IUser[]) => set({ result }),
}));

export const useExtraListStore = create<ExtraListStore>((set) => ({
  extraList: false,
  setExtraList: (extraList: boolean) => set({ extraList }),
}));

export const useDrawerStore = create<DrawerStore>((set) => ({
  drawer: false,
  setDrawer: (drawer: boolean) => set({ drawer }),
}));
