import { db } from '@/config/firebase';
import { IUserPostProps } from '@/types/post';
import { IUser } from '@/types/user';
import { onSnapshot, query, collection, where } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Image from 'next/image';
interface IProps {
	username: string;
	uid: string;
	image: string;
	name: string;
}

export default function Statistic({ username, uid, image, name }: IProps) {
	const [userPosts, setUserPosts] = useState<IUserPostProps[]>([]);
	const [users, setUsers] = useState<IUser[]>([]);
	const { data: session } = useSession();

	useEffect(() => {
		onSnapshot(
			query(collection(db, 'posts'), where('postedById', '==', `${uid}`)),
			(snapshot) => {
				setUserPosts(snapshot.docs.map((doc) => doc.data() as IUserPostProps));
			}
		);
	}, [db]);

	useEffect(() => {
		onSnapshot(
			query(collection(db, 'users'), where('uid', '==', `${uid}`)),
			(snapshot) => {
				setUsers(snapshot.docs.map((doc) => doc.data() as IUser));
			}
		);
	}, [db]);

	const data = [
		{
			id: 1,
			title: 'Posts',
			value: userPosts.length,
		},
		{
			id: 2,
			title: 'Followers',
			value: users[0]?.followers.length,
		},
		{
			id: 3,
			title: 'Following',
			value: users[0]?.following.length,
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
										src={image ?? ''}
										alt={username ?? ''}
										width={500}
										height={500}
										priority
										className='w-24 h-24 sm:w-36 sm:h-36 rounded-full border p-1'
									/>
									<div className='w-full'>
										<div className='flex justify-between items-center gap-5 flex-col sm:flex-row'>
											<h1 className='font-semibold text-2xl sm:text-4xl text-start'>
												@{username}
											</h1>
											<button
												className='w-44 sm:w-fit bg-gray-200 font-semibold rounded-md px-2 sm:px-3 py-1'
												name={
													session?.user?.uid === uid
														? 'Edit profile '
														: 'Follow '
												}
												title={
													session?.user?.uid === uid
														? 'Edit profile '
														: 'Follow '
												}
											>
												{session?.user?.uid === uid ? (
													<span className='text-sm font-medium text-black text-center'>
														Edit Profile
													</span>
												) : (
													<span className='text-sm font-medium text-black'>
														Follow
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
					className={`justify-evenly sm:hidden border-t py-5 w-full flex sm:px-5 items-center space-x-3 mt-5`}
				>
					{data.map((item) => (
						<li className='text-sm text-center font-semibold mt-2' key={item.id}>
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
