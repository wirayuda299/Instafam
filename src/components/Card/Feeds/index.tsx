import { DocumentData } from 'firebase/firestore';
import Image from 'next/image';
import { AiFillHeart, AiTwotoneMessage } from 'react-icons/ai';
interface IExplorePostCardProps {
	post: DocumentData;
}

export default function ExplorePostCard({ post }: IExplorePostCardProps) {
	return (
		<div className=' rounded-lg shadow-md'>
			<div className='relative w-full group'>
				<Image
					src={post?.image}
					width={500}
					height={500}
					priority
					quality={55}
					className=' object-cover w-full'
					alt={post?.author ?? 'user post image'}
				/>
				<div className='absolute inset-0 flex justify-around items-center bg-black bg-opacity-0 hover:bg-opacity-25'>
					<button
						type='button'
						name='likes count button'
						className='opacity-0 group-hover:opacity-100 transition-all ease duration-500 text-center text-white'
					>
						<p className='text-center flex items-center space-x-2'>
							<AiFillHeart size={35} color={'white'} />
							<small className='font-semibold text-sm'>
								{post?.likedBy.length}
							</small>
						</p>
					</button>
					<button
						type='button'
						name='posts comment count button'
						className='opacity-0 group-hover:opacity-100 transition-all ease duration-500 text-center text-white'
					>
						<p className='text-center flex items-center space-x-2'>
							<AiTwotoneMessage size={35} color={'white'} />
							<small className='font-semibold text-sm'>
								{post?.comments.length}
							</small>
						</p>
					</button>
				</div>
			</div>
		</div>
	);
}
