import dynamic from 'next/dynamic';
const Search = dynamic(() => import('../Search'), { ssr: true });
const BottomNav = dynamic(() => import('../Navigation/BottomNav'), {
	ssr: true,
});
const Sidebar = dynamic(() => import('../Navigation/Sidebar'), { ssr: true });
const Header = dynamic(() => import('../Header/Header'), { ssr: true });

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className='bg-white h-full w-full dark:bg-black transition-all'>
			<div className='flex h-full w-full'>
				<section className='hidden md:block'>
					<Sidebar />
				</section>
				<Search />
				<main className='w-full h-full'>
					<Header />
					{children}
					<section className='block md:hidden'>
						<BottomNav />
					</section>
				</main>
			</div>
		</div>
	);
}
