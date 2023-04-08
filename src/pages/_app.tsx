import '@/styles/globals.css';
import NextNProgress from 'nextjs-progressbar';
import { SessionProvider } from 'next-auth/react';
import { RecoilRoot } from 'recoil';
import Layout from '@/components/Layout/Layout';
import React from 'react';

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}: any) {
	return (
		<SessionProvider session={session}>
			<RecoilRoot>
				<Layout>
					<NextNProgress />
					<Component {...pageProps} />
				</Layout>
			</RecoilRoot>
		</SessionProvider>
	);
}
