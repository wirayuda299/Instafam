import { db } from "@/config/firebase"
import { IUser } from "@/types/user"
import { getDocs, query, collection, where } from "firebase/firestore"

export async function getUserRecommendation(uid: string = '') {
  try {
    const getUsers = await getDocs(query(collection(db, 'users'), where('uid', '!=', uid)))
    const users = getUsers.docs.map(doc => doc.data()) as IUser[]
    return users
  } catch (error: any) {
    console.log(error.message);
  }
}
export async function getCurrentUserData(uid: string = '') {
  try {
    const q = query(collection(db, 'users'), where('uid', '==', uid))
    const res = await getDocs(q)
    return res.docs.map(doc => doc.data()) as IUser[]

  } catch (error: any) {
    console.log(error.message);
  }
}