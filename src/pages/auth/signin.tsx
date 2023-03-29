import { getCsrfToken, getProviders, signIn } from 'next-auth/react';
import loginBg from '/public/login-background.jpg';
import { FcGoogle } from 'react-icons/fc';
import { AiOutlineInstagram } from 'react-icons/ai';
import { getServerSession } from 'next-auth';
import { GetServerSidePropsContext } from 'next';
import { authOptions } from '../api/auth/[...nextauth]';
import { useEffect } from 'react';
import Head from 'next/head';
interface Providers {
	id: string;
	name: string;
	type: string;
	signinUrl: string;
	callbackUrl: string;
}

export default function SignIn({ providers }: { providers: Providers }) {
	const handleSignin = async (providerId: string) => {
		try {
			const csrfToken = await getCsrfToken();
			if (!csrfToken) {
				throw new Error('CSRF token not found');
			}
			await signIn(providerId, {
				redirect: false,
				callbackUrl: process.env.NEXTAUTH_URL,
			});
		} catch (error: any) {
			console.log(error.message);
		}
	};

	return (
		<>
		<Head>
			<title>Sign In - Instafam</title>
			<meta name='description' content='Sign in to your Instafam account' />
			<meta
				httpEquiv='Content-Security-Policy'
				content='upgrade-insecure-requests'
			/>
			 <meta httpEquiv='Content-Security-Policy' content='block-all-mixed-content' />
			 <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'"/>
			 <meta http-equiv="X-Frame-Options" content="DENY"/>
			 <meta name="referrer" content="strict-origin"/>
			 <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
			 <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
			 <meta name="theme-color" content="#000000"/>
			 <meta name='robots' content='noindex, nofollow'/>
			 <meta name='googlebot' content='noindex, nofollow'/>
			 <meta name='google' content='notranslate'/>
			 <meta name='google' content='nositelinkssearchbox'/>
			 
		</Head>
			<div
				className='w-full h-screen grid place-items-center p-5'
				style={{
					backgroundImage: `url(${loginBg.src})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					backgroundRepeat: 'no-repeat',
				}}
			>
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
								name='signin'
								key={provider.id}
								className='bg-black text-white hover:bg-opacity-80 transition-all ease duration-300 rounded-md px-5 py-3 text-center inline-flex items-center gap-x-5'
								onClick={() => handleSignin(provider.id)}
							>
								Sign in with {provider.name}{' '}
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const session = await getServerSession(context.req, context.res, authOptions);

	if (session) {
		return {
			redirect: {
				permanent: false,
				destination: '/',
			},
		};
	}
	context.res.setHeader('Content-Security-Policy', 'upgrade-insecure-requests');
	context.res.setHeader('Content-Security-Policy', 'block-all-mixed-content');
	context.res.setHeader('X-Frame-Options', 'DENY');
	context.res.setHeader('referrer', 'strict-origin');
	context.res.setHeader('Content-Type', 'text/html; charset=utf-8');

	const providers = await getProviders();
	return {
		props: { providers: providers ?? [] },
	};
}
