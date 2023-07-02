export async function updatePost(updated: string, post: IUserPostProps) {
  const { toast } = await import("react-hot-toast");
  try {
    const { db } = await import("@/config/firebase");
    const { doc, updateDoc } = await import("firebase/firestore");
    const q = doc(db, "posts", `post-${post.postId}`);
    await updateDoc(q, {
      captions: updated.match(/^[^#]*/),
      hashtags:
        updated
          .match(/#(?!\n)(.+)/g)
          ?.join(" ")
          .split(" ") || [],
    });
    toast.success("Post updated!");
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message) as Error["message"];
    }
  }
}
