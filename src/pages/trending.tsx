import { getAllPosts } from "@/helper/getPosts";
import { usePostModalStore, useSelectedPostStore } from "@/stores/stores";
import { IUserPostProps } from "@/types/post";
import dynamic from "next/dynamic";
import { useStore } from "zustand";

type Props = {
  posts: IUserPostProps[];
  lastPost: IUserPostProps | null;
};
const FeedModal = dynamic(() => import("@/components/Modal/Feed"), {
  ssr: true,
});

const PostModal = dynamic(() => import("@/components/Modal/Post/Post"), {
  ssr: true,
});

const Feeds = dynamic(() => import("@/components/Feeds"), {
  ssr: true,
});
const PostImage = dynamic(() => import("@/components/Post/Image"), {
  ssr: true,
});

export default function Trending({ posts }: Props) {
  const { setSelectedPost } = useStore(useSelectedPostStore);
  const { setPostModal } = useStore(usePostModalStore);

  return (
    <div className="h-screen w-full overflow-y-auto">
      <div className="columns-3 gap-0 md:container md:mx-auto md:grid md:grid-cols-3 md:gap-5 md:p-5">
        {posts?.map((post, i) => (
          <div key={`${post.postId}`}>
            <div className="hidden md:block">
              <Feeds post={post} index={i} />
            </div>
            <div
              onClick={() => {
                setSelectedPost(post);
                setPostModal(true);
              }}
              className={`w-full cursor-pointer md:hidden`}
            >
              <PostImage post={post} />
            </div>
          </div>
        ))}
      </div>
      <FeedModal />
      <PostModal />
    </div>
  );
}

export async function getServerSideProps({ res }: any) {
  const posts = await getAllPosts();
  res.setHeader("Cache-Control", "public, maxage=60, stale-while-revalidate");
  return {
    props: {
      posts,
    },
  };
}
