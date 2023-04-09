import { PostSchema } from '@/schema/PostSchema';
import { IUserPostProps } from '@/types/post';
import { useState } from 'react';

export default function Author({ post }: { post: IUserPostProps }) {
	const [show, setShow] = useState(false);
	const isValidProps = PostSchema.parse(post);
	if (!isValidProps) throw new Error('Invalid Props');
	return (
		<div className='overflow-hidden'>
			<div
				className={`flex space-x-2 max-w-xs cursor-pointer ${
					show ? 'flex-wrap' : ''
				}`}
				onClick={() => setShow(!show)}
			>
				<h3 className='font-semibold text-sm pb-2'>{post?.author}</h3>
				<p className={`text-sm font-thin ${show ? '' : 'truncate'}`}>
					{post.captions}
				</p>
			</div>
			<div className='flex flex-wrap'>
				{post.hashtags.map((hastag) => (
					<span key={hastag} className='text-xs pr-1 font-normal text-blue-500'>
						{hastag}
					</span>
				))}
			</div>
		</div>
	);
}
