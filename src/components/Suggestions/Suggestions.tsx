import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { memo, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import useRecommendation from '@/hooks/useRecommendation';
import { db } from '@/config/firebase';
const Footer = dynamic(() => import('@/components/Footer'), {
	ssr: true,
});
type Followers = {
	followedBy: string;
	followedByName: string;
}[];
function Suggestions() {
	const { data: session } = useSession();
	const { reccomend, recomendationLoading } = useRecommendation(
		session?.user.uid
	);
	const [followers, setFollowers] = useState<Followers[] | undefined>([]);
	useEffect(() => {
		const follower = reccomend?.map((user) => user.followers);
		setFollowers(follower);
	}, [reccomend]);

	const dataFollowers = [
		[
			[
				{
					followedBy: 'userID',
					followedByName: 'user1',
				},
				{
					followedBy: 'userID',
					followedByName: 'user1',
				},
				{
					followedBy: 'userID',
					followedByName: 'user1',
				},
			],
		],
	];

	return (
		<section className='min-w-[400px] hidden lg:block'>
			<div className='w-full h-full p-5 max-w-sm'>
				<div className='flex items-center space-x-2 mb-2 justify-around md:justify-between'>
					<div className='flex items-center space-x-3 mb-2'>
						<Image
							className=' rounded-full'
							src={(session?.user.image as string) ?? ''}
							alt={(session?.user.username as string) ?? ''}
							width={45}
							height={45}
							sizes='45px'
							priority
							quality={50}
						/>
						<span className='text-black dark:text-white text-base font-semibold'>
							{session?.user.username}
						</span>
					</div>
					<div>
						<button
							type='button'
							name='switch '
							title='switch accounts'
							className='text-blue-600 text-xs font-semibold'
						>
							Switch
						</button>
					</div>
				</div>
				<div className='flex justify-between'>
					<p className='text-gray-500 text-sm font-semibold'>
						Recommendation for you
					</p>
					<button
						type='button'
						name='see all'
						title='see all'
						className='text-xs dark:text-blue-600 '
					>
						See all
					</button>
				</div>
				{!reccomend?.length && (
					<div className='flex items-center justify-center mt-5'>
						<p className='text-gray-500 text-sm font-semibold'>
							No users to follow
						</p>
					</div>
				)}
				{recomendationLoading ? (
					[1, 2, 3].map((_, i) => (
						<div
							className='flex items-center space-x-3 mb-2 animate-pulse'
							key={i}
						>
							<div className='bg-gray-200   dark:bg-gray-700 rounded-full w-9 h-9'></div>
							<div className='bg-gray-200   dark:bg-gray-700 rounded-full w-24 h-5'></div>
						</div>
					))
				) : (
					<>
						{reccomend?.map((user) => (
							<div
								key={user.uid}
								className='flex items-center space-x-2 mb-2 mt-5 w-full justify-between'
							>
								<div className='flex space-x-2 items-center pb-3'>
									<Image
										className=' rounded-full'
										src={user?.image}
										alt={user?.name ?? ''}
										width={40}
										height={40}
										sizes='40px'
										placeholder='blur'
										blurDataURL={user?.image}
										priority
										quality={50}
									/>
									<div className='flex flex-col items-start justify-center'>
										<span className='text-black dark:text-white text-sm font-semibold'>
											{user.username}
										</span>
										<p className=' text-xs text-slate-500'>{user.name}</p>
									</div>
								</div>
								<Link className='ml-auto' href={`/profile/${user?.uid}`}>
									<span className='text-blue-600 font-light text-xs'>View</span>
								</Link>
							</div>
						))}
					</>
				)}
			</div>
			<Footer />
		</section>
	);
}
export default memo(Suggestions);
