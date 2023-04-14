import { IUser } from '@/types/user';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export default function useUser(uid: string) {
	const [user, setUser] = useState<IUser | null>(null);
	useEffect(() => {
		const getUser = async () => {
			const { db } = await import('@/config/firebase');
			const userSnapshot = await getDoc(doc(db, 'users', `${uid}`));
			const user = userSnapshot.data() as IUser;
			setUser(user);
		};
		getUser();
	}, []);

	return { user };
}
