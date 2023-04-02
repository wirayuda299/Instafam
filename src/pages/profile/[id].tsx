import {
	Suspense,
	startTransition,
	useCallback,
	useEffect,
	useState,
} from 'react';
import dynamic from 'next/dynamic';
import Loader from '@/components/Loader/Loader';
import Head from 'next/head';
import Tab from '@/components/Tab/Tab';
import { useRecoilValue } from 'recoil';
import { tabPosts, tabSavedPosts } from '@/store/TabToggler';
import { IUserPostProps } from '@/types/post';
import { useSession } from 'next-auth/react';
import StatisticLoader from '@/components/Loader/StatisticLoader';
import {
	collection,
	getDocs,
	query,
	where,
	orderBy,
	limit,
	startAfter,
} from 'firebase/firestore';
import { db } from '@/config/firebase';
import useSWR from 'swr';
import { IUser } from '@/types/user';
import { useRouter } from 'next/router';

const SavedPosts = dynamic(
	() => import('@/components/User/savedPosts/savedPosts'),
	{
		loading: () => <Loader />,
		ssr: true,
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
		loading: () => <StatisticLoader />,
	}
);

export default function UserProfile() {
	const postTab = useRecoilValue(tabPosts);
	const savedPostTab = useRecoilValue(tabSavedPosts);
	const { data: session } = useSession();
	const [hasMore, setHasMore] = useState(true);
	const { query: queries } = useRouter();
	const { data: user } = useSWR('currentUser', async () => {
		const userQuery = query(
			collection(db, 'users'),
			where('uid', '==',queries.id)
		);
		const snapshot = await getDocs(userQuery);
		const user = snapshot.docs.map((doc) => doc.data()) as IUser[];
		return user;
	});
	const { data, mutate } = useSWR<IUserPostProps[]>(
		'currentUserPosts',
		async () => {
			const postsQuery = query(
				collection(db, 'posts'),
				orderBy('createdAt', 'desc'),
				where('postedById', '==',queries.id),
				limit(5)
			);
			const snapshot = await getDocs(postsQuery);
			const posts = snapshot.docs.map((doc) => doc.data());
			return posts as IUserPostProps[];
		}
	);

	const handleScroll = async () => {
		const { scrollTop } = document.documentElement;
		if (scrollTop === 0) {
			await loadMore();
		}
	};

	const loadMore = useCallback(async () => {
		const lastPost = data && data[data.length - 1];
		const postsQuery = query(
			collection(db, 'posts'),
			orderBy('createdAt', 'desc'),
			where('postedById', '==',queries.id),
			startAfter(lastPost?.createdAt),
			limit(5)
		);
		const snapshot = await getDocs(postsQuery);
		const newPosts = snapshot.docs.map((doc) => doc.data()) as IUserPostProps[];
		setHasMore(newPosts.length === 5);
		startTransition(() => {
			mutate(data ? [...data, ...newPosts] : newPosts, false);
		});
	}, [data, setHasMore, mutate]);

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [handleScroll]);

	return (
		<>
			<Head>
				<title>
					{user ? user[0].name : ''}({user ? user[0].username : ''}) &#8226; Instafam
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
						users={user && user[0] }
						posts={data ?? []}

					/>
				</div>

				{session?.user?.uid === queries.id ? <Tab /> : null}
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 p-5 justify-center items-center w-full '>
					{postTab && (
						<>
							{data?.map((post) => (
								<ExplorePostCard post={post} key={post.postId} />
							))}
						</>
					)}

					{savedPostTab && (
						<Suspense fallback={<Loader />}>
							<SavedPosts savedPosts={user && user[0].savedPosts} />
						</Suspense>
					)}
				</div>
				<div className={`flex justify-center w-full ${savedPostTab ? 'hidden' : 'block'}`}>
					{hasMore ? (
						<button
							type='button'
							name='loadMore'
							title='Load More'
							onClick={loadMore}
							className=' text-black dark:text-white p-2 rounded-md text-xl font-semibold'
						>
							Load More
						</button>
					) : (
						<p className='text-black dark:text-white text-center'>
							No more posts
						</p>
					)}
				</div>
			</div>
		</>
	);
}
