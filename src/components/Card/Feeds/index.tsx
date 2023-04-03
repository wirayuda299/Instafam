import Image from 'next/image';
import { memo } from 'react';
import { AiFillHeart, AiTwotoneMessage } from 'react-icons/ai';

function ExplorePostCard({ post }: any) {
	return (
		<div className=' rounded-lg shadow-md '>
			<div className='relative w-full group'>
				<Image
					src={post?.image}
					width={1300}
					height={1300}
					sizes='100vw'
					loading='lazy'
					placeholder='blur'
					blurDataURL={'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAACAAMDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAX/xAAbEAACAgMBAAAAAAAAAAAAAAAAAQIDBBEhUf/EABQBAQAAAAAAAAAAAAAAAAAAAAP/xAAWEQADAAAAAAAAAAAAAAAAAAAAATH/2gAMAwEAAhEDEQA/AL+VbZG+SjZJLS4m/AAG6Mof/9k='}
					quality={55}
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
