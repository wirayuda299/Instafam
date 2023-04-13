import { memo, useEffect, useState } from 'react';
import { IUserPostProps } from '@/types/post';
import Image from 'next/image';
import { IComment } from './Comments';
import { db } from '@/config/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { IUser } from '@/types/user';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Session } from 'next-auth';
import { z } from 'zod';
import { PostSchema } from '@/schema/PostSchema';
import { SessionSchema } from '@/schema/comment';
import {sanitizeUrl} from '@braintree/sanitize-url'
const ActionButton = dynamic(() => import('./ActionButton'));
const PostHeader = dynamic(() => import('./Header'));
const Author = dynamic(() => import('./Author'));
const Comments = dynamic(() => import('./Comments'));
const PostModal = dynamic(() => import('./Modal'));

export interface IPostCardProps {
	post: IUserPostProps;
	ssr: boolean;
	session: Session | null
}
export const PostCardSchema = z.object({
	post: PostSchema,
	ssr: z.boolean(),
	session: SessionSchema
})
function PostCard({ post, ssr, session }: IPostCardProps) {
	const [comment, setComment] = useState<IComment['comments']>([]);
	const [likesCount, setLikesCount] = useState<string[]>([]);
	const [commentOpen, setCommentOpen] = useState<boolean>(false);
	const [savedPosts, setSavedPosts] = useState<string[]>([]);
	const [users, setUsers] = useState<IUser>();
	const { replace, asPath } = useRouter();
	const refreshData = () => replace(asPath);
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

	useEffect(() => {
		const unsub = onSnapshot(doc(db, 'posts', `post-${post.postId}`), (doc) => {
			if (doc.exists()) {
				setLikesCount(doc.data().likedBy);
				setComment(doc.data()?.comments);
			}
		});
		return () => unsub();
	}, [db]);

	useEffect(() => {
		const unsub = onSnapshot(
			doc(db, 'users', `${session?.user.uid}`),
			(docs) => {
				if (docs.exists()) {
					setUsers(docs.data() as IUser);
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

	const isValid = PostCardSchema.parse({ post, ssr, session })
	if (!isValid) throw new Error('Invalid Props for PostCard Component')

	return (
		<div className='w-full mb-5 relative'>
			<div className='bg-white shadow-lg dark:bg-black dark:border-black dark:text-white rounded-sm '>
				<PostHeader
					isMenuOpen={isMenuOpen}
					setIsMenuOpen={setIsMenuOpen}
					session={session}
					post={post}
				/>
				<Image
					src={sanitizeUrl(post?.image)}
					width={1300}
					height={1300}
					sizes='100vw'
					placeholder='blur'
					blurDataURL={
						'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////2wBDAf//////////////////////////////////////////////////////////////////////////////////////wAARCAACAAMDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwBaKKKAP//Z'
					}
					quality={60}
					priority
					className='object-cover w-full h-auto rounded-lg'
					alt={post?.author ?? 'user post image'}
				/>
				<ActionButton
					ssr={ssr}
					refreshData={refreshData}
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
				<PostModal
					isMenuOpen={isMenuOpen}
					post={post}
					refreshData={refreshData}
					session={session}
					setIsMenuOpen={setIsMenuOpen}
					ssr={ssr}
					users={users}
				/>
			</div>
		</div>
	);
}
export default memo(PostCard);
