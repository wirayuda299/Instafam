import dynamic from 'next/dynamic';
import Loader from '@/components/Loader/Loader';
import Head from 'next/head';
import { useRecoilValue } from 'recoil';
import { tabPosts, tabSavedPosts } from '@/store/TabToggler';
import { useSession } from 'next-auth/react';
import { IUserPostProps } from '@/types/post';
import { Session } from 'next-auth';
import { IUser } from '@/types/user';

const SavedPosts = dynamic(
	() => import('@/components/User/savedPosts/savedPosts'),
	{
		loading: () => <Loader />,
	}
);
const ExplorePostCard = dynamic(() => import('@/components/Card/Feeds'), {
	loading: () => <Loader />,
	ssr: true,
});
const Statistic = dynamic(
	() => import('@/components/User/Statistic/Statistic'),
	{
		ssr: true,
	}
);
const Tab = dynamic(() => import('@/components/Tab/Tab'));

type Props = {
	posts: IUserPostProps[] | [];
	session: Session | null;
	user: IUser[] | [];
	query: {
		readonly id: string;
	};
};

export default function UserProfile({ posts, user, query }: Props) {
	const postTab = useRecoilValue(tabPosts);
	const savedPostTab = useRecoilValue(tabSavedPosts);
	const { data: session } = useSession();
	return (
		<>
			<Head>
				<title>
					{user ? user[0].name : ''}({user ? user[0].username : ''}) &#8226;
					Instafam
				</title>
				<link rel='icon' href={user && user[0]?.image} />
				<meta
					name='description'
					content={`This is profile page of ${user && user[0]?.username}`}
				/>
				<meta
					property='og:description'
					content={`This is profile page of ${user && user[0]?.username}`}
				/>

				<link
					rel='canonical'
					href={`https://instafam.vercel.app/profile/${session?.user?.uid}`}
				/>
			</Head>
			<div className='w-full h-screen overflow-y-auto py-5 mx-auto p-5'>
				<div className='flex items-center border-b border-gray-400 w-full space-x-3 md:justify-center md:space-x-10'>
					<Statistic
						uid={session?.user?.uid}
						users={user && user[0]}
						posts={posts ?? []}
					/>
				</div>

				{session?.user?.uid === query.id ? <Tab /> : null}
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 p-5 justify-center items-center w-full '>
					{postTab && (
						<>
							{posts?.map((post) => (
								<ExplorePostCard post={post} key={post.postId} />
							))}
						</>
					)}
					<>
						{savedPostTab && (
							<SavedPosts savedPosts={user && user[0].savedPosts} />
						)}
					</>
				</div>
			</div>
		</>
	);
}
export async function getServerSideProps({ req, query }: any) {
	const { getPostByCurrentUser } = await import('@/helper/getPosts');
	const { getCurrentUserData } = await import('@/helper/getUser');
	const posts = await getPostByCurrentUser(query.id);
	const user = await getCurrentUserData(query.id);

	if(!user || !posts) {
		return {
			notFound: true,
		}
	}

	return {
		props: {
			posts,
			user,
			query,
		},
	};
}
