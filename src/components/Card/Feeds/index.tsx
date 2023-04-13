import { PostSchema } from '@/schema/PostSchema';
import { IUserPostProps } from '@/types/post';
import { imageLoader } from '@/util/imageLoader';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { memo } from 'react';
const PostInfo = dynamic(() => import('./PostInfo'), { ssr: false });
import { z } from 'zod';

const FeedSchema = z.object({
	post:PostSchema
})

function ExplorePostCard({ post }: { post: IUserPostProps }) {
	const isValid = FeedSchema.parse({ post });
	if(!isValid) throw new Error('Invalid props for ExplorePostCard Component')
	
	return (
		<Link href={`/post/${post.postId}`} as={`/post/${post.postId}`}>
			<div className='shadow-lg relative group'>
				<Image
					src={post?.image}
					width={1300}
					height={1300}
					loading='lazy'
					sizes='100vw'
					placeholder='blur'
					blurDataURL={
						'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////2wBDAf//////////////////////////////////////////////////////////////////////////////////////wAARCAACAAMDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwBaKKKAP//Z'
					}
					quality={60}
					loader={() => imageLoader({src: post?.image, width: 1300, quality: 10})}
					className='object-cover  rounded-lg mb-5 h-auto w-full'
					alt={post?.author ?? 'user post image'}
				/>
				<PostInfo post={post} />
			</div>
		</Link>
	);
}
export default memo(ExplorePostCard);
