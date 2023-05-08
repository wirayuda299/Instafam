import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import dynamic from "next/dynamic";
import NextNProgress from "nextjs-progressbar";
import { StateProvider } from "@/stores/StateContext";
import Head from "next/head";
import type { AppProps } from "next/app";
import type { Session } from "next-auth";
import type { ComponentType } from "react";

const Layout = dynamic(() => import("@/components/Layout/Layout"));
type ComponentWithPageLayout = AppProps & {
  Component: AppProps["Component"] & {
    PageLayout?: ComponentType;
    session: Session | null;
  };
};
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: ComponentWithPageLayout) {
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
      <SessionProvider session={session}>
        <StateProvider>
          <Layout>
            <Toaster />
            <NextNProgress
              color="#e23e44"
              startPosition={0.3}
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
          </Layout>
        </StateProvider>
      </SessionProvider>
    </>
  );
}
