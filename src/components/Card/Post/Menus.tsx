import { HeaderProps } from './Header';
interface Menusprops extends HeaderProps {
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	isOpen: boolean;
}
export default function Menus({
	currentuserUid,
	post,
	users,
	setIsOpen,
	isOpen,
}: Menusprops) {
	const buttonLists = [
		{
			id: 1,
			name: post.postedById === currentuserUid ? 'Edit' : 'Report',
		},
		{
			id: 2,
			name:
				post.postedById === currentuserUid
					? 'Delete'
					: users?.following.find((user) => user.userId === post.postedById)
					? 'Unfollow'
					: 'Follow',
		},
		{
			id: 3,
			name: 'Copy Link',
		},
		{
			id: 4,
			name: 'Go to post',
		},
		{
			id: 5,
			name: 'About this account',
		},
		{
			id: 6,
			name: 'Add to your interests',
		},
		{
			id: 7,
			name: 'Share to',
		},
		{
			id: 8,
			name: 'Cancel',
		},
	];
	return (
		<div
			className={` absolute aspect-square right-0 z-50 top-[57px] w-full rounded-md bg-white dark:bg-black dark:bg-opacity-90 ring-1 ring-black ring-opacity-5 focus:outline-none transition-all ${
				isOpen ? 'block  ' : 'hidden'
			}`}
		>
			<div className='py-1  rounded-lg transition-all'>
				<div className='p-3'>
					{buttonLists.map((button) => (
						<div
							key={button.id}
							className={`text-center border-b py-2 border-gray-500 border-opacity-30 text-xs sm:text-sm sm:py-3 md:py-4 font-semibold ${
								button.id === 1 || button.id === 2
									? 'text-red-600'
									: 'dark:text-white text-black'
							}`}
							onClick={button.id === 8 ? () => setIsOpen(false) : undefined}
						>
							<button>{button.name}</button>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
