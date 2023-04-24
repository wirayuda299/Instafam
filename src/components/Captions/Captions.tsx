import Image from "next/image";
import dynamic from "next/dynamic";
import { Dispatch, SetStateAction } from "react";
import { useDarkModeStore } from "@/stores/stores";
import { useStore } from "zustand";
const TextArea = dynamic(() => import("./TextArea"));

interface Props {
  handlePost: () => Promise<void>;
  loading: boolean;
  session: any;
  img: string;
  setCaptions: Dispatch<SetStateAction<string>>;
  captions: string;
}

export default function Captions(props: Props) {
  const { handlePost, loading, session, img, setCaptions, captions } = props;
  const { darkMode } = useStore(useDarkModeStore);

  return (
    <div
      id="create-post"
      className={`max-h-full w-full max-w-lg rounded-md p-2 pb-10 shadow-lg  md:pb-0 ${!img ? "hidden" : "block"
        } ${darkMode ? 'bg-black border border-gray-500 border-opacity-50' : 'bg-white shadow-md shadow-gray-400'}`}
    >
      <div className="flex w-full items-center space-x-2 border-b border-opacity-50  border-gray-400 p-2">
        <Image
          className="rounded-full p-3"
          src={session?.user?.image || ""}
          alt={session?.user?.username || ""}
          width={60}
          loading="lazy"
          placeholder="blur"
          blurDataURL={
            "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAACAAMDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDpbiR1mYB2A46H2ooooEf/2Q=="
          }
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
