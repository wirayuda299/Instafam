import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Dispatch, FC, SetStateAction } from 'react';
import {
	AiOutlineHome,
	AiOutlineSearch,
	AiOutlineHeart,
	AiOutlinePlusSquare,
} from 'react-icons/ai';
import { MdOutlineExplore } from 'react-icons/md';
import { RiMessengerLine } from 'react-icons/ri';
import Image from 'next/image';
import { ExtraMenuBtn } from './ExtraMenuBtn';
import { searchDrawer } from '@/store/searchDrawer';
import { useRecoilState } from 'recoil';
import { rgbDataURL } from '@/util/colorPicker';
import { resultsState } from '@/store/results';
import { useRouter } from 'next/router';
interface IProps {
	extraListOpen: boolean;
	setExtraListOpen: Dispatch<SetStateAction<boolean>>;
}
interface INavProps {
	id: number;
	title: string;
	path: string;
	icon: JSX.Element | string;
}

export const NavbarList: FC<IProps> = () => {
	const { data: session } = useSession();
	const {pathname} = useRouter();
	const [drawerOpen, setDrawerOpen] = useRecoilState(searchDrawer);
	const [results, setResults] = useRecoilState(resultsState)
	const navList: INavProps[] = [
		{
			id: 1,
			title: 'Home',
			path: '/',
			icon: <AiOutlineHome size={30} className='text-black dark:text-white' />,
		},
		{
			id: 2,
			title: 'Search',
			path: '',
			icon: (
				<AiOutlineSearch size={30} className='text-black dark:text-white' />
			),
		},
		{
			id: 3,
			title: 'Explore',
			path: '/explore',
			icon: (
				<MdOutlineExplore size={30} className='text-black dark:text-white' />
			),
		},
		{
			id: 4,
			title: 'Messages',
			path: '/messages',
			icon: (
				<RiMessengerLine size={30} className='text-black dark:text-white' />
			),
		},
		{
			id: 5,
			title: 'Notifications',
			path: '/notifications',
			icon: <AiOutlineHeart size={30} className='text-black dark:text-white' />,
		},
		{
			id: 6,
			title: 'Create',
			path: '/create',
			icon: (
				<AiOutlinePlusSquare size={30} className='text-black dark:text-white' />
			),
		},
		{
			id: 7,
			title: 'Profile',
			path: `/profile/${session?.user.uid}`,
			icon: (
				<Image
					className={`${drawerOpen ? 'w-full ' : 'w-8 h-8 border  md:border-0 object-cover'} rounded-full`}
					src={session?.user?.image || ''}
					width={40}
					height={40}
					placeholder='blur'
					blurDataURL={rgbDataURL(216, 216, 216)}
					loading='lazy'
					quality={50}
					alt={session?.user?.name || 'user profile'}
				/>
			),
		},
	];


	const toggler = () => {
		setResults([])
		setDrawerOpen(false)
	}
	return (
		<ul className='flex w-full dark:bg-black justify-around md:justify-start md:space-y-4 items-center sm:items-start flex-row md:flex-col last:flex-grow transition-all ease duration-500'>
			{navList.map((list) => (
				<li
					key={list.id}
					className={`font-light p-2 md:px-3 md:py-3 text-base hover:bg-gray-200  transition-all ease duration-300 rounded-full w-fit md:w-full dark:hover:bg-[#b9b9b917] hover:bg-[#a8a8a817] ${
						list.id === 2 || list.id === 5 ? 'hidden md:block' : ''
					} ${list.id === 8 ? 'hidden md:block' : ''} ${pathname === list.path ? 'font-semibold' : ''}`}
				>
					{list.id === 2 ? (
						<div
							className='flex space-x-2 cursor-pointer'
							onClick={() => setDrawerOpen(!drawerOpen)}
						>
							{list.icon}
							<span className={`${drawerOpen ? 'hidden' : 'hidden lg:block'}`}>
								{list.title}
							</span>
						</div>
					) : (
						<Link
							href={list.path}
							onClick={toggler}
							title={list.title}

						>
							<button className={`flex space-x-2 `} name={list.title}>
								{list.icon}
								<span
									className={`${drawerOpen ? 'hidden' : 'hidden lg:block'}`}
								>
									{list.title}
								</span>
							</button>
						</Link>
					)}
				</li>
			))}
			<ExtraMenuBtn />
		</ul>
	);
};
