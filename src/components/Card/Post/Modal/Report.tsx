import { db } from '@/config/firebase';
import { reportModal } from '@/store/modal';
import { selectedPostState } from '@/store/selectedPost';
import { doc, setDoc } from 'firebase/firestore';
import Image from 'next/image';
import { FieldValues, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useRecoilState, useRecoilValue } from 'recoil';

export default function Report({ session }: { session: any }) {
	const [isReportModalOpen, setIsReportModalOpen] = useRecoilState(reportModal);
	const { register, resetField, handleSubmit } = useForm();
	const selectedPost = useRecoilValue(selectedPostState);
	const defaultValues = {
		reason: '',
	};

	const handleReport = async (e: FieldValues) => {
		try {
			const reportRef = doc(db, 'reports', `${selectedPost?.postId}`);
			const reportData = {
				postId: selectedPost?.postId,
				reportedBy: session?.user.uid,
				reportedAt: Date.now(),
				reportedPost: selectedPost?.image,
				reportedPostAuthor: selectedPost?.author,
				reportedPostAuthorId: selectedPost?.postedById,
				reportedPostAuthorImage: selectedPost?.postedByPhotoUrl,
				reason: e.reason,
			};
			await setDoc(reportRef, reportData).then(() => {
				setIsReportModalOpen(false);
				resetField('reason');
				toast.success('Reported Successfully');
			});
		} catch (error) {
			toast.error('Something went wrong');
		}
	};

	return (
		<div
			className={` fixed left-0 top-0 z-[99999999] shadow-sm shadow-white  bg-black bg-opacity-60 text-black dark:text-white  h-screen w-full !overflow-y-hidden !overflow-x-hidden outline-none select-none ${
				isReportModalOpen ? 'animate-popUp' : 'animate-fadeOut hidden'
			}`}
			aria-modal='true'
			role='dialog'
		>
			<div className='max-w-lg mx-auto h-full text-center '>
				<div className='flex flex-col h-full justify-center items-center '>
					<div className='flex flex-col p-5 bg-white min-w-[400px] border py-10 rounded-lg text-black dark:bg-black dark:text-white'>
						<div>
							<h1 className='text-2xl font-bold'>Report</h1>
							<p className='text-sm text-gray-500'>
								Please specify the reason for reporting this post.
							</p>

							<div className='mt-5'>
								<div className='flex items-center flex-col'>
									<div className='flex items-center space-x-3 py-3 mb-5'>
										<Image
											src={selectedPost?.image as string}
											width={50}
											height={50}
											alt=''
											className='rounded-full'
										/>
										<h2 className='font-semibold text-xl'>
											{selectedPost?.author}
										</h2>
									</div>
									<form
										className='w-full flex items-center justify-between bg-[#b9b9b917] rounded-md px-3'
										onSubmit={handleSubmit(handleReport)}
									>
										<input
											type='text'
											placeholder='specify reason'
											autoComplete='off'
											defaultValue={defaultValues.reason}
											{...register('reason')}
											autoFocus={false}
											alt='specify reason'
											security='restricted'
											className='bg-transparent text-xs md:text-sm w-full py-2 focus:outline-none focus:border-0 focus:ring-0'
										/>
									</form>
									<div className='flex py-3'>
										<button
											className='ml-5 px-2 rounded bg-red-700'
											type='submit'
											name='report'
											title='report'
											onClick={handleReport}
										>
											Submit
										</button>

										<button
											name='cancel'
											title='cancel'
											type='button'
											className='ml-5 px-2 rounded border'
											onClick={() => setIsReportModalOpen(false)}
										>
											Cancel
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
