import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import Sidebar from '../Navigation/Sidebar';

const Search = dynamic(() => import('../Search'), {
	loading: () => <p>Loading..</p>,
	ssr: false,
});
const Header = dynamic(() => import('../Header/Header'), {
	loading: () => <p>Loading..</p>,
	ssr: false,
});

const BottomNav = dynamic(() => import('../Navigation/BottomNav'), {
	loading: () => <p>Loading..</p>,
	ssr: false,
});




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
