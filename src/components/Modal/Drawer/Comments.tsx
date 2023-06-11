import { AiOutlineArrowLeft } from "react-icons/ai";
import { useStore } from "zustand";
import { useDarkModeStore } from "@/stores/stores";
import { useSession } from "next-auth/react";
import usePost from "@/hooks/usePost";
import dynamic from "next/dynamic";
import { createPortal } from "react-dom";
import { useId } from "react";
import { useStateContext } from "@/stores/StateContext";
const CommentsForm = dynamic(() => import("../../Comments/Forms"));
const Postheader = dynamic(() => import("@/components/Header/PostHeader"));
const Comment = dynamic(() => import("@/components/Comments/Comment"));
const EmptyComment = dynamic(() => import("@/components/Comments/Empty"));

const PostComment = () => {
  const {
    state: { selectedPost, postCommentModal },
    Dispatch,
  } = useStateContext();
  const { darkMode } = useStore(useDarkModeStore);
  const { data: session } = useSession();
  const { comments } = usePost(selectedPost);
  const id = useId();

  if (!session) return null;

  if (!postCommentModal) return null;

  return createPortal(
    <div
      className={` ${
        darkMode ? "bg-black text-white" : "bg-white text-black"
      } fixed left-0 top-0 z-[99] h-screen w-full select-none overflow-y-auto !overflow-x-hidden bg-black  bg-opacity-60 shadow-sm lg:hidden   ${
        postCommentModal ? "animate-commentSlideIn " : "animate-commentSlideOut"
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
          className={`flex w-full items-center border-b border-gray-500 border-opacity-50 px-3 py-3 ${
            darkMode ? "bg-black text-white" : "bg-white text-black"
          }`}
        >
          <div>
            <button
              type="button"
              name="close"
              title="close"
              className="text-left"
              onClick={() => {
                Dispatch({
                  type: "TOGGLE_POST_COMMENT_MODAL",
                  payload: {
                    postCommentModal: false,
                  },
                });
              }}
            >
              <AiOutlineArrowLeft size={25} />
            </button>
          </div>
          <div className=" flex-grow">
            <h2 className="text-center font-semibold">Comments</h2>
          </div>
        </div>
        <div className="w-full ">
          <div className="px-4">
            <Postheader post={selectedPost as IUserPostProps} />
          </div>
          <div className="max-h-screen  !w-full overflow-y-auto px-2 pb-28">
            <EmptyComment />
            <Comment comments={comments} key={id} />
          </div>
        </div>
        <div
          className={`absolute bottom-0 left-0 w-full py-2 ${
            darkMode ? "bg-black" : "bg-gray-200"
          }`}
        >
          <CommentsForm
            comments={comments}
            post={selectedPost as IUserPostProps}
            session={session}
          />
        </div>
      </div>
    </div>,
    document?.getElementById("modal") as Element
  );
};
export default PostComment;
