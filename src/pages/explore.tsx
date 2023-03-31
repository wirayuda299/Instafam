import dynamic from 'next/dynamic';
import Head from 'next/head';
import usePosts from '@/hooks/usePosts';

const ExplorePostCard = dynamic(() => import('@/components/Card/Feeds'));
const Footer = dynamic(() => import('@/components/Footer'));

export default function Explore() {
	const { data, isLoading, isValidating, hasMore, loadMore } = usePosts();
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
					<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-5 gap-5'>
							{data?.map((post) => (
								<ExplorePostCard key={post.docId} post={post} />
							))}
							{isValidating ? (
								<h1>Loading...</h1>
							) : (
								<h1 className='text-black dark:text-white'>Loading...</h1>
							)}
					</div>
					<div className='w-full flex justify-center flex-col items-center'>
						{hasMore ? (
							<button
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
