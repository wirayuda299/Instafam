import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { type FC, memo } from "react";
import { BsThreeDots } from "react-icons/bs";

import usePost from "@/hooks/usePost";
import { useStateContext } from "@/stores/Global/StateContext";
import { useModalContext } from "@/stores/Modal/ModalStatesContext";
const Likes = dynamic(() => import("./Likes"));
const ActionButton = dynamic(() => import("./ActionButton"));
const PostHeader = dynamic(() => import("../Header/PostHeader"));
const Author = dynamic(() => import("./Author"));
const Comments = dynamic(() => import("../Comments/Forms"));
const PostImage = dynamic(() => import("./Image"), { ssr: true });

const PostCard: FC<{ post: IUserPostProps }> = ({ post }) => {
  const { likes, comments, savedBy } = usePost(post);
  const { data: session } = useSession();
  const { modalDispatch} = useModalContext();
  const { Dispatch } = useStateContext();

  const handleClick = () => {
    modalDispatch({
      type: "TOGGLE_MENU_MODAL",
      payload: {
        menuModal: true,
      },
    });
    Dispatch({
      type: "SELECT_POST",
      payload: {
        post,
      },
    });
  };

  return (
    <div className="rounded-sm bg-white p-4 text-black shadow-lg dark:bg-black dark:text-white ">
      <PostHeader post={post}>
        <button type="button" name="menu" title="menu" onClick={handleClick}>
          <BsThreeDots className="text-gray-500" size={20} />
        </button>
      </PostHeader>
      <PostImage post={post} />
      <ActionButton
        savedBy={savedBy}
        likes={likes}
        post={post}
        uid={session?.user?.uid as string}
      />
      <Likes likesCount={likes} uid={session?.user.uid as string} />
      <Author
        author={post.author}
        captions={post.captions}
        hashtags={post.hashtags}
      />
      <Comments comments={comments} post={post} session={session} />
    </div>
  );
};
export default memo(PostCard);
