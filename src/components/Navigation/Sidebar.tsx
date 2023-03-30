import { useState } from 'react';
import { AiOutlineInstagram } from 'react-icons/ai';
import Link from 'next/link';
import { Oleo_Script } from 'next/font/google';
import { NavbarList } from './Lists';
import { useRecoilValue } from 'recoil';
import { searchDrawer } from '@/store/searchDrawer';
import dynamic from 'next/dynamic';
import { useSession } from 'next-auth/react';

const ExtraMenus = dynamic(() => import('./ExtraMenus'), {
	ssr: true,
});

const oleo = Oleo_Script({
	subsets: ['latin', 'latin-ext'],
	weight: '400',
});

export default function Sidebar() {
	const [extraListOpen, setExtraListOpen] = useState(false);
	const drawerOpen = useRecoilValue(searchDrawer);
	const { data: session } = useSession();

	return (
		<>
			{session ? (
				<aside
					className={` hidden md:block min-h-screen border-r  dark:border-r-gray-600 transition-all ease-out duration-300  ${
						drawerOpen ? 'w-20' : 'md:w-max lg:w-[320px] '
					}`}
				>
					<nav className='w-full bg-white dark:bg-black dark:text-white p-3 h-full transition-all ease-out duration-300'>
						<header className='w-full flex flex-col pl-6 md:pl-3 py-5 '>
							<Link
								href='/'
								className={`text-3xl font-semibold ${oleo.className}`}
							>
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
						<NavbarList
							extraListOpen={extraListOpen}
							setExtraListOpen={setExtraListOpen}
						/>
						<ExtraMenus />
					</nav>
				</aside>
			) : null}
		</>
	);
}
