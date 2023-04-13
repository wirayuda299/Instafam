import { GetServerSidePropsContext } from 'next';
import { IUserPostProps } from '@/types/post';
import { useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Head from 'next/head';
const PostHeader = dynamic(() => import('@/components/Header/PostIdHeader'));
const PostIdComments = dynamic( () => import('@/components/Card/Post/PostIdComments'));

export default function PostDetail({
	post,
	sessions,
	user,
}: {
	post: IUserPostProps;
	sessions: any;
	user: any;
}) {
	const [commentOpen, setCommentOpen] = useState<boolean>(false);
	const { asPath, replace } = useRouter();
	const refreshData = () => replace(asPath);

	return (
		<>
			<Head>
				<title>
					{post.author}({post.captions}) &#8226; Instafam
				</title>
			</Head>
			<div className='w-full h-full text-black dark:text-white'>
				<div className='w-full h-full overflow-y-auto'>
					<div className='w-full h-screen max-w-5xl rounded-lg grid place-items-center mx-auto '>
						<div className='w-full h-full lg:max-h-[600px] grid grid-cols-1 lg:grid-cols-2 p-5 lg:p-0 relative border border-gray-500 border-opacity-50'>
							<PostHeader
								session={sessions}
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
								sessions={sessions}
								setCommentOpen={setCommentOpen}
								user={user}
							/>
							{/* comments container end */}
						</div>
					</div>
				</div>
			</div>
		</>
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
	if (!session) {
		return {
			redirect: {
				destination: '/auth/signin',
				permanent: false,
			},
		};
	}
	if (!res || !user) {
		return {
			notFound: true,
		};
	}
	return {
		props: {
			post: res ? res[0] : null,
			sessions: session ? session : null,
			user,
		},
	};
}
