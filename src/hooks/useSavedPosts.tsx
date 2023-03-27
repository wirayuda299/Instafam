import { db } from "@/config/firebase";
import posts from "@/pages/api/posts";
import { onSnapshot, query, collection, where, getDocs, DocumentData } from "firebase/firestore";
import { useState, useEffect } from "react";

export default function useSavedPosts(uid:string) {
  const [savedPosts, setSavedPosts] = useState<string[]>([]);
	const [posts, setPosts] = useState<DocumentData[]>([]);
  useEffect(() => {
		const unsub = onSnapshot(
			query(collection(db, 'users'), where('uid', '==', `${uid}`)),
			(doc) => {
				setSavedPosts(doc.docs.map((doc) => doc.data().savedPosts));
			}
		);
		return () => unsub();
	}, [db]);


	console.log(posts)
  return {posts, setPosts}
}
