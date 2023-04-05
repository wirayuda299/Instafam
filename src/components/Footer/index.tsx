import Link from 'next/link';
import { useRouter } from 'next/router';
type FooterProps = {
	name: string;
	link: string;
}
export default function Footer() {
	const router = useRouter();
	const footerlists:FooterProps[] = [
		{
			name: 'About',
			link: '/about',
		},
		{
			name: 'Help',
			link: '/help',
		},
		{
			name: 'Api',
			link: '/api',
		},
		{
			name: 'Privacy',
			link: '/privacy',
		},
		{
			name: 'Terms',
			link: '/terms',
		},
		{
			name: 'Locations',
			link: '/locations',
		},
		{
			name: 'Language',
			link: '/language',
		},
		{
			name: 'Instafam Verified',
			link: '/verfied-instafam',
		},
	];
	return (
		<footer className='w-full px-5 '>
			<ul
				className={`flex flex-wrap text-xs text-gray-500  gap-3 ${
					router.pathname === '/explore' ? 'justify-center' : 'justify-start'
				}`}
			>
				{footerlists.map((list) => (
					<li
						title={list.name}
						key={list.name}
						className='hover:border-b border-black dark:border-white'
					>
						<Link href={list.link} title={list.name}>
							{list.name}
						</Link>
					</li>
				))}
			</ul>
			<p
				className={`text-xs text-gray-500 mt-5 w-full ${
					router.pathname === '/explore' ? 'text-center' : ''
				}`}
			>
				© 2023 INSTAFAM by{' '}
				<a href='https://instafam.vercel.app' className='pr-1'>
					Instafam
				</a>
				from <a href='https://instafam.vercel.app'>INSTAFAM</a>
			</p>
		</footer>
	);
}
