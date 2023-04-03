import useSWR from 'swr';
import {
	collection,
	query,
	orderBy,
	startAfter,
	limit,
	getDocs,
	where,
} from 'firebase/firestore';
import { db } from '@/config/firebase';
import { startTransition, useCallback, useEffect, useState } from 'react';
import { IUser } from '@/types/user';
import { IUserPostProps } from '@/types/post';

export async function fetcher() {
	const postsQuery = query(
		collection(db, 'posts'),
		orderBy('createdAt', 'desc'),
		limit(5)
	);
	const snapshot = await getDocs(postsQuery);
	const posts = snapshot.docs.map((doc) => doc.data());
	return posts as IUserPostProps[];
	
}

export default function usePosts(uid?: string | undefined) {
	const [hasMore, setHasMore] = useState(true);
	const { data, error, mutate, isValidating, isLoading,} = useSWR<
		IUserPostProps[]
	>(['userPosts'], async () => {
		return fetcher();
	});
	const {
		data: user,
		error: userError,
		isLoading: userLoading,
	} = useSWR('user', async () => {
		const userQuery = query(collection(db, 'users'), where('uid', '==', uid));
		const snapshot = await getDocs(userQuery);
		const user = snapshot.docs.map((doc) => doc.data()) as IUser[];
		return user;
	});
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

	return {
		data,
		error,
		mutate,
		isValidating,
		isLoading,
		user,
		userError,
		loadMore,
		hasMore,
		userLoading
	};
}
