import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getCreatedDate } from '@/util/postDate';
import { IUser } from '@/types/user';
import { IUserPostProps } from '@/types/post';
type Props = {
	currentuserUid: string;
	post: IUserPostProps;
	username: string;
	users: IUser;
};

export default function Postheader({
	currentuserUid,
	post,
	username,
	users,
}: Props) {
	const [createdDate, setCreatedDate] = useState<string>('');

	useEffect(() => {
		setCreatedDate(getCreatedDate(post));
	}, [post, currentuserUid]);
	return (
		<div className='flex items-center px-4 py-3 h-fit'>
			<Image
				className='h-8 w-8 rounded-full object-cover'
				alt={post?.author ?? 'user profile'}
				width={50}
				height={50}
				loading='lazy'
				placeholder='blur'
				blurDataURL={
					'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////2wBDAf//////////////////////////////////////////////////////////////////////////////////////wAARCAACAAMDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwBaKKKAP//Z'
				}
				sizes='50px'
				src={post?.postedByPhotoUrl || ''}
			/>
			<div className='ml-3 w-full flex justify-between items-center'>
				<div>
					<Link
						href={`/profile/${post.postedById}`}
						className='text-sm font-semibold antialiased block leading-tight'
					>
						{post?.author}
						<span
							className={`text-xs font-thin text-gray-500 antialiased block leading-tight `}
						>
							{createdDate}
						</span>
					</Link>
				</div>

				<div>
					{currentuserUid === post.postedById ? (
						<button
							onClick={async () => {
								const dlete = await import('@/helper/deletePost');
								dlete.deletePost(post);
							}}
							type='button'
							name='delete'
							title='delete'
							className='text-xs antialiased block leading-tight text-red-600'
						>
							Delete
						</button>
					) : (
						<button
							type='button'
							name='follow'
							title='follow'
							onClick={async () => {
								const follow = await import('@/helper/follow');
								follow.handleFollow(post.postedById, currentuserUid, username);
							}}
							className='text-xs antialiased block leading-tight'
						>
							{users?.following?.find(
								(user: { userId: string }) => user.userId === post.postedById
							)
								? 'Following'
								: 'Follow'}
						</button>
					)}
				</div>
			</div>
		</div>
	);
}
