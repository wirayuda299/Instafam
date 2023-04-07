import { db } from '@/config/firebase';
import { IUserPostProps } from '@/types/post';
import { doc, arrayUnion, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { Suspense } from 'react';
export type IComment = Pick<IUserPostProps, 'comments'>;

type Props = {
	post: IUserPostProps;
	session: any;
	commentOpen: boolean;
	comments: IComment['comments'];
};

export default function Comments({
	post,
	commentOpen,
	comments,
	session,
}: Props) {
	const { register, handleSubmit, resetField } = useForm();
	const defaultValues = {
		comments: '',
	};
	const router = useRouter();
	const refreshData = () => {
		router.replace(router.asPath);
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
					commentByPhoto: session?.user.image as string,
					createdAt: Date.now(),
					id: crypto.randomUUID()
				}),
			}).then(() => {
				resetField('comments');
			});
			refreshData();
		} catch (error: any) {
			console.log(error.message);
		}
	};
	
	return (
		<div className={router.pathname === '/post/[id]' ? 'flex flex-col-reverse ' : 'block'}>
			<form className='py-1 px-1' onSubmit={handleSubmit(handleSubmits)}>
				<input
					type='text'
					placeholder='Add a comment...'
					autoComplete='off'
					autoFocus={false}
					defaultValue={defaultValues.comments}
					{...register('comments')}
					className='focus:outline-none w-full bg-transparent text-xs'
				/>
			</form>
			<Suspense fallback={'loading....'}>
			<div className={`py-2 ${commentOpen ? 'block' : 'hidden'} ${router.pathname === '/post/[id]' ? 'pt-5 ' : ''}}`}>
				{post?.comments.length < 1 ? (
					<p className='text-xs text-center'>There&apos;s no comment yet</p>
				) : (
					comments && comments?.map((comment) => (
						<div
							className='flex space-x-2 items-center flex-wrap pb-2'
							key={comment.comment}
						>
							<div className='flex items-center space-x-3'>
							<Image
								src={comment.commentByPhoto}
								alt={comment.comment}
								width={40}
								height={40}
								className='rounded-full w-8 h-8'
							/>
								<h3 className='font-bold text-xs '>{comment.commentByName}</h3>
								<p className='text-xs font-extralight text-gray-400'>
									{comment.comment}
								</p>
							</div>
						</div>
					))
				)}
			</div>
			</Suspense>
		</div>
	);
}
