import { IUserPostProps } from "@/types/post";
import {
  useDarkModeStore,
  usePostCommentModalStore,
  usePostPreviewModalStore,
  useSelectedPostStore,
} from "@/stores/stores";
import { useStore } from "zustand";
import { useState } from "react";
import usePost from "@/hooks/usePost";
import useUser from "@/hooks/useUser";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { AiOutlineClose } from "react-icons/ai";
const PostCommentDesktop = dynamic(() => import("../Post/PreviewDesktop"), {
  ssr: false,
});
const PreviewMobile = dynamic(() => import("../Post/PreviewMobile"), {
  ssr: false,
});

export default function PostPreview() {
  const { darkMode } = useStore(useDarkModeStore);
  const { postPreviewModal, setPostPreviewModal } = useStore(usePostPreviewModalStore);
  const { selectedPost, setSelectedPost } = useStore(useSelectedPostStore);
  const { setPostCommentModal } = useStore(usePostCommentModalStore)
  const [commentOpen, setCommentOpen] = useState<boolean>(false);
  const { likes, comments } = usePost(selectedPost ?? null);
  const { data: session } = useSession();
  const { user, savedPosts } = useUser(session?.user?.uid as string);
  const { replace, asPath } = useRouter();
  const refreshData = () => {
    replace(asPath);
  }

  return (
    <>
      {postPreviewModal && selectedPost && (
        <div
          className={` fixed left-0 top-0 z-[999] h-screen w-full  select-none !overflow-x-hidden !overflow-y-hidden  bg-black bg-opacity-60 shadow-sm  ${postPreviewModal ? "animate-fadeIn" : "animate-fadeOut"
            }`}
          aria-modal="true"
          role="dialog"
        >
          <div className="mx-auto h-full max-w-5xl text-center ">
            <div className="h-full w-full hidden lg:block ">
              <div className="h-full w-full overflow-y-auto">
                <div className="mx-auto grid h-screen w-full max-w-5xl place-items-center rounded-lg ">
                  <div
                    className={`relative grid h-full w-full grid-cols-1 justify-between overflow-y-auto rounded-xl p-5 shadow-2xl  lg:max-h-[530px] lg:grid-cols-2 lg:p-0 ${darkMode ? "bg-black" : "bg-white"
                      } `}
                  >
                    <PreviewMobile
                      post={selectedPost}
                      likes={likes}
                      comments={comments}
                      savedPosts={savedPosts}
                      user={user}
                      refreshData={refreshData}
                      session={session}
                      commentOpen={commentOpen}
                    />
                    <PostCommentDesktop
                      post={selectedPost as IUserPostProps}
                      refreshData={refreshData}
                      comments={comments}
                      likes={likes}
                      savedPosts={savedPosts}
                      user={user}
                    >
                      <button className="btn" onClick={() => {
                        setPostPreviewModal(false);
                        setPostCommentModal(false);
                        setSelectedPost(null);
                      }}>
                        <AiOutlineClose size={25} />
                      </button>
                    </PostCommentDesktop>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>

  );
}
