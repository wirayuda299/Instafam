import Head from "next/head";
import { useState } from "react";
import { BsSend } from "react-icons/bs";

export default function Messages() {
  const [messagesOpen, setMessagesOpen] = useState(true);
  return (
    <>
      <Head>
        <title>Messages &#8226; Instafam</title>
      </Head>
      <div className="relative h-full w-full">
        <div className="flex h-screen w-full overflow-hidden text-gray-800 antialiased">
          <div
            className={` h-screen w-full bg-gray-100 p-4 transition-all duration-300 ease-in-out dark:bg-black dark:text-slate-50 md:h-full md:w-80 md:overflow-y-auto md:overflow-x-hidden md:shadow-lg`}
          >
            <div
              className={`-mr-4  h-screen w-full flex-col  py-4 pl-4 pr-4 md:flex `}
            >
              <div className="flex flex-row items-center">
                <div className="flex flex-row items-center">
                  <div className="text-xl font-semibold">Messages</div>
                  <div className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
                    5
                  </div>
                </div>
                <div className="ml-auto">
                  <button className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-200 text-gray-500">
                    <svg
                      className="h-4 w-4 stroke-current"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="mt-5">
                <ul className="flex flex-row items-center justify-between">
                  <li>
                    <a
                      href="#"
                      className="relative flex items-center truncate pb-3 text-xs font-semibold text-indigo-800"
                    >
                      <span>All Conversations</span>
                      <span className="absolute bottom-0 left-0 h-1 w-6 rounded-full bg-indigo-800"></span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center pb-3 text-xs font-semibold text-gray-700"
                    >
                      <span>Archived</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center pb-3 text-xs font-semibold text-gray-700"
                    >
                      <span>Starred</span>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mt-5">
                <div className="text-xs font-semibold uppercase text-gray-400">
                  Personal
                </div>
              </div>
              <div className="mt-2">
                <div className="-mx-4 flex flex-col">
                  <div className="relative flex flex-row items-center p-4">
                    <div className="absolute right-0 top-0 mr-4 mt-3 text-xs text-gray-500">
                      5 min
                    </div>
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-pink-500 font-bold text-pink-300">
                      T
                    </div>
                    <div
                      className="ml-3 flex flex-grow flex-col"
                      onClick={() => setMessagesOpen(false)}
                    >
                      <div className="text-sm font-medium">Cuberto</div>
                      <div className="w-40 truncate text-xs">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Debitis, doloribus?
                      </div>
                    </div>
                    <div className="mb-1 ml-2 flex-shrink-0 self-end">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                        5
                      </span>
                    </div>
                  </div>
                  <div className="flex w-full flex-row items-center border-l-2 border-red-500 bg-gradient-to-r from-red-100 to-transparent p-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-pink-500 font-bold text-pink-300">
                      T
                    </div>
                    <div className="ml-3 flex flex-grow flex-col">
                      <div className="flex items-center">
                        <div className="text-sm font-medium">UI Art Design</div>
                        <div className="ml-2 h-2 w-2 rounded-full bg-green-500"></div>
                      </div>
                      <div className="w-40 truncate text-xs">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Debitis, doloribus?
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* messages */}
        </div>
      </div>
    </>
  );
}
