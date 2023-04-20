import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Layout from "@/components/Layout/Layout";
import { Toaster } from "react-hot-toast";
import "nprogress/nprogress.css";
import nProgress from "nprogress";
import Router from "next/router";
import dynamic from "next/dynamic";
import Entrance from "@/components/Loader/Main";
import { useEffect, useState } from "react";
Router.events.on("routeChangeStart", () => nProgress.start());
Router.events.on("routeChangeComplete", () => nProgress.done());
Router.events.on("routeChangeError", () => nProgress.done());
const Menu = dynamic(() => import("@/components/Modal/Menu"));
const Report = dynamic(() => import("@/components/Modal/Report"));
const PostPreview = dynamic(() => import("@/components/Modal/PostPreview"));
const PostComment = dynamic(() => import("@/components/Modal/PostComment"));

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: any) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 4000);
  }, []);
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
      <div className={`w-full h-screen loader fixed left-0 top-0 z-[99999999]  select-none !overflow-x-hidden !overflow-y-hidden  bg-white shadow-sm ${mounted ? 'animate-fadeOut hidden' : 'block'} `}>
          <Entrance />
        </div>
    </SessionProvider>
  );
}
