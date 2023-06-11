import Image from "next/image";
import { useStore } from "zustand";
import { useDarkModeStore } from "@/stores/stores";
import CreatedTime from "@/components/Post/CreatedTime";
import { type FC, memo } from "react";

type PostHeaderProps = {
  post: IUserPostProps;
  children?: React.ReactNode;
};

const PostHeader: FC<PostHeaderProps> = ({ post, children }) => {
  const { darkMode } = useStore(useDarkModeStore);

  return (
    <header
      className={`relative flex h-fit items-center px-4 py-3 ${
        darkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <Image
        className="h-8 w-8 rounded-full object-cover "
        alt={post?.author ?? "user profile"}
        width={50}
        height={50}
        src={post?.postedByPhotoUrl || ""}
        sizes="50px"
      />
      <CreatedTime author={post.author} createdAt={post.createdAt} />
      {children}
    </header>
  );
};
export default memo(PostHeader);
