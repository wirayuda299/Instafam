import { db } from '@/config/firebase';
import { handleComment } from '@/helper/comments';
import { IUserPostProps } from '@/types/post';
import { onSnapshot, doc } from 'firebase/firestore';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';

interface IProps {
	post: IUserPostProps;
	comment: string;
	setComment: Dispatch<SetStateAction<string>>;
	uid: string;
	username: string;
	setCommentOpen: Dispatch<SetStateAction<boolean>>;
	commentOpen: boolean;
}

export const PostComment: FC<IProps> = ({
	post,
	comment,
	setComment,
	uid,
	username,
	commentOpen,
}) => {
	const [currentComments, setCurrentComments] = useState<any[]>(post.comments);

	useEffect(() => {
		const unsub = onSnapshot(doc(db, 'posts', `post-${post.postId}`), (doc) => {
			if (doc.exists()) {
				setCurrentComments(doc.data().comments);
			}
		});
		return () => unsub();
	}, [post.postId, db]);

	return (
		<div>
			<form
				className='py-1 px-1'
				onSubmit={(e) =>
					handleComment(e, comment, post, setComment, uid, username)
				}
			>
				<input
					type='text'
					placeholder='Add a comment...'
					value={comment}
					className='focus:outline-none bg-transparent text-xs'
					onChange={(e) => setComment(e.target.value)}
				/>
			</form>
			<div className={`p-1 pb-2 ${commentOpen ? 'block' : 'hidden'}`}>
				{post.comments.length < 1 ? (
					<p className='text-xs text-center'>There&apos;s no comment yet</p>
				) : ( 
					currentComments.map((comment) => (
						<div className='flex space-x-2 items-center' key={comment.comment}>
							<h5 className='font-semibold text-sm'>{comment.commentByName}</h5>
							<p className='text-xs font-normal'>{comment.comment}</p>
						</div>
					))
				)}
			</div>
		</div>
	);
};
