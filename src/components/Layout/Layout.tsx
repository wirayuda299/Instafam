import dynamic from "next/dynamic";
import Head from "next/head";
const MainHeader = dynamic(() => import("@/components/Header/MainHeader"));
const Sidebar = dynamic(() => import("@/components/Navigation/Sidebar"));
const SearchForm = dynamic(() => import("@/components/Search"));
import {Lato} from 'next/font/google'

const lato = Lato({
  fallback: ['sans-serif'],
  subsets: ['latin'],
  preload: true,
  weight: '300',

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
          content="social media, instafam, nextjs, tailwindcss, reactjs, firebase, typescript, next-auth,  
         "
        />
        <meta
          name="viewport"
          content="width=device-width, minimum-scale=1.0, maximum-scale = 1.0, user-scalable = no, initial-scale=1.0, "
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`mx-auto h-screen max-w-[1600px] !select-none  bg-white dark:bg-black ${lato.className}`}>
        <div className='flex'>
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
