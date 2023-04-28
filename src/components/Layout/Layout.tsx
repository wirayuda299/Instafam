import { useDarkModeStore } from "@/stores/stores";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useStore } from "zustand";
const Menu = dynamic(() => import("@/components/Modal/Menu"));
const Report = dynamic(() => import("@/components/Modal/Report"));
const PostPreview = dynamic(() => import("@/components/Modal/PostPreview"));
const PostComment = dynamic(() => import("@/components/Modal/Drawer"));
const SearchForm = dynamic(() => import("@/components/Search"));
const Sidebar = dynamic(() => import("../Navigation/Sidebar"), {
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

export default function Layout({ children }: { children: any }) {
  const { darkMode } = useStore(useDarkModeStore);

  return (
    <>
      <Head>
        <title>Instafam &#8226; Connect with people around the world</title>
        <meta
          name="description"
          content="Instafam is social media web app that let you connect with people around the world"
        />
        <meta name="robots" content="/robots.txt" />
        <meta
          name="keywords"
          content="social media, instafam, nextjs, tailwindcss, reactjs, firebase, typescript, next-auth,  
         "
        />
        <meta
          name="viewport"
          content="width=device-width, minimum-scale=1.0, maximum-scale =1.0, user-scalable=no, initial-scale=1.0"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={`mx-auto h-screen max-w-screen-3xl !select-none  ${
          darkMode ? "!bg-black text-white" : "!bg-white text-black"
        } `}
      >
        <div className="flex">
          <Sidebar />
          <SearchForm />
          <main className="h-full w-full overflow-y-auto transition-width">
            <MainHeader />
            {children}
          </main>
        </div>
      </div>
      <Menu />
      <Report />
      <PostComment />
      <PostPreview />
      <ImageCropperModal />
      <MessagesModal />
    </>
  );
}
