import Image from "next/image";
import dynamic from "next/dynamic";
import type { Dispatch, FC, SetStateAction } from "react";
import { useDarkModeStore } from "@/stores/stores";
import { useStore } from "zustand";
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
  const { darkMode } = useStore(useDarkModeStore);

  return (
    <div
      id="create-post"
      className={`max-h-full w-full max-w-lg rounded-md p-2 pb-10 shadow-lg  md:pb-0 ${
        !img ? "hidden" : "block"
      } ${
        darkMode
          ? "border border-gray-500 border-opacity-50 bg-black"
          : "bg-white shadow-md shadow-gray-400"
      }`}
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
        <h1
          className={`text-sm font-semibold md:text-lg ${
            darkMode ? "text-white" : "text-black"
          }`}
        >
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
