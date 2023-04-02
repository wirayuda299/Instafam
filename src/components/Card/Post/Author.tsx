import { IUserPostProps } from '@/types/post';
type Props = {
	post: IUserPostProps;
};

export default function Author({ post }: Props) {
	return (
		<div className='overflow-hidden'>
			<div className='flex space-x-2 flex-wrap'>
				<h3 className='font-semibold text-sm pb-2'>{post?.author}</h3>
				<p className='text-sm font-thin truncate'>{post.captions}</p>
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
