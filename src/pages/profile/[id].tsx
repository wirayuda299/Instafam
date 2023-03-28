import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Loader from '@/components/Loader/Loader';
import Head from 'next/head';
import Tab from '@/components/Tab/Tab';
import { useRecoilValue } from 'recoil';
import { tabPosts, tabSavedPosts } from '@/store/TabToggler';
import { GetServerSidePropsContext } from 'next';
import { IUserPostProps } from '@/types/post';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import { useSession } from 'next-auth/react';
import StatisticLoader from '@/components/Loader/StatisticLoader';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/config/firebase';

const PostsCard = dynamic(() => import('@/components/Card/Feeds'), {
	loading: () => <Loader />,
	ssr: true,
});

const SavedPosts = dynamic(
	() => import('@/components/User/savedPosts/savedPosts'),
	{
		loading: () => <Loader />,
		ssr: true,
	}
);

const Statistic = dynamic(
	() => import('@/components/User/Statistic/Statistic'),
	{
		ssr: true,
		loading: () => <StatisticLoader />,
	}
);

export default function UserProfile({ user, posts, id }: any) {
	const postTab = useRecoilValue(tabPosts);
	const savedPostTab = useRecoilValue(tabSavedPosts);
	const { data } = useSession();
	console.log({
		uidFromSSR: id,
		uidFromSession: data?.user?.uid,
	})
	
	
	return (
		<>
			<Head>
				<title>
					{user.name} (@{user?.username} - Instafam)
				</title>
				<link rel='icon' href={user?.image} />
				<meta
					name='description'
					content={`This is profile page of ${user?.username}`}
				/>
				<meta property='og:image' content={user?.image} />
				<meta property='og:type' content='profile' />
				<meta property='profile:username' content={user?.username} />
				<meta property='og:title' content={`${user?.username} | Instafam`} />
				<meta
					property='og:description'
					content={`This is profile page of ${user?.username}`}
				/>
				<meta
					property='og:url'
					content={`https://instafam.vercel.app/profile/${id}`}
				/>
				<link
					rel='canonical'
					href={`https://instafam.vercel.app/profile/${id}`}
				/>
				<link rel='apple-touch-icon' href={user?.image} />
				<link referrerPolicy='no-referrer' />
				<meta name='twitter:card' content='summary' />
				<meta name='twitter:site' content='@instafam' />
				<meta name='twitter:creator' content='@instafam' />
				<meta
					name='twitter:title'
					content={`${user[0]?.username} | Instafam`}
				/>
				<meta
					name='twitter:description'
					content={`This is profile page of ${user?.username}`}
				/>
				<meta name='twitter:image' content={user?.image} />
			</Head>
			<div className='w-full py-5 max-w-5xl mx-auto p-5'>
				<div className='flex items-center border-b border-gray-400 w-full space-x-3 md:justify-center md:space-x-10'>
					<Statistic
						image={user.image}
						name={user.name}
						uid={user.uid}
						username={user.username}
					/>
				</div>

				{data?.user?.uid === id ? <Tab /> : null}
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 p-5 justify-center items-center w-full '>
					{postTab && (
						<>
							{posts.length === 0 && (
								<div className='mx-auto w-full h-full col-span-3'>
									<h1 className='text-2xl font-semibold text-center w-full text-gray-500 dark:text-gray-400'>
										No Posts
									</h1>
								</div>
							)}
							{posts?.map((post: IUserPostProps) => (
								<Suspense fallback={<Loader />} key={post.docId}>
									<PostsCard post={post} />
								</Suspense>
							))}
						</>
					)}
					{savedPostTab && (
						<Suspense fallback={<Loader />}>
							<SavedPosts savedPosts={user?.savedPosts} />
						</Suspense>
					)}
				</div>
			</div>
		</>
	);
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const session = await getServerSession(context.req, context.res, authOptions);

	if (!session) {
		return {
			redirect: {
				destination: '/auth/signin',
				permanent: false,
			},
		};
	}
	const { id } = context.query;
	const user = await getDocs(query(collection(db, 'users'), where('uid', '==', id)))
	const currentuser = user.docs.map((doc) => doc.data());
	const userPosts = await getDocs(query(collection(db, 'posts'), where('postedById', '==', id)))
	const userPostsData =  userPosts.docs.map((doc) => doc.data());

	return {
		props: {
			user: currentuser[0],
			posts: userPostsData,
			id
		},
	};
}
