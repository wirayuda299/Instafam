import { IUserPostProps } from "@/types/post";
import dynamic from "next/dynamic";
import usePost from "@/hooks/usePost";
import { useSession } from "next-auth/react";
import { memo } from "react";
import { BsThreeDots } from "react-icons/bs";
import { useStateContext } from "@/stores/StateContext";
import { useStore } from "zustand";
import { useDarkModeStore } from "@/stores/stores";
import { largeScreenClickEvent } from "@/utils/largeScreenClickEvent";
import { mobileClickEvents } from "@/utils/mobileScreenClickEvent";
const Likes = dynamic(() => import("./Likes"));
const ActionButton = dynamic(() => import("./ActionButton"));
const PostHeader = dynamic(() => import("../Header/PostHeader"));
const Author = dynamic(() => import("./Author"));
const Comments = dynamic(() => import("../Comments/Forms"));
const PostImage = dynamic(() => import("./Image"), { ssr: true });


function PostCard({ post }: { post: IUserPostProps}) {
  const { likes, comments, savedBy } = usePost(post);
  const { data: session } = useSession();
  const { Dispatch } = useStateContext();
  const { darkMode } = useStore(useDarkModeStore);

  const handleClick = () => {
    Dispatch({
      type: "TOGGLE_MENU_MODAL", payload: {
        menuModal: true
      }
    })
    Dispatch({
      type: "SELECT_POST", payload: {
        post
      }
    })
  };

  return (
    <div className=''>
      <div
        className={`rounded-sm shadow-lg p-4 ${darkMode ? "bg-black text-white" : "bg-white text-black"
          }`}
      >
        <PostHeader post={post}>
          <button
            type="button"
            name="menu"
            title="menu"
            onClick={handleClick}
          >
            <BsThreeDots className="text-gray-500" size={20} />
          </button>
        </PostHeader>
        <PostImage post={post} classNames="post h-auto w-full rounded-lg object-cover" />
        <ActionButton
          savedBy={savedBy}
          likes={likes}
          post={post}
          clickLgScreen={() => largeScreenClickEvent(Dispatch, post)}
          clickMobileScreen={() => mobileClickEvents(Dispatch, post)}
          uid={session?.user?.uid as string}
        />
        <Likes likesCount={likes} session={session} />
        <Author post={post} />
        <Comments comments={comments} post={post} session={session} />
      </div>
    </div>
  );
}
export default memo(PostCard);
