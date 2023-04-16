import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";
import Layout from "@/components/Layout/Layout";
import React from "react";
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
      <RecoilRoot>
        <Layout>
          <Toaster />
          <Component {...pageProps} />
        </Layout>
      </RecoilRoot>
    </SessionProvider>
  );
}
