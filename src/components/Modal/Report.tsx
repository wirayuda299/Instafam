import { useDarkModeStore } from "@/stores/stores";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { FieldValues, useForm } from "react-hook-form";
import { useStore } from "zustand";
import { createPortal } from "react-dom";
import { useStateContext } from "@/stores/StateContext";

export default function Report() {
  const { data: session } = useSession();
  const { register, resetField, handleSubmit } = useForm();
  const {
    state: { selectedPost, postReportModal },
    Dispatch,
  } = useStateContext();
  const { darkMode } = useStore(useDarkModeStore);

  const defaultValues = {
    reason: "",
  };

  const reportPost = async (e: FieldValues) => {
    const { handleReport } = await import("@/helper/reportPost");
    handleReport(e, selectedPost, session, resetField).then(() => {
      Dispatch({
        type: "TOGGLE_POST_REPORT_MODAL",
        payload: {
          postReportModal: false,
        },
      });
    });
  };

  if (!postReportModal) return null;

  return createPortal(
    <div
      className={` fixed left-0 top-0 z-[99999999] h-screen w-full  select-none !overflow-x-hidden !overflow-y-hidden  bg-black bg-opacity-60 shadow-sm  ${
        postReportModal ? "animate-fadeIn" : "animate-fadeOut"
      }`}
      aria-modal="true"
      role="dialog"
    >
      <div className="mx-auto h-full max-w-5xl text-center ">
        <div className="flex h-full flex-col items-center justify-center ">
          <div
            className={`flex min-w-[400px] flex-col rounded-lg border-gray-500 p-5 py-10 ${
              darkMode ? "bg-black text-white" : "bg-white text-black"
            }`}
          >
            <div>
              <h1 className="text-2xl font-bold">Report</h1>
              <p className="text-sm text-gray-500">
                Please specify the reason for reporting this post.
              </p>

              <div className="mt-5">
                <div className="flex flex-col items-center">
                  <div className="mb-5 flex items-center space-x-3 py-3">
                    <Image
                      src={selectedPost?.image as string}
                      width={50}
                      height={50}
                      alt={selectedPost?.author as string}
                      priority
                      className="rounded-full"
                    />
                    <h2 className="text-xl font-semibold">
                      {selectedPost?.author}
                    </h2>
                  </div>
                  <form
                    className="flex w-full items-center justify-between rounded-md bg-[#b9b9b917] px-3"
                    onSubmit={handleSubmit(reportPost)}
                  >
                    <input
                      type="text"
                      placeholder="specify reason"
                      autoComplete="off"
                      defaultValue={defaultValues.reason}
                      {...register("reason")}
                      autoFocus={false}
                      alt="specify reason"
                      security="restricted"
                      className="w-full bg-transparent py-2 text-xs focus:border-0 focus:outline-none focus:ring-0 md:text-sm"
                    />
                  </form>
                  <div className="mt-3 flex">
                    <button
                      className="ml-5 rounded bg-red-700 px-5 py-1 text-white"
                      name="report"
                      title="report"
                      onClick={reportPost}
                    >
                      Submit
                    </button>

                    <button
                      name="cancel"
                      title="cancel"
                      type="button"
                      className="ml-5 rounded border bg-green-500 px-5 py-1 text-white"
                      onClick={() => {
                        Dispatch({
                          type: "TOGGLE_POST_REPORT_MODAL",
                          payload: {
                            postReportModal: false,
                          },
                        });
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("modal") as Element
  );
}
