import { db } from '@/config/firebase';
import { IUserPostProps } from '@/types/post';
import { getCreatedDate } from '@/util/postDate';
import { doc, updateDoc } from 'firebase/firestore';
import { GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FieldValues, useForm } from 'react-hook-form';
import { BsThreeDots } from 'react-icons/bs';
import { PostSchema } from '@/schema/PostSchema';
import toast from 'react-hot-toast';

export default function EditPosts({ posts }: { posts: IUserPostProps }) {
	const { register, handleSubmit } = useForm();
	const router = useRouter();
	const defaultValues = {
		captions: `${posts?.captions} ${posts?.hashtags}`,
	};

	async function updatePost(e: FieldValues) {
		try {
			const q = doc(db, 'posts', `post-${posts.postId}`);
			await updateDoc(q, {
				captions: e.updated.match(/^[^#]*/),
				hashtags:
					e.updated
						.match(/#(?!\n)(.+)/g)
						?.join(' ')
						.split(' ') || [],
			}).then(() => {
				toast.success('post updated');
				router.push(`/`);
			});
		} catch (error: any) {
			console.log(error.message);
		}
	}

	return (
		PostSchema.parse(posts) && (
			<div className='w-full h-full text-black dark:text-white'>
				<div className='w-full h-full overflow-y-auto py-6'>
					<div className='w-full h-screen max-w-5xl rounded-lg grid place-items-center mx-auto'>
						<div className='w-full h-full lg:max-h-[550px] grid grid-cols-1 lg:grid-cols-2 p-5 lg:p-0 relative border border-gray-500 border-opacity-50 rounded-lg'>
							<div>
								<Image
									src={posts?.image}
									width={1300}
									height={1300}
									sizes='100vw'
									placeholder='blur'
									quality={60}
									blurDataURL={
										'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////2wBDAf//////////////////////////////////////////////////////////////////////////////////////wAARCAACAAMDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwBaKKKAP//Z'
									}
									alt={posts?.captions ?? 'post'}
									priority
									className='rounded-md lg:rounded-none h-full w-full'
								/>
							</div>
							<div>
								<div className='flex px-3 w-full transition-all items-start ease duration-300 py-3 bg-white dark:bg-black border-gray-500 border-opacity-50'>
									<div className='flex-1 flex items-start space-x-2 border-b border-gray-500 border-opacity-50 pb-3'>
										<div className='flex space-x-2 cursor-pointer'>
											<Image
												src={posts.postedByPhotoUrl}
												width={40}
												height={40}
												priority
												alt={posts.author}
												className='rounded-full bg-gradient-to-bl from-pink-600 to-orange-600 p-0.5'
											/>
											<div className='cursor-pointer'>
												<h4 className='font-semibold pr-1'> {posts.author} </h4>
												<p className='text-xs text-gray-500'>
													{getCreatedDate(posts)}
												</p>
											</div>
										</div>
										&#8226;
										<button
											className='text-xs font-semibold pt-1'
											type='button'
											name='follow and unfollow'
											title='folow and unfollow'
										>
											follow
										</button>
									</div>
									<button type='button' name='options' title='options'>
										<BsThreeDots />
									</button>
								</div>
								<form
									className='w-full p-3 flex'
									onSubmit={handleSubmit(updatePost)}
								>
									<input
										type='text'
										className='w-full py-2 px-3 bg-[#a8a8a817] rounded-lg'
										placeholder='Edit post'
										spellCheck='false'
										role='textbox'
										defaultValue={defaultValues.captions}
										{...register('updated', { required: true })}
									/>
									<button
										className='p-2'
										type='submit'
										name='update'
										title='update'
										onClick={() => handleSubmit(updatePost)}
									>
										<span>Update</span>
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	);
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const { id } = context.query;
	const { req } = context;
	const { getSession } = await import('next-auth/react');

	const session = await getSession({ req });
	if (!session || !session.user) {
		return {
			redirect: {
				destination: '/auth/signin',
				permanent: false,
			},
		};
	}
	const { getPostById } = await import('@/helper/getPosts');

	const posts = await getPostById(id as string);
	if (!posts) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			posts: posts ? posts[0] : null,
		},
	};
}
