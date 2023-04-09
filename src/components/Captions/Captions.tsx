import Image from 'next/image';
import { imagesState } from '@/store/images';
import { useRecoilValue, useRecoilState } from 'recoil';
import { useSession } from 'next-auth/react';
import { captionsState } from '@/store/captions';
import {z} from 'zod';
interface Props {
	handlePost: () => Promise<void>;
	loading: boolean;
}
const captionsSchema = z.object({
	handlePost: z.function().args(z.any()).returns(z.any()),
	loading: z.boolean(),
});
export default function Captions({ handlePost, loading }: Props) {
	const [captions, setCaptions] = useRecoilState(captionsState);
	const img = useRecoilValue(imagesState);
	const { data: session } = useSession();
	const isValid = captionsSchema.parse({ handlePost, loading });
	if (!isValid) throw new Error('Invalid Props');
	return (
		<div
			id='create-post'
			className={`w-full pb-10 md:pb-0 rounded-md max-h-full shadow-lg dark:border-gray-500 p-2 bg-white dark:bg-black ${
				!img ? 'hidden' : 'block'
			}`}
		>
			<div className='flex items-center w-full space-x-2 border-b p-2'>
				<Image
					className='rounded-full p-3'
					src={session?.user?.image || ''}
					alt={session?.user?.username || ''}
					width={60}
					loading='lazy'
					placeholder='blur'
					blurDataURL={session?.user?.image || ''}
					height={60}
				/>
				<p className='text-sm md:text-lg font-semibold dark:text-white'>
					{session?.user?.username}
				</p>
			</div>
			<div className='w-full p-3'>
				<textarea
					spellCheck='false'
					className='resize-none dark:bg-transparent dark:text-white focus:outline-none w-full'
					value={captions}
					placeholder='Your caption'
					name='caption'
					onChange={(e) => setCaptions(e.target.value)}
					cols={60}
					rows={10}
				></textarea>
				<button
					disabled={loading}
					name='post'
					type='button'
					title='post'
					onClick={handlePost}
					className='w-full h-16 bg-black bg-opacity-90 hover:bg-opacity-100 transition-all ease duration-300 text-white rounded-md text-lg uppercase font-semibold dark:bg-white dark:bg-opacity-50 dark:text-black'
				>
					{loading ? (
						<div className='w-full flex justify-center space-x-3 items-center'>
							<span>Uploading... </span>
						</div>
					) : (
						'Post'
					)}
				</button>
			</div>
		</div>
	);
}
