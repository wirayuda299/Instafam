import { IUserPostProps } from "@/types/post";
import dynamic from "next/dynamic";
import { useStateContext } from "@/stores/StateContext";
import type { FC } from "react";
const PostImage = dynamic(() => import("../Post/Image"), { ssr: true });
const PostInfo = dynamic(() => import("./PostInfo"), { ssr: true });

const Feeds: FC<{ post: IUserPostProps }> = ({ post }) => {
  const { Dispatch } = useStateContext();

  const selectPost = (selectedPost: IUserPostProps) => {
    Dispatch({
      type: "SELECT_POST",
      payload: {
        post: selectedPost,
      },
    });

    Dispatch({
      type: "TOGGLE_FEED_MODAL",
      payload: {
        feedModal: true,
      },
    });
  };

  return (
    <div
      key={post.postId}
      className={`group relative`}
      onClick={() => selectPost(post)}
    >
      <PostImage post={post} />
      <div className="hidden md:block">
        <PostInfo post={post} />
      </div>
    </div>
  );
};

export default Feeds;
