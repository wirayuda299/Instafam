import { getPosts } from '@/helper/getPosts';
import { getUserRecommendation } from '@/helper/getUser';
import { getSession, useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
const Suggestions = dynamic(() => import('@/components/Suggestions/Suggestions'),{
		ssr: true,
	}
);
const PostCard = dynamic(() => import('@/components/Card/Post'), {
	ssr: true,
});

export default function Home({ posts, users }: any) {
	const { data: session } = useSession();

	return (
		<section className='w-full h-screen md:p-3 overflow-y-auto'>
			<div className='w-full flex justify-between items-start'>
				<div className='flex flex-col p-5 w-full'>
						{posts.map((post: any) => (
							<PostCard post={post} key={post.postId} />
						))}
				</div>
					<Suggestions reccomend={users} session={session} />
			</div>
		</section>
	);
}

export async function getServerSideProps({ req, res }: any) {
	const session = await getSession({ req });
	const posts = await getPosts();
	const users = await getUserRecommendation(session?.user.uid);
	res.setHeader(
		'Cache-Control',
		'public, s-maxage=60, stale-while-revalidate=59'
	);
	return {
		props: {
			posts,
			users,
		},
	};
}
