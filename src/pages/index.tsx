import { getPosts } from '@/helper/getPosts';
import { getUserRecommendation } from '@/helper/getUser';
import { IUserPostProps } from '@/types/post';
import { IUser } from '@/types/user';
import dynamic from 'next/dynamic';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
const Suggestions = dynamic(() => import('@/components/Suggestions/Suggestions'),{
		ssr: true,
	}
);
const PostCard = dynamic(() => import('@/components/Card/Post'), {
	ssr: true,
});

type Props = {
	posts: IUserPostProps[] | [];
	users: IUser[] | [];
	sessions: any;
};

export default function Home({ posts, users, sessions }: Props) {
	return (
		<section className='w-full h-screen md:p-3 overflow-y-auto'>
			<div className='w-full flex justify-between items-start'>
				<div className='flex flex-col p-5 w-full'>
					{posts.map((post) => (
						<PostCard post={post} key={post.postId} />
					))}
				</div>
				<Suggestions reccomend={users} session={sessions} />
			</div>
		</section>
	);
}

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
	const posts = await getPosts();
	const session = await getSession({ req });
	const users = await getUserRecommendation(session?.user.uid);

	return {
		props: {
			posts: posts ?? [],
			users: users ?? [],
			sessions: session,
		},
	};
}
