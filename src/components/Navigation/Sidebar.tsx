import { AiOutlineInstagram } from 'react-icons/ai';
import Link from 'next/link';
import { Oleo_Script } from 'next/font/google';
import NavbarList from './Lists';
import { useRecoilValue } from 'recoil';
import { searchDrawer } from '@/store/searchDrawer';
import dynamic from 'next/dynamic';
const ExtraMenus = dynamic(() => import('./ExtraMenus'));

const oleo = Oleo_Script({
	subsets: ['latin', 'latin-ext'],
	weight: '400',

});

export default function Sidebar() {
	const drawerOpen = useRecoilValue(searchDrawer);	
	return (
		<aside
		className={`w-full md:w-fit fixed bottom-0 left-0 z-50 h-14 md:h-screen md:border-r md:staticmd:dark:border-r-gray-600 flex md:static items-center transition-all ease duration-300 ${
			drawerOpen ? '!w-20' : ' lg:w-64 '
		}`}
	>
		<nav className='w-full bg-white dark:bg-black dark:text-white p-3 md:h-full'>
			<header className='hidden md:flex w-full flex-col pl-6 md:pl-3 py-5'>
				<Link href='/' className={`text-3xl font-semibold ${oleo.className}`}>
					{drawerOpen ? (
						<AiOutlineInstagram size={30} />
					) : (
						<>
							<h1 className='hidden lg:block'>Instafams</h1>
							<span className='block lg:hidden'>
								<AiOutlineInstagram size={30} />
							</span>
						</>
					)}
				</Link>
			</header>
			<NavbarList />
			<ExtraMenus />
		</nav>
	</aside>
	
	);
}
