import Head from "next/head";

export default function NotFound() {
  return (
    <>
    <Head>
      <title>404 | Instafam</title>
    <meta name='description' content='Sign in to your Instafam account' />
			<meta
				httpEquiv='Content-Security-Policy'
				content='upgrade-insecure-requests'
			/>
			 <meta httpEquiv='Content-Security-Policy' content='block-all-mixed-content' />
			 <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'"/>
			 <meta http-equiv="X-Frame-Options" content="DENY"/>
			 <meta name="referrer" content="strict-origin"/>
			 <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
			 <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
			 <meta name="theme-color" content="#000000"/>
			 <meta name='robots' content='noindex, nofollow'/>
			 <meta name='googlebot' content='noindex, nofollow'/>
			 <meta name='google' content='notranslate'/>
			 <meta name='google' content='nositelinkssearchbox'/>
    </Head>
      <div className='flex flex-col items-center justify-center'>
        <h1 className='text-9xl font-bold text-gray-800'>404</h1>
        <h2 className='text-3xl font-bold text-gray-800'>Page Not Found</h2>
      </div>
      
    </>
  )
}
