import Head from 'next/head';
import { getPosts } from '@/helper/getPosts';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
const ExplorePostCard = dynamic(() => import('@/components/Card/Feeds'), {
	ssr: true,
});

export default function Explore({ posts }: { posts: any }) {
	const { loading, newData } = useIntersectionObserver(posts);

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
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 place-items-center'>
				{posts.map((post: any, i: number) => (
						<ExplorePostCard
							post={post}
							key={post.postId}
							id={i === posts.length - 1 ? 'last' : undefined}
						/>
					))}
					{loading && <p className='text-center w-full'>Loading...</p>}
					{newData.map((post: any) => (
						<ExplorePostCard
							post={post}
							key={post.postId}
							id={undefined}
						/>
					))}
				</div>
			</div>
		</>
	);
}
export async function getServerSideProps({ res }: any) {
	const posts = await getPosts();
	res.setHeader(
		'Cache-Control',
		'public, s-maxage=60, stale-while-revalidate=59'
	);
	return {
		props: {
			posts,
		},
	};
}
