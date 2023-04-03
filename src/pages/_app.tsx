import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { RecoilRoot } from 'recoil';
import Layout from '@/components/Layout/Layout';
import React from 'react';


export default function App({
	Component,
	pageProps: { session, ...pageProps },
}: {
	Component:AppProps['Component'];
	pageProps: { session: any };
}) {
	return (
		<SessionProvider session={session}>
			<RecoilRoot>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</RecoilRoot>
		</SessionProvider>
	);
}
