export default function Recommendation() {
	return (
		<section className='min-w-[400px] hidden lg:block'>
			<div className='w-full h-full p-5 max-w-sm animate-pulse'>
				<div className='flex items-center space-x-2 mb-2 justify-around md:justify-between'>
					<div className='flex items-center space-x-3 mb-2'>
						<div className='bg-gray-200   dark:bg-gray-700 rounded-full w-9 h-9'></div>
						<div className='bg-gray-200   dark:bg-gray-700 rounded-full w-24 h-5'></div>
					</div>
					<div>
						<button className='text-blue-600 text-xs font-semibold bg-gray-200  dark:bg-gray-700 w-9 h-4 rounded-md'></button>
					</div>
				</div>
				<div className='flex justify-between'>
					<div className='text-gray-500 text-sm font-semibold bg-gray-200  dark:bg-gray-700 w-16 h-5 rounded-lg'></div>
					<button className='text-xs dark:text-blue-600 bg-gray-200  dark:bg-gray-700 w-9 h-4 rounded-md'></button>
				</div>
				<div>
					<div className='flex items-center space-x-2 mb-2 mt-5 w-full justify-between'>
						<div className='flex space-x-2 items-center pb-3'>
							<div className='bg-gray-200  dark:bg-gray-700 rounded-full w-9 h-9'></div>
							<div className='flex flex-col items-start justify-center'>
								<div className='bg-gray-200  dark:bg-gray-700 rounded-full w-24 h-5'></div>
								<div className='bg-gray-200  dark:bg-gray-700 rounded-full w-20 h-4 mt-1'></div>
							</div>
						</div>
						<div className='ml-auto'>
							<div className='bg-gray-200  dark:bg-gray-700 rounded-full w-16 h-6'></div>
						</div>
					</div>
					<div className='flex items-center space-x-2 mb-2 mt-5 w-full justify-between'>
						<div className='flex space-x-2 items-center pb-3'>
							<div className='bg-gray-200  dark:bg-gray-700 rounded-full w-9 h-9'></div>
							<div className='flex flex-col items-start justify-center'>
								<div className='bg-gray-200  dark:bg-gray-700 rounded-full w-24 h-5'></div>
								<div className='bg-gray-200  dark:bg-gray-700 rounded-full w-20 h-4 mt-1'></div>
							</div>
						</div>
						<div className='ml-auto'>
							<div className='bg-gray-200  dark:bg-gray-700 rounded-full w-16 h-6'></div>
						</div>
					</div>
					<div className='flex items-center space-x-2 mb-2 mt-5 w-full justify-between'>
						<div className='flex space-x-2 items-center pb-3'>
							<div className='bg-gray-200  dark:bg-gray-700 rounded-full w-9 h-9'></div>
							<div className='flex flex-col items-start justify-center'>
								<div className='bg-gray-200  dark:bg-gray-700 rounded-full w-24 h-5'></div>
								<div className='bg-gray-200  dark:bg-gray-700 rounded-full w-20 h-4 mt-1'></div>
							</div>
						</div>
						<div className='ml-auto'>
							<div className='bg-gray-200  dark:bg-gray-700 rounded-full w-16 h-6'></div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
