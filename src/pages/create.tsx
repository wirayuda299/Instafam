import { useState } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useSession } from "next-auth/react";
const Captions = dynamic(() => import("@/components/Captions/Captions"), {
  ssr: false,
  loading({ error, isLoading, pastDelay }) {
    if (isLoading || pastDelay) {
      return <div>Loading...</div>;
    } else if (error) {
      return <div>Failed to load</div>;
    } else {
      return null;
    }
  },
});
const ImageCropper = dynamic(() => import("@/components/Cropper/Cropper"), {
  ssr: false,
  loading({ error, isLoading, pastDelay }) {
    if (isLoading || pastDelay) {
      return <div>Loading...</div>;
    } else if (error) {
      return <div>Failed to load</div>;
    } else {
      return null;
    }
  },
});

export default function CreatePost() {
  const [captions, setCaptions] = useState("");
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [croppedImg, setCroppedImg] = useState("");
  const { data: session } = useSession()
  return (
    <>
      <Head>
        <title>Create New Post &#8226; Instafam</title>
      </Head>
      <section className="h-screen w-full overflow-y-auto bg-white p-10 dark:bg-[#121212] sm:grid sm:place-content-center md:p-5">
        <div
          className={`container mx-auto grid grid-cols-1 place-items-center gap-2 md:gap-7 ${!img ? "" : "md:grid-cols-2"
            }`}
        >
          <ImageCropper
            img={img}
            setCroppedImg={setCroppedImg}
            setImg={setImg}
          />
          <Captions
            captions={captions}
            setCaptions={setCaptions}
            img={img}
            session={session}
            handlePost={async () => {
              const { makePost } = await import("@/helper/makePost");
              const args = {
                captions,
                croppedImg,
                session,
                setCaptions,
                setImg,
                setLoading,
                img,
              };
              await makePost(args);
            }}
            loading={loading}
          />
        </div>
      </section>

    </>
  );
}
