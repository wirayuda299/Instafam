import { db } from "@/config/firebase";
import { IUserPostProps } from "@/types/post";
import { onSnapshot, doc } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function useLikes(post:IUserPostProps) {
  const [likesCount, setLikesCount] = useState<string[]>([]);
  useEffect(() => {
		const unsub = onSnapshot(doc(db, 'posts', `post-${post.postId}`), (doc) => {
			if (doc.exists()) {
				setLikesCount(doc.data().likedBy);
			}
		});
		return () => unsub();
	}, [db]);
  return {likesCount}
}
