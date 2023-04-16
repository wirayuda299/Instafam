import Head from "next/head";
import Image from "next/image";
import images from "../../public/404.webp";
export default function NotFound() {
  return (
    <>
      <Head>
        <title>404 &#8226; Instafam</title>
      </Head>
      <div className="relative h-screen overflow-hidden bg-indigo-900">
        <Image
          src={images}
          alt="404"
          className="absolute h-full w-full object-cover"
          priority
          sizes="(max-width: 640px) 640px, 100vw"
          quality={100}
          security="restricted"
          role="presentation"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-black opacity-25">    </div>
        <div className="container relative z-10 mx-auto flex items-center px-6 py-32 md:px-12 xl:py-40">
          <div className="relative z-10 flex w-full flex-col items-center font-mono">
            <h1 className="mt-4 text-center text-5xl font-extrabold leading-tight text-white">
              You are all alone here
            </h1>
            <p className="my-44 animate-bounce text-8xl font-extrabold text-white">
              404
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
