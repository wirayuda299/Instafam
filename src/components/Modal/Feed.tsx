import { useDarkModeStore } from "@/stores/stores";
import { useStore } from "zustand";
import { AiOutlineClose } from "react-icons/ai";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { createPortal } from "react-dom";
import { useStateContext } from "@/stores/StateContext";
import { useState } from "react";
import Link from "next/link";

const PostImage = dynamic(() => import("@/components/Post/Image"), {
  ssr: true,
});
const Postheader = dynamic(() => import("@/components/Header/PostHeader"), {
  ssr: true,
});

const Feed = () => {
  const { darkMode } = useStore(useDarkModeStore);
  const {
    state: { selectedPost, feedModal },
    Dispatch,
  } = useStateContext();
  const router = useRouter();
  const [disabled, setDisabled] = useState<boolean>(false);

  // const handleClick = () => {
  //   setDisabled(true);
  //   router.replace(`/post/${selectedPost?.postId}`);
  //   Dispatch({
  //     type: "TOGGLE_FEED_MODAL",
  //     payload: {
  //       feedModal: false,
  //     },
  //   });
  //   Dispatch({
  //     type: "SELECT_POST",
  //     payload: {
  //       post: null,
  //     },
  //   });
  //   setDisabled(false);
  // };

  if (!selectedPost && feedModal) return null;

  return createPortal(
    <>
      {selectedPost && feedModal && (
        <div
          className={` fixed left-0 top-0 z-50 h-screen w-full  select-none !overflow-x-hidden !overflow-y-hidden  bg-black bg-opacity-60 shadow-sm  ${
            feedModal && selectedPost ? "animate-fadeIn" : "animate-fadeOut"
          }`}
          aria-modal="true"
          role="dialog"
        >
          <div className="mx-auto h-full max-w-[500px] text-center">
            <div className="flex h-full cursor-pointer flex-col items-center justify-center">
              <div
                className={`flex min-w-[300px] flex-col rounded-lg p-2 ${
                  darkMode ? "!bg-black text-white" : "!bg-white text-black"
                } `}
              >
                <Postheader post={selectedPost as IUserPostProps}>
                  <button
                    type="button"
                    name="close"
                    title="close"
                    onClick={() => {
                      Dispatch({
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
                    }}
                  >
                    <AiOutlineClose size={20} />
                  </button>
                </Postheader>
                <Link href={`/post/${selectedPost.postId}`} title={`View post`}>
                  <PostImage post={selectedPost as IUserPostProps} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>,
    document.getElementById("modal") as Element
  );
};
export default Feed;
