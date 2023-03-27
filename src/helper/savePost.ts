import { doc, updateDoc, arrayRemove, arrayUnion,getDoc } from "firebase/firestore"
import { db } from "../config/firebase"
import { IUserPostProps } from "@/types/post"

export async function savePost(post: IUserPostProps, uid: string = '') {
  try {
    const userSnap = await getDoc(doc(db, 'users', `${uid}`));
    const savedPosts = userSnap.data()?.savedPosts.map((post: { postId: string; }) => post.postId);
    console.log(savedPosts);
    
    const hasSaved = savedPosts.includes(post.postId);
    if(hasSaved) {
      return await updateDoc(doc(db, 'users', `${uid}`), {
        savedPosts: arrayRemove(post)
      })
    } else {
     return  await updateDoc(doc(db, 'users', `${uid}`), {
        savedPosts: arrayUnion(post)
      })
    }
    
  } catch (error: any) {
    console.log(error.message);
  }
}