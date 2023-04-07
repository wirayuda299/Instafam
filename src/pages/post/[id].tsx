import { GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import { IUserPostProps } from '@/types/post';
import { getCommentcreatedAt, getCreatedDate } from '@/util/postDate';
import { useState, useEffect } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { useRouter } from 'next/router';
import { AiOutlineHeart } from 'react-icons/ai';
import dynamic from 'next/dynamic';
import Link from 'next/link';
const Comments = dynamic(() => import('@/components/Card/Post/Comments'));
const ActionButton = dynamic(() => import('@/components/Card/Post/ActionButton'));

export default function PostDetail({
	post,
	sessions,
	user,
}: {
	post: IUserPostProps;
	sessions: any;
	user: any;
}) {
	const [createdDate, setCreatedDate] = useState<string>('');
	const [commentOpen, setCommentOpen] = useState<boolean>(false);
	const router = useRouter();
	const refreshData = () => {
		router.replace(router.asPath);
	};

	useEffect(() => {
		setCreatedDate(getCreatedDate(post));
	}, [post]);

	return (
		<div className='w-full h-full text-black dark:text-white'>
			<div className='w-full h-full '>
				<div className='w-full h-screen max-w-5xl rounded-lg grid place-items-center mx-auto'>
					<div className='w-full max-h-[600px] grid grid-cols-1 lg:grid-cols-2 p-5 lg:p-0 relative border border-gray-500 border-opacity-50'>
						<figure className='shadow-sm'>
							<div className='py-2 lg:hidden'>
								<Link href={`/profile/${post.postedById}`} className='flex cursor-pointer items-center space-x-2'>
									<Image
										src={post.postedByPhotoUrl}
										width={40}
										priority
										height={40}
										className='rounded-full bg-gradient-to-bl from-pink-600 to-orange-600 p-0.5'
										alt={post.captions ?? 'post'}
									/>
									<div>
										<h1 className='text-sm font-bold'>{post.author}</h1>
										<p className='text-xs'>{createdDate}</p>
									</div>
								</Link>
							</div>
							<Image
								src={post.image}
								width={1300}
								height={1300}
								sizes='(max-width: 768px) 100vw, 768px'
								alt={post.captions ?? 'post'}
								priority
								className='rounded-md lg:rounded-none w-full'
							/>
							<div className='block lg:hidden'>
								<ActionButton
									refreshData={refreshData}
									commentOpen={commentOpen}
									likes={post.likedBy}
									post={post}
									savedPosts={[]}
									setCommentOpen={setCommentOpen}
									uid={sessions?.user.uid as string}
								/>
								<figcaption className='text-2xl font-bold p-2 flex space-x-2 items-center'>
									<h2 className='text-sm'>{post.author}</h2>
									<p className='text-xs break-words'>{post.captions}</p>
								</figcaption>
								<Comments
									commentOpen={commentOpen}
									comments={post.comments}
									post={post}
									session={sessions}
								/>
							</div>
						</figure>
						{/* comments container start */}
						<div className=' relative '>
							<div className='py-3 hidden lg:block h-full max-h-[400px] overflow-y-auto overflow-x-hidden '>
								<div className='flex border-b px-2 w-full sticky -top-3 transition-all ease duration-300 py-3 bg-white dark:bg-black border-gray-500 border-opacity-50'>
									<div className='flex-1 flex items-start space-x-2'>
										<div className='flex space-x-2 cursor-pointer' >
											<Image
												src={post.postedByPhotoUrl}
												width={40}
												height={40}
												priority
												alt={post.author}
												className='rounded-full bg-gradient-to-bl from-pink-600 to-orange-600 p-0.5'
											/>
											<div className='cursor-pointer'>
												<h4 className='font-semibold pr-1'> {post.author} </h4>
												<p className='text-xs text-gray-500'>{createdDate}</p>
											</div>
										</div>
										&#8226;
										<button
											className='text-xs font-semibold pt-1'
											type='button'
											name='follow and unfollow'
											title='folow and unfollow'
											onClick={async () => {
												const { handleFollow } = await import(
													'@/helper/follow'
												);
												handleFollow(
													post.postedById,
													sessions?.user.uid,
													sessions?.user.username,
													refreshData
												);
											}}
										>
											{user &&
											user[0]?.following?.find(
												(user: { userId: string }) =>
													user.userId === post.postedById
											)
												? 'Following'
												: 'Follow'}
										</button>
									</div>
									<button type='button' name='options' title='options'>
										<BsThreeDots />
									</button>
								</div>
								<Link href={`/profile/${post.postedById}`} className='flex-1 mb-5 flex items-center bg-white dark:bg-black space-x-2 px-2 py-3 '>
									<Image
										src={post.postedByPhotoUrl}
										width={40}
										height={40}
										alt={post.author}
										priority
										className='rounded-full bg-gradient-to-bl from-pink-600 to-orange-600 p-0.5'
									/>
									<h4 className='font-semibold pr-3'>
										{post.author}
										<span className='text-xs block text-gray-500 pt-0'>
											{createdDate}
										</span>
									</h4>
									<p>{post.captions}</p>
								</Link>
								{/* comments */}
								{post?.comments.length === 0 && (
									<div className='flex-1 flex items-center bg-white dark:bg-black space-x-2 px-2 py-3 w-full'>
										<p className='text-center'>There is no comments yet</p>
									</div>
								)}
								{post &&
									post?.comments.map((comment) => (
										<div className='w-full flex gap-x-14 mb-5 items-center pr-2' key={comment.comment}>
											<div className='py-2 px-2 flex items-center space-x-2 '>
												<Image
													src={comment.commentByPhoto}
													width={40}
													height={40}
													alt={comment.commentByName ?? 'comment'}
													className='rounded-full'
												/>
												<Link href={`/profile/${comment.commentByUid}`} className='text-sm font-semibold'>
													{comment.commentByName}
													<small className='block text-xs font-semibold text-gray-500'>
														{getCommentcreatedAt(comment)}
													</small>
												</Link>
											</div>
											<div className='w-full flex-wrap overflow-hidden'>
												<p className=' text-xs flex flex-wrap h-full '>
													{comment.comment}
												</p>
											</div>
											<button
												type='button'
												name='like comment'
												title='like comment'
											>
												<AiOutlineHeart size={15} />
												<small className='text-gray-500'>1</small>
											</button>
										</div>
									))}

								{/* comments end */}
								<div className='hidden lg:block absolute bottom-0 border-t border-gray-500 border-opacity-50 w-full'>
									<ActionButton
										refreshData={refreshData}
										commentOpen={true}
										likes={post.likedBy}
										post={post}
										savedPosts={[]}
										setCommentOpen={setCommentOpen}
										uid={sessions?.user.uid as string}
									/>
									<span
										className={`text-s ${
											post.likedBy.length < 1 ? 'hidden' : 'block'
										}`}
									>
										{post.likedBy.length} likes
									</span>
									<Comments
										post={post}
										commentOpen={commentOpen}
										comments={post.comments}
										session={sessions}
									/>
								</div>
							</div>
						</div>
						{/* comments container start */}
					</div>
				</div>
			</div>
		</div>
	);
}

export async function getServerSideProps({
	query,
	req,
}: GetServerSidePropsContext) {
	const { getSession } = await import('next-auth/react');
	const session = await getSession({ req });
	const { getPostById } = await import('@/helper/getPosts');
	const { getCurrentUserData } = await import('@/helper/getUser');
	const user = await getCurrentUserData(session?.user.uid as string);
	const res = await getPostById(query.id as string);
	if (!res) {
		return {
			notFound: true,
		};
	}
	return {
		props: {
			post: res ? res : null,
			sessions: session ? session : null,
			user,
		},
	};
}