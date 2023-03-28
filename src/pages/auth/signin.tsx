import { getCsrfToken, getProviders, signIn } from 'next-auth/react';
import loginBg from '/public/login-background.jpg';
import { FcGoogle } from 'react-icons/fc';
import { AiOutlineInstagram } from 'react-icons/ai';
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
			if (!csrfToken) return new Error('Csrf token not found');
			await signIn(providerId, { redirect: true, callbackUrl: '/' });
		} catch (error: any) {
			console.log(error.message);
		}
	};
	return (
		<div
			className='w-full h-full grid place-items-center p-5'
			style={{
				backgroundImage: `url(${loginBg.src})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				backgroundRepeat: 'no-repeat',
			}}
		>
			{Object.values(providers).map((provider) => (
				<div
					key={provider.name}
					className='text-center flex items-center justify-center h-full mx-auto bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-8 shadow-xl'
				>
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
						<button
							className='bg-black text-white hover:bg-opacity-80 transition-all ease duration-300 rounded-md px-5 py-3 text-center inline-flex items-center gap-x-5'
							onClick={() => handleSignin(provider.id)}
						>
							Sign in with {provider.name}{' '}
							<span>
								<FcGoogle />
							</span>
						</button>
					</div>
				</div>
			))}
		</div>
	);
}

export async function getServerSideProps() {
	const providers = await getProviders();
	return {
		props: { providers: providers ?? [] },
	};
}
