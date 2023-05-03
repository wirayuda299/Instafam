import { db } from "@/config/firebase";
import { IUser } from "@/types/user";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { z } from "zod";

const getUserRecommendationSchema = z.object({
  uid: z.string().nonempty(),
});

export async function getUserRecommendation(
  uid: string,
  amount?: number | undefined
) {
  try {
    const isValid = getUserRecommendationSchema.parse({ uid });
    if (!isValid) throw new Error("Please add uid");
    const qAll = query(collection(db, "users"), where("uid", "!=", uid));
    const qlimit = query(
      collection(db, "users"),
      where("uid", "!=", uid),
      limit(5)
    );
    const getUsers = await getDocs(amount ? qlimit : qAll);
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
