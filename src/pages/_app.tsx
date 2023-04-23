import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import dynamic from "next/dynamic";
import NextNProgress from "nextjs-progressbar";
const Menu = dynamic(() => import("@/components/Modal/Menu"));
const Report = dynamic(() => import("@/components/Modal/Report"));
const PostPreview = dynamic(() => import("@/components/Modal/PostPreview"));
const PostComment = dynamic(() => import("@/components/Modal/Drawer"));
const Layout = dynamic(() => import("@/components/Layout/Layout"));

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: any) {

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
            trickle: true,
            trickleSpeed: 100,
            minimum: 0.3,
            easing: "ease-out",

          }}
        />
        <Component {...pageProps} />
        <Menu />
        <Report />
        <PostComment />
        <PostPreview />
      </Layout>
    </SessionProvider>
  );
}
