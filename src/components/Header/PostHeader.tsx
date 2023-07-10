import Image from "next/image";

import CreatedTime from "@/components/Post/CreatedTime";
import { type FC, memo } from "react";

type PostHeaderProps = {
  post: IUserPostProps;
  children?: React.ReactNode;
};

const PostHeader: FC<PostHeaderProps> = ({ post, children }) => {

  return (
    <header className="relative flex h-fit items-center bg-white px-4 py-3 text-black dark:bg-black dark:text-white ">
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
