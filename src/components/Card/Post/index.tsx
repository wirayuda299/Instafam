import { useEffect, useState } from 'react';
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
}

export default function PostCard({ post }: IPostCardProps) {
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
		<div className='w-full mb-5'>
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
					blurDataURL={
						'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAACAAMDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAX/xAAbEAACAgMBAAAAAAAAAAAAAAAAAQIDBBEhUf/EABQBAQAAAAAAAAAAAAAAAAAAAAP/xAAWEQADAAAAAAAAAAAAAAAAAAAAATH/2gAMAwEAAhEDEQA/AL+VbZG+SjZJLS4m/AAG6Mof/9k='
					}
					loading='lazy'
					quality={55}
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
				<span
					className={`font-light text-xs px-1 mt-1 mb-4 tracking-wider ${
						likesCount.length < 1 ? 'hidden' : 'block'
					}`}
				>
					<span>{likesCount.length} likes</span>
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
