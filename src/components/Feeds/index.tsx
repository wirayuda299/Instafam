import { IUserPostProps } from "@/types/post";
import { imageLoader } from "@/util/imageLoader";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useStore } from "zustand";
import { usePostPreviewModalStore, useSelectedPostStore } from "@/stores/stores";

const PostInfo = dynamic(() => import("./PostInfo"));

type Props = {
  post: IUserPostProps;
}

export default function ExplorePostCard({ post }: Props) {
  const { setSelectedPost } = useStore(useSelectedPostStore);
  const { setPostPreviewModal } = useStore(usePostPreviewModalStore);
  const handleClick = () => {
    setSelectedPost(post);
    setPostPreviewModal(true);
  };

  return (
    <div
      className="group relative cursor-pointer shadow-lg"
      onClick={handleClick}>
      <div className="rounded-sm shadow-lg">
        <Image
          src={post?.image}
          width={1300}
          height={1300}
          sizes="100vw"
          placeholder="blur"
          blurDataURL={Buffer.from(post?.image as string).toString()}
          loader={() => imageLoader({ src: post?.image, width: 40, quality: 10 })}
          priority
          quality={60}
          className="mb-5 h-full w-full rounded-lg object-cover"
          alt={post?.author ?? "user post image"}
        />
        <PostInfo post={post} />
      </div>
    </div>
  );
}

