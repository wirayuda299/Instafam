import { doc, updateDoc, arrayRemove, arrayUnion, getDoc } from "firebase/firestore"
import { db } from "../config/firebase"
import { IUserPostProps } from "@/types/post"
type SavedPostProps = {
  post: IUserPostProps;
  uid: string;
  refreshData: () => void;
  ssr: boolean;
}

export async function savePost(params: SavedPostProps) {
  const { post, uid, refreshData, ssr } = params;
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
        ssr ? refreshData() : null;
      })
    } else {
      await updateDoc(q, {
        savedPosts: arrayUnion(post)
      }).then(() => {
        ssr ? refreshData() : null;
      })
    }

  } catch (error: any) {
    console.log(error.message);
  }
}