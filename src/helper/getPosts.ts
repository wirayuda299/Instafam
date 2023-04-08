import { db } from "@/config/firebase";
import { IUserPostProps } from "@/types/post";
import { getDocs, query, collection, orderBy, where, limit, startAfter } from "firebase/firestore";

export const getPosts = async (num: number): Promise<IUserPostProps[] | undefined> => {
  try {
    const q = query(
      collection(db, 'posts'),
      orderBy('createdAt', 'desc'),
      limit(num)
    )
    const res = await getDocs(q)
    const userPosts = res.docs.map(data => data.data()) as IUserPostProps[]
    return userPosts

  } catch (error: any) {
    console.log(error.message);
  }
}

export async function fetchNextPosts(last: IUserPostProps | null): Promise<IUserPostProps[] | undefined> {
  try {
    const q =
      query(
        collection(db, 'posts'),
        orderBy('createdAt', 'desc'),
        startAfter(last?.createdAt)
      )
    const res = await getDocs(q)
    const userPosts = res.docs.map(data => data.data()) as IUserPostProps[]
    return userPosts

  } catch (error: any) {
    console.log(error.message);
  }
}

export async function getPostByCurrentUser(uid: string ='',): Promise<IUserPostProps[] | undefined> {
  try {
    const q =
      query(
        collection(db, 'posts'),
        where('postedById', '==', `${uid}`),
        orderBy('createdAt', 'desc'),
      )
    const res = await getDocs(q)
    const posts = res.docs.map(data => data.data()) as IUserPostProps[]
    return posts

  } catch (error: any) {
    console.log(error.message);
  }
}

export async function getPostById(id: string ): Promise<IUserPostProps[] | undefined> {
  try {
    const q =
      query(
        collection(db, 'posts'),
        where('postId', '==', `${id}`),
      )
    const res = await getDocs(q)
    const post = res.docs.map(data => data.data()) as IUserPostProps[]
    return post

  } catch (error: any) {
    console.log(error.message);
  }
}