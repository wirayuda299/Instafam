import type { FieldValues, UseFormResetField } from "react-hook-form";
import { getCsrfToken } from "next-auth/react";
import { db } from "@/config/firebase";
import { doc, setDoc } from "firebase/firestore";
import type { Session } from "next-auth";
import toast from "react-hot-toast";

type handleReportFunc = (
  e: FieldValues,
  selectedPost: IUserPostProps | null,
  session: Session | null,
  resetField: UseFormResetField<FieldValues>
) => Promise<void>;

export const handleReport: handleReportFunc = async (
  e,
  selectedPost,
  session,
  resetField
) => {
  try {
    const token = await getCsrfToken();
    if (!session || !token) throw new Error("No Session or token found");

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
      resetField("reason");
      toast.success("Reported Successfully");
    });
  } catch (error) {
    toast.error("Something went wrong");
  }
};
