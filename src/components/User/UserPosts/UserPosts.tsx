import Loader from '@/components/Loader/Loader';
import usePosts from '@/hooks/usePosts';
import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import { memo } from 'react';
const PostCard = dynamic(() => import('@/components/Card/Post'));
const LoadMoreButton = dynamic(() => import('@/components/LoadMore'));
function UserPosts() {
	const { data: session } = useSession();
	const { data, hasMore, loadMore, user, isLoading } = usePosts(
		session?.user.uid
	);
	return (
		<div className='w-full'>
			<div className='flex flex-col p-5 mb-20 lg:mb-5 w-full'>
				{isLoading
					? [...Array(5)].map((_, index) => <Loader key={index} />)
					: data?.map((post) => <PostCard post={post} key={post.postId} />)}
				<LoadMoreButton hasMore={hasMore} loadMore={loadMore} />
			</div>
		</div>
	);
}
export default memo(UserPosts);
