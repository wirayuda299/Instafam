import {
  doc,
  updateDoc,
  arrayRemove,
  arrayUnion,
  getDoc,
} from "firebase/firestore";
import { db } from "@/config/firebase";
import { IUserPostProps } from "@/types/post";

type LikesProps = {
  post: IUserPostProps;
  uid: string;
};

export const handleLikes = async <T extends LikesProps>(params: T) => {
  if (typeof window === "undefined") return;
  try {
    const { post, uid } = params;
    const postRef = doc(db, "posts", `post-${post.postId}`);
    const getPostDetails = await getDoc(postRef);
    const likedBy = getPostDetails.data()?.likedBy;
    const haslikedByUsers = likedBy.find((like: string) => like === uid);
    if (haslikedByUsers) {
      await updateDoc(postRef, { likedBy: arrayRemove(uid) });
    } else {
      await updateDoc(postRef, { likedBy: arrayUnion(uid) });
    }
  } catch (error: any) {
    console.error(error.message);
  }
};
