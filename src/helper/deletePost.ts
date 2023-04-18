import { storage, db } from "@/config/firebase";
import { IUserPostProps } from "@/types/post";
import { deleteDoc, doc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { Session } from "next-auth";
import toast from "react-hot-toast";

type DeletePostProps = {
  post: IUserPostProps | null;
  refreshData: () => void;
  ssr: boolean;
  session: Session | null;
};

export const deletePost = async <T extends DeletePostProps>(props: T) => {
  if (typeof window === "undefined") return;
  const { post, refreshData, ssr, session } = props;
  if (!session || !session.user) return;
  try {
    const postRef = ref(storage, post?.storageRef);
    const deleteFromFirestore = await deleteDoc(
      doc(db, "posts", `post-${post?.postId}`)
    );
    const deleteFromStorage = await deleteObject(postRef);
    await Promise.all([deleteFromFirestore, deleteFromStorage]).then(() => {
      ssr ? refreshData() : null;
      toast.success("Post deleted successfully.");
    });
  } catch (error: any) {
    console.log(error.message);
  }
};
