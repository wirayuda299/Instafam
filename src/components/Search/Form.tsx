import useSearchUser from '@/hooks/useSearchUser';
import { resultsState } from '@/store/results';
import { ReactNode } from 'react';
import { useRecoilState } from 'recoil';
import Results from './Results';

const defaultValues = {
	search: '',
};

interface Props {
	height: string;
	children: ReactNode;
}
export default function Form({ height, children }: Props) {
	const { handleSubmit, onSubmit, register } = useSearchUser();
	const [results, setResults] = useRecoilState(resultsState);
	const handleDrawerToggler = () => {
		setResults([]);
	};
	return (
		<>
			<form
				className={` mt-4 dark:bg-black rounded-sm ${height}`}
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className=' pb-5 w-full'>
					<div>
						<div className='w-full flex items-center justify-between bg-[#b9b9b917] rounded-md px-3'>
							<input
								type='text'
								placeholder='search user'
								className='bg-transparent text-xs md:text-sm w-full py-2 focus:outline-none focus:border-0 focus:ring-0'
								defaultValue={defaultValues.search}
								pattern='^[a-zA-Z0-9_@./#&+-]*$'
								{...register('search')}
							/>
							{children}
						</div>
						<Results
							handleDrawerToggler={handleDrawerToggler}
							results={results}
							setResults={setResults}
							customs='h-screen mt-5 -left-1 fixed z-50 top-16 md: h-full  md:top-0 md:left-0 md:w-full md:z-0  md:transition-all md:duration-300 md:ease-in-out md:static '
						/>
					</div>
				</div>
			</form>
		</>
	);
}
