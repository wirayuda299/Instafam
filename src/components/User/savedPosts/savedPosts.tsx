import { Suspense } from 'react';
import { tabSavedPosts } from '@/store/TabToggler';
import { useRecoilValue } from 'recoil';
import { IUserPostProps } from '@/types/post';
import Loader from '@/components/Loader/Loader';
import dynamic from 'next/dynamic';

type ISavedPostsProps = {
	savedPosts: IUserPostProps[] | undefined;
};
const FeedsCards = dynamic(() => import('@/components/Card/Feeds'), {
	loading: () => <Loader />,
});

export default function SavedPosts({ savedPosts }: ISavedPostsProps) {
	const savedPostsTab = useRecoilValue(tabSavedPosts);
	return (
		<>
			{savedPostsTab && (
				<>
					{savedPosts && savedPosts.length < 1 ? (
						<div className='mx-auto w-full h-full col-span-3'>
							<h1 className='text-2xl font-semibold text-center w-full text-gray-500 dark:text-gray-400'>
								No saved posts
							</h1>
						</div>
					) : (
						savedPosts?.map((post) => (
							<Suspense key={post.postId} fallback={<Loader />}>
								<FeedsCards post={post} />
							</Suspense>
						))
					)}
				</>
			)}
		</>
	);
}
