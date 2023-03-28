import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import Header from '../Header/Header';
import BottomNav from '../Navigation/BottomNav';
import Sidebar from '../Navigation/Sidebar';
import Search from '../Search';

export default function Layout({ children }: { children: React.ReactNode }) {
	const { data: session } = useSession();
	return (
		<>
			<div className='bg-white dark:bg-black overflow-x-hidden' >
				<div className='flex'>
					{session && (
						<>
							<Sidebar />
							<Search />
						</>
					)}
					<main className='w-full h-screen transition-all overflow-y-scroll'>
						<Header />
						{children}
						<BottomNav />
					</main>
				</div>
			</div>
		</>
	);
}
