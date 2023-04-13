import { resultsState } from '@/store/results';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useRecoilState } from 'recoil';

export default function useSearchUser() {
	const { register, handleSubmit, resetField } = useForm();
	const [results, setResults] = useRecoilState(resultsState);
	const [isPending, startTransition] = useTransition();
	const { data: session } = useSession();
	const router = useRouter();

	const onSubmit = async (data: any) => {
		resetField('search');
		try {
			if (!session) {
				toast.error('You must be logged in to search for users');
				router.push('/auth/signin');
				setResults([]);
				return;
			}
			// const reg = /^@[A-Za-z0-9]+$/g;
			// if (!reg.test(data.search)) {
			// 	toast.error('Invalid characters in search field');
			// 	setResults([]);
			// 	return;
			// }

			const { db } = await import('@/config/firebase');
			const { query, collection, getDocs, where } = await import(
				'firebase/firestore'
			);
			const q = query(
				collection(db, 'users'),
				where('username', '==', data.search)
			);
			const nameQueries = query(
				collection(db, 'users'),
				where('name', '==', data.search)
			);

			const res = await getDocs(q);
			if (res.docs.length < 1) {
				const nameRes = await getDocs(nameQueries);
				if (!isPending) {
					startTransition(() => {
						setResults(
							nameRes.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
						);
					});
				}
				return;
			}
			startTransition(() => {
				setResults(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
			});
		} catch (error: any) {
			console.log(error.message);
		}
	};
	return {
		register,
		handleSubmit,
		onSubmit,
		setResults,
		resetField,
		isPending,
	};
}
