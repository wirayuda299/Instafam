import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getCreatedDate } from '@/util/postDate';
import { IUser } from '@/types/user';
type Props = {
	currentuserUid: string;
	post: any;
	username: string;
	users: IUser;
};

export default function Postheader({ currentuserUid, post, username, users }: Props) {
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
				priority
				placeholder='blur'
				blurDataURL={post?.postedByPhotoUrl ?? ''}
				sizes='50px'
				src={post?.postedByPhotoUrl || ''}
			/>
			<div className='ml-3 w-full flex justify-between items-center'>
				<div>
					<Link
						href={`profile/${post.postedById}`}
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
			{/* <div className='relative flex justify-between items-center'>
				{currentuserUid !== post.postedById ? (
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
						<span
							className={`text-xs font-thin text-gray-500 antialiased block leading-tight `}
						>
							{createdDate}
						</span>
					</button>
				) : (
					<button
						type='button'
						name='delete'
						title='delete'
						className='text-xs antialiased block leading-tight'
					>
						Delete
					</button>
				)}
			</div> */}
		</div>
	);
}
