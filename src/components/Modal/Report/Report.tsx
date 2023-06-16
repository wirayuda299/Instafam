import { db } from "@/config/firebase";
import { useModalContext } from "@/stores/Modal/ModalStatesContext";
import { doc, setDoc } from "firebase/firestore";
import { getCsrfToken, useSession } from "next-auth/react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { AiOutlineClose } from "react-icons/ai";

export default function Report() {
  const {
    modalStates: { showReportModal },
    modalDispatch,
  } = useModalContext();
  const { data: session } = useSession();
  const { handleSubmit, register, resetField } = useForm();
  const defaultValues = {
    feedback: "",
  };

  const handlefeedback = async (data: FieldValues) => {
    try {
      const token = await getCsrfToken();
      if (!session || !token) throw new Error("No Session or token found");
      const feedbackId = crypto.randomUUID();
      const feedbackRef = doc(db, "feedback", `${feedbackId}`);
      const feedbackData = {
        createdAt: Date.now(),
        feedbacks: data.feedback,
        authorName: session.user.name,
        authorId: session.user.uid,
        authorImage: session.user.image,
      };
      await setDoc(feedbackRef, feedbackData).then(() => {
        toast.success(
          "Thank you for your feedback, we will review your feedback"
        );
        modalDispatch({
          type: "SHOW_REPORT_MODAL",
          payload: {
            showReportModal: false,
          },
        });
        resetField("feedback");
      });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  if (!showReportModal) return null;
  return (
    <>
      {createPortal(
        <div className="fixed top-0 z-50 hidden h-screen w-full overflow-hidden backdrop-blur-sm lg:block">
          <div className="relative flex h-full w-full items-center justify-center bg-black bg-opacity-50 text-white backdrop-blur-md">
            <button
              name="close"
              title="close"
              type="button"
              className="absolute right-5 top-3"
              onClick={() =>
                modalDispatch({
                  type: "SHOW_REPORT_MODAL",
                  payload: {
                    showReportModal: false,
                  },
                })
              }
            >
              <AiOutlineClose size={35} />
            </button>
            <div className="mx-auto flex aspect-square w-96 max-w-xl flex-col items-center rounded-md bg-black p-5">
              <Image
                className="rounded-full"
                src={session?.user.image ?? ""}
                width={100}
                height={100}
                alt={session?.user.name ?? ""}
              />
              <h1 className="py-5 text-center text-3xl font-semibold">
                Feedback
              </h1>
              <form
                onSubmit={handleSubmit(handlefeedback)}
                className="flex w-full flex-col items-center justify-between rounded-md px-3"
              >
                <input
                  type="text"
                  {...register("feedback")}
                  autoComplete="off"
                  defaultValue={defaultValues.feedback}
                  className="w-full rounded-md bg-gray-400 bg-opacity-50 px-5 py-3 text-xs focus:border-0 focus:outline-none focus:ring-0 md:text-sm"
                  placeholder="Write your feedback to instafam..."
                />
                <button
                  type="submit"
                  title="publish"
                  name="publish"
                  className="mt-4 w-full rounded bg-green-500 px-5 py-1 text-white"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>,
        document.getElementById("modal") as Element
      )}
    </>
  );
}
