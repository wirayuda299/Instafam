import { useFeedModalStore, usePostModalStore, useSelectedPostStore } from "@/stores/stores";
import { IUserPostProps } from "@/types/post";
import dynamic from "next/dynamic";
import Image from "next/image";
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

export default function Trending({ posts }: Props) {
  const { setSelectedPost } = useStore(useSelectedPostStore);
  const { setPostModal } = useStore(usePostModalStore);
  const { setFeedModal } = useStore(useFeedModalStore);

  return (
    <div className="h-screen w-full overflow-y-auto">
      <div className="columns-3 m-0 gap-0">
        {posts?.map((post, i) => (
          <div key={`${post.postId}`}>
            <button name="click to view the post" title="click to view the post" className={`hidden  md:block h-max ${i % 2 === 0 ? 'aspect-square' : 'aspect-video'}`} onClick={() => {
              setSelectedPost(post);
              setFeedModal(true);
            }}>
              <Image
                src={post.image}
                alt=""
                width={1200}
                height={1200}
                placeholder="blur"
                blurDataURL={post.image}
                className={`object-cover w-full h-full object-top border `}
                priority />
            </button>
            <div
              onClick={() => {
                setSelectedPost(post);
                setPostModal(true);
              }}
              className={`w-full cursor-pointer block md:hidden`}
            >
              <Image
                src={post.image}
                alt=""
                width={1200}
                height={1200}
                placeholder="blur"
                blurDataURL={post.image}
                className={`object-cover w-full h-auto border ${i % 2 === 0 ? 'aspect-video' : 'aspect-square'}`}
                priority />
            </div>
          </div>
        ))}
      </div>
      <br className="md:hidden" />
      <br className="md:hidden" />
      <br className="md:hidden" />
      <FeedModal />
      <PostModal />
    </div>
  );
}

export async function getServerSideProps({ res }: any) {
  const { getAllPosts } = await import("@/helper/getPosts");
  const posts = await getAllPosts();
  res.setHeader("Cache-Control", "public, maxage=60, stale-while-revalidate");
  return {
    props: {
      posts,
    },
  };
}
