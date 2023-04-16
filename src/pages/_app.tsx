import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Layout from "@/components/Layout/Layout";
import { Toaster } from "react-hot-toast";
import "nprogress/nprogress.css";
import nProgress from "nprogress";
import Router from "next/router";

Router.events.on("routeChangeStart", () => nProgress.start());
Router.events.on("routeChangeComplete", () => nProgress.done());
Router.events.on("routeChangeError", () => nProgress.done());

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: any) {
  return (
    <SessionProvider session={session}>
        <Layout>
          <Toaster />
          <Component {...pageProps} />
        </Layout>
    </SessionProvider>
  );
}
