import useSearchUser from '@/hooks/useSearchUser';
import { resultsState } from '@/store/results';
import { ReactNode } from 'react';
import { useRecoilState } from 'recoil';
import Results from './Results';
import { searchDrawer } from '@/store/searchDrawer';

const defaultValues = {
	search: '',
};

type Props ={
	height: string;
	children: ReactNode;
}
export default function Form({ height, children }: Props) {
	const { handleSubmit, onSubmit, register } = useSearchUser();
	const [results, setResults] = useRecoilState(resultsState);
	const [drawerOpen, setDrawerOpen] = useRecoilState(searchDrawer);
	const handleDrawerToggler = () => {
		setResults([]);  
				setDrawerOpen(false);
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
								type='search'
								placeholder='search user'
								autoComplete='off'
								alt='search user'
								security='restricted'
								className='bg-transparent text-xs md:text-sm w-full py-2 focus:outline-none focus:border-0 focus:ring-0'
								defaultValue={defaultValues.search}
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
