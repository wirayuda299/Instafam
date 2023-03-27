import { doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { FormEvent } from "react";
import { db } from "../config/firebase";
import { IUserPostProps } from "@/types/post";

export async function handleComment(e: FormEvent, comment: string, post: IUserPostProps, setComment: React.Dispatch<React.SetStateAction<string>>, uid: string = '', name: string = ''): Promise<void> {
  e.preventDefault()
  if (comment === '') return
  try {

    const postRef = doc(db, 'posts', `post-${post.postId}`);
    const res = await getDoc(postRef);
    if (res.exists()) {
      await updateDoc(postRef, {
        comments: arrayUnion({
          commentByUid: uid,
          comment: comment,
          commentByName: name
        })
      }).then(() => {
        setComment('')
      });
    }
  } catch (error: any) {
    console.log(error.message);
  }
}