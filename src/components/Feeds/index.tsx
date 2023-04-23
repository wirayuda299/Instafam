import { useFeedModalStore, useSelectedPostStore } from "@/stores/stores";
import { useStore } from "zustand";
import PostInfo from "./PostInfo";
import Image from "next/image";
import { IUserPostProps } from "@/types/post";

type Props = {
  post: IUserPostProps;
  index: number;
};

export default function Feeds({ post, index }: Props) {
  const { setFeedModal } = useStore(useFeedModalStore);
  const { setSelectedPost } = useStore(useSelectedPostStore);
  return (
    <div
      key={post.postId}
      className={`group relative`}
      onClick={() => {
        setSelectedPost(post);
        setFeedModal(true);
      }}
    >
      <Image
        className={` h-full w-full object-cover xs:object-top object-center ${
          index % 2 === 0 ? "aspect-video md:aspect-square" : "aspect-square "
        }`}
        src={post.image}
        width={1000}
        height={500}
        alt={post.captions ?? post.author}
      />
      <div className="hidden md:block">
        <PostInfo post={post} />
      </div>
    </div>
  );
}
