import dynamic from "next/dynamic";
import { type ReactNode } from "react";

import useWindowResize from "@/hooks/useWindowResize";
import { useModalContext } from "@/stores/Modal/ModalStatesContext";
import { useStateContext } from "@/stores/Global/StateContext";
import { useDrawerContext } from "@/stores/Drawer/DrawerStates";
import useTheme from "@/hooks/useTheme";
const AllUsers = dynamic(
  () => import("@/components/Modal/Users/Recommendations")
);
const Menu = dynamic(() => import("@/components/Modal/Menu"));
const ReportPost = dynamic(
  () => import("@/components/Modal/Report/ReportPost")
);
const PostPreview = dynamic(() => import("@/components/Modal/PostPreview"));
const PostComment = dynamic(() => import("@/components/Modal/Drawer/Comments"));
const SearchForm = dynamic(() => import("@/components/Modal/Drawer/Search"));
const Sidebar = dynamic(() => import("../Navigation/Sidebar"), {
  ssr: true,
});
const Report = dynamic(() => import("@/components/Modal/Report/Report"));
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
  const { Dispatch } = useStateContext();
  const { modalDispatch } = useModalContext();
  const { drawerDispatch } = useDrawerContext();
  const { theme, setTheme} =useTheme()

  useWindowResize(Dispatch, modalDispatch, drawerDispatch);

  return (
    <div className="h-screen w-full bg-white text-black dark:bg-black dark:text-white">
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
      <ReportPost />
      <PostPreview />
      <PostComment />
      <NotificationsModal />
      <FeedModal />
      <PostModal />
      <MessagesModal />
      <ImageCropperModal />
      <AllUsers />
      <Report />
    </div>
  );
}
