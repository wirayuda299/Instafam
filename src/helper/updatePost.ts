import { IUserPostProps } from "@/types/post";

export async function updatePost(updated:string, post:IUserPostProps) {
  try {
    const { db } = await import("@/config/firebase");
    const { doc, updateDoc } = await import("firebase/firestore");
    const q = doc(db, "posts", `post-${post.postId}`);
    const { toast } = await import("react-hot-toast");
    await updateDoc(q, {
      captions: updated.match(/^[^#]*/),
      hashtags:
        updated
          .match(/#(?!\n)(.+)/g)
          ?.join(" ")
          .split(" ") || [],
    });
    toast.success("Post updated!");
  } catch (error: any) {
    console.log(error.message);
  }
}
