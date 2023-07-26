import { db } from "@/config/firebase";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore"


export const getPosts = async (num: number) => {
  try {
    const q = query(
      collection(db, "posts"),
      orderBy("createdAt", "desc"),
      limit(num)
    );
    const res = await getDocs(q);
    return res.docs.map((data) => data.data()) as IUserPostProps[];
  } catch (error) {
    if (error instanceof Error) {
      return error.message as Error["message"];
    }
  }
};
export const getAllPosts = async () => {
  try {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const res = await getDocs(q);
    return res.docs.map((data) => data.data()) as IUserPostProps[];
  } catch (error) {
    if (error instanceof Error) {
      return error.message as Error["message"];
    }
  }
};
export async function fetchNextPosts(
  last: IUserPostProps | null
): Promise<IUserPostProps[] | undefined | string> {
  try {
    const q = query(
      collection(db, "posts"),
      orderBy("createdAt", "desc"),
      startAfter(last?.createdAt)
    );
    const res = await getDocs(q);
    return res.docs.map((data) => data.data()) as IUserPostProps[];
  } catch (error) {
    if (error instanceof Error) {
      return error.message as Error["message"];
    }
  }
}

export async function getPostByCurrentUser(
  uid: string | string[] = ""
): Promise<IUserPostProps[] | undefined | string> {
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
  } catch (error) {
    if (error instanceof Error) {
      return error.message as Error["message"];
    }
  }
}

export async function getPostById(
  id: string
): Promise<IUserPostProps[] | undefined | string> {
  try {
    const q = query(collection(db, "posts"), where("postId", "==", `${id}`));
    const res = await getDocs(q);
    return res.docs.map((data) => data.data()) as IUserPostProps[];
  } catch (error: unknown) {
    if (error instanceof Error) {
      return error.message as Error["message"];
    }
  }
}

type GetPostsSavedByUser = (
  uid: string
) => Promise<IUserPostProps[] | undefined | string>;

export const getPostsSavedByUser: GetPostsSavedByUser = async (uid) => {
  try {
    const q = query(
      collection(db, "posts"),
      where("savedBy", "array-contains", uid),
      orderBy("createdAt", "desc")
    );
    const res = await getDocs(q);
    return res.docs.map((data) => data.data()) as IUserPostProps[];
  } catch (error) {
    if (error instanceof Error) {
      return error.message as Error["message"];
    }
  }
};
