import Modal from "@/components/Modal";
import { db } from "@/config/firebase";
import { reportModal } from "@/store/modal";
import { selectedPostState } from "@/store/selectedPost";
import { doc, setDoc } from "firebase/firestore";
import Image from "next/image";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRecoilState, useRecoilValue } from "recoil";

export default function Report({ session }: { session: any }) {
  const [isReportModalOpen, setIsReportModalOpen] = useRecoilState(reportModal);
  const { register, resetField, handleSubmit } = useForm();
  const selectedPost = useRecoilValue(selectedPostState);
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
        setIsReportModalOpen(false);
        resetField("reason");
        toast.success("Reported Successfully");
      });
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Modal isModalOpen={isReportModalOpen}>
      <div className="flex h-full flex-col items-center justify-center ">
        <div className="flex min-w-[400px] flex-col rounded-lg border bg-white p-5 py-10 text-black dark:bg-black dark:text-white">
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
                    alt=""
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
                <div className="flex py-3">
                  <button
                    className="ml-5 rounded bg-red-700 px-2"
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
                    className="ml-5 rounded border px-2"
                    onClick={() => setIsReportModalOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
