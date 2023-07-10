import { AiOutlineArrowLeft } from "react-icons/ai";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { createPortal } from "react-dom";
import { useId } from "react";

import usePost from "@/hooks/usePost";
import { useStateContext } from "@/stores/Global/StateContext";
import { useModalContext } from "@/stores/Modal/ModalStatesContext";
const CommentsForm = dynamic(() => import("../../Comments/Forms"));
const Postheader = dynamic(() => import("@/components/Header/PostHeader"));
const Comment = dynamic(() => import("@/components/Comments/Comment"));
const EmptyComment = dynamic(() => import("@/components/Comments/Empty"));

const PostComment = () => {
  const {
    state: { selectedPost },
  } = useStateContext();
  const {
    modalStates: { postCommentModal },
    modalDispatch,
  } = useModalContext();
  const { data: session } = useSession();
  const { comments } = usePost(selectedPost);
  const id = useId();

  if (!session) return null;

  if (!postCommentModal) return null;

  return createPortal(
    <div
      className={` fixed left-0 top-0 z-[99] h-screen w-full select-none overflow-y-auto !overflow-x-hidden bg-white  bg-opacity-60 text-black shadow-sm  dark:bg-black dark:text-white lg:hidden   ${
        postCommentModal ? "animate-commentSlideIn " : "animate-commentSlideOut"
      }`}
      aria-modal="true"
      role="dialog"
    >
      <div className="relative  h-full overflow-hidden bg-white text-center text-black dark:bg-black dark:text-white">
        <div className="flex w-full items-center border-b  border-gray-500 border-opacity-50 px-3 py-3 text-black dark:bg-black dark:text-white ">
          <div>
            <button
              type="button"
              name="close"
              title="close"
              className="text-left"
              onClick={() => {
                modalDispatch({
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
            {comments.length < 1 && <EmptyComment />}
            <Comment comments={comments} key={id} />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full bg-gray-200 py-2 dark:bg-black">
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
