import { IUserPostProps } from "@/types/post";
import type { FieldValues } from "react-hook-form";

interface Values extends FieldValues {
  updated: string;
}
export async function updatePost(e: Values, post: IUserPostProps) {
  try {
    const { db } = await import("@/config/firebase");
    const { doc, updateDoc } = await import("firebase/firestore");
    const q = doc(db, "posts", `post-${post.postId}`);
    const { toast } = await import("react-hot-toast");
    await updateDoc(q, {
      captions: e.updated.match(/^[^#]*/),
      hashtags:
        e.updated
          .match(/#(?!\n)(.+)/g)
          ?.join(" ")
          .split(" ") || [],
    });
    toast.success("Post updated!");
  } catch (error: any) {
    console.log(error.message);
  }
}
