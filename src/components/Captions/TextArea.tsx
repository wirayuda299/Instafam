import { Dispatch, SetStateAction } from "react";
import Buttons from "../Buttons/Buttons";
import { useDarkModeStore } from "@/stores/stores";
import { useStore } from "zustand";

type Props = {
  captions: string;
  setCaptions: Dispatch<SetStateAction<string>>;
  loading: boolean;
  handlePost: () => Promise<void>;
};
export default function TextArea(props: Props) {
  const { captions, setCaptions, loading, handlePost } = props;
  const { darkMode } = useStore(useDarkModeStore);

  return (
    <div className="w-full p-3">
      <textarea
        spellCheck="false"
        className={`w-full resize-none rounded-md p-2 outline-none  ${
          darkMode ? "bg-black " : "bg-white"
        }`}
        value={captions}
        placeholder="Your caption"
        name="caption"
        onChange={(e) => setCaptions(e.target.value)}
        cols={60}
        rows={10}
      ></textarea>
      <Buttons
        disabled={loading}
        onClick={handlePost}
        name="post"
        type="button"
        title="post"
        className={`ease w-full rounded-lg py-4  text-lg font-semibold  transition-all duration-300 hover:bg-opacity-100 ${
          darkMode
            ? "border border-gray-400 border-opacity-30 bg-gray-500 bg-opacity-80 text-white"
            : "bg-gray-100 text-black"
        }`}
      >
        {loading ? (
          <div className="flex w-full items-center justify-center space-x-3">
            <span>Uploading... </span>
          </div>
        ) : (
          "Post"
        )}
      </Buttons>
    </div>
  );
}
