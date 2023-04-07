import { HeaderProps } from './Header';
import { useRouter } from 'next/router';
interface Menusprops extends HeaderProps {
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	isOpen: boolean;
	session: any;
	refreshData: () => void;
}
export default function Menus({
	session,
	post,
	users,
	setIsOpen,
	isOpen,
	refreshData,
}: Menusprops) {
	const router = useRouter();
	const buttonLists = [
		{
			id: 1,
			name: post.postedById === session?.user.uid ? 'Edit' : 'Report',
			event: () => {
				post.postedById === session?.user.uid
					? console.log('edit')
					: console.log('report');
			},
		},
		{
			id: 2,
			name:
				post.postedById === session?.user.uid
					? 'Delete'
					: users?.following.find(
							(user: { userId: string }) => user.userId === post.postedById
					  )
					? 'Unfollow'
					: 'Follow',
			event: async () => {
				const { handleFollow } = await import('@/helper/follow');
				await handleFollow(
					post.postedById,
					session?.user.uid,
					session?.user.username,
					refreshData
				);
			},
		},
		{
			id: 3,
			name: 'Copy Link',
			event: async () => {
				const { copyLink } = await import('@/util/copyLink');
				copyLink(`${process.env.NEXTAUTH_URL}/post/${post.postId}`);
			},
		},
		{
			id: 4,
			name: 'Go to post',
			event: () => router.push(`/post/${post.postId}`),
		},
		{
			id: 5,
			name: 'About this account',
			event: () => console.log('about this account'),
		},

		{
			id: 6,
			name: 'Share to',
			event: async () => {
				const { share } = await import('@/util/share');
				share(post, `${process.env.NEXTAUTH_URL}/post/${post.postId}`);
			},
		},
		{
			id: 7,
			name: 'Cancel',
			event: () => setIsOpen(false),
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
							onClick={button.event}
						>
							<button>{button.name}</button>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
