import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { croppedImageState, imagesState } from '@/store/images';
import { captionsState } from '@/store/captions';
import dynamic from 'next/dynamic';
import Head from 'next/head';
const Captions = dynamic(() => import('@/components/Captions/Captions'), {
	ssr: false,
});
const ImageCropper = dynamic(() => import('@/components/Images/Cropper'), {
	ssr: false,
});

export default function CreatePost() {
	const [captions, setCaptions] = useRecoilState(captionsState);
	const [img, setImg] = useRecoilState(imagesState);
	const [loading, setLoading] = useState<boolean>(false);
	const { data: session } = useSession();
	const croppedImg = useRecoilValue(croppedImageState);

	return (
		<>
			<Head>
				<title>Create New Post &#8226; Instafam</title>
			</Head>
			<section className='w-full h-screen bg-white dark:bg-[#121212] overflow-y-auto p-10 md:p-5 sm:grid sm:place-content-center'>
				<div
					className={`container mx-auto grid grid-cols-1 gap-2 md:gap-7 place-items-center ${
						!img ? '' : 'md:grid-cols-2'
					}`}
				>
					<ImageCropper />
					<Captions
						handlePost={async () => {
							const { makePost } = await import('@/helper/makePost');
							await makePost(
								captions,
								croppedImg,
								session,
								setCaptions,
								setImg,
								setLoading,
								img
							);
						}}
						loading={loading}
					/>
				</div>
			</section>
		</>
	);
}
