import { db } from "@/config/firebase";
import { IUserPostProps } from "@/types/post";
import { onSnapshot, doc } from "firebase/firestore";
import { Session } from "next-auth";
import { useEffect, useState } from "react";

export default function useSavedPosts(
  session: Session | null,
  post: IUserPostProps
) {
  const [savedPosts, setSavedPosts] = useState<string[]>([]);

  useEffect(() => {
    onSnapshot(doc(db, "users", `${session?.user.uid}`), (docs) => {
      if (docs.exists()) {
        setSavedPosts(
          docs.data().savedPosts.map((post: { postId: string }) => post.postId)
        );
      }
    });
  }, [db, session, post]);
  return { savedPosts };
}
