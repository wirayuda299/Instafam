import { IUserPostProps } from '@/types/post';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { FaRegComment } from 'react-icons/fa';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { RiBookmarkFill } from 'react-icons/ri';
import { BiBookmark } from 'react-icons/bi';

type Props = {
	post: IUserPostProps;
	uid: string;
	setCommentOpen: Dispatch<SetStateAction<boolean>>;
	commentOpen: boolean;
};

export default function ActionButton({
	post,
	commentOpen,
	setCommentOpen,
	uid,
}: Props) {
	const [likes, setLikes] = useState<string[]>([]);
	const [savedPosts, setSavedPosts] = useState<string[]>([]);

	useEffect(() => {
		onSnapshot(doc(db, 'posts', `post-${post.postId}`), (doc) => {
			if (doc.exists()) {
				setLikes(doc.data().likedBy);
			}
		});
	}, [db]);
	useEffect(() => {
		const unsub = onSnapshot(doc(db, 'users', `${uid}`), (doc) => {
			const savedPosts = doc.data()?.savedPosts;
			setSavedPosts(savedPosts.map((post: { postId: string }) => post.postId));
		});
		return () => unsub();
	}, [db]);

	return (
		<div className='flex items-center justify-between mt-3 mb-2 p-1'>
			<div className='flex gap-x-5'>
				<button
					onClick={async () => {
						const handleLike = await import('@/helper/like');
						handleLike.handleLikes(post, uid);
					}}
					data-postid={post.postId}
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
					handleSavePost.savePost(post, uid);
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
