import { useState } from 'react';
import { db, storage } from '@/config/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import ImageCropper from '@/components/Images/Cropper';
import { useRecoilState, useRecoilValue } from 'recoil';
import { croppedImageState, imagesState } from '@/store/images';
import { captionsState } from '@/store/captions';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';

const Captions = dynamic(() => import('@/components/Captions/Captions'), {
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
				<meta
					name='description'
					content='Create a new post on My Blog and share your thoughts with the world.'
				/>
				<meta property='og:title' content='Create New Post | Instafam' />
				<meta
					property='og:description'
					content='Create a new post on My Blog and share your thoughts with the world.'
				/>
				<meta property='og:type' content='website' />
				<meta property='og:url' content='https://instafam.vercel.app/create' />
				<meta name='twitter:card' content='summary_large_image' />
				<meta name='twitter:title' content='Create New Post | Instafam' />
				<meta
					name='twitter:description'
					content='Create a new post on Instafam and share your thoughts with the world.'
				/>
			</Head>
			<section className='w-full h-screen bg-white dark:bg-[#121212] overflow-y-auto p-5'>
				<div
					className={`grid grid-cols-1  place-items-center w-full h-full ${
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
export async function getServerSideProps(context: GetServerSidePropsContext) {
	const session = await getServerSession(context.req, context.res, authOptions);
	if(!session) {
		return {
			redirect: {
				destination: '/auth/signin',
				permanent: false
			}
		}
	}

}