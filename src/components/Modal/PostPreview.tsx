import { IUserPostProps } from "@/types/post";
import {
  useDarkModeStore,
  usePostPreviewModalStore,
  useSelectedPostStore,
} from "@/stores/stores";
import { useStore } from "zustand";
import { useState } from "react";
import usePost from "@/hooks/usePost";
import useUser from "@/hooks/useUser";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
const Modal = dynamic(() => import("@/components/Modal"));
const PostCommentDesktop = dynamic(() => import("../Post/PreviewDesktop"), {
  ssr: false,
});
const PreviewMobile = dynamic(() => import("../Post/PreviewMobile"), {
  ssr: false,
});

type Props = {
  post: IUserPostProps | null;
  children?: React.ReactNode;
  refreshData: () => void;
};
export default function PostPreview({ post, children, refreshData }: Props) {
  const { darkMode } = useStore(useDarkModeStore);
  const { postPreviewModal } = useStore(usePostPreviewModalStore);
  const { selectedPost } = useStore(useSelectedPostStore);
  const [commentOpen, setCommentOpen] = useState<boolean>(false);
  const { likes, comments } = usePost(selectedPost ?? null);
  const { data: session } = useSession();
  const { user, savedPosts } = useUser(session?.user?.uid as string);

  return (
    <Modal isModalOpen={postPreviewModal}>
      <div className="h-full w-full ">
        <div className="h-full w-full overflow-y-auto">
          <div className="mx-auto grid h-screen w-full max-w-5xl place-items-center rounded-lg ">
            <div
              className={`relative grid h-full w-full grid-cols-1 justify-between overflow-y-auto rounded-xl p-5 shadow-2xl  lg:max-h-[530px] lg:grid-cols-2 lg:p-0 ${
                darkMode ? "bg-black" : "bg-white"
              } `}
            >
              <PreviewMobile
                post={post}
                likes={likes}
                comments={comments}
                savedPosts={savedPosts}
                user={user}
                refreshData={refreshData}
                session={session}
                commentOpen={commentOpen}
                setCommentOpen={setCommentOpen}
              />
              <PostCommentDesktop
                post={selectedPost as IUserPostProps}
                refreshData={refreshData}
                comments={comments}
                likes={likes}
                savedPosts={savedPosts}
                user={user}
                setCommentOpen={setCommentOpen}
                commentOpen={commentOpen}
              >
                {children}
              </PostCommentDesktop>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
