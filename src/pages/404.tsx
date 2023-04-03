import Head from 'next/head';
export default function NotFound() {
	return (
		<>
			<Head>
				<title>404  &#8226; Instafam</title>
			</Head>
			<div className='flex flex-col items-center justify-center h-screen'>
				<h1 className='text-9xl font-bold text-gray-800'>404</h1>
				<h2 className='text-3xl font-bold text-gray-800'>Page Not Found</h2>
			</div>
		</>
	);
}
