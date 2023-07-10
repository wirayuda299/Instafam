import type { Dispatch, FC, SetStateAction } from "react";

type TextAreaProps = {
  captions: string;
  setCaptions: Dispatch<SetStateAction<string>>;
  loading: boolean;
  handlePost: () => Promise<void>;
};
const TextArea: FC<TextAreaProps> = (props) => {
  const { captions, setCaptions, loading, handlePost } = props;

  return (
    <div className="w-full p-3">
      <textarea
        spellCheck="false"
        className="w-full resize-none rounded-md bg-white p-2 outline-none dark:bg-black"
        value={captions}
        placeholder="Your captions"
        name="captions"
        onChange={(e) => setCaptions(e.target.value)}
        cols={60}
        rows={10}
      ></textarea>
      <button
        disabled={loading}
        onClick={handlePost}
        name="post"
        type="button"
        title="post"
        className="ease w-full rounded-lg bg-gray-100 py-4 text-lg font-semibold text-black  transition-all duration-300 hover:bg-opacity-100 dark:border dark:border-gray-400 dark:border-opacity-30 dark:bg-gray-500 dark:bg-opacity-80 dark:text-white"
      >
        {loading ? (
          <div className="flex w-full items-center justify-center space-x-3">
            <span>Uploading... </span>
          </div>
        ) : (
          "Post"
        )}
      </button>
    </div>
  );
};
export default TextArea;
