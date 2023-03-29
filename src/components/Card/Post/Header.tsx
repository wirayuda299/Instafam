import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { handleFollow } from '@/helper/follow';
import { IUserPostProps } from '@/types/post';
import { db } from '@/config/firebase';
import {
	query,
	collection,
	onSnapshot,
	where,
	DocumentData,
} from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { rgbDataURL } from '@/util/colorPicker';
import Link from 'next/link';

interface IProps {
	currentuserUid: string;
	post: DocumentData;
	followingLists: { userId: string }[] | undefined;
	username: string;
}

export const PostHeader: FC<IProps> = ({ post, currentuserUid, username }) => {
	const [createdDate, setCreatedDate] = useState<string>('');
	const [users, setUsers] = useState<DocumentData[]>([]);
	const { data: session } = useSession();

	useEffect(() => {
		const now = Date.now();
		const diff = now - Number(post.createdAt);

		const diffSeconds = Math.floor(diff / 1000);
		const diffMinutes = Math.floor(diff / (1000 * 60));
		const diffHours = Math.floor(diff / (1000 * 60 * 60));
		const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
		const diffWeeks = Math.floor(diff / (1000 * 60 * 60 * 24 * 7));
		const diffMonths = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
		const diffYears = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));

		let diffString;
		if (diffSeconds < 60) {
			diffString = 'just now';
		} else if (diffMinutes < 60) {
			diffString = `${diffMinutes} ${diffMinutes > 1 ? 'minutes' : 'minute'} ago`;
		} else if (diffHours < 24) {
			diffString = `${diffHours} ${diffHours > 1 ? 'hours' : 'hour'} ago`;
		} else if (diffDays < 7) {
			diffString = `${diffDays}  ${diffDays > 1 ? 'days' : 'day'} ago`;
		} else if (diffWeeks < 4) {
			diffString = `${diffWeeks} ${diffWeeks > 1 ? 'weeks' : 'week'} ago`;
		} else if (diffMonths < 12) {
			diffString = `${diffMonths}  ${diffMonths > 1 ? 'months' : 'month'} ago`;
		} else {
			diffString = `${diffYears}  ${diffYears > 1 ? 'years' : 'year'} ago`;
		}
		setCreatedDate(diffString);
	}, [post.postId, currentuserUid]);

	useEffect(() => {
		const unsub = onSnapshot(
			query(
				collection(db, 'users'),
				where('uid', '==', `${session?.user.uid}`)
			),
			(snapshot) => {
				setUsers(snapshot.docs.map((doc) => doc.data()));
			}
		);
		return () => unsub();
	}, [db, post, currentuserUid]);


	return (
		<div className='flex items-center px-4 py-3 h-fit'>
			<Image
				className='h-8 w-8 rounded-full avatar'
				alt={post?.author ?? 'user profile'}
				width={50}
				height={50}
				priority
				sizes='50px'
				src={post?.postedByPhotoUrl || ''}
			/>
			<div className='ml-3 flex-1'>
				<Link  href={`profile/${post.postedById}`} className='text-sm font-semibold antialiased block leading-tight'>
					{post?.author}
				</Link>

				<span
					className={`text-xs font-thin antialiased block leading-tight ${
						currentuserUid === post.postedById
							? 'hidden pointer-events-none'
							: ''
					}`}
				>
					{createdDate}
				</span>
			</div>
			<div className='relative flex justify-between items-center'>
				{currentuserUid !== post.postedById ? (
					<button
						onClick={() =>
							handleFollow(post.postedById, currentuserUid, username)
						}
						className='follBtn text-xs  antialiased block leading-tight'
					>
						{users[0]?.following?.find((user: { userId: string; }) => user.userId === post.postedById) ? (
							'Following'
						) : (
							'Follow'
						)
					}
					</button>
				) : (
					<p className='text-xs font-thin antialiased block leading-tight'>
						{createdDate}
					</p>
				)}
			</div>
		</div>
	);
};
