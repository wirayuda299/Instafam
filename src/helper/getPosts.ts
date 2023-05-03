import { db } from "@/config/firebase";
import { IUserPostProps } from "@/types/post";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { z } from "zod";

const GetPostsSchema = z.object({
  num: z.number().positive().int(),
});

const getPostByIdSchema = z.object({
  id: z.string().nonempty(),
});
export const getPosts = async (num: number) => {
  try {
    const isValid = GetPostsSchema.parse({ num });
    if (!isValid) {
      return new Error(
        "Invalid data passed to getPosts function. Args must be a number."
      );
    }

    const q = query(
      collection(db, "posts"),
      orderBy("createdAt", "desc"),
      limit(num)
    );
    const res = await getDocs(q);
    return res.docs.map((data) => data.data()) as IUserPostProps[];
  } catch (error: any) {
    throw Error(error.message);
  }
};
export const getAllPosts = async () => {
  try {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const res = await getDocs(q);
    return res.docs.map((data) => data.data()) as IUserPostProps[];
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
    return res.docs.map((data) => data.data()) as IUserPostProps[];
  } catch (error: any) {
    console.log(error.message);
  }
}

export async function getPostByCurrentUser(
  uid: string | string[] = ""
): Promise<IUserPostProps[] | undefined> {
  try {
    const matchpattern = /^\d+$/;

    if (matchpattern.test(uid[0])) {
      const q = query(
        collection(db, "posts"),
        where("postedById", "==", `${uid}`),
        orderBy("createdAt", "desc")
      );
      const res = await getDocs(q);
      return res.docs.map((data) => data.data()) as IUserPostProps[];
    } else {
      const q = query(
        collection(db, "posts"),
        where("author", "==", `${uid}`),
        orderBy("createdAt", "desc")
      );
      const res = await getDocs(q);
      return res.docs.map((data) => data.data()) as IUserPostProps[];
    }
  } catch (error: any) {
    console.log(error.message);
  }
}

export async function getPostById(
  id: string
): Promise<IUserPostProps[] | undefined> {
  try {
    const isValid = getPostByIdSchema.parse({ id });
    if (!isValid) {
      throw new Error("id was not provided");
    }

    const q = query(collection(db, "posts"), where("postId", "==", `${id}`));
    const res = await getDocs(q);
    return res.docs.map((data) => data.data()) as IUserPostProps[];
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
    return res.docs.map((data) => data.data()) as IUserPostProps[];
  } catch (error: any) {
    console.log(error.message);
  }
};
