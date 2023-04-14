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
	isr: boolean;
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
	isr,
}: Props) {
	return (
		<div className='flex items-center justify-between mt-3 mb-2 p-1 relative'>
			<div className='flex gap-x-5'>
				<button
					onClick={async () => {
						const { handleLikes } = await import('@/helper/like');
						const Likes = {
							post,
							uid,
							refreshData,
							ssr,
							isr,
						};
						handleLikes(Likes);
					}}
					name='like'
					title='Like'
					type='button'
					className='transition-all ease duration-500'
				>
					{likes?.includes(uid) ? (
						<AiFillHeart className='text-2xl sm:text-3xl text-red-600 animate-popUp ' />
					) : (
						<AiOutlineHeart className='text-2xl sm:text-3xl hover:text-gray-500' />
					)}
				</button>

				<button
					onClick={() => setCommentOpen(!commentOpen)}
					name='comment'
					title='comment'
					type='button'
				>
					<FaRegComment className='text-2xl sm:text-3xl hover:text-gray-500' />
				</button>
				<button
					type='button'
					name='share'
					title='share'
					onClick={async () => {
						const { share } = await import('@/util/share');
						share(post, `${process.env.NEXTAUTH_URL}/post/${post.postId}`);
					}}
				>
					<IoPaperPlaneOutline className='text-2xl sm:text-3xl hover:text-gray-500' />
				</button>
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
