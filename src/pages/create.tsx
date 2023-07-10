import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useStateContext } from "@/stores/Global/StateContext";
const Captions = dynamic(() => import("@/components/Captions/Captions"), {
  ssr: false,
});

export default function CreatePost() {
  const [captions, setCaptions] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const {
    state: { croppedImage, blurhash },
    Dispatch,
  } = useStateContext();

  useEffect(() => {
    if (!session) router.push("/auth/signin");
    if (!croppedImage) router.push(process.env.NEXTAUTH_URL as string);
  }, [croppedImage, session]);

  const makePosts = async () => {
    try {
      const { toast } = await import("react-hot-toast");
      const { makePost } = await import("@/helper/makePost");

      await makePost({
        captions,
        croppedImg: croppedImage,
        session,
        setLoading,
        img: croppedImage,
        blurDataUrl: blurhash,
      }).then(() => {
        setCaptions("");
        Dispatch({
          type: "SET_CROPPED_IMAGE",
          payload: {
            croppedImage: "",
          },
        });
        setLoading(false);
        toast.success("Post created successfully");
      });
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <div className="mb-5 h-screen w-full !overflow-y-auto bg-white dark:bg-black ">
      <div className=" mx-auto grid h-full place-items-center !overflow-y-auto lg:grid-cols-2">
        <Image
          className="hidden object-cover lg:block"
          src={croppedImage}
          width={500}
          height={500}
          alt="post image"
          priority
        />
        <div>
          <Captions
            captions={captions}
            handlePost={makePosts}
            img={croppedImage}
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
