import dynamic from 'next/dynamic';
import Head from 'next/head';
import usePosts, { fetcher } from '@/hooks/usePosts';
import Loader from '@/components/Loader/Loader';
import { SWRConfig } from 'swr';
const ExplorePostCard = dynamic(() => import('@/components/Card/Feeds'));
const Footer = dynamic(() => import('@/components/Footer'), {
	loading: () => <Loader />,
});

export default function Explore({ fallback }: { fallback: any }) {
	const { data, hasMore, loadMore } = usePosts();
	return (
		<>
			<Head>
				<title>Explore popular posts  &#8226; Instafam</title>
				<meta
					name='description'
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
							{data?.map((post) => (
								<ExplorePostCard post={post} key={post.postId} />
							))}
						</SWRConfig>
					</div>
					<div className=' flex justify-center flex-col items-center'>
						{hasMore ? (
							<button
								type='button'
								name='loadMore'
								title='Load More'
								onClick={loadMore}
								className=' text-black dark:text-white p-2 rounded-md text-xl font-semibold'
							>
								Load More
							</button>
						) : (
							<span className='text-black dark:text-white text-center'>
								No more posts
							</span>
						)}
					</div>
					<Footer />
				</div>
			</div>
		</>
	);
}
export async function getStaticProps() {
	const postsQuery = await fetcher();
	return {
		props: {
			fallback: {
				'/posts': postsQuery,
			},
		},
	};
}
