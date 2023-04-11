import '@/styles/globals.css';
import NextNProgress from 'nextjs-progressbar';
import { SessionProvider } from 'next-auth/react';
import { RecoilRoot } from 'recoil';
import Layout from '@/components/Layout/Layout';
import React from 'react';
import { Toaster } from 'react-hot-toast';

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}: any) {
	return (
		<SessionProvider session={session}>
			<RecoilRoot>
				<NextNProgress />
				<Layout>
					<Toaster />
					<Component {...pageProps} />
				</Layout>
			</RecoilRoot>
		</SessionProvider>
	);
}
