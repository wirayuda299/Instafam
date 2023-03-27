import { db } from '@/config/firebase';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import useSWR from 'swr';

export default function usePosts(uid: string) {
	const { data, isLoading, error } = useSWR('posts', () => getUserPosts(uid));
	return { data, isLoading, error };
}

async function getUserPosts(uid: string) {
  try {
    const userPosts = await getDocs(
      query(
        collection(db, 'posts'),
        where('postedById', '==', `${uid}`),
        orderBy('createdAt', 'desc')
      )
    );
    return userPosts.docs.map((doc) => doc.data())
  } catch (error: any) {
    console.log(error.message);
    
  }
}
