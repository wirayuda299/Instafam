import { BsImage } from "react-icons/bs";

const Post = () => {
  return (
    <div
      role="status"
      className="max-w-2xl animate-pulse  rounded p-4 shadow md:p-6 "
    >
      <div className="mt-4 flex items-center space-x-3">
        <svg
          className="h-14 w-14 text-gray-200 "
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
            clipRule="evenodd"
          ></path>
        </svg>
        <div>
          <div className="mb-2 h-2.5 w-32  rounded-full bg-gray-200"></div>
          <div className="h-2 w-20 rounded-full bg-gray-200 "></div>
        </div>
      </div>
      <div className="mb-4 flex h-96 w-full items-center justify-center rounded bg-gray-300 ">
        <BsImage size={50} className="text-gray-200" />
      </div>
      <div className="mt-4 flex items-center space-x-3">
        <svg
          className="h-14 w-14 text-gray-200 "
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
            clipRule="evenodd"
          ></path>
        </svg>
        <div>
          <div className="mb-2 h-2.5 w-32  rounded-full bg-gray-200"></div>
          <div className="h-2 w-48 rounded-full bg-gray-200 "></div>
        </div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
export default Post
