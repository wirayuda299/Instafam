import { handleLikes } from '@/helper/like';
import { savePost } from '@/helper/savePost';
import { IUserPostProps } from '@/types/post';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { FaRegComment } from 'react-icons/fa';
import { collection, doc, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { RiBookmarkFill } from 'react-icons/ri';
import { BiBookmark } from 'react-icons/bi';

interface IProps {
	post: IUserPostProps;
	uid: string;
	setCommentOpen: Dispatch<SetStateAction<boolean>>;
	commentOpen: boolean;
}

export const PostActions: FC<IProps> = ({
	post,
	uid,
	setCommentOpen,
	commentOpen,
}) => {
	const [likes, setLikes] = useState<string[]>([]);
	const [savedPosts, setSavedPosts] = useState<string[]>([]);
	

	useEffect(() => {
		onSnapshot(doc(db, 'posts', `post-${post.postId}`), (doc) => {
			if (doc.exists()) {
				setLikes(doc.data().likedBy);
			}
		});
	}, [post.postId, uid, db]);
	useEffect(() => {
		onSnapshot(
			query(collection(db, 'users'), where('uid', '==', `${uid}`)),
			(doc) => {
				if (doc.docs.length > 0 && doc.docs[0].exists()) {
					const data = doc.docs[0].get('savedPosts');
					setSavedPosts(data?.map((post: IUserPostProps) => post.postId));
				}
			}
		);
		return () => {
			setSavedPosts([]);
		};
	}, [db, uid]);
	


	return (
		<div className='flex items-center justify-between mt-3 mb-2 p-1'>
			<div className='flex gap-x-5'>
				<button
					onClick={() => handleLikes(post, uid)}
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
				onClick={() => savePost(post, uid)}
				name='save post'
				type='button'
			>
				{savedPosts?.includes(post.postId) ? (
					<RiBookmarkFill className='text-3xl' />
				) : (
					<BiBookmark className='text-3xl hover:text-gray-500' />
				)}
			</button>
		</div>
	);
};
