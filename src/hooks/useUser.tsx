import { db } from "@/config/firebase";
import { IUser } from "@/types/user";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function useUser(uid: string) {
  const [user, setUser] = useState<IUser | null>(null);
  useEffect(() => {
    onSnapshot(
      query(
        collection(db, 'users'),
        where('uid', '==', `${uid}`)
        ), (snapshot) => {
          const result = snapshot.docs.map(user => user.data()) as IUser[]
        if(result) {
          setUser(result[0])
        }
          

        })
  }, [db, uid]);

  return { user };
}
