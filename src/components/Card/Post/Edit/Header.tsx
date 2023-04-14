import { IUserPostProps } from '@/types/post';
import Image from 'next/image';
import { BsThreeDots } from 'react-icons/bs';
type Props = {
	posts: IUserPostProps;
	getCreatedDate: (post: any | undefined) => string | undefined;
};
export default function Header({ posts, getCreatedDate }: Props) {
	return (
		<div className='flex px-3 w-full transition-all items-start ease duration-300 py-3 bg-white dark:bg-black border-gray-500 border-opacity-50'>
			<div className='flex-1 flex items-start space-x-2 border-b border-gray-500 border-opacity-50 pb-3'>
				<div className='flex space-x-2 cursor-pointer'>
					<Image
						src={posts?.postedByPhotoUrl ?? ''}
						width={40}
						height={40}
						priority
						alt={posts?.author}
						className='rounded-full bg-gradient-to-bl from-pink-600 to-orange-600 p-0.5'
					/>
					<div className='cursor-pointer'>
						<h4 className='font-semibold pr-1'> {posts?.author} </h4>
						<p className='text-xs text-gray-500'>{getCreatedDate(posts)}</p>
					</div>
				</div>
				&#8226;
				<button
					className='text-xs font-semibold pt-1'
					type='button'
					name='follow and unfollow'
					title='folow and unfollow'
				>
					follow
				</button>
			</div>
			<button type='button' name='options' title='options'>
				<BsThreeDots />
			</button>
		</div>
	);
}
