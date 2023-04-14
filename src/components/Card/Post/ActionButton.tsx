import { IUserPostProps } from '@/types/post';
import { Dispatch, SetStateAction } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { FaRegComment } from 'react-icons/fa';
import { RiBookmarkFill } from 'react-icons/ri';
import { BiBookmark } from 'react-icons/bi';
import { IoPaperPlaneOutline } from 'react-icons/io5';

type Props = {
	post: IUserPostProps;
	uid: string;
	setCommentOpen: Dispatch<SetStateAction<boolean>>;
	commentOpen: boolean;
	likes: string[];
	savedPosts: string[];
	refreshData: () => void;
	ssr: boolean;
};

export default function ActionButton({
	post,
	commentOpen,
	setCommentOpen,
	uid,
	likes,
	savedPosts,
	refreshData,
	ssr,
}: Props) {
	const ACTION_BUTTON_LIST = [
		{
			id: 1, 
			icon: likes.includes(uid) ? <AiFillHeart className='text-2xl sm:text-3xl text-red-600 animate-popUp ' /> : <AiOutlineHeart className='text-2xl sm:text-3xl hover:text-gray-500' />,
			onClick: async () => {
				const { handleLikes } = await import('@/helper/like');
				const Likes = {
					post,
					uid,
					refreshData,
					ssr,
				};
				handleLikes(Likes);
			}
		},
		{
			id: 2,
			icon: <FaRegComment className='text-2xl sm:text-3xl hover:text-gray-500' />,
			onClick: () => setCommentOpen(!commentOpen)

		},
		{
			id: 3,
			icon: <IoPaperPlaneOutline className='text-2xl sm:text-3xl hover:text-gray-500' />,
			onClick: async () => {
				const { share } = await import('@/util/share');
				share(post, `${process.env.NEXTAUTH_URL}/post/${post.postId}`);
			}
		}
	]
	return (
		<div className='flex items-center justify-between mt-3 mb-2 p-1 relative'>
			<div className='flex gap-x-5'>
			{ACTION_BUTTON_LIST.map((action) => (
				<button key={action.id} onClick={action.onClick} name='action button' type='button' title='action button'>
					{action.icon}
				</button>
			))}
			</div>
			<button
				onClick={async () => {
					const savedPostArgs = {
						post,
						uid,
						refreshData,
						ssr,
					};
					const { savePost } = await import('@/helper/savePost');
					savePost(savedPostArgs);
				}}
				name='save post'
				type='button'
				title='save post'
			>
				{savedPosts?.includes(post.postId) ? (
					<RiBookmarkFill className='text-2xl sm:text-3xl' />
				) : (
					<BiBookmark className='text-2xl sm:text-3xl hover:text-gray-500' />
				)}
			</button>
		</div>
	);
}
