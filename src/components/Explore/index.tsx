import dynamic from 'next/dynamic';
import usePosts from '@/hooks/usePosts';
const ExplorePostCard = dynamic(() => import('@/components/Card/Feeds'));
const Footer = dynamic(() => import('@/components/Footer'));
const LoadMoreButton = dynamic(() => import('@/components/LoadMore'));
export default function ExploreFeeds() {
	const { data, hasMore, loadMore } = usePosts();
	return (
		<div className='container mx-auto'>
			<div className=' grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3'>
				{data?.map((post) => (
					<ExplorePostCard post={post} key={post.postId} />
				))}
			</div>
			<LoadMoreButton hasMore={hasMore} loadMore={loadMore} />
			<Footer />
		</div>
	);
}
