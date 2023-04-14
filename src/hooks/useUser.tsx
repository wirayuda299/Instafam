import { db } from '@/config/firebase';
import { IUser } from '@/types/user';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export default function useUser(uid: string) {
	const [user, setUser] = useState<IUser | null>(null);
	useEffect(() => {
		onSnapshot(doc(db, 'users', uid), (doc) => {
			if (doc.exists()) {
				setUser(doc.data() as IUser);
			}
		});
	}, [db, uid]);

	return { user };
}
