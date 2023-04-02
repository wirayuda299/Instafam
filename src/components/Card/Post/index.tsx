import { useEffect, useState } from 'react';
import { IUserPostProps } from '@/types/post';
import Image from 'next/image';
import ActionButton from './ActionButton';
import  PostHeader  from './Header';
import Author from './Author';
import Comments, { IComment } from './Comments';
import { db } from '@/config/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
export interface ICommentsProps {
	comment: string;
	commentByName: string;
	commentByUid: string;
}
export interface IPostCardProps {
	post: IUserPostProps;
	followingLists: { userId: string }[] | undefined;
}

export default function PostCard({ post, followingLists }: IPostCardProps) {
	const [comment, setComment] = useState<IComment[]>([]);
	const [likesCount, setLikesCount] = useState<number>(0);
	const [commentOpen, setCommentOpen] = useState<boolean>(false);
	const { data: session } = useSession();

	useEffect(() => {
		const unsub = onSnapshot(doc(db, 'posts', `post-${post.postId}`), (doc) => {
			if (doc.exists()) {
				setLikesCount(doc.data().likedBy.length);
				setComment(doc.data().comments);
			}
		});
		return () => unsub();
	}, [db]);

	return (
		<div className='w-full mb-5'>
			<div className='bg-white shadow-lg  dark:bg-black dark:border-black dark:text-white rounded-sm '>
				<PostHeader
					currentuserUid={session?.user?.uid as string}
					post={post}
					username={session?.user.username as string}
				/>
				<Image
					src={post?.image}
					width={1300}
					height={1300}
					sizes='`100vw'
					priority
					quality={55}
					className='object-cover w-full h-auto rounded-lg'
					alt={post?.author ?? 'user post image'}
				/>
				<ActionButton
					post={post}
					uid={session?.user?.uid as string}
					commentOpen={commentOpen}
					setCommentOpen={setCommentOpen}
				/>
				<span
					className={`font-light text-xs px-1 mt-1 mb-4 tracking-wider ${
						likesCount < 1 ? 'hidden' : 'block'
					}`}
				>
					<span>{likesCount} likes</span>
				</span>
				<Author post={post} />
				<Comments
					comments={comment}
					post={post}
					session={session}
					commentOpen={commentOpen}
				/>
			</div>
		</div>
	);
}
