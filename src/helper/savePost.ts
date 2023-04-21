import {
  doc,
  updateDoc,
  arrayRemove,
  arrayUnion,
  getDoc,
} from "firebase/firestore";
import { db } from "@/config/firebase";
import { IUserPostProps } from "@/types/post";

type SavedPostProps = {
  post: IUserPostProps;
  uid: string;
  refreshData: () => void;
  ssr: boolean;
};

export async function savePost(params: SavedPostProps) {
  const { post, uid, refreshData, ssr} = params;
  try {
    if (typeof window === "undefined") return;
    const q = doc(db, "posts", `post-${post.postId}`);
    const res = await getDoc(q);
    if(res.exists()) {
      const savedBy = res.data()?.savedBy;
      const hasSavedByUsers = savedBy?.find((save: string) => save === uid);
      if (hasSavedByUsers) {
        await updateDoc(q, { savedBy: arrayRemove(uid) });
        if(!ssr) refreshData();
      } else {
        await updateDoc(q, { savedBy: arrayUnion(uid) });
        if(!ssr) refreshData();
      }
    }


   
  } catch (error: any) {
    console.log(error.message);
  }
}
