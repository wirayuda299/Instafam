import { IUserPostProps } from '@/types/post';
import Image from 'next/image';
import { memo } from 'react';
import { AiFillHeart, AiTwotoneMessage } from 'react-icons/ai';
type ExplorePostCardProps = {
	post: IUserPostProps;
}

function ExplorePostCard({ post}: ExplorePostCardProps) {
	return (
		<div className=' rounded-lg shadow-md p-2 mb-4' >
			<div className='relative w-full group'>
				<Image
					src={post?.image}
					width={1300}
					height={1300}
					sizes='100vw'
					loading='lazy'
					placeholder='blur'
					blurDataURL={'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////2wBDAf//////////////////////////////////////////////////////////////////////////////////////wAARCAACAAMDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwBaKKKAP//Z'}
					quality={65}
					className=' object-cover w-full h-auto rounded-lg'
					alt={post?.author ?? 'user post image'}
				/>
				<div className='absolute inset-0 flex justify-around items-center bg-black bg-opacity-0 hover:bg-opacity-25'>
					<button
						type='button'
						name='likes count button'
						title='likes count button'
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
						title='comments count button'
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
export default memo(ExplorePostCard);
