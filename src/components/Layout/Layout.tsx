import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
const MainHeader = dynamic(() => import('@/components/Header/Header'));
const Sidebar = dynamic(() => import('@/components/Navigation/Sidebar'));
const SearchForm = dynamic(() => import('@/components/Search'));

export default function Layout({ children }: { children: any }) {
	return (
		<>
			<Head>
				<title>Instafam &#8226; Connect with people around the world</title>
				<meta
					name='description'
					content='Instafam is social media web app that let you connect with people around the world'
				/>
				<meta name='robots' content='/public/robots.txt' />
				<meta
					name='keywords'
					content='social media, instafam, nextjs, tailwindcss, reactjs, firebase'
				/>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<div className='bg-white h-screen !select-none dark:bg-black  max-w-[1600px] mx-auto '>
				<Auth>
					<div className='flex'>
						<Sidebar />
						<SearchForm />
						<main className='w-full h-full transition-width overflow-y-auto'>
							<MainHeader />
							{children}
						</main>
					</div>
				</Auth>
			</div>
		</>
	);
}

export function Auth({ children }: { children: any }) {
	const { data: session } = useSession();
	const router = useRouter();
	useEffect(() => {
		if (!session) router.push('/auth/signin');
	}, []);

	return children;
}
