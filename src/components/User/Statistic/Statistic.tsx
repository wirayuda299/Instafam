import { IUserPostProps } from '@/types/post';
import { IUser } from '@/types/user';
import { Session } from 'next-auth';
import Image from 'next/image';
interface IProps {
	users: IUser | undefined;
	posts: IUserPostProps[] | [];
	session: Session | null;
	refreshData: () => void;
}

export default function Statistic({
	session,
	users,
	posts,
	refreshData,
}: IProps) {
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
				<div className='w-full flex items-center flex-col sm:flex-row justify-between sm:justify-around'>
					<div className='flex items-center justify-start sm:space-x-5 flex-wrap'>
						<div className='py-5'>
							<div className='pb-5 md:pb-10'>
								<div className='flex gap-6 xs1:space-x-10 items-center justify-evenly w-full'>
									<Image
										src={users ? users?.image : ''}
										alt={users ? users?.username : ''}
										width={500}
										height={500}
										sizes='(max-width: 500px) 100vw, 500px'
										priority
										className='w-24 h-24 xs1:w-28 xs1:h-28 rounded-full border p-1'
									/>
									<div className='w-full'>
										<div className='flex justify-between flex-col sm:flex-row sm:items-center gap-2 sm:gap-5'>
											<h1 className='font-semibold flex-1 text-left text-2xl sm:mb-5 xs1:text-4xl xs1:pb-3 sm:pb-0'>
												{users ? users?.username : ''}
											</h1>
											{session?.user.uid !== users?.uid ? (
												<button
													name='Follow unfollow'
													title='follow unfollow'
													className='w-full bg-blue-600 truncate text-xs text-white rounded px-5 md:py-2 py-1'
													onClick={async () => {
														const { handleFollow } = await import(
															'@/helper/follow'
														);
														const followArgs = {
															id: users?.uid as string,
															uid: session?.user.uid as string,
															followedByName: session?.user.username as string,
															refreshData,
															ssr: true,
														};
														handleFollow(followArgs);
													}}
												>
													{users?.followers.find(
														(foll: { followedBy: string | undefined }) =>
															foll.followedBy === session?.user.uid
													)
														? 'Unfollow'
														: 'Follow'}
												</button>
											) : null}
										</div>

										<ul
											title='Statistic'
											className={`justify-start hidden sm:flex items-center space-x-3 mt-2`}
										>
											{data.map((item) => (
												<li
													title={item.title}
													className='text-sm text-center font-medium mt-1'
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
				{/* Mobile statistic start */}
				<ul
					title='Statistic'
					className={`justify-evenly sm:hidden border-t border-gray-400 py-5 w-full flex sm:px-5 items-center space-x-3 mt-5`}
				>
					{data.map((item) => (
						<li
							title={item.title}
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
				{/* Mobile statistic end */}
			</div>
		</div>
	);
}
