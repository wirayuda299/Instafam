import Image from "next/image";
import dynamic from "next/dynamic";
import type { Dispatch, FC, SetStateAction } from "react";
import type { Session } from "next-auth";

const TextArea = dynamic(() => import("./TextArea"));

type CaptionsProps = {
  handlePost: () => Promise<void>;
  loading: boolean;
  session: Session | null;
  img: string;
  setCaptions: Dispatch<SetStateAction<string>>;
  captions: string;
};

const Captions: FC<CaptionsProps> = (props) => {
  const { handlePost, loading, session, img, setCaptions, captions } = props;

  if (!img) return null;

  return (
    <div
      id="create-post"
      className="max-h-full w-full max-w-lg rounded-md bg-white p-2 pb-10 shadow-lg shadow-gray-400 dark:border dark:border-gray-500 dark:border-opacity-50 dark:bg-black  md:pb-0"
    >
      <div className="flex w-full items-center space-x-2 border-b border-gray-400  border-opacity-50 p-2">
        <Image
          className="rounded-full p-3"
          src={session?.user?.image || ""}
          alt={session?.user?.username || ""}
          width={60}
          height={60}
          quality={50}
        />
        <h1 className="text-sm font-semibold text-white dark:text-black md:text-lg ">
          {session?.user?.username}
        </h1>
      </div>
      <TextArea
        captions={captions}
        handlePost={handlePost}
        loading={loading}
        setCaptions={setCaptions}
      />
    </div>
  );
};
export default Captions;
