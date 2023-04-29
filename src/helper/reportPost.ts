import { FieldValues } from "react-hook-form";
import { getCsrfToken } from "next-auth/react";
import { db } from "@/config/firebase";
import { doc, setDoc } from "firebase/firestore";
import { IUserPostProps } from "@/types/post";
import type { Session } from "next-auth";
import toast from "react-hot-toast";

export const handleReport = async (
  e: FieldValues,
  selectedPost: IUserPostProps | null,
  session:  Session | null,
  setReportModal: any,
  resetField: any
) => {

  try {
    const token = await getCsrfToken();
    if (!token) throw new Error("CSRF Token not found");
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
