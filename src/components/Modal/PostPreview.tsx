import { useDarkModeStore } from "@/stores/stores";
import { useStore } from "zustand";
import usePost from "@/hooks/usePost";
import dynamic from "next/dynamic";
import { AiOutlineClose } from "react-icons/ai";
import { createPortal } from "react-dom";
import { useStateContext } from "@/stores/StateContext";
import { useSession } from "next-auth/react";
const Likes = dynamic(() => import("@/components/Post/Likes"));
const CommentsForm = dynamic(() => import("@/components/Comments/Forms"));
const ActionButton = dynamic(() => import("@/components/Post/ActionButton"));
const Comment = dynamic(() => import("@/components/Comments/Comment"));
const PostHeader = dynamic(() => import("@/components/Header/PostHeader"));
const Empty = dynamic(() => import("../Comments/Empty"));
const PostImage = dynamic(() => import("../Post/Image"), {
  ssr: true,
});
const PostPreview = () => {
  const { darkMode } = useStore(useDarkModeStore);
  const {
    state: { postPreviewModal, selectedPost },
    Dispatch,
  } = useStateContext();
  const { likes, comments, savedBy } = usePost(selectedPost ?? null);
  const { data: session } = useSession();

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
                <PostImage post={selectedPost as IUserPostProps} />
                <div
                  className={`relative hidden md:block ${
                    darkMode ? "bg-black text-white" : "bg-white text-black"
                  }`}
                >
                  <div className="hidden h-full max-h-[400px] overflow-y-auto  overflow-x-hidden py-3 lg:block ">
                    <div className="absolute top-0 w-full border-b border-gray-500 border-opacity-50 px-2">
                      <PostHeader post={selectedPost as IUserPostProps}>
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
                      </PostHeader>
                    </div>
                    <div className={comments.length < 1 ? "mt-32" : ""}>
                      <div className="pt-11 ">
                        {comments.length === 0 && <Empty />}
                      </div>
                      <Comment comments={comments} />
                    </div>
                    <div
                      className={`absolute bottom-0 hidden w-full border-t border-gray-500 border-opacity-50 px-2 lg:block ${
                        darkMode ? "bg-black" : "bg-white"
                      }`}
                    >
                      <ActionButton
                        likes={likes}
                        post={(selectedPost as IUserPostProps) ?? []}
                        savedBy={savedBy}
                        uid={session?.user.uid as string}
                      />
                      <Likes
                        likesCount={likes}
                        uid={session?.user.uid as string}
                      />
                      <div className="py-2">
                        <CommentsForm
                          post={(selectedPost as IUserPostProps) ?? []}
                          comments={comments ?? []}
                          session={session}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("modal") as Element
  );
};
export default PostPreview;
