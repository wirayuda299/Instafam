import { IUserPostProps } from '@/types/post';
import { useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import { getCurrentUserData } from '@/helper/getUser';
import { IUser } from '@/types/user';
import { Session } from 'next-auth';
const PostHeader = dynamic(() => import('@/components/Header/PostIdHeader'));
const PostIdComments = dynamic(
	() => import('@/components/Card/Post/PostIdComments'),
	{
		ssr: true,
	}
);

export default function PostDetail({
	post,
	user,
	session,
}: {
	post: IUserPostProps;
	user: IUser;
	session: Session | null;
}) {
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
						<div className='w-full h-full justify-between lg:max-h-[530px] overflow-y-auto grid grid-cols-1 lg:grid-cols-2 p-5 lg:p-0 relative border border-gray-500 border-opacity-50'>
							<PostHeader
							session={session}
								commentOpen={commentOpen}
								post={post}
								refreshData={refreshData}
								setCommentOpen={setCommentOpen}
							/>
							<PostIdComments
								user={user}
								session={session}
								commentOpen={commentOpen}
								post={post}
								refreshData={refreshData}
								setCommentOpen={setCommentOpen}
							/>
						</div>
						<br className='md:hidden' />
						<br className='md:hidden' />
						<br className='md:hidden' />
						<br className='md:hidden' />
						<br className='md:hidden' />
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
	const { getPostById } = await import('@/helper/getPosts');
	const posts = await getPostById(query?.id as string);
	const session = await getSession({ req });
	const user = await getCurrentUserData(session?.user?.uid as string);

	return {
		props: {
			post: posts ? posts[0] : null,
			user: user ? user : null,
			session: session ? session : null,
		},
	};
}
