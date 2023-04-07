import { storage, db } from "@/config/firebase";
import { IUserPostProps } from "@/types/post";
import { deleteDoc, doc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";

export const deletePost = async (post: IUserPostProps, refreshData:() => void) => {
  if(typeof window === 'undefined') return;
  try {
    const postRef = ref(storage, post.storageRef);
    const deleteFromFirestore = await deleteDoc(
      doc(db, 'posts', `post-${post.postId}`)
    );
    const deleteFromStorage = await deleteObject(postRef);
    await Promise.all([deleteFromFirestore, deleteFromStorage]).then(() => {
      refreshData()
    });
  } catch (error: any) {
    console.log(error.message);
  }
};