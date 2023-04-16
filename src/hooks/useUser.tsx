import { db } from "@/config/firebase";
import { IUser } from "@/types/user";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function useUser(uid: string) {
  const [user, setUser] = useState<IUser | null>(null);
  const [savedPosts, setSavedPosts] = useState<string[]>([]);
  useEffect(() => {
    onSnapshot(doc(db, "users", `${uid}`), (docs) => {
      if (docs.exists()) {
        setSavedPosts(
          docs.data().savedPosts.map((post: { postId: string }) => post.postId)
        );
        setUser(docs.data() as IUser);
      }
    });
  }, [db]);

  return { user, savedPosts };
}
