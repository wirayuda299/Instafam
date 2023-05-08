import { IUserPostProps } from "@/types/post";
import type { FC } from "react";
import { AiFillHeart, AiTwotoneMessage } from "react-icons/ai";

const PostInfo: FC<{ post: IUserPostProps }> = ({ post }) => {
  return (
    <div className="absolute inset-0 flex h-full w-full items-center justify-around bg-black bg-opacity-0 transition-opacity duration-300 ease-in-out md:hover:bg-opacity-30">
      <div className="ease text-center text-white opacity-0 transition-all duration-500 group-hover:opacity-100">
        <button
          className="flex items-center space-x-2 text-center"
          type="button"
          name="likes count "
          title="likes count "
        >
          <AiFillHeart className="text-xl md:text-3xl" color={"white"} />
          <small className="text-sm font-semibold">
            {post?.likedBy.length}
          </small>
        </button>
      </div>
      <button
        type="button"
        title="comments count "
        name="posts comment count "
        className="ease text-center text-white opacity-0 transition-all duration-500 group-hover:opacity-100"
      >
        <div className="flex items-center space-x-2 text-center">
          <AiTwotoneMessage className="text-xl md:text-3xl" color={"white"} />
          <small className="text-sm font-semibold">
            {post?.comments.length}
          </small>
        </div>
      </button>
    </div>
  );
}
export default PostInfo
