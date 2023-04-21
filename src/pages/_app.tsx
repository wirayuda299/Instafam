import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import NextNProgress from "nextjs-progressbar";
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

  return (
    <SessionProvider session={session}>
      <Layout>
        <Toaster />
        <NextNProgress
          color="#e23e44"
          startPosition={0.3}
          stopDelayMs={200}
          height={3}
          options={{
            showSpinner: false,
          }}
        />
        <Component {...pageProps} />
        <Menu />
        <Report />
        <PostComment />
        <PostPreview />
      </Layout>
      <div
        className={`fixed left-0 top-0 z-[99] h-screen w-full !overflow-x-hidden !overflow-y-hidden bg-white shadow-sm ${
          mounted ? "hidden" : "block"
        } `}
      >
        <Entrance />
      </div>
    </SessionProvider>
  );
}
