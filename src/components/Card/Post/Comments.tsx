import { IUserPostProps } from '@/types/post';
import { useRouter } from 'next/router';
import { FieldValues, useForm } from 'react-hook-form';
import Image from 'next/image';
import { Suspense } from 'react';
import { Session } from 'next-auth';
import { CommentSchemaProps } from '@/schema/comment';
export type IComment = Pick<IUserPostProps, 'comments'>;

type Props = {
	post: IUserPostProps;
	session: Session | null;
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

	const handleSubmits = async (e: FieldValues) => {
		if (e.comments === '') return;
		const { db } = await import('@/config/firebase');
		const { doc, updateDoc, arrayUnion } = await import('firebase/firestore');
		try {
			const postRef = doc(db, 'posts', `post-${post.postId}`);
			await updateDoc(postRef, {
				comments: arrayUnion({
					commentByUid: session?.user.uid as string,
					comment: e.comments,
					commentByName: session?.user.username as string,
					commentByPhoto: session?.user.image as string,
					createdAt: Date.now(),
				}),
			}).then(() => {
				resetField('comments');
			});
			refreshData();
		} catch (error: any) {
			console.log(error.message);
		}
	};

	const isValidProps = CommentSchemaProps.parse({
		post,
		commentOpen,
		comments,
		session,
	});

	if (!isValidProps) throw new Error('Invalid Props for Comments Component');

	return (
		<div
			className={
				router.pathname === '/post/[id]' ? 'flex flex-col-reverse ' : 'block'
			}
		>
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
				<div
					className={`py-2 ${commentOpen ? 'block' : 'hidden'} ${
						router.pathname === '/post/[id]' ? 'pt-5 ' : ''
					}}`}
				>
					{post?.comments?.length < 1 ? (
						<p className='text-xs text-center'>There&apos;s no comment yet</p>
					) : (
						comments &&
						comments?.map((comment) => (
							<div
								className='flex space-x-2 items-center flex-wrap pb-2'
								key={comment.comment}
							>
								<div className='flex items-center space-x-3'>
									<Image
										src={comment.commentByPhoto}
										alt={comment.comment}
										width={40}
										loading='lazy'
										placeholder='blur'
										blurDataURL={
											'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////2wBDAf//////////////////////////////////////////////////////////////////////////////////////wAARCAACAAMDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwBaKKKAP//Z'
										}
										height={40}
										className='rounded-full w-8 h-8'
									/>
									<h3 className='font-bold text-xs '>
										{comment.commentByName}
									</h3>
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
