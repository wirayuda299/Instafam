import dynamic from 'next/dynamic';
import Head from 'next/head';
import usePosts, { fetcher } from '@/hooks/usePosts';
import Loader from '@/components/Loader/Loader';
import { SWRConfig, preload } from 'swr';
import { Suspense } from 'react';
const ExplorePostCard = dynamic(() => import('@/components/Card/Feeds'));
const Footer = dynamic(() => import('@/components/Footer'), {
	ssr: false,
	loading: () => <Loader />,
});

export default function Explore({ fallback }: { fallback: any }) {
	const { data, hasMore, loadMore } = usePosts();
	return (
		<>
			<Head>
				<title>Explore popular posts | Instafam</title>
				<link rel='icon' href='/favicon.ico' />
				<meta
					name='description'
					content='Explore new posts and discover new accounts on Instafam.'
				/>
				<meta property='og:title' content='Explore popular posts | Instafam' />
				<meta
					property='og:description'
					content='Explore new posts and discover new accounts on Instafam.'
				/>
				<meta property='og:type' content='website' />
				<meta property='og:url' content='https://instafam.vercel.app/explore' />

				<meta name='twitter:card' content='summary_large_image' />
				<meta name='twitter:title' content='Explore | Instafam' />
				<meta
					name='twitter:description'
					content='Explore new posts and discover new accounts on Instafam.'
				/>
			</Head>
			<div className='text-black dark:text-white p-5 w-full h-screen overflow-y-auto'>
				<div>
					<h1 className='text-center font-semibold text-5xl py-5'>Explore</h1>
				</div>
				<div className='container mx-auto'>
					<div className=' grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3'>
						<SWRConfig value={{ fallback }}>
							{data?.map((post, i) => (
								<Suspense fallback={<Loader />} key={post.docId}>
									<ExplorePostCard post={post} />
								</Suspense>
							))}
						</SWRConfig>
					</div>
					<div className=' flex justify-center flex-col items-center'>
						{hasMore ? (
							<button
								type='button'
								name='loadMore'
								title='Load More'
								onMouseEnter={() => preload('userPosts', fetcher)}
								onClick={loadMore}
								className=' text-black dark:text-white p-2 rounded-md text-xl font-semibold'
							>
								Load More
							</button>
						) : (
							<h1 className='text-black dark:text-white text-center'>
								No more posts
							</h1>
						)}
					</div>
					<Footer />
				</div>
			</div>
		</>
	);
}
export async function getStaticProps() {
	const postsQuery = await fetcher()
	return {
		props: {
			fallback: {
				'/api/posts': postsQuery,
			},
		},
	};
}
