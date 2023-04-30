import { IUserPostProps } from "@/types/post";
import type { Session } from "next-auth";
import type { FieldValues, UseFormResetField } from "react-hook-form";

type Props = {
  e: FieldValues;
  post: IUserPostProps;
  session: Session | null;
  resetField: UseFormResetField<FieldValues>;
};

export const postComments = async (args: Props) => {
  const { e, post, session, resetField } = args;
  const { toast } = await import("react-hot-toast");

  if (e.comments === "") return toast.error("Please enter a comment");

  const { getCsrfToken } = await import("next-auth/react");
  const { db } = await import("@/config/firebase");
  const { doc, updateDoc, arrayUnion } = await import("firebase/firestore");

  try {
    if (!session || !session.user) {
      throw new Error("You must be logged in to comment");
    }
    const token = await getCsrfToken();
    if (!token) {
      throw new Error("No CSRF token found");
    }

    const postRef = doc(db, "posts", `post-${post.postId}`);
    await updateDoc(postRef, {
      comments: arrayUnion({
        commentByUid: session?.user.uid ,
        comment: e.comments,
        commentByName: session?.user.username ,
        commentByPhoto: session?.user.image,
        createdAt: Date.now(),
      }),
    }).then(() => {
      resetField("comments");
    });
  } catch (error: any) {
    toast.error(error.message);
  }
};
