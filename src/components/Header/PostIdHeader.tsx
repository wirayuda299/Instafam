import Image from 'next/image';
import { IUserPostProps } from '@/types/post';
import { getCreatedDate } from '@/util/postDate';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import useAuth from '@/hooks/useAuth';
import { Dispatch, SetStateAction } from 'react';
import { imageLoader } from '@/util/imageLoader';
const Comments = dynamic(() => import('@/components/Card/Post/Comments'));
const ActionButton = dynamic(
	() => import('@/components/Card/Post/ActionButton')
);

type Props = {
	post: IUserPostProps;
	commentOpen: boolean;
	setCommentOpen: Dispatch<SetStateAction<boolean>>;
	refreshData: () => void;
};

export default function PostIdHeader({
	post,
	commentOpen,
	refreshData,
	setCommentOpen,
}: Props) {
	const {session} = useAuth()

	return (
		<figure className='shadow-sm'>
			<div className='py-2 lg:hidden'>
				<Link
					href={`/profile/${post?.postedById}`}
					className='flex cursor-pointer items-center space-x-2'
				>
					<Image
						src={post?.postedByPhotoUrl ?? ''}
						width={40}
						priority
						height={40}
						className='rounded-full bg-gradient-to-bl from-pink-600 to-orange-600 p-0.5'
						alt={post?.captions ?? 'post'}
					/>
					<div>
						<h1 className='text-sm font-bold'>{post?.author}</h1>
						<p className='text-xs'>{getCreatedDate(post)}</p>
					</div>
				</Link>
			</div>
			<Image
				src={post?.image}
				width={1300}
				height={1300}
				sizes='100vw'
				placeholder='blur'
				quality={60}
				loader={() =>
					imageLoader({ src: post?.image, width: 1300, quality: 10 })
				}
				blurDataURL={
					'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////2wBDAf//////////////////////////////////////////////////////////////////////////////////////wAARCAACAAMDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwBaKKKAP//Z'
				}
				alt={post?.captions ?? 'post'}
				priority
				className='rounded-md lg:rounded-none h-full w-full'
			/>
			{/* action button mobile */}
			<div className='block lg:hidden'>
				<ActionButton
					ssr={true}
					refreshData={refreshData}
					commentOpen={commentOpen}
					likes={post?.likedBy}
					post={post}
					savedPosts={[]}
					setCommentOpen={setCommentOpen}
					uid={session?.user.uid as string}
				/>
				<figcaption className='text-2xl font-bold p-2 flex space-x-2 items-center'>
					<h2 className='text-sm'>{post?.author}</h2>
					<p className='text-xs break-words'>{post?.captions}</p>
				</figcaption>
				<Comments
					commentOpen={commentOpen}
					comments={post?.comments}
					post={post}
					session={session}
				/>
			</div>
		</figure>
	);
}
