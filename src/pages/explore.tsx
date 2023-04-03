import dynamic from 'next/dynamic';
import Head from 'next/head';
import { fetcher } from '@/hooks/usePosts';
import { SWRConfig } from 'swr';
const ExploreFeeds = dynamic(() => import('@/components/Explore'), {
	ssr: false,
});

export default function Explore({ fallback }: { fallback: any }) {
	return (
		<>
			<Head>
				<title>Explore popular posts &#8226; Instafam</title>
				<meta
					name='description'
					content='Explore new posts and discover new accounts on Instafam.'
				/>
			</Head>
			<div className='text-black dark:text-white p-5 w-full h-screen overflow-y-auto'>
				<div>
					<h1 className='text-center font-semibold text-5xl py-5'>Explore</h1>
				</div>
				<SWRConfig value={{ fallback }}>
					<ExploreFeeds />
				</SWRConfig>
			</div>
		</>
	);
}
export async function getStaticProps() {
	const posts = await fetcher();
	return {
		props: {
			fallback: {
				'/posts': posts,
			},
		},
	};
}
