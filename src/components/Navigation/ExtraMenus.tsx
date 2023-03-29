import { extraListToggler } from '../../store/extraListToggler';
import { getCsrfToken, signOut, useSession } from 'next-auth/react';
import { AiOutlineWarning } from 'react-icons/ai';
import { BsFillGearFill, BsFillMoonStarsFill } from 'react-icons/bs';
import { RxCountdownTimer } from 'react-icons/rx';
import { useRecoilState } from 'recoil';
import { useEffect } from 'react';
import { Url } from 'url';
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
	const handleSignOut = async () => {
		const url = require('url');
		const callbackUrl = `${process.env.NEXTAUTH_URL}/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F`;
		const parsedUrl = url.parse(callbackUrl, true);
		const getBaseUrl = (urlObj:any) => {
			const { protocol, host, pathname } = urlObj;
			return `${protocol}//${host}${pathname}`;
		};
		const baseUrl = getBaseUrl(parsedUrl);
		try {
			if (session) {
				const csrfToken = await getCsrfToken();
				if (!csrfToken) {
					throw new Error('No CSRF token');
				}

				await signOut({
					callbackUrl: baseUrl,
					redirect: true,
				});
			}
			return null;
		} catch (error: any) {
			console.log(error.message);
		}
	};
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
				extraListOpen ? 'flex' : 'hidden'
			}`}
		>
			<div
				className={`bg-white  rounded-md dark:bg-black dark:bg-opacity-95 dark:text-white py-4 -left-0 -top-[365px] md:bg-opacity-85 w-full sm:w-44 md:w-48 z-[9999] ${
					extraListOpen ? ' absolute block  ' : 'hidden'
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
								onClick={list.id === 6 ? handleSignOut : undefined}
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
