import { searchDrawer } from '@/store/searchDrawer';
import { useRecoilState } from 'recoil';
import {  AiOutlineSearch } from 'react-icons/ai';
import { useEffect } from 'react';
import Form from './Form';

export default function SearchDrawer() {
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
	}, []);

	return (
		<section
			className={`fixed hidden searchDrawer z-50 bg-white transition-all ease-out duration-300 dark:bg-black ${
				drawerOpen ? 'active' : ''
			}`}
		>
			<div className=' w-full h-full text-black dark:text-white'>
				<aside className='w-64 p-5 border-b'>
					<h1 className='font-semibold text-2xl py-5'>Search</h1>
					<Form height='h-screen'>
						<button type='submit' name='search' title='search'>
							<AiOutlineSearch size={20} />
						</button>
					</Form>
				</aside>
			</div>
		</section>
	);
}
