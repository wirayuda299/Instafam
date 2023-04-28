import {
  useDarkModeStore,
  useFeedModalStore,
  useSelectedPostStore,
} from "@/stores/stores";
import { useStore } from "zustand";
import { AiOutlineClose } from "react-icons/ai";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { createPortal } from "react-dom";
import { IUserPostProps } from "@/types/post";

const PostImage = dynamic(() => import("@/components/Post/Image"), {
  ssr: true,
});
const Postheader = dynamic(() => import("@/components/Header/PostHeader"), {
  ssr: true,
});
const Buttons = dynamic(() => import("../Buttons/Buttons"), { ssr: false });

export default function Feed() {
  const { darkMode } = useStore(useDarkModeStore);
  const { feedModal, setFeedModal } = useStore(useFeedModalStore);
  const { selectedPost, setSelectedPost } = useStore(useSelectedPostStore);
  const router = useRouter();

  const handleClick = () => {
    router.replace(`/post/${selectedPost?.postId}`);
    setFeedModal(false);
    setSelectedPost(null);
  };

  if (!selectedPost && !feedModal) return null;

  return createPortal(
    <>
      {selectedPost && feedModal && (
        <div
          className={` fixed left-0 top-0 z-[99999999] h-screen w-full  select-none !overflow-x-hidden !overflow-y-hidden  bg-black bg-opacity-60 shadow-sm  ${
            feedModal && selectedPost ? "animate-fadeIn" : "animate-fadeOut"
          }`}
          aria-modal="true"
          role="dialog"
        >
          <div className="mx-auto h-full max-w-[500px] text-center">
            <div
              className="flex h-full flex-col items-center justify-center cursor-pointer"
              onClick={() => setSelectedPost(null)}
            >
              <div
                className={`flex min-w-[300px] flex-col rounded-lg p-2 ${
                  darkMode ? "!bg-black text-white" : "!bg-white text-black"
                } `}
              >
                <Postheader post={selectedPost as IUserPostProps}>
                  <Buttons
                    onClick={() => {
                      setFeedModal(false);
                      setSelectedPost(null);
                    }}
                  >
                    <AiOutlineClose size={20} />
                  </Buttons>
                </Postheader>
                <Buttons
                  onClick={handleClick}
                  title={`/post/${selectedPost?.postId}`}
                  name={`/post/${selectedPost?.postId}`}
                >
                  <PostImage post={selectedPost as IUserPostProps} />
                </Buttons>
              </div>
            </div>
          </div>
        </div>
      )}
    </>,
    document.getElementById("modal") as Element
  );
}
