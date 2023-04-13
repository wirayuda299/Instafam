import { storage, db } from "@/config/firebase";
import { PostSchema } from "@/schema/PostSchema";
import { IUserPostProps } from "@/types/post";
import { deleteDoc, doc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { z } from 'zod';
import { Session } from "next-auth";

const DeletePostSchema = z.object({
  post: PostSchema,
  refreshData: z.function().args(z.void()).returns(z.void()),
  ssr: z.boolean()
})

type DeletePostProps = {
  post: IUserPostProps;
  refreshData: () => void;
  ssr: boolean;
  session: Session | null;
}


export const deletePost = async <T extends DeletePostProps>(props: T) => {
  if (typeof window === 'undefined') return;
  const { post, refreshData, ssr, session } = props;
  if (!session || !session.user) return;
  const isValid = DeletePostSchema.parse({ post, refreshData, ssr })
  try {
    if (!isValid) throw new Error('Invalid data passed to deletePost function.')

    const postRef = ref(storage, post.storageRef);
    const deleteFromFirestore = await deleteDoc(
      doc(db, 'posts', `post-${post.postId}`)
    );
    const deleteFromStorage = await deleteObject(postRef);
    await Promise.all([deleteFromFirestore, deleteFromStorage])
      .then(() => {
        ssr ? refreshData() : null;
      });
  } catch (error: any) {
    console.log(error.message);
  }
};
