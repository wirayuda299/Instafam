import { AiOutlineFileImage } from "react-icons/ai";

export default function Loader() {
  return (
    <div
      role="status"
      className="w-full animate-pulse rounded p-4 shadow dark:border-gray-700 md:p-6"
    >
      <div className="mb-4 flex h-60 items-center justify-center rounded bg-gray-300 dark:bg-gray-700">
        <AiOutlineFileImage className="text-5xl text-gray-500 dark:text-gray-400" />
      </div>
      <div className="mb-4 h-2.5 w-48 rounded-full bg-gray-200 dark:bg-gray-700"></div>
      <div className="mb-2.5 h-2 rounded-full bg-gray-200 dark:bg-gray-700"></div>
      <div className="mb-2.5 h-2 rounded-full bg-gray-200 dark:bg-gray-700"></div>
      <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
