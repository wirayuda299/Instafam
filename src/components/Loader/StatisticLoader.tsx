export default function StatisticLoader() {
	return (
		<div className='w-full py-5 max-w-5xl mx-auto animate-pulse'>
			<div className='text-black dark:text-white border-b pb-14 container'>
				<div className='flex items-center w-full space-x-3 md:justify-center md:space-x-10'>
					<div className='w-24 h-24 bg-gray-200 rounded-full'></div>
					<div className='flex flex-col'>
						<div className='w-44 h-10 bg-gray-200 rounded'></div>
						<div className='w-36 h-6 bg-gray-200 rounded mt-1'></div>
					</div>
				</div>
			</div>
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 p-5 justify-center items-center w-full'>
				<div className='mx-auto w-full h-full col-span-3'>
					<div className='w-full h-28 bg-gray-200 rounded-lg'></div>
				</div>
			</div>
		</div>
	);
}
