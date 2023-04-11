import { AiOutlineInstagram } from 'react-icons/ai';
import Link from 'next/link';
import { Oleo_Script } from 'next/font/google';
import NavbarList from './Lists';
import { useRecoilValue } from 'recoil';
import { searchDrawer } from '@/store/searchDrawer';
import dynamic from 'next/dynamic';
import ExtraMenuBtn from './ExtraMenuBtn';
import { useSession } from 'next-auth/react';
const ExtraMenus = dynamic(() => import('./ExtraMenus'));

const oleo = Oleo_Script({
	subsets: ['latin', 'latin-ext'],
	weight: '400',
	preload: true,
	fallback: ['sans-serif'],
});

export default function Sidebar() {
	const drawerOpen = useRecoilValue(searchDrawer);
	const { data: session } = useSession();
	return (
		<>
			{session ? (
				<aside
					className={`w-full md:w-fit fixed bottom-0 left-0 z-50 h-12 md:h-screen md:border-r md:dark:border-r-gray-600 md:border-opacity-50 flex md:z-10 md:static items-center transition-width ease duration-300  ${
						drawerOpen ? '!w-20' : ' lg:w-64 '
					}`}
				>
					<nav className='w-full flex rel flex-col justify-center lg:justify-between bg-white dark:bg-black dark:text-white p-1 md:p-3 md:h-full'>
						<header className='hidden md:flex w-full flex-col pl-6 md:pl-2.5'>
							<Link
								href='/'
								className={`text-3xl font-semibold lg:pt-5 ${oleo.className}`}
							>
								{drawerOpen ? (
									<AiOutlineInstagram size={35} />
								) : (
									<>
										<h1 className='hidden lg:block'>Instafams</h1>
										<span className='block lg:hidden'>
											<AiOutlineInstagram className='text-4xl' />
										</span>
									</>
								)}
							</Link>
						</header>
						<div>
							<NavbarList session={session} />
							<ExtraMenus />
						</div>
						<ExtraMenuBtn />
					</nav>
				</aside>
			) : null}
		</>
	);
}
