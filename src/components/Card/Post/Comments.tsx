import { db } from '@/config/firebase';
import { IUserPostProps } from '@/types/post';
import {
	onSnapshot,
	doc,
	getDoc,
	arrayUnion,
	updateDoc,
} from 'firebase/firestore';
import { Session } from 'next-auth';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface IProps {
	post: IUserPostProps;
	session: Session | null;
	setCommentOpen: Dispatch<SetStateAction<boolean>>;
	commentOpen: boolean;
}

interface IComment {
	comment: string;
	commentByName: string;
	commentByUid: string;
}

export const PostComment: FC<IProps> = ({ post, session, commentOpen }) => {
	const [currentComments, setCurrentComments] = useState<IComment[]>(post.comments);
	const { register, handleSubmit, resetField } = useForm();
	const defaultValues = {
		comments: '',
	};
	const handleSubmits = async (e: any) => {
		if (e.comments === '') return;
		try {
			const postRef = doc(db, 'posts', `post-${post.postId}`);
			const res = await getDoc(postRef);
			if (res.exists()) {
				await updateDoc(postRef, {
					comments: arrayUnion({
						commentByUid: session?.user.uid as string,
						comment: e.comments,
						commentByName: session?.user.username as string,
					}),
				}).then(() => {
					resetField('comments');
				});
			}
		} catch (error: any) {
			console.log(error.message);
		}
	};

	useEffect(() => {
		onSnapshot(doc(db, 'posts', `post-${post.postId}`), (doc) => {
			if (doc.exists()) {
				setCurrentComments(doc.data().comments);
			}
		});
	}, [db]);

	return (
		<div>
			<form className='py-1 px-1' onSubmit={handleSubmit(handleSubmits)}>
				<input
					type='text'
					placeholder='Add a comment...'
					defaultValue={defaultValues.comments}
					{...register('comments')}
					className='focus:outline-none bg-transparent text-xs'
				/>
			</form>
			<div className={`p-1 pb-2 ${commentOpen ? 'block' : 'hidden'}`}>
				{post.comments.length < 1 ? (
					<p className='text-xs text-center'>There&apos;s no comment yet</p>
				) : (
					currentComments.map((comment) => (
						<div className='flex space-x-2 items-center' key={comment.comment}>
							<h3 className='font-semibold text-sm'>{comment.commentByName}</h3>
							<p className='text-xs font-normal'>{comment.comment}</p>
						</div>
					))
				)}
			</div>
		</div>
	);
};
