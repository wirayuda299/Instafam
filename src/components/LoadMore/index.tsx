type LoadMoreProps = {
	loadMore: () => Promise<void>;
	hasMore: boolean;
};
export default function LoadMore({ loadMore, hasMore }: LoadMoreProps) {
	return (
		<>
			{hasMore ? (
				<button
					type='button'
					name='loadMore'
					title='Load More'
					onClick={loadMore}
					className=' text-black dark:text-white text-center p-2 rounded-md text-xl font-semibold'
				>
					Load More
				</button>
			) : (
				<p className='text-black dark:text-white text-center'>No more posts</p>
			)}
		</>
	);
}
