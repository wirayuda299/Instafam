import { db } from '@/config/firebase';
import { resultsState } from '@/store/results';
import { query, collection, getDocs, where } from 'firebase/firestore';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';


export default function useSearchUser() {
	const { register, handleSubmit, resetField } = useForm();
  const [results, setResults] = useRecoilState(resultsState)

	const onSubmit = async (data: any) => {
		resetField('search');
		try {
			const q = query(collection(db, 'users'), where('username', '==', data.search));
			const nameQueries = query(collection(db, 'users'), where('name', '==', data.search));
			
			const res = await getDocs(q);
			if(res.docs.length < 1){
				const nameRes = await getDocs(nameQueries);
				setResults(nameRes.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
				return;
			}
			setResults(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		} catch (error: any) {
			console.log(error.message);
		}
	};
	return { register, handleSubmit, onSubmit, setResults, resetField };
}
