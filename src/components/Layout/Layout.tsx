import { ReactNode, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useMenuModalStore, useReportModalStore } from "@/stores/stores";
import { useStore } from "zustand";
import { createPortal } from "react-dom";
import { useSession } from "next-auth/react";
import useUser from "@/hooks/useUser";

const SearchForm = dynamic(() => import("@/components/Search"));
const Menu = dynamic(() => import("../Modal/Menu"));
const ReportModal = dynamic(() => import("../Modal/Report"));
const Sidebar = dynamic(() => import("../Navigation/Sidebar"));
const MainHeader = dynamic(() => import("../Header/MainHeader"));

export default function Layout({ children }: { children: ReactNode }) {
  const { menuModal } = useStore(useMenuModalStore);
  const { reportModal } = useStore(useReportModalStore);
  const [mounted, setMounted] = useState(false);
  const { data: session } = useSession();
  const { user } = useUser(session?.user?.uid as string)
  const portalRef = useRef<Element | null>(null);

  useEffect(() => {
    portalRef.current = document.getElementById("modal-root");
    setMounted(true);
  }, [])

  return (
    <>
      <Head>
        <title>Instafam &#8226; Connect with people around the world</title>
        <meta
          name="description"
          content="Instafam is social media web app that let you connect with people around the world"
        />
        <meta name="robots" content="/public/robots.txt" />
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
      <div className="mx-auto h-screen max-w-screen-3xl !select-none  bg-white dark:bg-black">
        <div className="flex">
          <Sidebar />
          <SearchForm />
          <main className="h-full w-full overflow-y-auto transition-width">
            <MainHeader />
            {children}
          </main>
        </div>
        {mounted && portalRef.current && createPortal(
          <Menu menuModal={menuModal} session={session} user={user} />, portalRef.current
        )}
        {reportModal && mounted && portalRef.current ? createPortal(
          <ReportModal session={session} />, portalRef.current
        ) : null}
      </div>
    </>
  );
}
