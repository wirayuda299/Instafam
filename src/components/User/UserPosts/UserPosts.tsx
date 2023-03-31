import PostCard from '@/components/Card/Post';
import Loader from '@/components/Loader/Loader';
import usePosts from '@/hooks/usePosts';

export default function UserPosts({ uid }: { uid: string | undefined }) {
	const {
		data,
		isLoading,
		isValidating,
		hasMore,
		loadMore,
		user,
		userLoading,
	} = usePosts(uid);

	return (
		<div className='w-full'>
			{isLoading || userLoading || !data ? (
				<Loader />
			) : (
				<div className='flex flex-col p-5 mb-20 lg:mb-5 w-full'>
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
				</div>
			)}
		</div>
	);
}
