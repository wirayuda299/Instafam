import { ChangeEvent, FC } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';

interface IProps {
	setPreviewUrl: React.Dispatch<React.SetStateAction<string>>;
	img: string | undefined;
}

export const ImageInput: FC<IProps> = ({ setPreviewUrl, img }) => {
	const handleInputImage = async (e: ChangeEvent<HTMLInputElement>) => {
		let selectedFile = e.target.files?.[0];
		if (!selectedFile) return;

		const reader = new FileReader();
		reader.onload = async (event) => {
			if (event.target) {
				return setPreviewUrl(event.target.result as string);
			}
		};
		reader.readAsDataURL(selectedFile);
	};
	return (
		<div
			className={` items-center justify-center w-full ${
				img === '' ? 'flex' : 'hidden'
			}`}
		>
			<div className='max-w-xl w-full flex justify-center mx-auto'>
				<label
					htmlFor='dropzone-file'
					className='flex flex-col items-center justify-center w-full h-80 border-2 border-gray-300 rounded-lg cursor-pointer  hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'
				>
					<div className='flex flex-col items-center justify-center pt-5 pb-6'>
						<AiOutlineCloudUpload className='w-12 h-12 text-gray-400' />
						<div className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
							<span className='font-semibold block text-center'>
								Click to upload
							</span>
							<p className='text-xs text-gray-500 dark:text-gray-400'>
								PNG, JPG or any image extensions{' '}
							</p>
						</div>
					</div>
					<input
						id='dropzone-file'
						type='file'
						accept='video/*,image/*, .png, .jpg, .jpeg, .gif, .mp4, .mov, .webm'
						required
						className='hidden '
						onChange={async (e) => await handleInputImage(e)}
					/>
				</label>
			</div>
		</div>
	);
};
