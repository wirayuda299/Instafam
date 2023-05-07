import { IUserPostProps } from "@/types/post";
import { useDarkModeStore } from "@/stores/stores";
import { useStore } from "zustand";
import usePost from "@/hooks/usePost";
import dynamic from "next/dynamic";
import { AiOutlineClose } from "react-icons/ai";
import { createPortal } from "react-dom";
import { useStateContext } from "@/stores/StateContext";
const PostCommentDesktop = dynamic(() => import("../Post/Preview"), {
  ssr: false,
});

const PostImage = dynamic(() => import("../Post/Image"), {
  ssr: true,
});
export default function PostPreview() {
  const { darkMode } = useStore(useDarkModeStore);
  const {
    state: { postPreviewModal, selectedPost },
    Dispatch,
  } = useStateContext();
  const { likes, comments, savedBy } = usePost(selectedPost ?? null);

  if (!postPreviewModal) return null;

  return createPortal(
    <div
      className={` fixed left-0 top-0 z-50 hidden h-screen w-full select-none !overflow-hidden bg-black bg-opacity-60 shadow-sm lg:block  ${
        postPreviewModal ? "animate-fadeIn" : "animate-fadeOut"
      }`}
      aria-modal="true"
      role="dialog"
    >
      <div className="mx-auto h-full max-w-5xl text-center ">
        <div className="hidden h-full w-full lg:block ">
          <div className="h-full w-full">
            <div className="mx-auto grid h-screen w-full max-w-5xl place-items-center rounded-lg ">
              <div
                className={`relative grid h-full w-full grid-cols-1 justify-between  rounded-xl p-5 shadow-2xl  lg:max-h-[500px] lg:grid-cols-2 lg:p-0 ${
                  darkMode ? "bg-black" : "bg-white"
                } `}
              >
                <PostImage
                  post={selectedPost as IUserPostProps}
                />
                <PostCommentDesktop
                  post={selectedPost as IUserPostProps}
                  comments={comments}
                  likes={likes}
                  savedBy={savedBy}
                >
                  <button
                    onClick={() => {
                      Dispatch({
                        type: "TOGGLE_POST_PREVIEW_MODAL",
                        payload: {
                          postPreviewModal: false,
                        },
                      });
                      Dispatch({
                        type: "TOGGLE_POST_COMMENT_MODAL",
                        payload: {
                          postCommentModal: false,
                        },
                      });
                      Dispatch({
                        type: "SELECT_POST",
                        payload: {
                          post: null,
                        },
                      });
                    }}
                    name="close"
                    title="close"
                  >
                    <AiOutlineClose size={25} />
                  </button>
                </PostCommentDesktop>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("modal") as Element
  );
}
