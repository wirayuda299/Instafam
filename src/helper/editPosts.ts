import { IUserPostProps } from "@/types/post";
import { getCsrfToken } from "next-auth/react";
import { FieldValues } from "react-hook-form";

interface Values extends FieldValues {
  updated: string;
}
type Args = {
  posts: IUserPostProps;
  e: Values;
  push: (url: string) => void;
};
type EditPost = (e: Args) => Promise<void>;

export const editPost: EditPost = async ({ posts, e, push }) => {
  try {
    const token = await getCsrfToken();
    if (!token) throw new Error("token not found");
    const { db } = await import("@/config/firebase");
    const { doc, updateDoc } = await import("firebase/firestore");
    const q = doc(db, "posts", `post-${posts.postId}`);
    const { toast } = await import("react-hot-toast");
    await updateDoc(q, {
      captions: e.updated.match(/^[^#]*/),
      hashtags:
        e.updated
          .match(/#(?!\n)(.+)/g)
          ?.join(" ")
          .split(" ") || [],
    }).then(() => {
      toast.success("post updated");
      push(`${process.env.NEXTAUTH_URL}`);
    });
  } catch (error: any) {
    console.log(error.message);
  }
};
