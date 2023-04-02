import Head from 'next/head';
import { useState } from 'react';
import { BsSend } from 'react-icons/bs';

export default function Messages() {
	const [messagesOpen, setMessagesOpen] = useState(false);
	return (
		<>
			<Head>
				<title>Messages  &#8226; Instafam</title>
			</Head>
			<div className='w-full h-full'>
				<div className='flex flex-row h-screen antialiased text-gray-800 w-full overflow-hidden'>
					<div
						className={` bg-gray-100 p-4 w-full h-screen ${
							messagesOpen
								? 'grid grid-cols-1 '
								: 'hidden md:grid md:grid-cols-2'
						} `}
					>
						<div
							className={`flex-col  w-full h-screen md:flex  overflow-y-auto overflow-x-auto pl-4 pr-4 py-4 -mr-4 ${
								messagesOpen ? 'flex w-full' : 'hidden '
							}`}
						>
							<div className='flex flex-row items-center'>
								<div className='flex flex-row items-center'>
									<div className='text-xl font-semibold'>Messages</div>
									<div className='flex items-center justify-center ml-2 text-xs h-5 w-5 text-white bg-red-500 rounded-full font-medium'>
										5
									</div>
								</div>
								<div className='ml-auto'>
									<button className='flex items-center justify-center h-7 w-7 bg-gray-200 text-gray-500 rounded-full'>
										<svg
											className='w-4 h-4 stroke-current'
											fill='none'
											stroke='currentColor'
											viewBox='0 0 24 24'
											xmlns='http://www.w3.org/2000/svg'
										>
											<path
												stroke-linecap='round'
												stroke-linejoin='round'
												stroke-width='2'
												d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
											></path>
										</svg>
									</button>
								</div>
							</div>
							<div className='mt-5'>
								<ul className='flex flex-row items-center justify-between'>
									<li>
										<a
											href='#'
											className='flex items-center pb-3 text-xs font-semibold relative text-indigo-800'
										>
											<span>All Conversations</span>
											<span className='absolute left-0 bottom-0 h-1 w-6 bg-indigo-800 rounded-full'></span>
										</a>
									</li>
									<li>
										<a
											href='#'
											className='flex items-center pb-3 text-xs text-gray-700 font-semibold'
										>
											<span>Archived</span>
										</a>
									</li>
									<li>
										<a
											href='#'
											className='flex items-center pb-3 text-xs text-gray-700 font-semibold'
										>
											<span>Starred</span>
										</a>
									</li>
								</ul>
							</div>
							<div className='mt-5'>
								<div className='text-xs text-gray-400 font-semibold uppercase'>
									Personal
								</div>
							</div>
							<div className='mt-2'>
								<div className='flex flex-col -mx-4'>
									<div className='relative flex flex-row items-center p-4'>
										<div className='absolute text-xs text-gray-500 right-0 top-0 mr-4 mt-3'>
											5 min
										</div>
										<div className='flex items-center justify-center h-10 w-10 rounded-full bg-pink-500 text-pink-300 font-bold flex-shrink-0'>
											T
										</div>
										<div
											className='flex flex-col flex-grow ml-3'
											onClick={() => setMessagesOpen(false)}
										>
											<div className='text-sm font-medium'>Cuberto</div>
											<div className='text-xs truncate w-40'>
												Lorem ipsum dolor sit amet, consectetur adipisicing
												elit. Debitis, doloribus?
											</div>
										</div>
										<div className='flex-shrink-0 ml-2 self-end mb-1'>
											<span className='flex items-center justify-center h-5 w-5 bg-red-500 text-white text-xs rounded-full'>
												5
											</span>
										</div>
									</div>
									<div className='flex w-full flex-row items-center p-4 bg-gradient-to-r from-red-100 to-transparent border-l-2 border-red-500'>
										<div className='flex items-center justify-center h-10 w-10 rounded-full bg-pink-500 text-pink-300 font-bold flex-shrink-0'>
											T
										</div>
										<div className='flex flex-col flex-grow ml-3'>
											<div className='flex items-center'>
												<div className='text-sm font-medium'>UI Art Design</div>
												<div className='h-2 w-2 rounded-full bg-green-500 ml-2'></div>
											</div>
											<div className='text-xs truncate w-40'>
												Lorem ipsum dolor sit amet, consectetur adipisicing
												elit. Debitis, doloribus?
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/* messages */}
					<div
						className={`flex-col w-full overflow-y-auto h-screen bg-white ${
							messagesOpen
								? 'hidden md:block'
								: 'md:flex flex-grow w-full col-span-3'
						} w-full`}
					>
						<div className='h-full py-4'>
							<div className='flex flex-row justify-between items-center py-4 px-6 rounded-2xl shadow'>
								<div className='flex'>
									<div className='flex items-center justify-center h-10 w-10 rounded-full bg-pink-500 text-pink-100'>
										T
									</div>
									<div className='flex flex-col ml-3'>
										<div className='font-semibold text-sm'>UI Art Design</div>
										<div className='text-xs text-gray-500'>Active</div>
									</div>
								</div>
								<button onClick={() => setMessagesOpen(true)}>back</button>
							</div>
							<div className='h-full w-full mb-3'>
								<div>
									<div className='grid overflow-y-auto w-full overflow-x-hidden grid-cols-12'>
										<div className='col-start-1 col-end-8 p-3 rounded-lg'>
											<div className='flex flex-row items-center'>
												<div className='flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0'>
													A
												</div>
												<div className='relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl'>
													<div>Hey How are you today?</div>
												</div>
											</div>
										</div>
										<div className='col-start-1 col-end-8 p-3 rounded-lg'>
											<div className='flex flex-row items-center'>
												<div className='flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0'>
													A
												</div>
												<div className='relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl'>
													<div>
														Lorem ipsum dolor sit amet, consectetur adipisicing
														elit. Vel ipsa commodi illum saepe numquam maxime
														asperiores voluptate sit, minima perspiciatis.
													</div>
												</div>
											</div>
										</div>
										<div className='col-start-6 col-end-13 p-3 rounded-lg'>
											<div className='flex items-center justify-start flex-row-reverse'>
												<div className='flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0'>
													A
												</div>
												<div className='relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl'>
													<div>Im ok what about you?</div>
												</div>
											</div>
										</div>
									</div>
									<div className=' w-full mt-auto fixed bottom-0'>
										<div className='w-[500px] flex justify-between border items-center rounded-md px-3'>
											<input
												className='flex-1 focus:border-none shadow-sm focus:outline-none border-none border-b-2 border-gray-300 py-3 px-4'
												type='text'
												placeholder='Your messages'
											/>
											<div>
												<button>
													<BsSend size={25} />
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
