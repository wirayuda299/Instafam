import Head from 'next/head';
import { useSession } from 'next-auth/react';
import useRecommendation from '@/hooks/useRecommendation';
import dynamic from 'next/dynamic';
const UserPosts = dynamic(
	() => import('@/components/User/UserPosts/UserPosts'),
	{ ssr: false }
);
const Suggestions = dynamic(
	() => import('@/components/Suggestions/Suggestions'),
	{ ssr: false }
);

export default function Home() {
	const { data: session } = useSession();
	const { reccomend, recomendationLoading } = useRecommendation(
		session?.user.uid
	);

	return (
		<>
			<Head>
				<title>Instafam - Connect with people around the world</title>
				<meta
					name='description'
					content='Instafam is social media web app that let you connect with people around the world'
				/>
				<meta
					name='keywords'
					content='social media, instafam, nextjs, tailwindcss, reactjs, firebase'
				/>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<meta name='robots' content='noindex, nofollow' />
				<meta name='googlebot' content='noindex, nofollow' />
				<meta name='google' content='notranslate' />
				<meta name='google' content='nositelinkssearchbox' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<section className='w-full h-screen md:p-3 overflow-y-auto'>
				<div className='w-full flex justify-between items-start'>
					<UserPosts uid={session?.user.uid} />
					{recomendationLoading ? (
						<h1>Loading....</h1>
					) : (
						<Suggestions recommendation={reccomend} session={session} />
					)}
				</div>
			</section>
		</>
	);
}
