import { IUserPostProps } from '@/types/post';
import { useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { GetStaticPropsContext } from 'next';
const PostHeader = dynamic(() => import('@/components/Header/PostIdHeader'));
const PostIdComments = dynamic(
	() => import('@/components/Card/Post/PostIdComments')
);

export default function PostDetail({ post }: { post: IUserPostProps }) {
	const [commentOpen, setCommentOpen] = useState<boolean>(false);
	const { asPath, replace } = useRouter();
	const refreshData = () => replace(asPath);

	return (
		<>
			<Head>
				<title>
					{post?.author}({post?.captions ?? 'post'}) &#8226; Instafam
				</title>
			</Head>
			<div className='w-full h-full text-black dark:text-white'>
				<div className='w-full h-full overflow-y-auto'>
					<div className='w-full h-screen max-w-5xl rounded-lg grid place-items-center mx-auto '>
						<div className='w-full h-full lg:max-h-[600px] grid grid-cols-1 lg:grid-cols-2 p-5 lg:p-0 relative border border-gray-500 border-opacity-50'>
							<PostHeader
								commentOpen={commentOpen}
								post={post}
								refreshData={refreshData}
								setCommentOpen={setCommentOpen}
							/>
							{/* comments container start */}
							<PostIdComments
								commentOpen={commentOpen}
								post={post}
								refreshData={refreshData}
								setCommentOpen={setCommentOpen}
							/>
							{/* comments container end */}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export async function getStaticPaths() {
	const res = await getDocs(query(collection(db, 'posts')));
	const data = res.docs.map((doc) => doc.data());
	return {
		paths: [...data.map((post) => ({ params: { id: post?.postId } }))],
		fallback: false,
	};
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
	const { getPostById } = await import('@/helper/getPosts');
	const res = await getPostById(params?.id as string);
	return {
		props: {
			post: res && res[0],
		},
	};
}
