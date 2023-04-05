import { db } from "@/config/firebase";
import { IUserPostProps } from "@/types/post";
import { IUser } from "@/types/user";
import { getDocs, query, collection, orderBy, where, limit } from "firebase/firestore";

export const getPosts = async () => {
  try {
   const q = query(
      collection(db, 'posts'),
      orderBy('createdAt', 'desc'),
      limit(8)
    )
    const res = await getDocs(q)
    const userPosts= res.docs.map(data => data.data()) as IUserPostProps[]
    return userPosts

  } catch (error: any) {
    console.log(error.message);
  }
}
export async function getPostByCurrentUser(uid: string | undefined) {
  try {
    const q =
      query(
        collection(db, 'posts'),
        where('postedById', '==', `${uid}`),
        orderBy('createdAt', 'desc'),
      )
    const res = await getDocs(q)
    const posts = res.docs.map(data => data.data()) as IUser[]
    return posts

  } catch (error: any) {
    console.log(error.message);
  }
}