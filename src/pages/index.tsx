import Head from 'next/head';
import Suggestions from '@/components/Suggestions/Suggestions';
import { IUserPostProps } from '@/types/post';
import { Suspense } from 'react';
import { useSession } from 'next-auth/react';
import useRecommendation from '@/hooks/useRecommendation';
import usePosts from '@/hooks/usePosts';
import PostCard from '@/components/Card/Post';
import Loader from '@/components/Loader/Loader';
import Recommendation from '@/components/Loader/Recommendation';
export interface Props {
	posts: {
		posts: IUserPostProps[];
	};
}
export default function Home() {
	const { data: session } = useSession();
	const { reccomend, recomendationLoading } = useRecommendation(
		session?.user?.uid
	);
	const {
		data,
		isLoading,
		isValidating,
		error,
		hasMore,
		loadMore,
		user,
		userError,
		userLoading,
	} = usePosts(session?.user?.uid);
	if (isLoading) {
		return (
			<div className='max-w-2xl h-screen flex justify-center mx-auto'>
				<Loader />
			</div>
		);
	}
	return (
		<>
			<Head>
				<title>Instafam | Connect with people around the world</title>
				<meta
					name='description'
					content='Instafam is social media web app that let you connect with people around the world'
				/>
				<meta
					name='keywords'
					content='social media, instafam, nextjs, tailwindcss, reactjs, firebase'
				/>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<meta name='robots' content='noindex, nofollow' />
				<meta name='googlebot' content='noindex, nofollow' />
				<meta name='google' content='notranslate' />
				<meta name='google' content='nositelinkssearchbox' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<section className='w-full h-screen md:p-3 overflow-y-auto'>
				<div className='w-full flex justify-between items-start'>
					<div className='flex flex-col p-5'>
						<Suspense fallback={<h1>Loading...</h1>}>
							{data?.map((post) => (
								<PostCard
									post={post}
									followingLists={user && user[0]?.following}
									key={post.docId}
								/>
							))}
							{isValidating && (
								<h1 className='text-black dark:text-white'>Loading...</h1>
							)}
							{hasMore ? (
								<button
									onClick={loadMore}
									className=' text-black dark:text-white p-2 rounded-md text-xl font-semibold'
								>
									Load More
								</button>
							) : (
								<h1 className='text-black dark:text-white text-center'>
									No more posts
								</h1>
							)}
						</Suspense>
					</div>
					<Suspense fallback={<h1>Loading...</h1>}>
						{recomendationLoading || userLoading || userError ? (
							<Recommendation />
						) : (
							<Suggestions recommendation={reccomend} session={session} />
						)}
					</Suspense>
				</div>
			</section>
		</>
	);
}
