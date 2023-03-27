import { getCsrfToken, getProviders, signIn } from 'next-auth/react';

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
			const csrfToken = await getCsrfToken()
			if(!csrfToken) return new Error('Csrf token not found')
			await signIn(providerId, { redirect: true, callbackUrl: '/' })
		} catch (error: any) {
			console.log(error.message);
		}
	};
	return (
		<div className='w-full h-full '>
			{Object.values(providers).map((provider) => (
				<div
					key={provider.name}
					className='mx-auto grid place-items-center place-content-center'
				>
					<button
						className='bg-black text-white rounded-md px-5 py-1 text-center'
						onClick={() => handleSignin(provider.id)}
					>
						Sign in with {provider.name}
					</button>
				</div>
			))}
		</div>
	);
}

export async function getServerSideProps() {
	const providers = await getProviders();
	return {
		props: { providers: providers ?? []},
	};
}
