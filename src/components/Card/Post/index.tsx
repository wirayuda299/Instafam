import { useEffect, useState } from 'react';
import { IUserPostProps } from '@/types/post';
import Image from 'next/image';
import { PostActions } from './ActionButton';
import { PostHeader } from './Header';
import { PostAuthor } from './Author';
import { PostComment } from './Comments';
import { db } from '@/config/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { rgbDataURL } from '@/util/colorPicker';

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
	const [comment, setComment] = useState<string>('');
	const [likesCount, setLikesCount] = useState<number>(0);
	const [commentOpen, setCommentOpen] = useState<boolean>(false);
	const { data: session } = useSession();

	useEffect(() => {
		const unsub = onSnapshot(doc(db, 'posts', `post-${post.postId}`), (doc) => {
			if (doc.exists()) {
				setLikesCount(doc.data().likedBy.length);
			}
		});
		return () => unsub();
	}, [post.postId]);

	return (
		<div className='w-full my-2'>
			<div className='bg-white shadow-lg  dark:bg-black dark:border-black dark:text-white rounded-sm '>
				<PostHeader
					currentuserUid={session?.user?.uid as string}
					followingLists={followingLists}
					post={post}
					username={session?.user.username as string}
				/>
				<Image
					src={post?.image}
					width={600}
					height={600}
					sizes='100vw'
					priority
					quality={55}
					placeholder='blur'
					blurDataURL={post.image}
					referrerPolicy='no-referrer'
					security='restricted'
					className=' object-cover w-full h-auto'
					alt={post?.author ?? 'user post image'}
					loader={({ src, width, quality }) => {
						return `${src}?w=${width}&q=${quality || 75}`;
					}}
				/>
				<PostActions
					post={post}
					uid={session?.user?.uid as string}
					commentOpen={commentOpen}
					setCommentOpen={setCommentOpen}
				/>
				<p
					className={`font-light text-xs px-1 mt-1 mb-4 tracking-wider ${
						likesCount < 1 ? 'hidden' : 'block'
					}`}
				>
					<span>{likesCount} likes</span>
				</p>
				<PostAuthor post={post} />
				<PostComment
					post={post}
					comment={comment}
					setComment={setComment}
					uid={session?.user?.uid as string}
					username={session?.user.username as string}
					commentOpen={commentOpen}
					setCommentOpen={setCommentOpen}
				/>
			</div>
		</div>
	);
}
