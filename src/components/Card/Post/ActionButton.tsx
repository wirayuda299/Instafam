import { IUserPostProps } from '@/types/post';
import { Dispatch, SetStateAction } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { FaRegComment } from 'react-icons/fa';
import { RiBookmarkFill } from 'react-icons/ri';
import { BiBookmark } from 'react-icons/bi';
import { useRouter } from 'next/router';

type Props = {
	post: IUserPostProps;
	uid: string;
	setCommentOpen: Dispatch<SetStateAction<boolean>>;
	commentOpen: boolean;
	likes: string[];
	savedPosts: string[];
};

export default function ActionButton({
	post,
	commentOpen,
	setCommentOpen,
	uid,
	likes,
	savedPosts,
}: Props) {
	const router = useRouter();
	 const refreshData = () => {
		router.replace(router.asPath);
	}
	return (
		<div className='flex items-center justify-between mt-3 mb-2 p-1 relative'>
			<div className='flex gap-x-5'>
				<button
					onClick={async () => {
						const handleLike = await import('@/helper/like');
						handleLike.handleLikes(post, uid, refreshData);
			
					}}
					name='like'
					title='Like'
					type='button'
					className='transition-all ease duration-500'
				>
					{likes?.includes(uid) ? (
						<AiFillHeart className='text-3xl text-red-600 ' />
					) : (
						<AiOutlineHeart className='text-3xl hover:text-gray-500' />
					)}
				</button>
				<button
					onClick={() => setCommentOpen(!commentOpen)}
					name='comment'
					title='comment'
					type='button'
				>
					<FaRegComment className='text-3xl hover:text-gray-500' />
				</button>
			</div>
			<button
				onClick={async () => {
					const handleSavePost = await import('@/helper/savePost');
					handleSavePost.savePost(post, uid, refreshData);
					
				}}
				name='save post'
				type='button'
				title='save post'
			>
				{savedPosts?.includes(post.postId) ? (
					<RiBookmarkFill className='text-3xl' />
				) : (
					<BiBookmark className='text-3xl hover:text-gray-500' />
				)}
			</button>
		</div>
	);
}
