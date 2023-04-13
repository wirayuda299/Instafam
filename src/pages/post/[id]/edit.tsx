import { db } from '@/config/firebase';
import { IUserPostProps } from '@/types/post';
import { getCreatedDate } from '@/util/postDate';
import { doc, updateDoc } from 'firebase/firestore';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { FieldValues, useForm } from 'react-hook-form';
import { PostSchema } from '@/schema/PostSchema';
import toast from 'react-hot-toast';
import dynamic from 'next/dynamic';
const Headers = dynamic(() => import('@/components/Card/Post/Edit/Header'));
const PostEditImage = dynamic(
	() => import('@/components/Card/Post/Edit/image')
);
const PostForm = dynamic(() => import('@/components/Card/Post/Edit/Form'));

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
							<PostEditImage posts={posts} />
							<div>
								<Headers getCreatedDate={getCreatedDate} posts={posts} />
								<PostForm
									defaultValues={defaultValues}
									handleSubmit={handleSubmit}
									register={register}
									updatePost={updatePost}
								/>
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
