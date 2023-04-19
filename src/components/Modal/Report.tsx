import { db } from "@/config/firebase";
import { useReportModalStore, useSelectedPostStore } from "@/stores/stores";
import { doc, setDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useStore } from "zustand";

export default function Report() {
  const { data: session } = useSession();
  const { register, resetField, handleSubmit } = useForm();
  const { selectedPost } = useStore(useSelectedPostStore);
  const { reportModal, setReportModal } = useStore(useReportModalStore);
  const defaultValues = {
    reason: "",
  };

  const handleReport = async (e: FieldValues) => {
    try {
      const reportRef = doc(db, "reports", `${selectedPost?.postId}`);
      const reportData = {
        postId: selectedPost?.postId,
        reportedBy: session?.user.uid,
        reportedAt: Date.now(),
        reportedPost: selectedPost?.image,
        reportedPostAuthor: selectedPost?.author,
        reportedPostAuthorId: selectedPost?.postedById,
        reportedPostAuthorImage: selectedPost?.postedByPhotoUrl,
        reason: e.reason,
      };
      await setDoc(reportRef, reportData).then(() => {
        setReportModal(false);
        resetField("reason");
        toast.success("Reported Successfully");
      });
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      {reportModal ? (
        <div
          className={` fixed left-0 top-0 z-[99999999] h-screen w-full  select-none !overflow-x-hidden !overflow-y-hidden  bg-black bg-opacity-60 shadow-sm  ${
            reportModal ? "animate-fadeIn" : "animate-fadeOut"
          }`}
          aria-modal="true"
          role="dialog"
        >
          <div className="mx-auto h-full max-w-5xl text-center ">
            <div className="flex h-full flex-col items-center justify-center ">
              <div className="flex min-w-[400px] flex-col rounded-lg border-gray-500  bg-white  p-5 py-10 text-black dark:bg-black  dark:text-white">
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
                        onSubmit={handleSubmit(handleReport)}
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
                          type="submit"
                          name="report"
                          title="report"
                          onClick={handleReport}
                        >
                          Submit
                        </button>

                        <button
                          name="cancel"
                          title="cancel"
                          type="button"
                          className="ml-5 rounded border bg-green-500 px-5 py-1 text-white"
                          onClick={() => setReportModal(false)}
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
        </div>
      ) : null}
    </>
  );
}
