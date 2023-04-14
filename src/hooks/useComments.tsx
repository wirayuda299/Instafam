import { db } from "@/config/firebase";
import { IUserPostProps } from "@/types/post";
import { onSnapshot, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
export type IComment = Pick<IUserPostProps, 'comments'>;
export default function useComments(post:IUserPostProps) {
  const [comment, setComment] = useState<IComment['comments']>([]);
  useEffect(() => {
		const unsub = onSnapshot(doc(db, 'posts', `post-${post.postId}`), (doc) => {
			if (doc.exists()) {
				setComment(doc.data()?.comments);
			}
		});
		return () => unsub();
	}, [db]);
  return {comment, setComment}
}
