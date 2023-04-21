import { db } from "@/config/firebase";
import { IUserPostProps } from "@/types/post";
import {
  getDocs,
  query,
  collection,
  orderBy,
  where,
  limit,
  startAfter,
} from "firebase/firestore";
import { z } from "zod";

const GetPostsSchema = z.object({
  num: z.number().positive().int(),
});

const getPostByCurrentUserSchema = z.object({
  uid: z.string().nonempty(),
});
const getPostByIdSchema = z.object({
  id: z.string().nonempty(),
});
export const getPosts = async (num: number) => {
  try {
    const isValid = GetPostsSchema.parse({ num });
    if (!isValid)
      throw new Error(
        "Invalid data passed to getPosts function. Args must be a number."
      );
    const q = query(
      collection(db, "posts"),
      orderBy("createdAt", "desc"),
      limit(num)
    );
    const res = await getDocs(q);
    const userPosts = res.docs.map((data) => data.data()) as IUserPostProps[];
    return userPosts;
  } catch (error: any) {
    throw Error(error.message);
  }
};

export const getPostByLikes = async (num: number) => {
  try {
    const isValid = GetPostsSchema.parse({ num });
    if (!isValid)
      throw new Error(
        "Invalid data passed to getPosts function. Args must be a number."
      );
    const q = query(
      collection(db, "posts"),
      orderBy("likedBy", "desc"),
      limit(num)
    );
    const res = await getDocs(q);
    const userPosts = res.docs.map((data) => data.data()) as IUserPostProps[];
    return userPosts;
  } catch (error: any) {
    throw Error(error.message);
  }
};

export async function fetchNextPosts(
  last: IUserPostProps | null
): Promise<IUserPostProps[] | undefined> {
  try {
    const q = query(
      collection(db, "posts"),
      orderBy("createdAt", "desc"),
      startAfter(last?.createdAt)
    );
    const res = await getDocs(q);
    const userPosts = res.docs.map((data) => data.data()) as IUserPostProps[];
    return userPosts;
  } catch (error: any) {
    console.log(error.message);
  }
}

export async function getPostByCurrentUser(
  uid: string = ""
): Promise<IUserPostProps[] | undefined> {
  try {
    const isValid = getPostByCurrentUserSchema.parse({ uid });
    if (!isValid)
      throw new Error(
        "Invalid data passed to function. uid must be a string passed to the function and cannot be empty."
      );
    const q = query(
      collection(db, "posts"),
      where("postedById", "==", `${uid}`),
      orderBy("createdAt", "desc")
    );
    const res = await getDocs(q);
    const posts = res.docs.map((data) => data.data()) as IUserPostProps[];
    return posts;
  } catch (error: any) {
    console.log(error.message);
  }
}

export async function getPostById(
  id: string
): Promise<IUserPostProps[] | undefined> {
  try {
    const isValid = getPostByIdSchema.parse({ id });
    if (!isValid)
      throw new Error(
        "Invalid data passed to function. id must be a string passed to the function and cannot be empty."
      );
    const q = query(collection(db, "posts"), where("postId", "==", `${id}`));
    const res = await getDocs(q);
    const post = res.docs.map((data) => data.data()) as IUserPostProps[];
    return post;
  } catch (error: any) {
    console.log(error.message);
  }
}

type GetPostsSavedByUser = (
  uid: string
) => Promise<IUserPostProps[] | undefined>;

export const getPostsSavedByUser: GetPostsSavedByUser = async (uid) => {
  try {
    const q = query(
      collection(db, "posts"),
      where("savedBy", "array-contains", uid),
      orderBy("createdAt", "desc")
    );
    const res = await getDocs(q);
    const posts = res.docs.map((data) => data.data()) as IUserPostProps[];
    return posts;
  } catch (error: any) {
    console.log(error.message);
  }
};
