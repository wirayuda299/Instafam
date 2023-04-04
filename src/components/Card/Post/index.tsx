import { memo, useEffect, useState } from 'react';
import { IUserPostProps } from '@/types/post';
import Image from 'next/image';
import ActionButton from './ActionButton';
import PostHeader from './Header';
import Author from './Author';
import Comments, { IComment } from './Comments';
import { db } from '@/config/firebase';
import { DocumentData, doc, onSnapshot } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { IUser } from '@/types/user';
export interface ICommentsProps {
	comment: string;
	commentByName: string;
	commentByUid: string;
}
export interface IPostCardProps {
	post: IUserPostProps;
	id: string | undefined
}

function PostCard({post, id}: IPostCardProps) {
	const [comment, setComment] = useState<IComment[]>([]);
	const [likesCount, setLikesCount] = useState<string[]>([]);
	const [commentOpen, setCommentOpen] = useState<boolean>(false);
	const [savedPosts, setSavedPosts] = useState<string[]>([]);
	const [users, setUsers] = useState<DocumentData>();
	const { data: session } = useSession();
	useEffect(() => {
		const unsub = onSnapshot(doc(db, 'posts', `post-${post.postId}`), (doc) => {
			if (doc.exists()) {
				setLikesCount(doc.data().likedBy);
				setComment(doc.data().comments);
			}
		});
		return () => unsub();
	}, [db]);

	useEffect(() => {
		const unsub = onSnapshot(
			doc(db, 'users', `${session?.user.uid}`),
			(docs) => {
				if (docs.exists()) {
					setUsers(docs.data());
					setSavedPosts(
						docs
							.data()
							.savedPosts.map((post: { postId: string }) => post.postId)
					);
				}
			}
		);
		return () => unsub();
	}, [db, post]);
	
	

	return (
		<div className='w-full mb-5' id={id} >
			<div className='bg-white shadow-lg  dark:bg-black dark:border-black dark:text-white rounded-sm '>
				<PostHeader
					users={users as IUser}
					currentuserUid={session?.user?.uid as string}
					post={post}
					username={session?.user.username as string}
				/>
				<Image
					src={post?.image}
					width={1300}
					height={1300}
					sizes='`100vw'
					placeholder='blur'
					blurDataURL={'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////2wBDAf//////////////////////////////////////////////////////////////////////////////////////wAARCAACAAMDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwBaKKKAP//Z'}
					priority
					quality={65}
					className='object-cover w-full h-auto rounded-lg'
					alt={post?.author ?? 'user post image'}
				/>
				<ActionButton
					savedPosts={savedPosts}
					likes={likesCount}
					post={post}
					uid={session?.user?.uid as string}
					commentOpen={commentOpen}
					setCommentOpen={setCommentOpen}
				/>
				<p
					className={`font-light text-xs px-1 mt-1 mb-4 tracking-wider ${
						likesCount.length < 1 ? 'hidden' : 'block'
					}`}
				>
					<span>{likesCount.length} likes</span>
				</p>
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
export default memo(PostCard);