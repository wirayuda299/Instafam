import { db } from "@/config/firebase";
import { useSelectedPostStore } from "@/stores/stores";
import { IUserPostProps } from "@/types/post";
import { onSnapshot, doc } from "firebase/firestore";
import { useState, useEffect, useMemo } from "react";
import { useStore } from "zustand";
type IComment = Pick<IUserPostProps, "comments">;

export default function usePost(post: IUserPostProps | null) {
  const [likesCount, setLikesCount] = useState<string[]>([]);
  const [comment, setComment] = useState<IComment["comments"]>([]);
  const { selectedPost } = useStore(useSelectedPostStore);
  const [savedBy, setSavedBy] = useState<string[]>([]);
  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, "posts", `post-${post ? post.postId : selectedPost?.postId}`),
      (doc) => {
        if (doc.exists()) {
          setLikesCount(doc.data().likedBy);
          setComment(doc?.data().comments);
          setSavedBy(doc?.data().savedBy);
        }
      }
    );
    return () => unsub();
  }, [db, selectedPost]);

  const likes = useMemo(() => {
    return likesCount;
  }, [likesCount]);

  const comments = useMemo(() => {
    return comment;
  }, [comment]);
  return { likes, comments, savedBy };
}
