import { AiOutlineFileImage } from "react-icons/ai";

export default function Loader() {
  return (
    <div role="status" className="w-full p-4 rounded shadow animate-pulse md:p-6 dark:border-gray-700">
      <div className="h-60 flex items-center justify-center mb-4 bg-gray-300 rounded dark:bg-gray-700">
        <AiOutlineFileImage className="text-5xl text-gray-500 dark:text-gray-400" />
      </div>
      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
      <span className="sr-only">Loading...</span>
    </div>
  )
}