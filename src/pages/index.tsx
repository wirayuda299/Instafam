import dynamic from 'next/dynamic';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
const Suggestions = dynamic(
	() => import('@/components/Suggestions/Suggestions'),
	{
		ssr: true,
	}
);
const PostCard = dynamic(() => import('@/components/Card/Post'), {
	ssr: true,
});
const CardLoader = dynamic(() => import('@/components/Loader/Loader'), {
	ssr: true,
});


export default function Home({ posts, users, sessions, last }: any) {
	const { ref, postsState, loading } = useInfiniteScroll(last);
	return (
		<section className='w-full h-screen overflow-y-auto '>
			<div className='w-full flex justify-between items-start'>
				<div className='flex flex-col p-5 w-full overflow-y-auto'>
					{posts?.map((post:any) => (
						<PostCard post={post} key={post.postId} />
					))}
					<span ref={ref}></span>
					{loading && <CardLoader />}
					{postsState?.map((post) => (
						<PostCard post={post} key={post.postId} />
					))}
				</div>
				<Suggestions reccomend={users} session={sessions} />
			</div>
		</section>
	);
}

export async function getServerSideProps({ req, res }: any) {
	const getUserPosts = await import('@/helper/getPosts');
	const posts = await getUserPosts.getPosts(5);
	const getSessions = await import('next-auth/react');
	const session = await getSessions.getSession({ req });
	const getUserRecommendations = await import('@/helper/getUser');
	const users = await getUserRecommendations.getUserRecommendation(session?.user?.uid);
	res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=59');

	return {
		props: {
			posts,
			users: users ?? [],
			sessions: session,
			last: posts ? posts[posts.length - 1] : null,
		},
	};
}
