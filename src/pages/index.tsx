import Head from 'next/head';
import Suggestions from '@/components/Suggestions/Suggestions';
import { IUserPostProps } from '@/types/post';
import Loader from '@/components/Loader/Loader';
import dynamic from 'next/dynamic';
import { db } from '@/config/firebase';
import {
	DocumentData,
	onSnapshot,
	query,
	collection,
	where,
} from 'firebase/firestore';
import { useState, useEffect, Suspense } from 'react';
import { useSession } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import { GetServerSidePropsContext } from 'next';
import { authOptions } from './api/auth/[...nextauth]';
import { instance } from '@/lib/axios';

export interface Props {
	posts: {
		posts: IUserPostProps[];
	};
}

const PostCard = dynamic(() => import('@/components/Card/Post'), {
	loading: () => <Loader />,
	ssr: true,
});

type follLists = {
	userId: string;
};

export default function Home({ posts }: Props) {
	const [users, setUsers] = useState<DocumentData[]>([]);
	const [followingLists, setFollowingLists] = useState<follLists[]>([]);
	const [recommendation, setRecommendation] = useState<DocumentData[]>([]);

	const { data: session } = useSession();

	useEffect(() => {
		onSnapshot(
			query(
				collection(db, 'users'),
				where('uid', '!=', `${session?.user.uid}`)
			),
			(snapshot) => {
				const users = snapshot.docs.map((doc) => doc.data());
				setUsers(users);
			}
		);
	}, []);

	useEffect(() => {
		onSnapshot(
			query(
				collection(db, 'users'),
				where('uid', '==', `${session?.user.uid}`)
			),
			(snapshot) => {
				const res = snapshot.docs.map((doc) => doc.data());
				setFollowingLists(res.map((user) => user.following));
			}
		);
	}, []);

	useEffect(() => {
		const recommendation = users.filter(
			(user) =>
				!followingLists.every((following) => following.userId === user.uid)
		);
		setRecommendation(recommendation);
	}, [users]);

	return (
		<>
			<Head>
				<title>Instafam | Connect with people around the world</title>
				<meta
					name='description'
					content='Instafam is social media web app that let you connect with people around the world'
				/>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
				<section className='w-full h-full md:p-3 max-w-7xl'>
					<div className='w-full flex justify-between items-start first:flex-grow'>
						<div className='w-full h-full flex flex-col p-5'>
							<Suspense fallback={<Loader />} >
								{posts?.posts?.map((post) => (
									<PostCard post={post} key={post.docId} followingLists={followingLists} />
								))}
							</Suspense>
						</div>
						<Suggestions recommendation={recommendation} />
					</div>
				</section>
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
