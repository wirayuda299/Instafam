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
const Comments = dynamic(() => import("../../Post/Comments"));
const Postheader = dynamic(() => import("../../Post/Header"));
const PostComments = dynamic(() => import("./Comments"));

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
          className={` ${
            darkMode ? "bg-black text-white" : "bg-white text-black"
          } fixed left-0 top-0 z-[99999] h-screen w-full select-none overflow-y-auto !overflow-x-hidden bg-black  bg-opacity-60 shadow-sm lg:hidden   ${
            postCommentModal
              ? "animate-commentSlideIn "
              : "animate-commentSlideOut"
          }`}
          aria-modal="true"
          role="dialog"
        >
          <div
            className={` relative  h-full  overflow-hidden text-center ${
              darkMode ? "bg-black text-white" : "bg-white text-black"
            }`}
          >
            <div
              className={`flex w-full items-center px-3 py-3 border-b border-gray-500 border-opacity-50 ${
                darkMode ? "bg-black text-white" : "bg-white text-black"
              }`}
            >
              <div>
                <button
                  className="text-left"
                  onClick={() => setPostCommentModal(false)}
                >
                  <AiOutlineArrowLeft size={25} />
                </button>
              </div>
              <div className=" flex-grow">
                <h2 className="text-center font-semibold">Comments</h2>
              </div>
            </div>
            <div className="w-full">
              <Postheader post={selectedPost}>{""}</Postheader>
              <div className="max-h-screen  !w-full overflow-y-auto pb-28">
                <PostComments comments={comments} />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full bg-gray-200 py-2">
              <Comments
                comments={comments}
                post={selectedPost}
                session={session}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
