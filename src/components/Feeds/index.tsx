import { useFeedModalStore, useSelectedPostStore } from "@/stores/stores";
import { useStore } from "zustand";
import PostInfo from "./PostInfo";
import Image from "next/image";
import { IUserPostProps } from "@/types/post";

export default function Feeds({ post }: { post: IUserPostProps }) {
  const { setFeedModal } = useStore(useFeedModalStore);
  const { setSelectedPost } = useStore(useSelectedPostStore);
  return (
    <div
      key={post.postId}
      className={`group relative `}
      onClick={() => {
        setSelectedPost(post);
        setFeedModal(true);
      }}
    >
      <Image
        className={`w-full h-full object-cover `}
        src={post.image}
        width={1000}
        height={500}
        alt={post.captions ?? post.author}
      />
      <PostInfo post={post} />
    </div>
  )
}
