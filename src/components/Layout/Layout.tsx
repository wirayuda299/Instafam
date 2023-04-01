import Head from 'next/head';
import Header from '../Header/Header';
import Sidebar from '@/components/Navigation/Sidebar';
import BottomNav from '../Navigation/BottomNav';
import Search from '../Search';
export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Head>
				<title>Instafam - Connect with people around the world</title>
				<meta
					name='description'
					content='Instafam is social media web app that let you connect with people around the world'
				/>
				<meta
					name='keywords'
					content='social media, instafam, nextjs, tailwindcss, reactjs, firebase'
				/>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<div className='bg-white h-full w-full dark:bg-black transition-all'>
				<div className='flex h-full w-full'>
					<section className='hidden md:block'>
						<Sidebar />
					</section>
					<Search />
					<main className='w-full h-full'>
						<Header />
						{children}
						<section className='block md:hidden'>
							<BottomNav />
						</section>
					</main>
				</div>
			</div>
		</>
	);
}
