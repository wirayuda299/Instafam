import { IUserPostProps } from "@/types/post";
import {
  useDarkModeStore,
  usePostCommentModalStore,
  usePostPreviewModalStore,
  useSelectedPostStore,
} from "@/stores/stores";
import { useStore } from "zustand";
import usePost from "@/hooks/usePost";
import dynamic from "next/dynamic";
import { AiOutlineClose } from "react-icons/ai";
import { createPortal } from "react-dom";
import PostImage from "../Post/Image";
const PostCommentDesktop = dynamic(() => import("../Post/Preview"), {
  ssr: false,
});
const Buttons = dynamic(() => import("../Buttons/Buttons"), {
  ssr: false,
});
export default function PostPreview() {
  const { darkMode } = useStore(useDarkModeStore);
  const { postPreviewModal, setPostPreviewModal } = useStore(
    usePostPreviewModalStore
  );
  const { selectedPost, setSelectedPost } = useStore(useSelectedPostStore);
  const { setPostCommentModal } = useStore(usePostCommentModalStore);
  const { likes, comments, savedBy } = usePost(selectedPost ?? null);

  if (!postPreviewModal) return null

  return createPortal(
    <div
      className={` fixed left-0 top-0 z-50 h-screen w-full  select-none !overflow-x-hidden !overflow-y-hidden  bg-black bg-opacity-60 shadow-sm  ${postPreviewModal ? "animate-fadeIn" : "animate-fadeOut"
        }`}
      aria-modal="true"
      role="dialog"
    >
      <div className="mx-auto h-full max-w-5xl text-center ">
        <div className="hidden h-full w-full lg:block ">
          <div className="h-full w-full">
            <div className="mx-auto grid h-screen w-full max-w-5xl place-items-center rounded-lg ">
              <div
                className={`relative grid h-full w-full grid-cols-1 justify-between  rounded-xl p-5 shadow-2xl  lg:max-h-[500px] lg:grid-cols-2 lg:p-0 ${darkMode ? "bg-black" : "bg-white"
                  } `}
              >
                <PostImage post={selectedPost as IUserPostProps} />
                 <PostCommentDesktop
                    post={selectedPost as IUserPostProps}
                    comments={comments}
                    likes={likes}
                    savedBy={savedBy}
                  >
                    <Buttons
                      onClick={() => {
                        setPostPreviewModal(false);
                        setPostCommentModal(false);
                        setSelectedPost(null);
                      }}
                    >
                      <AiOutlineClose size={25} />
                    </Buttons>
                  </PostCommentDesktop>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("modal") as Element
  )
}
