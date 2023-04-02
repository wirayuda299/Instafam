import NavbarList from './Lists';
export default function BottomNav() {
	return (
		<nav className='fixed w-full h-14 bottom-0 flex items-center left-0 bg-white dark:bg-black z-50 md:hidden'>
			<NavbarList />
		</nav>
	);
}
