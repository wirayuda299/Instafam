import dynamic from 'next/dynamic';
const Search = dynamic(() => import('../Search'), { ssr: false });
const BottomNav = dynamic(() => import('../Navigation/BottomNav'), {
	ssr: false,
});
const Sidebar = dynamic(() => import('../Navigation/Sidebar'), { ssr: false });
const Header = dynamic(() => import('../Header/Header'), { ssr: false });

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<div className='bg-white h-full w-full dark:bg-black '>
				<div className='flex h-full w-full'>
					<Sidebar />
					<Search />
					<main className='w-full h-full'>
						<Header />
						{children}
						<BottomNav />
					</main>
				</div>
			</div>
		</>
	);
}
