import { useSession } from 'next-auth/react';
import { Oleo_Script } from 'next/font/google';
import Link from 'next/link';
import { AiOutlineSearch, AiOutlineHeart } from 'react-icons/ai';
import Form from '../Search/Form';

const oleo = Oleo_Script({
	subsets: ['latin', 'latin-ext'],
	weight: '400',
	preload: true,
	fallback: ['sans-serif'],
});

export default function Header() {
	const { data: session } = useSession();
	return (
		<>
			{session ? (
				<header className='w-full relative md:hidden bg-white dark:bg-black dark:text-white px-5 border-b dark:border-b-0 py-2'>
					<div className='w-full flex justify-between items-center space-x-2'>
						<div className='w-full'>
							<Link
								href='/'
								className={`text-xl md:text-2xl ${oleo.className}`}
							>
								<h1>Instafams</h1>
							</Link>
						</div>
						<Form height='h-min'>
							<button type='submit' name='Search' title='search'>
								<AiOutlineSearch size={20} />
							</button>
						</Form>
						<button name='notifications' type='button' title='notifications'>
							<AiOutlineHeart size={25} />
						</button>
					</div>
				</header>
			) : null}
		</>
	);
}
