import { db } from "@/config/firebase";
import { useStateContext } from "@/stores/StateContext";
import { IUser } from "@/types/user";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function useUser(uid: string) {
  const [user, setUser] = useState<IUser | null>(null);
  const { state:{selectedPost} } = useStateContext();
  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, "users", `${uid ? uid : selectedPost?.postedById}`),
      (docs) => {
        if (docs.exists()) {
          setUser(docs.data() as IUser);
        }
      }
    );
    return () => unsub();
  }, [db, selectedPost, uid]);

  return { user };
}
