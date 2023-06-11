import { storage, db } from "@/config/firebase";
import type { Session } from "next-auth";
import toast from "react-hot-toast";

type DeletePostProps = {
  post: IUserPostProps | null;
  session: Session | null;
};

export const deletePost = async <T extends DeletePostProps>(props: T) => {
  if (typeof window === "undefined") return;
  const { post, session } = props;

  if (!session || !session.user) throw new Error("Please login to delete post");
  const uidNotMatch = session.user.uid !== post?.postedById;

  if (uidNotMatch) throw new Error("You can't delete this post");

  try {
    const { deleteDoc, doc } = await import("firebase/firestore");
    const { deleteObject, ref } = await import("firebase/storage");

    const postRef = ref(storage, post?.storageRef);
    const deleteFromFirestore = await deleteDoc(
      doc(db, "posts", `post-${post?.postId}`)
    );
    const deleteFromStorage = await deleteObject(postRef);

    await Promise.all([deleteFromFirestore, deleteFromStorage]);
  } catch (error: any) {
    toast.error(error.message);
  }
};
