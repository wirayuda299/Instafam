import { IUserPostProps } from '@/types/post';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { memo } from 'react';
const PostInfo = dynamic(() => import('./PostInfo'), { ssr: false });

function ExplorePostCard({ post }: { post: IUserPostProps }) {
	return (
		<div className=' shadow-lg relative group mb-8'>
			<Image
				src={post?.image}
				width={1300}
				height={1300}
				loading='lazy'
				sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw,
				33vw'
				placeholder='blur'
				blurDataURL={
					'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////2wBDAf//////////////////////////////////////////////////////////////////////////////////////wAARCAACAAMDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwBaKKKAP//Z'
				}
				quality={60}
				className='object-cover  rounded-lg mb-5 h-auto w-full'
				alt={post?.author ?? 'user post image'}
			/>
			<PostInfo post={post} />
		</div>
	);
}
export default memo(ExplorePostCard);
