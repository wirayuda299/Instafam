import Head from 'next/head';
import { IUserPostProps } from '@/types/post';
import dynamic from 'next/dynamic';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { getPosts } from '@/helper/getPosts';

const ExplorePostCard = dynamic(() => import('@/components/Card/Feeds'), {
	ssr: true,
});
const CardLoader = dynamic(() => import('@/components/Loader/Loader'), {
	ssr: true,
});

export default function Explore({
	posts,
	last,
}: {
	posts: IUserPostProps[];
	last: IUserPostProps;
}) {
	const { ref, postsState, loading } = useInfiniteScroll(last);
	return (
		<>
			<Head>
				<title>Explore popular posts &#8226; Instafam</title>
				<meta
					name='description'
					content='Explore new posts and discover new accounts on Instafam.'
				/>
			</Head>
			<div className='text-black dark:text-white w-full h-screen overflow-y-auto p-5'>
				<div>
					<h1 className='text-center font-semibold text-5xl py-5'>Explore</h1>
				</div>
				<div className='w-full columns-1 sm:columns-2 lg:columns-3 gap-10 '>
					{posts?.map((post: IUserPostProps) => (
						<ExplorePostCard post={post} key={post.postId} />
					))}
					<span ref={ref}></span>
					{loading && <CardLoader />}
					{postsState?.map((post) => (
						<ExplorePostCard post={post} key={post.postId} />
					))}
				</div>
			</div>
		</>
	);
}
export async function getServerSideProps({ res }: any) {
	const posts = await getPosts(8);
	const last = posts ? posts[posts.length - 1] : null;
	res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate');
	return {
		props: {
			posts,
			last,
		},
	};
}
