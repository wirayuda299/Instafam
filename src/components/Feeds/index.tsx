import { IUserPostProps } from "@/types/post";
import dynamic from "next/dynamic";
import { useStateContext } from "@/stores/StateContext";
import type { FC } from "react";
const PostImage = dynamic(() => import("../Post/Image"), { ssr: true });
const PostInfo = dynamic(() => import("./PostInfo"), { ssr: true });

const Feeds: FC<{ post: IUserPostProps }> = ({ post }) => {
  const { Dispatch } = useStateContext();
  return (
    <div
      key={post.postId}
      className={`group relative`}
      onClick={() => {
        Dispatch({
          type: "SELECT_POST",
          payload: {
            post,
          },
        });

        Dispatch({
          type: "TOGGLE_FEED_MODAL",
          payload: {
            feedModal: true,
          },
        });
      }}
    >
      <PostImage post={post} />
      <div className="hidden md:block">
        <PostInfo post={post} />
      </div>
    </div>
  );

}

export default Feeds