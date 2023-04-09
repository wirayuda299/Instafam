import { doc, updateDoc, arrayRemove, arrayUnion, getDoc } from "firebase/firestore"
import { db } from "@/config/firebase"
import { IUserPostProps } from "@/types/post"
import {z} from 'zod';
import { PostSchema } from "@/schema/PostSchema";

type SavedPostProps = {
  post: IUserPostProps;
  uid: string;
  refreshData: () => void;
  ssr: boolean;
}
const savedPostSchema = z.object({
  post: PostSchema,
  uid: z.string().nonempty(),
  refreshData: z.function().args(z.void()).returns(z.void()),
  ssr: z.boolean()
})

export async function savePost(params: SavedPostProps) {
  const { post, uid, refreshData, ssr } = params;
  if (typeof window === 'undefined') return;
  try {
    const isValid = savedPostSchema.parse({ post, uid, refreshData, ssr })
    if (!isValid) throw new Error('Invalid data passed to function. post, uid, refreshData, ssr must be passed to the function and cannot be empty.')
    const q = doc(db, 'users', `${uid}`);
    const userSnap = await getDoc(q);
    const savedPosts = userSnap.data()?.savedPosts.map((userPost: { postId: string; }) => userPost.postId);
    const hasSaved = savedPosts.includes(post.postId);
    if (hasSaved) {
      await updateDoc(q, {
        savedPosts: arrayRemove(post)
      }).then(() => {
        ssr ? refreshData() : null;
      })
    } else {
      await updateDoc(q, {
        savedPosts: arrayUnion(post)
      }).then(() => {
        ssr ? refreshData() : null;
      })
    }

  } catch (error: any) {
    console.log(error.message);
  }
}