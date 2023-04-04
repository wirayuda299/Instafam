import { useSession } from 'next-auth/react';
import Link from 'next/link';
import {
	AiOutlineHome,
	AiOutlineSearch,
	AiOutlineHeart,
	AiOutlinePlusSquare,
} from 'react-icons/ai';
import { MdOutlineExplore } from 'react-icons/md';
import { RiMessengerLine } from 'react-icons/ri';
import Image from 'next/image';
import ExtraMenuBtn from './ExtraMenuBtn';
import { searchDrawer } from '@/store/searchDrawer';
import { useRecoilState } from 'recoil';
import { resultsState } from '@/store/results';
import { useRouter } from 'next/router';

type NavProps = {
	id: number;
	title: string;
	path: string;
	icon: JSX.Element | string;
};

export default function NavbarLists() {
	const { data: session } = useSession();
	const { pathname } = useRouter();
	const [drawerOpen, setDrawerOpen] = useRecoilState(searchDrawer);
	const [results, setResults] = useRecoilState(resultsState);
	const navList: NavProps[] = [
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
					className={`w-7 h-7 md:w-8 md:h-8 border md:border-0 object-cover ${
						drawerOpen ? '!w-full' : ''
					} rounded-full`}
					src={session?.user?.image || ''}
					width={50}
					height={50}
					placeholder='blur'
					blurDataURL={
						'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////2wBDAf//////////////////////////////////////////////////////////////////////////////////////wAARCAACAAMDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwBaKKKAP//Z'
					}
					loading='lazy'
					quality={50}
					alt={session?.user?.name || 'user profile'}
				/>
			),
		},
	];

	const toggler = () => {
		setResults([]);
		setDrawerOpen(false);
	};

	return (
		<ul className='flex w-full dark:bg-black justify-around md:justify-start md:space-y-4 items-center sm:items-start flex-row md:flex-col'>
			{navList.map((list) => (
				<li
					role='listitem'
					key={list.id}
					className={` font-light p-2 md:p-3 text-base hover:bg-gray-200  rounded-full w-fit md:w-full dark:hover:bg-[#b9b9b917] hover:bg-[#a8a8a817] ${
						list.id === 2 || list.id === 5 ? 'hidden md:block' : ''
					} ${list.id === 8 ? 'hidden md:block' : ''} ${
						pathname === list.path ? 'font-semibold' : ''
					}`}
				>
					{list.id === 2 ? (
						<button
							role='button'
							type='button'
							name='search'
							title='search'
							disabled={session ? false : true}
							className='flex space-x-2 cursor-pointer'
							onClick={() => setDrawerOpen(!drawerOpen)}
						>
							{list.icon}
							<span className={`${drawerOpen ? 'hidden' : 'hidden lg:block'}`}>
								{list.title}
							</span>
						</button>
					) : (
						<Link
							href={list.path}
							onClick={toggler}
							title={list.title}
							role='link'	
						>
							<button
								disabled={session ? false : true}
								title={list.title}
								className='flex space-x-2'
								name={list.title}
								type='button'
							>
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
}
