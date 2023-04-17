import { Dispatch, SetStateAction } from "react";

type Props = {
  captions: string;
  setCaptions: Dispatch<SetStateAction<string>>;
  loading: boolean;
  handlePost: () => Promise<void>;
};
export default function TextArea({
  captions,
  handlePost,
  loading,
  setCaptions,
}: Props) {
  return (
    <div className="w-full p-3">
      <textarea
        spellCheck="false"
        className="w-full resize-none focus:outline-none dark:bg-transparent dark:text-white"
        value={captions}
        placeholder="Your caption"
        name="caption"
        onChange={(e) => setCaptions(e.target.value)}
        cols={60}
        rows={10}
      ></textarea>
      <button
        disabled={loading}
        name="post"
        type="button"
        title="post"
        onClick={handlePost}
        className="ease h-16 w-full rounded-md bg-black bg-opacity-90 text-lg font-semibold uppercase text-white transition-all duration-300 hover:bg-opacity-100 dark:bg-white dark:bg-opacity-50 dark:text-black"
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
}
