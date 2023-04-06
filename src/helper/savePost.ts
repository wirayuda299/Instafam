import { doc, updateDoc, arrayRemove, arrayUnion, getDoc } from "firebase/firestore"
import { db } from "../config/firebase"
import { IUserPostProps } from "@/types/post"

export async function savePost(post: IUserPostProps, uid: string = '', refreshData: () => void) {
  if (typeof window === 'undefined') return;
  try {
    const userSnap = await getDoc(doc(db, 'users', `${uid}`));
    const savedPosts = userSnap.data()?.savedPosts.map((post: { postId: string; }) => post.postId);
    const hasSaved = savedPosts.includes(post.postId);
    if (hasSaved) {
      await updateDoc(doc(db, 'users', `${uid}`), {
        savedPosts: arrayRemove(post)
      }).then(() => {
        refreshData()
      })
    } else {
      await updateDoc(doc(db, 'users', `${uid}`), {
        savedPosts: arrayUnion(post)
      }).then(() => {
        refreshData()
      })
    }

  } catch (error: any) {
    console.log(error.message);
  }
}