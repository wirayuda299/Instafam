import { IUserPostProps } from "@/types/post";
import Image from "next/image";
import useBlurhash from "@/hooks/useBlurhash";
import type { FC } from "react";

interface Props extends React.HTMLAttributes<HTMLImageElement> {
  post: IUserPostProps;
}
const PostImage: FC<Props> = ({ post }) => {
  const { blurHash } = useBlurhash(post);
  return (
    <>
      <Image
        src={post?.image}
        width={1300}
        height={1300}
        sizes="(max-width: 1300px) 100vw, 500px"
        placeholder="blur"
        blurDataURL={`${blurHash}`}
        quality={60}
        className="post h-auto min-h-full w-full rounded-lg object-cover"
        alt={post?.author ?? "user post image"}
      />
    </>
  );
};
export default PostImage;
