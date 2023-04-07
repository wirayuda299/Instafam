import { searchDrawer } from '@/store/searchDrawer';
import { useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useRecoilState } from 'recoil';

export default function SearchField() {
	const [drawerOpen, setDrawerOpen] = useRecoilState(searchDrawer);
	useEffect(() => {
		window.addEventListener('resize', (e) => {
			setDrawerOpen(false);
		});
		return () => {
			window.removeEventListener('resize', (e) => {
				setDrawerOpen(false);
			});
		};
	}, [setDrawerOpen]);

	return (
		<section
			className={`fixed hidden  searchDrawer z-[999] bg-white transition-all ease-out duration-300 dark:bg-black ${
				drawerOpen ? 'active ' : ''
			}`}
		>
			<div className='flex w-full text-black dark:text-white'>
				<aside className='w-64'>
					<div className='w-full h-screen p-3'>
						<h1 className=' font-bold text-3xl py-6'>Search</h1>
						<div className='border-b pb-5 w-full'>
							<div className='w-full flex items-center justify-between bg-[#b9b9b917] rounded-md px-3'>
								<input
									autoComplete='off'
									pattern='^[a-zA-Z0-9@]+$'
									required
									security='restricted'
									type='search'
									className='bg-transparent w-full py-2 focus:outline-none focus:border-0 focus:ring-0'
									placeholder='	Search for users'
								/>
								<button type='button' name='close' title='close'>
									<AiOutlineClose size={20} />
								</button>
							</div>
						</div>
					</div>
				</aside>
			</div>
		</section>
	);
}
