import { db } from "@/config/firebase";
import { collection, getDocs, limit, query, where } from "firebase/firestore";

export async function getUserRecommendation(uid: string) {
  try {
    const q = query(collection(db, "users"), where("uid", "!=", uid));
    const getUsers = await getDocs(q);
    return getUsers.docs.map((doc) => doc.data()) as IUser[];
  } catch (error) {
    if (error instanceof Error) {
      return error.message as Error["message"];
    }
  }
}
export async function getUserRecommendationLimit(uid: string) {
  try {
    const q = query(collection(db, "users"), where("uid", "!=", uid), limit(5));
    const getUsers = await getDocs(q);
    return getUsers.docs.map((doc) => doc.data()) as IUser[];
  } catch (error) {
    if (error instanceof Error) {
      return error.message as Error["message"];
    }
  }
}

export async function getCurrentUserData(username: string = "") {
  try {
    if (!username) throw new Error("Please add username");

    const q = query(collection(db, "users"), where("username", "==", username));
    const res = await getDocs(q);
    return res.docs.map((doc) => doc.data()) as IUser[];
  } catch (error) {
    if (error instanceof Error) {
      return error.message as Error["message"];
    }
  }
}
