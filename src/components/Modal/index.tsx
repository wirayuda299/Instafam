import { ReactNode } from "react";

export default function Modal({
  isModalOpen,
  children,
}: {
  isModalOpen: boolean;
  children: ReactNode;
}) {
  return (
    <>
      {isModalOpen ? (
        <div
          className={` fixed left-0 top-0 z-[99999999] h-screen w-full  select-none !overflow-x-hidden !overflow-y-hidden bg-black  bg-opacity-60 text-black shadow-sm shadow-white outline-none dark:text-white ${
            isModalOpen ? "animate-fadeIn" : "animate-fadeOut"
          }`}
          aria-modal="true"
          role="dialog"
        >
          <div className="mx-auto h-full max-w-5xl text-center ">
            {children}
          </div>
        </div>
      ) : null}
    </>
  );
}
