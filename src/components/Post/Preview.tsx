import { IUserPostProps } from "@/types/post";
import { useEffect, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { useStore } from "zustand";
import { useDarkModeStore } from "@/stores/stores";
import { useStateContext } from "@/stores/StateContext";
import { largeScreenClickEvent } from "@/utils/largeScreenClickEvent";
import { mobileClickEvents } from "@/utils/mobileScreenClickEvent";
const Likes = dynamic(() => import("./Likes"));
const CommentsForm = dynamic(() => import("@/components/Comments/Forms"));
const ActionButton = dynamic(() => import("@/components/Post/ActionButton"));
const Comment = dynamic(() => import("@/components/Comments/Comment"));
const PostHeader = dynamic(() => import("@/components/Header/PostHeader"));
const Empty = dynamic(() => import("../Comments/Empty"));

type CommentsProps = Pick<IUserPostProps, "comments">;

type Props = {
  post: IUserPostProps;
  children?: ReactNode;
  comments: CommentsProps["comments"];
  likes: string[];
  savedBy: string[];
};

export default function PostDetailComment(props: Props) {
  const {
    post,
    children,
    comments,
    likes,
    savedBy,
  } = props;
  const { data: session } = useSession();
  const { Dispatch } = useStateContext()
  const { darkMode } = useStore(useDarkModeStore)
  
  const closeOnresize = () => {
    Dispatch({
      type: 'TOGGLE_POST_PREVIEW_MODAL',
      payload: {
        postPreviewModal: false
      }
    })
    Dispatch({
      type: 'SELECT_POST',
      payload: {
        post: null
      }
    })
  }
  useEffect(() => {
    window.addEventListener("resize", () => {
      closeOnresize()
    });
    return () => {
      window.removeEventListener("resize", () => {
        closeOnresize()
      });
    };
  }, [])



  return (
    <div
      className={`relative hidden md:block ${darkMode ? "bg-black text-white" : "bg-white text-black"
        }`}
    >
      <div className="hidden h-full max-h-[400px] overflow-y-auto  overflow-x-hidden py-3 lg:block ">
        <div className="absolute top-0 w-full border-b border-gray-500 border-opacity-50 px-2">
          <PostHeader post={post}>{children}</PostHeader>
        </div>
        <div className={comments.length < 1 ? 'mt-32' : ''}>
          <div className="pt-11 ">
            <Empty comments={comments} />
          </div>
          <Comment comments={comments} />
        </div>
        <div
          className={`absolute bottom-0 hidden w-full border-t border-gray-500 border-opacity-50 px-2 lg:block ${darkMode ? "bg-black" : "bg-white"
            }`}
        >
          <ActionButton
            clickLgScreen={() => largeScreenClickEvent(Dispatch, post)}
            clickMobileScreen={() => mobileClickEvents(Dispatch, post)}
            likes={likes}
            post={post ?? []}
            savedBy={savedBy}
            uid={session?.user.uid as string}
          />
          <Likes likesCount={likes} session={session} />
          <div className="py-2">
            <CommentsForm
              post={post ?? []}
              comments={comments ?? []}
              session={session}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
