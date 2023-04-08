import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getCreatedDate } from '@/util/postDate';
import { IUserPostProps } from '@/types/post';
import { BsThreeDots } from 'react-icons/bs';
import dynamic from 'next/dynamic';
const Menus = dynamic(() => import('./Menus'), { ssr: false });

export type HeaderProps = {
	session: any;
	post: IUserPostProps;
	users: any;
	refreshData: () => void;
	ssr: boolean;
};

export default function Postheader({
	session,
	post,
	users,
	refreshData,
	ssr,
}: HeaderProps) {
	const [createdDate, setCreatedDate] = useState<string>('');
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		setCreatedDate(getCreatedDate(post));
	}, [post, session]);
	return (
		<div className='flex items-center px-4 py-3 h-fit relative'>
			<Image
				className='h-8 w-8 rounded-full object-cover'
				alt={post?.author ?? 'user profile'}
				width={50}
				height={50}
				loading='lazy'
				placeholder='blur'
				blurDataURL={
					'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////2wBDAf//////////////////////////////////////////////////////////////////////////////////////wAARCAACAAMDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwBaKKKAP//Z'
				}
				sizes='50px'
				src={post?.postedByPhotoUrl || ''}
			/>
			<div className='ml-3 w-full flex justify-between items-center '>
				<div>
					<Link
						href={`/profile/${post.postedById}`}
						className='text-sm font-semibold antialiased block leading-tight'
					>
						{post?.author}
						<span
							className={`text-xs font-thin text-gray-500 antialiased block leading-tight `}
						>
							{createdDate}
						</span>
					</Link>
				</div>
			</div>
			<Menus
			ssr={ssr}
				refreshData={refreshData}
				session={session}
				isOpen={isOpen}
				post={post}
				setIsOpen={setIsOpen}
				users={users}
			/>
			<div>
				<button
					type='button'
					name='menu'
					title='menu'
					onClick={() => setIsOpen(!isOpen)}
				>
					<BsThreeDots className='text-gray-500' size={20} />
				</button>
			</div>
		</div>
	);
}
