import Footer from '@/components/Footer';
import Loader from '@/components/Loader/Loader';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { IUserPostProps } from '@/types/post';
import { instance } from '@/lib/axios';
import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import { Props } from '.';

const ExplorePostCard = dynamic(() => import('@/components/Card/Feeds'), {
	loading: () => <Loader />,
	ssr: true,
});

export default function Explore({ posts }: Props) {
	return (
		<>
			<Head>
				<title>Explore popular posts | Instafam</title>
				<link rel='icon' href='/favicon.ico' />
				<meta
					name='description'
					content='Explore new posts and discover new accounts on Instafam.'
				/>
				<meta property='og:title' content='Explore popular posts | Instafam' />
				<meta
					property='og:description'
					content='Explore new posts and discover new accounts on Instafam.'
				/>
				<meta property='og:type' content='website' />
				<meta property='og:url' content='https://instafam.vercel.app/explore' />

				<meta name='twitter:card' content='summary_large_image' />
				<meta name='twitter:title' content='Explore | Instafam' />
				<meta
					name='twitter:description'
					content='Explore new posts and discover new accounts on Instafam.'
				/>
			</Head>
			<div className='text-black dark:text-white p-5'>
				<h1 className='text-center font-semibold text-5xl py-5 '>Explore</h1>
				<div className='container mx-auto'>
					<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-5 gap-5'>
						{posts?.posts.map((post: IUserPostProps) => (
							<ExplorePostCard post={post} key={post.postId} />
						))}
					</div>
					<Footer />
				</div>
			</div>
		</>
	);
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
	const session = await getServerSession(context.req, context.res, authOptions);
	if (!session || !session.user) {
		return {
			redirect: {
				destination: '/auth/signin',
				permanent: false,
			},
		};
	}

	const res = await instance.get('/api/posts', {
		headers: {
			Authorization: `Bearer ${session?.accessToken}`,
		},
	});
	const posts = await res.data;

	return {
		props: {
			posts,
		},
	};
}
