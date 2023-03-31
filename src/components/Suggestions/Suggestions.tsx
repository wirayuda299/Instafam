import { handleFollow } from '@/helper/follow';
import { DocumentData } from 'firebase/firestore';
import { Session } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '../Footer';

export default function Suggestions({
	recommendation,
	session
}: {
	recommendation: DocumentData[] | undefined | void;
	session:Session | null
}) {

	return (
		<section className='min-w-[400px] hidden lg:block'>
			<div className='w-full h-full p-5 max-w-sm'>
				<div className='flex items-center space-x-2 mb-2 justify-around md:justify-between'>
					<div className='flex items-center space-x-3 mb-2'>
						<Image
							className=' rounded-full'
							src={session?.user.image as string}
							alt={session?.user.name as string}
							width={45}
							height={45}
							priority
							quality={50}
						/>
						<span className='text-black dark:text-white text-base font-semibold'>
							{session?.user.username}
						</span>
					</div>
					<div>
						<button className='text-blue-600 text-xs font-semibold'>
							Switch
						</button>
					</div>
				</div>
				<div className='flex justify-between'>
					<p className='text-gray-500 text-sm font-semibold'>
						Recommendation for you
					</p>
					<button className='text-xs dark:text-blue-600 '>See all</button>
				</div>
				<div>
					{!recommendation?.length && (
						<div className='flex items-center justify-center mt-5'>
							<p className='text-gray-500 text-sm font-semibold'>
								No users to follow
							</p>
						</div>
					)}
					{recommendation?.map((user) => (
						<div
							key={user.uid}
							className='flex items-center space-x-2 mb-2 mt-5 w-full justify-between'
						>
							<Link
								href={`profile/${user.uid}`}
								className='flex space-x-2 items-center pb-3'
							>
								<Image
									className=' rounded-full'
									src={user?.image}
									alt={user?.name ?? ''}
									width={40}
									height={40}
									sizes='40px'
									priority
									quality={50}
								/>
								<div className='flex flex-col items-start justify-center'>
									<span className='text-black dark:text-white text-sm font-semibold'>
										@{user.username}
									</span>
									<p className=' text-xs text-slate-500'>
										{user.name}
									</p>
								</div>
							</Link>
							<div className='ml-auto'>
								<button
									type='button'
									name='follow'
									className='text-blue-600 font-light text-xs'
									onClick={() =>
										handleFollow(
											user.uid,
											session?.user?.uid,
											session?.user.username
										)
									}
								>
									{user.followers.find((foll:{followedBy:string}) => foll.followedBy === session?.user.uid) ? 'Following' : 'Follow'}
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
			<Footer />
		</section>
	);
}
