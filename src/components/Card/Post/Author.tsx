import { IUserPostProps } from '@/types/post';
import { FC } from 'react';

interface IProps {
	post: IUserPostProps;
}

export const PostAuthor: FC<IProps> = ({ post }) => {
	return (
		<div className='flex items-center gap-2 px-1'>
			<h3 className='font-semibold text-md'>{post?.author}</h3>
			<p className='text-sm font-thin'>{post.captions}</p>
			<div>
				{post.hashtags.map((hastag, i) => (
					<span key={hastag} className='text-xs font-normal text-blue-500'>
						{hastag}
					</span>
				))}
			</div>
		</div>
	);
};
