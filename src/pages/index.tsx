import { fetcher } from '@/hooks/usePosts';
import dynamic from 'next/dynamic';
import { SWRConfig } from 'swr';
const UserPosts = dynamic(
	() => import('@/components/User/UserPosts/UserPosts')
);
const Suggestions = dynamic(
	() => import('@/components/Suggestions/Suggestions')
);
export default function Home({ fallback }: { fallback: any }) {
	return (
		<section className='w-full h-screen md:p-3 overflow-y-auto'>
			<div className='w-full flex justify-between items-start'>
				<SWRConfig value={{ fallback }}>
					<UserPosts />
				</SWRConfig>
				<Suggestions />
			</div>
		</section>
	);
}

export async function getServerSideProps() {
	const posts = await fetcher()
	
	return {
		props: {
			fallback: {
				'/posts': posts
			},
		},
	};
}
