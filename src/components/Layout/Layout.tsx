import dynamic from "next/dynamic";
import Head from "next/head";
const MainHeader = dynamic(() => import("@/components/Header/MainHeader"));
const Sidebar = dynamic(() => import("@/components/Navigation/Sidebar"));
const SearchForm = dynamic(() => import("@/components/Search"));
import { Fira_Sans} from 'next/font/google'

const Fira =  Fira_Sans({
  subsets: ['latin'],
  preload: true,
  fallback: ['sans-serif'],
  adjustFontFallback: true,
  weight: '400',
  display: 'swap',
})

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
          content="social media, instafam, nextjs, tailwindcss, reactjs, firebase"
        />
        <meta
          name="viewport"
          content="width=device-width, minimum-scale=1.0, maximum-scale = 1.0, user-scalable = no"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mx-auto h-screen max-w-[1600px] !select-none  bg-white dark:bg-black ">
        <div className={`flex ${Fira.className}`}>
          <Sidebar />
          <SearchForm />
          <main className="h-full w-full overflow-y-auto transition-width">
            <MainHeader />
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
