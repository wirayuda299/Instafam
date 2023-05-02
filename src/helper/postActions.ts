import { IUserPostProps } from "@/types/post";
import type { Session } from "next-auth";

type PostActions = (selectedPost: IUserPostProps, session: Session | null, refreshData: () => void, setMenuModal: (menuModal: boolean) => void) => Promise<void>

export const postActions: PostActions = async (selectedPost, session, refreshData, setMenuModal) => {
  const { toast } = await import("react-hot-toast");
  if (selectedPost?.postedById === session?.user.uid) {
    const { deletePost } = await import("@/helper/deletePost");
    const deletePostsArgs = {
      post: selectedPost,
      refreshData,
      session,
    };
    deletePost(deletePostsArgs)
      .then(() => {
        setMenuModal(false);
        refreshData()
        toast.success("Post deleted successfully.");
      });
  } else {
    const { handleFollow } = await import("@/helper/follow");
    const followArgs = {
      id: selectedPost?.postedById as string,
      uid: session?.user.uid as string,
      followedByName: session?.user.username as string ,
      followedDate: Date.now(),
      followedImage: session?.user.image as string,
    };
    await handleFollow(followArgs)
  }

}
