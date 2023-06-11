import { useDarkModeStore } from "@/stores/stores";
import { useStore } from "zustand";
import { type FC, useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import dynamic from "next/dynamic";
import { createPortal } from "react-dom";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useStateContext } from "@/stores/StateContext";

const PostLoader = dynamic(() => import("@/components/Loader/Post"), {
  ssr: true,
});
const PostCard = dynamic(() => import("@/components/Post"), {
  ssr: true,
});

const PostModal: FC = () => {
  const {
    state: { selectedPost, postModal },
    Dispatch,
  } = useStateContext();
  const [reqParams, setReqParams] = useState<string | string[] | undefined>("");
  const [posts, setPosts] = useState<IUserPostProps[]>([]);
  const [loading, setLoading] = useState(true);
  const { darkMode } = useStore(useDarkModeStore);
  const { pathname, query } = useRouter();
  const { data: session } = useSession();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setReqParams(
      session?.user.username === query.username
        ? session?.user.uid
        : query.username
    );
  }, [pathname]);

  useEffect(() => {
    try {
      const getPosts = async () => {
        const { getAllPosts, getPostByCurrentUser } = await import(
          "@/helper/getPosts"
        );
        const res = pathname.startsWith("/profile")
          ? await getPostByCurrentUser(reqParams)
          : await getAllPosts();
        if (!res) throw new Error("Failed to fetch posts");
        setPosts(res.filter((p) => p.postId !== selectedPost?.postId));
        setLoading(false);
      };
      getPosts();
    } catch (error: any) {
      setError(error.message);
    }

    return () => {
      setPosts([]);
      setLoading(true);
    };
  }, [selectedPost, postModal, pathname]);

  const closeModal = () => {
    Dispatch({
      type: "TOGGLE_POST_MODAL",
      payload: {
        postModal: false,
      },
    });
    Dispatch({
      type: "SELECT_POST",
      payload: {
        post: null,
      },
    });
  };

  if (!postModal) return null;

  if (error) {
    return (
      <div className="h-full w-full">
        <div className="flex h-full w-full flex-col items-center justify-center">
          <h1 className="text-center text-2xl font-semibold text-red-500">
            {error}
          </h1>
          <button
            type="button"
            name="reload"
            title="reload"
            className="text-left"
            onClick={() => window.location.reload()}
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  return createPortal(
    <div
      className={` fixed left-0 top-0 z-[99] h-screen w-full select-none  !overflow-y-auto !overflow-x-hidden  shadow-sm lg:hidden  ${
        postModal ? "animate-scaleUp" : "animate-fadeOut"
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
            <button
              type="button"
              name="back"
              title="back"
              className="text-left"
              onClick={closeModal}
            >
              <AiOutlineArrowLeft size={25} />
            </button>
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
};

export default PostModal;
