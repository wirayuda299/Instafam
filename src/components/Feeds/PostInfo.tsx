import { IUserPostProps } from "@/types/post";
import { AiFillHeart, AiTwotoneMessage } from "react-icons/ai";

export default function PostInfo({ post }: { post: IUserPostProps }) {
  return (
    <div className="absolute inset-0 flex items-center justify-around bg-black bg-opacity-0 transition-opacity duration-300 ease-in-out md:hover:bg-opacity-30">
      <button
        type="button"
        name="likes count "
        title="likes count "
        className="ease text-center text-white opacity-0 transition-all duration-500 group-hover:opacity-100"
      >
        <p className="flex items-center space-x-2 text-center">
          <AiFillHeart className="text-xl md:text-3xl" color={"white"} />
          <small className="text-sm font-semibold">
            {post?.likedBy.length}
          </small>
        </p>
      </button>
      <button
        type="button"
        title="comments count "
        name="posts comment count "
        className="ease text-center text-white opacity-0 transition-all duration-500 group-hover:opacity-100"
      >
        <p className="flex items-center space-x-2 text-center">
          <AiTwotoneMessage className="text-xl md:text-3xl" color={"white"} />
          <small className="text-sm font-semibold">
            {post?.comments.length}
          </small>
        </p>
      </button>
    </div>
  );
}
