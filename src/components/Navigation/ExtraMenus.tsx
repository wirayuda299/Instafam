import { extraListToggler } from '@/store/extraListToggler';
import {  useSession } from 'next-auth/react';
import { AiOutlineWarning } from 'react-icons/ai';
import { BsFillGearFill, BsFillMoonStarsFill } from 'react-icons/bs';
import { RxCountdownTimer } from 'react-icons/rx';
import { useRecoilState } from 'recoil';
import { useEffect } from 'react';
import { handleSignOut } from '@/helper/signout';
interface INavProps {
	id: number;
	title: string;
	path: string;
	icon: JSX.Element | string;
}

export default function ExtraMenus() {
	const [extraListOpen, setExtraListOpen] = useRecoilState(extraListToggler);
	const { data: session } = useSession();
	const extraList: INavProps[] = [
		{
			id: 1,
			icon: <BsFillGearFill className='text-2xl text-black dark:text-white' />,
			path: '/settings',
			title: 'Settings',
		},

		{
			id: 2,
			icon: (
				<BsFillMoonStarsFill className='text-2xl text-black dark:text-white' />
			),
			path: '/switch-appearance',
			title: 'Switch Appearance',
		},
		{
			id: 3,
			icon: (
				<RxCountdownTimer className='text-2xl text-black dark:text-white' />
			),
			path: '/activity',
			title: 'Activity',
		},
		{
			id: 4,
			icon: (
				<AiOutlineWarning className='text-2xl text-black dark:text-white' />
			),
			path: '/report',
			title: 'Report',
		},
		{
			id: 5,
			icon: '',
			path: '/switch-account',
			title: 'Switch Account',
		},
		{
			id: 6,
			icon: '',
			path: '',
			title: 'Log Out',
		},
	];
	
	useEffect(() => {
		window.addEventListener('resize', () => {
			setExtraListOpen(false);
		});
		return () => {
			window.removeEventListener('resize', () => {
				setExtraListOpen(false);
			});
		};
	}, []);

	return (
		<div
			className={` flex-col justify-center w-full space-y-1 lg:space-y-3 relative  ${
				extraListOpen ? 'flex animate-fadeIn' : 'animate-fadeOut hidden'
			}`}
		>
			<div
				className={`bg-white  rounded-md dark:bg-black dark:bg-opacity-95 dark:text-white py-4 -left-0 md:-top-[330px] lg:-top-[300px] md:bg-opacity-85 w-full sm:w-44 md:w-60  ${
					extraListOpen ? ' absolute  block z-[999] ' : 'hidden'
				}`}
			>
				<ul className='w-full px-2'>
					{extraList.map((list) => (
						<li
							key={list.id}
							className='py-2 truncate md:py-3 border-b dark:border-b-0  hover:bg-gray-200  transition-all ease duration-300 rounded-full w-fit md:w-full dark:hover:bg-[#b9b9b917] hover:bg-[#a8a8a817] px-5'
							title={list.title}
						>
							<button
								onClick={() => list.id === 6 ? handleSignOut(session ) : undefined}
								className='w-full flex items-center space-x-2 gap-2 justify-between'
								type='button'
								name={list.title}
								title={list.title}
							>
								<span className='font-semibold text-sm md:text-base md:font-medium'>
									{list.title}
								</span>
								<span>{list.icon}</span>
							</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
