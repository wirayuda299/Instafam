import Loader from '@/components/Loader/Loader';
import usePosts from '@/hooks/usePosts';
import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import { memo } from 'react';
const PostCard = dynamic(() => import('@/components/Card/Post'), {
	loading: () => <Loader />,
});

function UserPosts() {
	const { data: session } = useSession();
	const { data, hasMore, loadMore, user } = usePosts(session?.user.uid);
	return (
		<div className='w-full'>
			<div className='flex flex-col p-5 mb-20 lg:mb-5 w-full'>
				{data?.map((post) => (
					<PostCard
						post={post}
						followingLists={user && user[0]?.following}
						key={post.postId}
					/>
				))}
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
	);
}
export default memo(UserPosts);
