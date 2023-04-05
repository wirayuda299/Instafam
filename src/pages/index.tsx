import { getPosts } from '@/helper/getPosts';
import { getUserRecommendation } from '@/helper/getUser';
import { IUserPostProps } from '@/types/post';
import { IUser } from '@/types/user';
import dynamic from 'next/dynamic';
import { getSession } from 'next-auth/react';
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

type Props = {
	posts: IUserPostProps[] | [];
	users: IUser[] | [];
	sessions: any;
	last: IUserPostProps | null;
};

export default function Home({ posts, users, sessions, last }: Props) {
	const { ref, postsState, loading } = useInfiniteScroll(last);
	return (
		<section className='w-full h-screen md:p-3 overflow-y-auto'>
			<div className='w-full flex justify-between items-start'>
				<div className='flex flex-col p-5 w-full'>
					{posts?.map((post) => (
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
	const posts = await getPosts();
	const session = await getSession({ req });
	const users = await getUserRecommendation(session?.user.uid);
	res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');

	return {
		props: {
			posts,
			users: users ?? [],
			sessions: session,
			last: posts ? posts[posts.length - 1] : null,
		},
	};
}
