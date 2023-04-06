import { doc, updateDoc, arrayRemove, arrayUnion, getDoc } from "firebase/firestore"
import { db } from "../config/firebase"
import { IUserPostProps } from "@/types/post"

export async function savePost(post: IUserPostProps, uid: string = '', refreshData: () => void) {
  if (typeof window === 'undefined') return;
  try {
    const q = doc(db, 'users', `${uid}`);
    const userSnap = await getDoc(q);
    const savedPosts = userSnap.data()?.savedPosts.map((userPost: { postId: string; }) => userPost.postId);
    const hasSaved = savedPosts.includes(post.postId);
    if (hasSaved) {
      await updateDoc(q, {
        savedPosts: arrayRemove(post)
      }).then(() => {
        refreshData()
      })
    } else {
      await updateDoc(q, {
        savedPosts: arrayUnion(post)
      }).then(() => {
        refreshData()
      })
    }

  } catch (error: any) {
    console.log(error.message);
  }
}