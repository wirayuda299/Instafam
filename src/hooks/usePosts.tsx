import useSWR from 'swr';
import {
	collection,
	query,
	orderBy,
	startAfter,
	limit,
	getDocs,
	DocumentData,
} from 'firebase/firestore';
import { db } from '@/config/firebase';
import PostCard from '@/components/Card/Post';
import { useCallback, useEffect, useState } from 'react';

export default function InfiniteScroll() {
	const [hasMore, setHasMore] = useState(true);
	const { data, error, mutate, isValidating } = useSWR<DocumentData[]>(
		'posts',
		async () => {
			const postsQuery = query(
				collection(db, 'posts'),
				orderBy('createdAt', 'desc'),
				limit(10)
			);
			const snapshot = await getDocs(postsQuery);
			const posts = snapshot.docs.map((doc) => doc.data());
			return posts as DocumentData[];
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
			startAfter(lastPost?.createdAt),
			limit(10)
		);
		const snapshot = await getDocs(postsQuery);
		const newPosts = snapshot.docs.map((doc) => doc.data());
		setHasMore(newPosts.length === 10);
		mutate(data ? [...data, ...newPosts] : newPosts, false);
	}, [data, setHasMore, mutate]);
	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [handleScroll]);

	if (error) return <div>Error loading posts.</div>;
	if (!data) return <div>Loading posts...</div>;
	return (
		<div className='w-full flex justify-center flex-col'>
			{data?.map((post: any) => (
				<PostCard post={post} followingLists={[]} key={post.docId} />
			))}

			{isValidating && <div className='text-white'>Loading more posts...</div>}
			{hasMore ? (
				<button onClick={loadMore} className='text-black text-center dark:text-white'>
					Load More
				</button>
			) : (
				<div className='text-white text-center'>No more posts to load</div>
			)}
		</div>
	);
}


