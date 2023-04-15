import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineInstagram } from "react-icons/ai";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
interface Providers {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
}

export default function SignIn({ providers }: { providers: Providers }) {
  return (
    <>
      <Head>
        <title>Sign In &#8226; Instafam</title>
        <meta name="description" content="Sign in to your Instafam account" />
        <meta name="keywords" content="instagram, sign in, login" />
        <meta
          property="og:url"
          content="https://instafam.vercel.app/auth/signin"
        />
        <meta name="X-content-type-options" content="nosniff" />
        <meta name="X-frame-options" content="DENY" />
        <meta name="X-xss-protection" content="1; mode=block" />
        <meta name="referrer" content="no-referrer" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="google" content="notranslate" />
      </Head>
      <div className="grid h-screen w-full place-items-center p-5">
        <div className="mx-auto flex h-full items-center justify-center rounded-lg bg-white bg-opacity-10 p-8 text-center shadow-xl backdrop-blur-lg backdrop-filter">
          <div className="flex aspect-square max-h-[512px] max-w-lg flex-col items-center justify-center">
            <div className="text-9xl text-white ">
              <AiOutlineInstagram />
            </div>
            <h1 className=" prose bg-gradient-to-r from-pink-600 to-slate-50 bg-clip-text text-3xl font-bold text-transparent text-white sm:text-4xl md:text-5xl ">
              Welcome Back to Instafam
            </h1>
            <p className="prose-sm prose-invert pb-7 font-semibold text-white md:text-lg">
              Share your experiences, connect with your friends and family, and
              discover new things on Instafam.
            </p>
            {Object.values(providers).map((provider) => (
              <button
                type="button"
                name="sign in with google"
                title="Sign in with Google"
                key={provider.id}
                className="ease inline-flex items-center gap-x-5 rounded-md bg-black px-5 py-3 text-center text-white transition-all duration-300 hover:bg-opacity-80"
                onClick={() =>
                  signIn(provider.id, {
                    callbackUrl: `${process.env.NEXTAUTH_URL}`,
                    redirect: true,
                  })
                }
              >
                Sign in with {provider.name}
                <span>
                  <FcGoogle />
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
  const { getProviders, getSession } = await import("next-auth/react");
  const session = await getSession({ req });
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const providers = await getProviders();
  return {
    props: { providers: providers ?? [] },
  };
}
