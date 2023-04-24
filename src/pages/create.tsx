import dynamic from "next/dynamic";
import Head from "next/head";
import { useStore } from "zustand";
import { useCroppedImgStore, useDarkModeStore } from "@/stores/stores";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { makePost } from "@/helper/makePost";
import { useRouter } from "next/router";
const Captions = dynamic(() => import("@/components/Captions/Captions"), {
  ssr: false,
});


export default function CreatePost() {
  const { croppedImg, setCroppedImg } = useStore(useCroppedImgStore);
  const { darkMode } = useStore(useDarkModeStore);
  const [captions, setCaptions] = useState<string>('')
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (!session) router.push("/auth/signin")
    if (!croppedImg) router.push("/")
  }, [croppedImg, session])

  const makePosts = async () => {
    const args = {
      captions,
      croppedImg: croppedImg,
      session,
      setCaptions,
      setImg: setCroppedImg,
      setLoading,
      img: croppedImg,
    }
    await makePost(args)

  }
  return (
    <div className={`w-full h-screen !overflow-y-auto mb-5 ${darkMode ? 'bg-black' : 'bg-white'}`}>
      <div className=" mx-auto grid lg:grid-cols-2 place-items-center h-full !overflow-y-auto">
        <Image
          className="object-cover hidden lg:block"
          src={croppedImg}
          width={500}
          height={500}
          alt="post image"
          priority />
        <div>
          <Captions
            captions={captions}
            handlePost={makePosts}
            img={croppedImg}
            loading={loading}
            session={session}
            setCaptions={setCaptions} />
        </div>
      </div>
      <br />
      <br />
    </div>
  )
}
