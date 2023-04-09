import { PostSchema } from '@/schema/PostSchema';
import { userSchema } from '@/schema/User';
import { SessionSchema } from '@/schema/comment';
import { IUserPostProps } from '@/types/post';
import { IUser } from '@/types/user';
import { Session } from 'next-auth';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import { z } from 'zod';
type Props = {
	post: IUserPostProps;
	session: Session | null ;
	users: IUser | undefined;
	refreshData: () => void;
	ssr: boolean;
	isMenuOpen: boolean;
	setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
};
const modalSchema = z.object({
	post:PostSchema,
	session: SessionSchema,
	users: userSchema.nullish(),
	refreshData: z.function().args(z.void()).returns(z.void()),
	ssr: z.boolean(),
	isMenuOpen: z.boolean(),
	setIsMenuOpen: z.function().args(z.boolean()).returns(z.void())

})
export default function Modal({
	post,
	session,
	users,
	refreshData,
	ssr,
	isMenuOpen,
	setIsMenuOpen,
}: Props) {
	const isValid = modalSchema.parse({ post, session, users, refreshData, ssr, isMenuOpen, setIsMenuOpen })
	if(!isValid) throw new Error('Invalid Props')	
	const { push } = useRouter();
	const buttonLists = [
		{
			id: 1,
			name: post.postedById === session?.user.uid ? 'Edit' : 'Report',
			event: () => {
				post.postedById === session?.user.uid
					? push(`/post/${post.postId}/edit`)
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
				if (post.postedById === session?.user.uid) {
					const { deletePost } = await import('@/helper/deletePost');
					deletePost(post, refreshData, ssr);
				} else {
					const { handleFollow } = await import('@/helper/follow');
					await handleFollow(
						post.postedById,
						session?.user.uid as string,
						session?.user.username as string,
						refreshData,
						ssr
					);
				}
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
			event: () => push(`/post/${post.postId}`),
		},
		

		{
			id: 5,
			name: 'Share to',
			event: async () => {
				const { share } = await import('@/util/share');
				share(post, `${process.env.NEXTAUTH_URL}/post/${post.postId}`);
			},
		},
		{
			id: 6,
			name: 'Cancel',
			event: () => setIsMenuOpen(false),
		},
	];
	
	return (
		<div
			className={` fixed left-0 top-0 z-[99999999] shadow-sm shadow-white  bg-black bg-opacity-60 text-black dark:text-white  h-screen w-full !overflow-x-hidden outline-none select-none ${
				isMenuOpen ? 'animate-popUp' : 'animate-fadeOut hidden'
			}`}
			aria-modal='true'
			role='dialog'
		>
			<div className='max-w-lg mx-auto h-full'>
				<div className='flex flex-col h-full justify-center items-center'>
					<div className='flex flex-col p-5 bg-white min-w-[400px] rounded-lg text-black dark:bg-black dark:text-white'>
						{buttonLists.map((button) => (
							<button
								type='button'
								name={button.name}
								title={button.name}
								key={button.id}
								onClick={button.event}
								className={`py-3 md:py-4 text-sm md:text-base hover:bg-[#a8a8a817] transition-all ease-out duration-300 rounded-lg font-semibold ${
									button.id === 1 || button.id === 2 ? 'text-red-600' : ''
								}`}
							>
								{button.name}
							</button>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
