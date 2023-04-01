import { useState } from 'react';
import { db, storage } from '@/config/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useRecoilState, useRecoilValue } from 'recoil';
import { croppedImageState, imagesState } from '@/store/images';
import { captionsState } from '@/store/captions';
import dynamic from 'next/dynamic';
import Head from 'next/head';

const Captions = dynamic(() => import('@/components/Captions/Captions'), {
	ssr: false
});
const ImageCropper = dynamic(() => import('@/components/Images/Cropper'), {
	ssr: false
});

export default function CreatePost() {
	const [captions, setCaptions] = useRecoilState(captionsState);
	const [img, setImg] = useRecoilState(imagesState);
	const [loading, setLoading] = useState(false);
	const { data: session } = useSession();
	const croppedImg = useRecoilValue(croppedImageState);
	const router = useRouter();

	const handlePost = async () => {
		if (!img) return;
		setLoading(true);
		const hashtags =
			captions
				.match(/#(?!\n)(.+)/g)
				?.join(' ')
				.split(' ') || [];
		const randomNum = Math.floor(Math.random() * 7654391);
		const uuid = crypto.randomUUID();
		try {
			if (!session) router.push('/auth/signin');

			const imageRef = ref(storage, `post/${uuid}/image`);
			await uploadString(imageRef, croppedImg ?? '', 'data_url').then(
				async () => {
					const downloadUrl = await getDownloadURL(imageRef);
					await setDoc(doc(db, 'posts', `post-${uuid}`), {
						captions: captions.match(/^[^#]*/),
						postedById: session?.user?.uid,
						author: session?.user && session?.user.username,
						comments: [],
						image: downloadUrl,
						postedByPhotoUrl: session?.user?.image,
						likedBy: [],
						docId: `post-${randomNum}`,
						createdAt: Date.now(),
						hashtags,
						tags: [],
						postId: uuid,
					}).then(() => {
						setCaptions('');
						setImg('');
						setLoading(false);
					});
				}
			);
		} catch (error: any) {
			setLoading(false);
			console.error(error.message);
		}
	};

	return (
		<>
			<Head>
				<title>Create New Post | Instafam</title>
			</Head>
			<section className='w-full h-screen bg-white dark:bg-[#121212] overflow-y-auto p-5'>
				<div
					className={`grid grid-cols-1 gap-7 place-items-center w-full h-full ${
						!img ? '' : 'md:grid-cols-2'
					}`}
				>
					<ImageCropper />
					<Captions handlePost={handlePost} loading={loading} />
				</div>
			</section>
		</>
	);
}
