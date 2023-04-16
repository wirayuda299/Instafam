import Image from "next/image";
import { Session } from "next-auth";
import dynamic from "next/dynamic";
import { Dispatch, SetStateAction } from "react";
const TextArea = dynamic(() => import("./TextArea"));

interface Props {
  handlePost: () => Promise<void>;
  loading: boolean;
  session: Session | null;
  img: string;
  setCaptions: Dispatch<SetStateAction<string>>;
  captions: string;
}

export default function Captions({
  handlePost,
  loading,
  session,
  img,
  setCaptions,
  captions,
}: Props) {
  return (
    <div
      id="create-post"
      className={`max-h-full w-full rounded-md bg-white p-2 pb-10 shadow-lg dark:border-gray-500 dark:bg-black md:pb-0 ${
        !img ? "hidden" : "block"
      }`}
    >
      <div className="flex w-full items-center space-x-2 border-b p-2">
        <Image
          className="rounded-full p-3"
          src={session?.user?.image || ""}
          alt={session?.user?.username || ""}
          width={60}
          loading="lazy"
          placeholder="blur"
          blurDataURL={session?.user?.image || ""}
          height={60}
        />
        <p className="text-sm font-semibold dark:text-white md:text-lg">
          {session?.user?.username}
        </p>
      </div>
      <TextArea
        captions={captions}
        handlePost={handlePost}
        loading={loading}
        setCaptions={setCaptions}
      />
    </div>
  );
}
