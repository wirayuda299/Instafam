import { AiOutlineArrowLeft } from "react-icons/ai";
import { useStore } from "zustand";
import {
  useDarkModeStore,
  usePostCommentModalStore,
  useSelectedPostStore,
} from "@/stores/stores";
import { useSession } from "next-auth/react";
import usePost from "@/hooks/usePost";
import dynamic from "next/dynamic";
const Comments = dynamic(() => import('../../Post/Comments'))
const Postheader = dynamic(() => import("../../Post/Header"))
const PostComments =dynamic(() => import("./Comments"))

export default function PostComment() {
  const { postCommentModal, setPostCommentModal } = useStore(
    usePostCommentModalStore
  );
  const { selectedPost } = useStore(useSelectedPostStore);
  const { darkMode } = useStore(useDarkModeStore);
  const { data: session } = useSession();
  const { comments } = usePost(selectedPost);
  return (
    <>
      {postCommentModal && selectedPost && (
        <div
          className={` ${darkMode ? "bg-black text-white" : "bg-white text-black"
            } fixed left-0 top-0 lg:hidden z-[99999] h-screen w-full select-none overflow-y-auto !overflow-x-hidden  bg-black bg-opacity-60 shadow-sm  ${postCommentModal
              ? "animate-commentSlideIn "
              : "animate-commentSlideOut"
            }`}
          aria-modal="true"
          role="dialog"
        >
          <div
            className={` relative  overflow-hidden  h-full text-center ${darkMode ? "bg-black text-white" : "bg-white text-black"
              }`}
          >
            <div className="w-full flex items-center py-2 px-3 bg-black text-white">
              <div>
                <button className="text-left" onClick={() => setPostCommentModal(false)}>
                  <AiOutlineArrowLeft size={20} />
                </button>
              </div>
              <div className=" flex-grow">
                <h2 className="text-center font-semibold">Comments</h2>
              </div>
            </div>
            <div className="w-full">
              <Postheader post={selectedPost}>
                {''}
              </Postheader>
              <div className="!w-full  max-h-screen pb-28 overflow-y-auto">
                <PostComments comments={comments}  />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 bg-gray-200 w-full py-2">
              <Comments comments={comments} post={selectedPost} session={session} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
