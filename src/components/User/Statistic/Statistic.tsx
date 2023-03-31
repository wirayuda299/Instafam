import { IUserPostProps } from '@/types/post';
import Image from 'next/image';
import { Session } from 'next-auth';
import { DocumentData } from 'firebase/firestore';
interface IProps {
	sessions: Session | null;
	uid: string[] | string | undefined;
	users: DocumentData | undefined;
	posts: DocumentData[] | [];
}

export default function Statistic({ sessions, uid, users, posts }: IProps) {
	const data = [
		{
			id: 1,
			title: 'Posts',
			value: posts?.length,
		},
		{
			id: 2,
			title: 'Followers',
			value: users && users?.followers.length,
		},
		{
			id: 3,
			title: 'Following',
			value: users && users?.following.length,
		},
	];

	return (
		<div className='w-full'>
			<div className='text-black dark:text-white w-full'>
				<div className='flex items-center flex-col sm:flex-row justify-between p-3 sm:justify-center'>
					<div className='flex items-center justify-start sm:space-x-5 flex-wrap'>
						<div>
							<div className='pb-10'>
								<div className='flex gap-6 items-center'>
									<Image
										src={sessions?.user.image ?? ''}
										alt={sessions?.user.username ?? ''}
										width={500}
										height={500}
										sizes='(max-width: 500px) 100vw, 500px'
										priority
										className='w-24 h-24 sm:w-36 sm:h-36 rounded-full border p-1'
									/>
									<div className='w-full'>
										<div className='flex justify-between items-center gap-5 flex-col sm:flex-row'>
											<h1 className='font-semibold text-2xl sm:text-4xl'>
												@{sessions?.user.username}
											</h1>
											<button
												className='w-44 sm:w-fit bg-gray-200 font-semibold rounded-md px-2 sm:px-3 py-1'
												name={
													sessions?.user?.uid === uid
														? 'Edit profile '
														: 'Follow '
												}
												title={
													sessions?.user?.uid === uid
														? 'Edit profile '
														: 'Follow '
												}
											>
												{sessions?.user?.uid === uid ? (
													<span className='text-sm font-medium text-black text-center'>
														Edit Profile
													</span>
												) : (
													<span className='text-sm font-medium text-black'>
														{users?.followers.find(
															(foll: { followedBy: string | undefined; }) => foll.followedBy === sessions?.user?.uid
														)
															? 'Unfollow'
															: 'Follow'}
													</span>
												)}
											</button>
										</div>
										<ul
											className={`justify-start hidden sm:flex items-center space-x-3 mt-5`}
										>
											{data.map((item) => (
												<li
													className='text-sm text-center font-medium mt-2'
													key={item.id}
												>
													<div className='flex space-x-2 items-center font-semibold text-lg'>
														<span className='font-semibold'>{item.value}</span>
														<span>{item.title}</span>
													</div>
												</li>
											))}
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<ul
					className={`justify-evenly sm:hidden border-t border-gray-400 py-5 w-full flex sm:px-5 items-center space-x-3 mt-5`}
				>
					{data.map((item) => (
						<li
							className='text-sm text-center font-semibold mt-2'
							key={item.id}
						>
							<div className='flex space-x-2 items-center'>
								<span className='font-semibold'>{item.value}</span>
								<span>{item.title}</span>
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
