import { IUserPostProps } from "@/types/post";
import { FieldValues, UseFormResetField } from "react-hook-form";

type Props = {
  e: FieldValues;
  post:IUserPostProps,
  session:any,
  resetField: UseFormResetField<FieldValues>
}


export const postComments = async (args:Props) => {
  const { e, post, session, resetField } = args;
  const { toast } = await import("react-hot-toast");
  if (e.comments === "") return toast.error("Please enter a comment");
  const { getCsrfToken } = await import("next-auth/react");
  const { db } = await import("@/config/firebase");
  const { doc, updateDoc, arrayUnion } = await import("firebase/firestore");
  try {
    const token = await getCsrfToken();
    if (!token) {
      throw new Error("No CSRF token found");
    }

    const postRef = doc(db, "posts", `post-${post.postId}`);
    await updateDoc(postRef, {
      comments: arrayUnion({
        commentByUid: session?.user.uid as string,
        comment: e.comments,
        commentByName: session?.user.username as string,
        commentByPhoto: session?.user.image as string,
        createdAt: Date.now(),
      }),
    }).then(() => {
      resetField("comments");
    });
  } catch (error: any) {
    toast.error(error.message);
  }
};