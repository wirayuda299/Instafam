import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import type { GetServerSidePropsContext } from "next";
import Head from "next/head";
import Logo from "@/components/Logo/Logo";

type Providers = {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
}[];

export default function SignIn({ providers }: { providers: Providers }) {
  return (
    <>
      <Head>
        <title>Sign In &#8226; Instafam</title>
        <meta name="description" content="Sign in to your Instafam account" />
        <meta
          property="og:url"
          content="https://instafam.vercel.app/auth/signin"
        />
      </Head>
      <div className="grid h-screen w-full place-items-center p-5 text-black dark:text-white">
        <div className="flex items-center justify-between gap-4 overflow-hidden">
          <div className="flex aspect-square max-h-[512px] max-w-lg flex-col items-center justify-center text-center">

            <h1 className=" bg-gradient-to-r from-pink-600 from-50% to-orange-400 bg-clip-text text-3xl font-bold text-transparent  sm:text-4xl md:text-5xl ">
              Welcome Back to Instafam
            </h1>
            <p className=" pb-7 pt-4  font-semibold  md:text-lg ">
              Share your experiences, connect with your friends and family, and
              discover new things on Instafam.
            </p>
            {Object.values(providers).map((provider) => (
              <button
                type="button"
                name="sign in with google"
                title="Sign in with Google"
                key={provider.id}
                className="ease inline-flex items-center gap-x-5 rounded-md bg-black bg-gradient-to-r  from-pink-600 from-30% to-orange-400 px-5 py-3 text-center font-semibold text-white transition-all duration-300 hover:bg-opacity-80 dark:bg-white"
                onClick={async () =>
                  await signIn(provider.id, {
                    callbackUrl: `${process.env.NEXTAUTH_URL}`,
                    redirect: true,
                  })
                }
              >
                Sign in with {provider.name}
                <span>
                  <FcGoogle size={25} />
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
