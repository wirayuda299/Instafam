import { db } from "@/config/firebase";
import { useSelectedPostStore } from "@/stores/stores";
import { IUser } from "@/types/user";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useStore } from "zustand";

export default function useUser(uid: string) {
  const [user, setUser] = useState<IUser | null>(null);
  const { selectedPost } = useStore(useSelectedPostStore);
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
