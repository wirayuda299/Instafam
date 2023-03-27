import { db } from '@/config/firebase';
import { resultsState } from '@/store/results';
import { query, collection, getDocs } from 'firebase/firestore';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';


export default function useSearchUser() {
	const { register, handleSubmit, resetField } = useForm();
  const [results, setResults] = useRecoilState(resultsState)

	const onSubmit = async (data: any) => {
		try {
			const q = query(collection(db, 'users'));
			const res = await getDocs(q);
			const searchValueRegex = new RegExp(data.search, 'i');
			const filtered = res.docs.filter((doc) => {
				return (
					searchValueRegex.test(doc.data().username) ||
					searchValueRegex.test(doc.data().name)
				);
			});
			setResults(filtered.map((doc) => doc.data()));
			resetField('search');
		} catch (error: any) {
			console.log(error.message);
		}
	};
	return { register, handleSubmit, onSubmit, setResults, resetField };
}
