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
type DarkMode = {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
};
export const useDarkModeStore = create<DarkMode>((set) => ({
  darkMode: false,
  setDarkMode: (darkMode: boolean) => set({ darkMode }),
}));

type postPreviewModalStore = {
  postPreviewModal: boolean;
  setPostPreviewModal: (postPreviewModal: boolean) => void;
};
type feedModalStore = {
  feedModal: boolean;
  setFeedModal: (feedModal: boolean) => void;
};

type postModalStore = {
  postModal: boolean;
  setPostModal: (postModal: boolean) => void;
};

export const usePostModalStore = create<postModalStore>((set) => ({
  postModal: false,
  setPostModal: (postModal: boolean) => set({ postModal }),
}));
export const useFeedModalStore = create<feedModalStore>((set) => ({
  feedModal: false,
  setFeedModal: (feedModal: boolean) => set({ feedModal }),
}));
type postCommentModalStore = {
  postCommentModal: boolean;
  setPostCommentModal: (postCommentModal: boolean) => void;
};

type postCreateModalStore = {
  postCreateModal: boolean;
  setPostCreateModal: (postCreateModal: boolean) => void;
}
export const usePostCreateModalStore = create<postCreateModalStore>((set) => ({ 
  postCreateModal: false,
  setPostCreateModal: (postCreateModal: boolean) => set({ postCreateModal }),
}));

type postImageModalStore = {
  postImageModal: string;
  setPostImageModal: (postImageModal: string) => void;
}

type croppedImgStore = {
  croppedImg: string;
  setCroppedImg: (croppedImg: string) => void;
}
type messageModalStore = {
  messageModal: boolean;
  setMessageModal: (messageModal: boolean) => void;
}

type resultDrawerStore = {
  resultDrawer: boolean;
  setResultDrawer: (resultDrawer: boolean) => void;
}

export const useResultDrawerStore = create<resultDrawerStore>((set) => ({
  resultDrawer: false,
  setResultDrawer: (resultDrawer: boolean) => set({ resultDrawer }),
}));
export const useMessageModalStore = create<messageModalStore>((set) => ({
  messageModal: false,
  setMessageModal: (messageModal: boolean) => set({ messageModal }),
}));

export const useCroppedImgStore = create<croppedImgStore>((set) => ({
  croppedImg: '',
  setCroppedImg: (croppedImg: string) => set({ croppedImg }),
}));
export const usePostImageModalStore = create<postImageModalStore>((set) => ({
  postImageModal: '',
  setPostImageModal: (postImageModal: string) => set({ postImageModal }),
}));

export const usePostCommentModalStore = create<postCommentModalStore>(
  (set) => ({
    postCommentModal: false,
    setPostCommentModal: (postCommentModal: boolean) =>
      set({ postCommentModal }),
  })
);
export const usePostPreviewModalStore = create<postPreviewModalStore>(
  (set) => ({
    postPreviewModal: false,
    setPostPreviewModal: (postPreviewModal: boolean) =>
      set({ postPreviewModal }),
  })
);

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
