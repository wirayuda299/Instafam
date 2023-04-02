import dynamic from 'next/dynamic';
const UserPosts = dynamic(
	() => import('@/components/User/UserPosts/UserPosts')
);
const Suggestions = dynamic(
	() => import('@/components/Suggestions/Suggestions')
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
