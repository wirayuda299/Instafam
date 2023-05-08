import useWindowResize from "@/hooks/useWindowResize";
import { useStateContext } from "@/stores/StateContext";
import { useDarkModeStore } from "@/stores/stores";
import dynamic from "next/dynamic";
import { type ReactNode, useEffect } from "react";
import { useStore } from "zustand";

const Menu = dynamic(() => import("@/components/Modal/Menu"));
const Report = dynamic(() => import("@/components/Modal/Report"));
const PostPreview = dynamic(() => import("@/components/Modal/PostPreview"));
const PostComment = dynamic(() => import("@/components/Modal/Drawer/Comments"));
const SearchForm = dynamic(() => import("@/components/Modal/Drawer/Search"));
const Sidebar = dynamic(() => import("../Navigation/Sidebar"), {
  ssr: true,
});
const NotificationsModal = dynamic(
  () => import("@/components/Modal/Notifications/Notifications"),
  {
    ssr: true,
  }
);
const NotificationsDrawer = dynamic(
  () => import("@/components/Modal/Drawer/Notifications/NotificationsDrawer"),
  {
    ssr: true,
  }
);
const FeedModal = dynamic(() => import("@/components/Modal/Feed"), {
  ssr: true,
});
const PostModal = dynamic(() => import("@/components/Modal/Post/Post"), {
  ssr: true,
});
const MainHeader = dynamic(() => import("../Header/MainHeader"), {
  ssr: true,
});
const MessagesModal = dynamic(() => import("../Modal/Messages/Messages"));
const ImageCropperModal = dynamic(
  () => import("@/components/Modal/Cropper/Cropper"),
  {
    ssr: false,
  }
);

export default function Layout({ children }: { children: ReactNode }) {
  const { darkMode, setDarkMode } = useStore(useDarkModeStore);
  const { Dispatch } = useStateContext();

  useWindowResize(Dispatch);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme !== null) {
      if (theme === "dark") {
        setDarkMode(true);
      } else {
        setDarkMode(false);
      }
    }
  }, [darkMode]);

  return (
    <div
      className={`h-screen w-full ${
        darkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex h-full">
        <Sidebar />
        <SearchForm />
        <NotificationsDrawer />
        <main className="h-screen w-full overflow-hidden">
          <MainHeader />
          {children}
        </main>
      </div>
      <Menu />
      <Report />
      <PostPreview />
      <PostComment />
      <NotificationsModal />
      <FeedModal />
      <PostModal />
      <MessagesModal />
      <ImageCropperModal />
    </div>
  );
}
