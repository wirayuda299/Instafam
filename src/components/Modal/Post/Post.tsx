import {
  useDarkModeStore,
  usePostModalStore,
  useSelectedPostStore,
} from "@/stores/stores";
import { useStore } from "zustand";
import { useEffect, useState } from "react";
import { IUserPostProps } from "@/types/post";
import { AiOutlineArrowLeft } from "react-icons/ai";
import dynamic from "next/dynamic";
import { createPortal } from "react-dom";
const PostLoader = dynamic(() => import("@/components/Loader/Post"), {
  ssr: true,
});
const PostCard = dynamic(() => import("@/components/Post"), {
  ssr: true,
});
const Buttons = dynamic(() => import("@/components/Buttons/Buttons"), {
  ssr: true,
});
export default function PostModal() {
  const { postModal, setPostModal } = useStore(usePostModalStore);
  const { selectedPost, setSelectedPost } = useStore(useSelectedPostStore);
  const [posts, setPosts] = useState<IUserPostProps[]>([]);
  const [loading, setLoading] = useState(true);
  const { darkMode } = useStore(useDarkModeStore);

  useEffect(() => {
    try {
      const getPosts = async () => {
        const { getAllPosts } = await import("@/helper/getPosts");
        const res = await getAllPosts();
        setPosts(res.filter((p) => p.postId !== selectedPost?.postId));
        setLoading(false);
      };
      getPosts();
    } catch (error: any) {
      console.log(error.message);
    }
  }, [selectedPost, postModal]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 768) {
        setPostModal(false);
        setSelectedPost(null);
      }
    });

    return () => {
      window.removeEventListener("resize", () => {
        if (window.innerWidth >= 768) {
          setPostModal(false);
          setSelectedPost(null);
        }
      });
    };
  }, [postModal]);

  if (!selectedPost && !postModal) return null;

  return createPortal(
    <div
      className={` fixed left-0 top-0 z-[99] h-screen w-full select-none  !overflow-y-auto !overflow-x-hidden  shadow-sm lg:hidden  ${
        postModal ? "animate-scaleUp" : "animate-scaleDown"
      } ${darkMode ? "bg-black" : "bg-white"}`}
      aria-modal="true"
      role="dialog"
    >
      <div className="relative w-full">
        <div
          className={`sticky top-0 z-30 flex w-full items-center border-b border-gray-500 border-opacity-50 px-3 py-3 ${
            darkMode ? "bg-black text-white" : "bg-white text-black"
          }`}
        >
          <div>
            <Buttons
              className="text-left"
              onClick={() => {
                setPostModal(false);
                setSelectedPost(null);
              }}
            >
              <AiOutlineArrowLeft size={25} />
            </Buttons>
          </div>
        </div>
        <div className="z-10 p-2">
          <PostCard post={selectedPost as IUserPostProps} />
          {loading && <PostLoader />}
          {posts.map((post) => (
            <PostCard key={post.postId} post={post} />
          ))}
        </div>
      </div>
    </div>,
    document.getElementById("modal") as Element
  );
}
