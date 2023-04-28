import { IUserPostProps } from "@/types/post";
import Image from "next/image";
export default function PostImage({ post }: { post: IUserPostProps }) {
  
  return (
    <Image
      src={post?.image}
      width={1300}
      height={1300}
      sizes="(max-width: 1300px) 100vw, 500px"
      placeholder="blur"
      blurDataURL={`data:image/svg+xml;base64,${post?.blurDataUrl}`}
      quality={60}
      priority
      className="post h-auto w-full rounded-lg object-cover"
      alt={post?.author ?? "user post image"}
    />
  );
}
