import dynamic from "next/dynamic";
import Head from "next/head";
const SearchForm = dynamic(() => import("@/components/Search"), {
  ssr: false,
});
const Sidebar = dynamic(() => import("../Navigation/Sidebar"), {
  ssr: false,
});
const MainHeader = dynamic(() => import("../Header/MainHeader"), {
  ssr: false,
 
});
const Menu = dynamic(() => import("@/components/Modal/Menu"), {
  ssr: false,
});
const Report = dynamic(() => import("@/components/Modal/Report"), {
  ssr: false,
});

export default function Layout({ children }: { children: any }) {

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
        <Menu />
        <Report />
      </div>
    </>
  );
}
