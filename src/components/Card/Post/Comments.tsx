import { db } from '@/config/firebase';
import { IUserPostProps } from '@/types/post';
import {  doc, arrayUnion, updateDoc } from 'firebase/firestore';
import { Session } from 'next-auth';
import { Dispatch, FC, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
export interface IComment {
	comment: string;
	commentByName: string;
	commentByUid: string;
}

interface IProps {
	post: IUserPostProps;
	session: Session | null;
	setCommentOpen: Dispatch<SetStateAction<boolean>>;
	commentOpen: boolean;
	comments: IComment[];
}


export const PostComment: FC<IProps> = ({ post, session, commentOpen, comments }) => {
	const { register, handleSubmit, resetField } = useForm();
	const defaultValues = {
		comments: '',
	};
	const handleSubmits = async (e: any) => {
		if (e.comments === '') return;
		try {
			const postRef = doc(db, 'posts', `post-${post.postId}`);
			await updateDoc(postRef, {
				comments: arrayUnion({
					commentByUid: session?.user.uid as string,
					comment: e.comments,
					commentByName: session?.user.username as string,
				}),
			}).then(() => {
				resetField('comments');
			});
		} catch (error: any) {
			console.log(error.message);
		}
	};

	return (
		<div>
			<form className='py-1 px-1' onSubmit={handleSubmit(handleSubmits)}>
				<input
					type='text'
					placeholder='Add a comment...'
					autoComplete='off'
					defaultValue={defaultValues.comments}
					{...register('comments')}
					className='focus:outline-none w-full bg-transparent text-xs'
				/>
			</form>
			<div className={`py-2 ${commentOpen ? 'block' : 'hidden'}`}>
				{post.comments.length < 1 ? (
					<p className='text-xs text-center'>There&apos;s no comment yet</p>
				) : (
					comments.map((comment) => (
						<div
							className='flex space-x-2 items-center flex-wrap pb-2'
							key={comment.comment}
						>
							<h3 className='font-bold text-xs '>{comment.commentByName}</h3>
							<p className='text-xs font-extralight text-gray-400'>
								{comment.comment}
							</p>
						</div>
					))
				)}
			</div>
		</div>
	);
};
