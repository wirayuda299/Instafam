import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import "nprogress/nprogress.css";
import nProgress from "nprogress";
import Router from "next/router";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
nProgress.configure({ showSpinner: false, trickle: false, easing: "ease" });
Router.events.on("routeChangeStart", () => nProgress.start());
Router.events.on("routeChangeComplete", () => nProgress.done());
Router.events.on("routeChangeError", () => nProgress.done());
const Menu = dynamic(() => import("@/components/Modal/Menu"));
const Report = dynamic(() => import("@/components/Modal/Report"));
const PostPreview = dynamic(() => import("@/components/Modal/PostPreview"));
const PostComment = dynamic(() => import("@/components/Modal/PostComment"));
const Entrance = dynamic(() => import("@/components/Loader/Main"));
const Layout = dynamic(() => import("@/components/Layout/Layout"));

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: any) {

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 1000);
    return () => setMounted(false);
  }, []);

  const MainLoader = useMemo(() => {
    return (
      <div className={`w-full h-screen fixed left-0 top-0 z-[99] !overflow-x-hidden !overflow-y-hidden bg-white shadow-sm ${mounted ? 'hidden' : 'block'} `}>
        <Entrance />
      </div>
    );
  }, [mounted]);
  return (
    <SessionProvider session={session}>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
        <Menu />
        <Report />
        <PostComment />
        <PostPreview />
      </Layout>
      {MainLoader}
    </SessionProvider>
  );
}
