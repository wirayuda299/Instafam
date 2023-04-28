import dynamic from "next/dynamic";
import { useStore } from "zustand";
import { useBlurhashStore, useCroppedImgStore, useDarkModeStore } from "@/stores/stores";
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
  const [captions, setCaptions] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const { blurhash } = useStore(useBlurhashStore)
  

  useEffect(() => {
    if (!session) router.push("/auth/signin");
    if (!croppedImg) router.push("/");
  }, [croppedImg, session]);

  const makePosts = async () => {
    const args = {
      captions,
      croppedImg: croppedImg,
      session,
      setCaptions,
      setImg: setCroppedImg,
      setLoading,
      img: croppedImg,
      blurDataUrl: blurhash
    };
    await makePost(args);
  };
  return (
    <div
      className={`mb-5 h-screen w-full !overflow-y-auto ${
        darkMode ? "bg-black" : "bg-white"
      }`}
    >
      <div className=" mx-auto grid h-full place-items-center !overflow-y-auto lg:grid-cols-2">
        <Image
          className="hidden object-cover lg:block"
          src={croppedImg}
          width={500}
          height={500}
          alt="post image"
          priority
        />
        <div>
          <Captions
            captions={captions}
            handlePost={makePosts}
            img={croppedImg}
            loading={loading}
            session={session}
            setCaptions={setCaptions}
          />
        </div>
      </div>
      <br />
      <br />
    </div>
  );
}
