import dynamic from 'next/dynamic';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { GetServerSidePropsContext } from 'next';
const Suggestions = dynamic(
	() => import('@/components/Suggestions/Suggestions')
);
const PostCard = dynamic(() => import('@/components/Card/Post'));
const CardLoader = dynamic(() => import('@/components/Loader/Loader'));

export default function Home({ posts, users, sessions, last }: any) {
	const { ref, postsState, loading } = useInfiniteScroll(last);
	return (
		<section className='w-full h-full '>
			<div className='w-full flex justify-between items-start h-screen'>
				<div className='flex flex-col p-5 w-full '>
					{posts?.map((post: any) => (
						<PostCard
							post={post}
							key={post.postId}
							ssr={true}
							session={sessions}
						/>
					))}
					<span ref={ref}></span>
					{loading && <CardLoader />}
					{postsState?.map((post) => (
						<PostCard
							post={post}
							key={post.postId}
							ssr={false}
							session={sessions}
						/>
					))}
				</div>
				<div className='relative'>
					<Suggestions reccomend={users} session={sessions} />
				</div>
			</div>
		</section>
	);
}

export async function getServerSideProps({
	req,
	res,
}: GetServerSidePropsContext) {
	const { getSession } = await import('next-auth/react');
	const session = await getSession({ req });
	if (!session || !session?.user) {
		return {
			redirect: {
				destination: '/auth/signin',
				permanent: false,
			},
		};
	}
	const { getPosts } = await import('@/helper/getPosts');
	const posts = await getPosts(4);

	const { getUserRecommendation } = await import('@/helper/getUser');
	const users = await getUserRecommendation(session?.user?.uid);
	res.setHeader('Cache-Control', 's-maxage=120, stale-while-revalidate');

	return {
		props: {
			posts,
			users: users ?? [],
			sessions: session,
			last: posts ? posts[posts.length - 1] : null,
		},
	};
}
