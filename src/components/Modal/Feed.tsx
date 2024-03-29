import { AiOutlineClose } from "react-icons/ai";
import dynamic from "next/dynamic";
import { createPortal } from "react-dom";
import Link from "next/link";

import { useStateContext } from "@/stores/Global/StateContext";
import { useModalContext } from "@/stores/Modal/ModalStatesContext";

const PostImage = dynamic(() => import("@/components/Post/Image"), {
  ssr: true,
});
const Postheader = dynamic(() => import("@/components/Header/PostHeader"), {
  ssr: true,
});

const Feed = () => {
  const {
    state: { selectedPost },
    Dispatch,
  } = useStateContext();
  const {
    modalStates: { feedModal },
    modalDispatch,
  } = useModalContext();

  const handleClick = () => {
    modalDispatch({
      type: "TOGGLE_FEED_MODAL",
      payload: {
        feedModal: false,
      },
    });
    Dispatch({
      type: "SELECT_POST",
      payload: {
        post: null,
      },
    });
  };

  if (!feedModal) return null;

  const modal = document.getElementById("modal") as Element;

  return createPortal(
    <>
      <div
        className={` fixed left-0 top-0 z-50 h-screen w-full select-none  !overflow-x-hidden !overflow-y-hidden bg-black  bg-opacity-20 shadow-sm backdrop-blur-sm  ${
          feedModal && selectedPost ? "animate-fadeIn" : "animate-fadeOut"
        }`}
        aria-modal="true"
        role="dialog"
      >
        <div className="mx-auto h-full max-w-[500px] text-center">
          <div className="flex h-full cursor-pointer flex-col items-center justify-center">
            <div className="flex min-w-[300px] flex-col rounded-lg bg-white p-2 text-black dark:!bg-black dark:text-white">
              <Postheader post={selectedPost as IUserPostProps}>
                <button
                  type="button"
                  name="close"
                  title="close"
                  onClick={handleClick}
                >
                  <AiOutlineClose size={20} />
                </button>
              </Postheader>
              <Link
                href={`/post/${selectedPost?.postId}`}
                title="view post"
                onClick={handleClick}
              >
                <PostImage post={selectedPost as IUserPostProps} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>,
    modal
  );
};
export default Feed;
