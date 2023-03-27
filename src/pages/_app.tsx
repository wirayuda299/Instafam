import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import { RecoilRoot } from 'recoil';
import Layout from '@/components/Layout/Layout';
import React from 'react';

interface Props extends AppProps {
	session: Session;
}

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}: Props) {
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
