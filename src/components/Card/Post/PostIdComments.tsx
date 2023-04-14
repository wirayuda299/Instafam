import Image from 'next/image';
import { IUserPostProps } from '@/types/post';
import { getCommentcreatedAt, getCreatedDate } from '@/util/postDate';
import { Dispatch, SetStateAction } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { AiOutlineHeart } from 'react-icons/ai';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import useUser from '@/hooks/useUser';
import useAuth from '@/hooks/useAuth';
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

export default function PostIdComments({
	post,
	refreshData,
	commentOpen,
	setCommentOpen,
}: Props) {
	const { session } = useAuth();
	const { user } = useUser(session?.user.uid as string);

	return (
		<div className=' relative '>
			<div className='py-3 hidden lg:block h-full max-h-[400px] overflow-y-auto overflow-x-hidden '>
				<div className='flex border-b px-2 w-full sticky -top-3 transition-all ease duration-300 py-3 bg-white dark:bg-black border-gray-500 border-opacity-50'>
					<div className='flex-1 flex items-start space-x-2'>
						<div className='flex space-x-2 cursor-pointer'>
							<Image
								src={post?.postedByPhotoUrl}
								width={40}
								height={40}
								priority
								alt={post?.author ?? 'post'}
								className='rounded-full bg-gradient-to-bl from-pink-600 to-orange-600 p-0.5'
							/>
							<div className='cursor-pointer'>
								<h4 className='font-semibold pr-1'>{post?.author}</h4>
								<p className='text-xs text-gray-500'>{getCreatedDate(post)}</p>
							</div>
						</div>
						&#8226;
						<button
							className='text-xs font-semibold pt-1'
							type='button'
							name='follow and unfollow'
							title='folow and unfollow'
							onClick={async () => {
								const { handleFollow } = await import('@/helper/follow');
								const followArgs = {
									id: post?.postedById as string ?? '',
									uid: session?.user.uid as string,
									followedByName: session?.user.username as string,
									refreshData,
									ssr: true,
								};

								handleFollow(followArgs);
							}}
						>
							{user &&
							user?.following?.find(
								(user: { userId: string }) => user?.userId === post?.postedById ?? ''
							)
								? 'Following'
								: 'Follow'}
						</button>
					</div>
					<button type='button' name='options' title='options'>
						<BsThreeDots />
					</button>
				</div>
				<Link
					href={`/profile/${post?.postedById}`}
					className='flex-1 mb-5 flex bg-white dark:bg-black space-x-2 px-2 py-3 '
				>
					<Image
						src={post?.postedByPhotoUrl ?? ''}
						width={40}
						height={40}
						alt={post?.author ?? 'author'}
						priority
						className='rounded-full bg-gradient-to-bl from-pink-600 to-orange-600 p-0.5'
					/>
					<h4 className='font-semibold pr-3'>
						{post?.author}
						<span className='text-xs block text-gray-500 pt-0'>
							{getCreatedDate(post)}
						</span>
					</h4>
					<p>{post?.captions ?? ''}</p>
				</Link>
				{/* comments */}
				{post && post?.comments?.length === 0 && (
					<div className='flex-1 flex items-center bg-white dark:bg-black space-x-2 px-2 py-3 w-full'>
						<p className='text-center'>There is no comments yet</p>
					</div>
				)}
				{post?.comments?.map((comment) => (
					<div
						className='w-full flex gap-x-14 mb-5 pr-2'
						key={comment?.comment}
					>
						<div className='py-2 px-2 flex items-center space-x-2 '>
							<Image
								src={comment?.commentByPhoto}
								width={40}
								height={40}
								alt={comment?.commentByName ?? 'comment'}
								className='rounded-full'
							/>
							<Link
								href={`/profile/${comment?.commentByUid}`}
								className='text-sm font-semibold'
							>
								{comment?.commentByName}
								<small className='block text-xs font-semibold text-gray-500'>
									{getCommentcreatedAt(comment)}
								</small>
							</Link>
						</div>
						<div className='w-full flex-wrap overflow-hidden'>
							<p className=' text-xs flex flex-wrap h-full pt-3'>
								{comment?.comment}
							</p>
						</div>
						<button type='button' name='like comment' title='like comment'>
							<AiOutlineHeart size={15} />
							<small className='text-gray-500'>1</small>
						</button>
					</div>
				))}

				{/* comments end */}
				<div className='hidden lg:block absolute bottom-0 border-t border-gray-500 border-opacity-50 w-full px-2'>
					<ActionButton
						ssr={true}
						refreshData={refreshData}
						commentOpen={true}
						likes={post?.likedBy}
						post={post ?? []}
						savedPosts={[]}
						setCommentOpen={setCommentOpen}
						uid={session?.user.uid as string}
					/>
					<span
						className={`text-xs pl-1 ${
							post?.likedBy?.length < 1 ? 'hidden' : 'block'
						}`}
					>
						{post?.likedBy?.length} likes
					</span>
					<div className='py-2'>
						<Comments
							post={post ?? []}
							commentOpen={commentOpen}
							comments={post?.comments}
							session={session}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
