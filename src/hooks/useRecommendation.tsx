import { db } from '@/config/firebase';
import { IUser } from '@/types/user';
import {
	query,
	collection,
	where,
	getDocs,
} from 'firebase/firestore';
import useSWR from 'swr';
export default function useRecommendation(uid: string | undefined) {
	const { data: reccomend, isLoading: recomendationLoading } = useSWR(
		'reccomend',
		async () => {
			const userQuery = query(collection(db, 'users'), where('uid', '!=', uid));
			const snapshot = await getDocs(userQuery);
			const user = snapshot.docs.map((doc) => doc.data()) as IUser[];
			return user;
		}
	);

	return { reccomend, recomendationLoading };
}
