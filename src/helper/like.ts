import { IUserPostProps } from "@/types/post";

type LikesProps = {
  post: IUserPostProps;
  uid: string;
  likes: string[];
};

export const handleLikes = async <T extends LikesProps>(params: T) => {
  if (typeof window === "undefined") return;
  try {
    const { post, uid, likes } = params;
    if(!uid) return
    
    const { doc, updateDoc, arrayRemove, arrayUnion } = await import(
      "firebase/firestore"
    );
    const { db } = await import("@/config/firebase");
    const postRef = doc(db, "posts", `post-${post.postId}`);

    if (likes.includes(uid)) {
      await updateDoc(postRef, { likedBy: arrayRemove(uid) });
    } else {
      await updateDoc(postRef, { likedBy: arrayUnion(uid) });
    }
  } catch (error: any) {
    console.error(error.message);
  }
};
