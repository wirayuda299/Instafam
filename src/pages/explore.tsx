import Head from 'next/head';
import { getPosts } from '@/helper/getPosts';
import { IUserPostProps } from '@/types/post';
import dynamic from 'next/dynamic';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';

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
			<div className='text-black dark:text-white p-5 w-full h-screen overflow-y-auto'>
				<div>
					<h1 className='text-center font-semibold text-5xl py-5'>Explore</h1>
				</div>
				<div className='columns-1 md:columns-2 lg:columns-3 '>
					{posts?.map((post: IUserPostProps) => (
							<ExplorePostCard post={post} key={post.postId} />
					))}
					<br />
					<p ref={ref}></p>
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
	const posts = await getPosts();
	const last = posts ? posts[posts.length - 1] : null;
	res.setHeader(
		'Cache-Control',
		'public, s-maxage=60, stale-while-revalidate'
	);
	return {
		props: {
			posts,
			last,
		},
	};
}
