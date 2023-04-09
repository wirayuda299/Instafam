import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { memo } from 'react';
import { IUser } from '@/types/user';
const Footer = dynamic(() => import('@/components/Footer'));
type Props = {
	session: any;
	reccomend: IUser[];
};
function Suggestions({ session, reccomend }: Props) {

	return (
		<section className='min-w-[384px] hidden lg:block h-full'>
			<div className='w-full h-full p-5 max-w-sm'>
				<div className='flex items-center space-x-2 mb-2 justify-around md:justify-between'>
					<div className='flex items-center space-x-3 mb-2'>
						<Image
							className=' rounded-full'
							src={session?.user?.image ?? ''}
							alt={session?.user?.username ?? ''}
							width={45}
							height={45}
							sizes='45px'
							placeholder='blur'
							blurDataURL={
								'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////2wBDAf//////////////////////////////////////////////////////////////////////////////////////wAARCAACAAMDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwBaKKKAP//Z'
							}
							priority
							quality={50}
						/>
						<span className='text-black dark:text-white text-base font-semibold'>
							{session?.user?.username}
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
				<>
					{reccomend?.map((user: any) => (
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
									blurDataURL={
										'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////2wBDAf//////////////////////////////////////////////////////////////////////////////////////wAARCAACAAMDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwBaKKKAP//Z'
									}
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
							<Link className='ml-auto' href={`/profile/${user?.username}`}>
								<span className='text-blue-600 font-light text-xs'>View</span>
							</Link>
						</div>
					))}
				</>
			</div>
			<Footer />
		</section>
	);
}
export default memo(Suggestions);
