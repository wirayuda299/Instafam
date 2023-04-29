import { useFeedModalStore, useSelectedPostStore } from "@/stores/stores";
import { useStore } from "zustand";
import { IUserPostProps } from "@/types/post";
import dynamic from "next/dynamic";
const PostImage = dynamic(() => import("../Post/Image"), { ssr: true });
const PostInfo = dynamic(() => import("./PostInfo"), { ssr: true });

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
      <PostImage
        post={post}
        classNames={` h-full w-full object-cover object-center xs:object-top ${index % 2 === 0 ? "aspect-video md:aspect-square" : "aspect-square "
          }`} />
      <div className="hidden md:block">
        <PostInfo post={post} />
      </div>
    </div>
  );
}
