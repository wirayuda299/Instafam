import { IUserPostProps } from "@/types/post";

type SavedPostProps = {
  post: IUserPostProps;
  uid: string;
};

export async function savePost(params: SavedPostProps) {
  const { post, uid } = params;
  try {
    if (typeof window === "undefined") return;
    const { doc, updateDoc, arrayRemove, arrayUnion, getDoc } = await import(
      "firebase/firestore"
    );
    const { db } = await import("@/config/firebase");
    const q = doc(db, "posts", `post-${post.postId}`);
    const res = await getDoc(q);
    if (res.exists()) {
      const savedBy = res.data()?.savedBy;
      const hasSavedByUsers = savedBy?.find((save: string) => save === uid);
      if (hasSavedByUsers) {
        await updateDoc(q, { savedBy: arrayRemove(uid) });
      } else {
        await updateDoc(q, { savedBy: arrayUnion(uid) });
      }
    }
  } catch (error: any) {
    console.log(error.message);
  }
}
