import { db } from "@/config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function getUserRecommendation(uid: string) {
  try {
    const qAll = query(collection(db, "users"), where("uid", "!=", uid));

    const getUsers = await getDocs(qAll);
    return getUsers.docs.map((doc) => doc.data()) as IUser[];
  } catch (error: any) {
    console.log(error.message);
  }
}

export async function getCurrentUserData(username: string = "") {
  try {
    if (!username) throw new Error("Please add username");

    const q = query(collection(db, "users"), where("username", "==", username));
    const res = await getDocs(q);
    return res.docs.map((doc) => doc.data()) as IUser[];
  } catch (error: any) {
    console.log(error.message);
  }
}
