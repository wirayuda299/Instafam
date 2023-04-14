import {
  doc,
  updateDoc,
  arrayRemove,
  arrayUnion,
  getDoc,
} from "firebase/firestore";
import { db } from "@/config/firebase";
import { IUserPostProps } from "@/types/post";
import { z } from "zod";
import { PostSchema } from "@/schema/PostSchema";

const LikeSchema = z.object({
  post: PostSchema,
  uid: z.string().nonempty().min(1).max(100),
  refreshData: z.function().args(z.void()).returns(z.void()),
  ssr: z.boolean(),
});

type LikesProps = {
  post: IUserPostProps;
  uid: string;
  refreshData: () => void;
  ssr: boolean;
};

export const handleLikes = async <T extends LikesProps>(params: T) => {
  if (typeof window === "undefined") return;
  try {
    const { post, uid, refreshData, ssr } = params;
    const isValid = LikeSchema.parse({ post, uid, refreshData, ssr });
    if (!isValid)
      throw new Error("Invalid data passed to handleLikes function.");

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
