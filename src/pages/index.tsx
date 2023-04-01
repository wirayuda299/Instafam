import dynamic from 'next/dynamic';
import Loader from '@/components/Loader/Loader';
import Recommendation from '@/components/Loader/Recommendation';
const UserPosts = dynamic(
	() => import('@/components/User/UserPosts/UserPosts'),
	{ ssr: true, loading: () => <Loader /> }
);
const Suggestions = dynamic(
	() => import('@/components/Suggestions/Suggestions'),
	{ ssr: true, loading: () => <Recommendation /> }
);
export default function Home() {
	return (
		<section className='w-full h-screen md:p-3 overflow-y-auto'>
			<div className='w-full flex justify-between items-start'>
				<UserPosts />
				<Suggestions />
			</div>
		</section>
	);
}
