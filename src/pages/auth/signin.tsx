import {  signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import { AiOutlineInstagram } from 'react-icons/ai';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
interface Providers {
	id: string;
	name: string;
	type: string;
	signinUrl: string;
	callbackUrl: string;
}

export default function SignIn({ providers }: { providers: Providers }) {
	if (!providers) return <h1>Something went wrong</h1>;
	
	return (
		<>
			<Head>
				<title>Sign In &#8226; Instafam</title>
				<meta name='description' content='Sign in to your Instafam account' />
				<meta name='keywords' content='instagram, sign in, login' />
				<meta
					property='og:url'
					content='https://instafam.vercel.app/auth/signin'
				/>
				<meta name='X-content-type-options' content='nosniff' />
				<meta name='X-frame-options' content='DENY' />
				<meta name='X-xss-protection' content='1; mode=block' />
				<meta name='referrer' content='no-referrer' />
				<meta name='robots' content='index, follow' />
				<meta name='googlebot' content='index, follow' />
				<meta name='google' content='notranslate' />
				<meta name='format-detection' content='telephone=no' />
				<meta name='theme-color' content='#ffffff' />
				<meta name='msapplication-TileColor' content='#ffffff' />
				<meta name='application-name' content='Instafam' />
				<meta name='apple-mobile-web-app-title' content='Instafam' />
				<meta name='apple-mobile-web-app-capable' content='yes' />
				<meta name='apple-mobile-web-app-status-bar-style' content='default' />
				<meta
					name='apple-mobile-web-app-status-bar-style'
					content='black-translucent'
				/>
				<meta name='apple-mobile-web-app-status-bar-style' content='black' />
				<meta name='mobile-web-app-capable' content='yes' />
				<meta name='HandheldFriendly' content='True' />
				<meta name='MobileOptimized' content='320' />
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
				<meta name='twitter:card' content='summary_large_image' />
				<meta name='twitter:site' content='@instafam' />
			</Head>
			<div className='w-full h-screen grid place-items-center p-5'>
				<div className='text-center flex items-center justify-center h-full mx-auto bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-8 shadow-xl'>
					<div className='max-w-lg max-h-[512px] aspect-square flex flex-col items-center justify-center'>
						<div className='text-9xl text-white '>
							<AiOutlineInstagram />
						</div>
						<h1 className=' prose text-3xl font-bold text-white text-transparent bg-gradient-to-r from-pink-600 to-slate-50 bg-clip-text sm:text-4xl md:text-5xl '>
							Welcome Back to Instafam
						</h1>
						<p className='prose-sm text-white font-semibold prose-invert pb-7 md:text-lg'>
							Share your experiences, connect with your friends and family, and
							discover new things on Instafam.
						</p>
						{Object.values(providers).map((provider) => (
							<button
								type='button'
								name='sign in with google'
								title='Sign in with Google'
								key={provider.id}
								className='bg-black text-white hover:bg-opacity-80 transition-all ease duration-300 rounded-md px-5 py-3 text-center inline-flex items-center gap-x-5'
								onClick={() =>
									signIn(provider.id, {
										callbackUrl: process.env.NEXTAUTH_URL,
										redirect: false,
									})
								}
							>
								Sign in with {provider.name}
								<span>
									<FcGoogle />
								</span>
							</button>
						))}
					</div>
				</div>
			</div>
		</>
	);
}

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
	const { getProviders, getSession } = await import('next-auth/react');
	const session = await getSession({ req });
	if( session) return {
		redirect: {
			destination: '/',
			permanent: false,
		}
	}
	const providers = await getProviders();
	return {
		props: { providers: providers ?? [] },
	};
}
