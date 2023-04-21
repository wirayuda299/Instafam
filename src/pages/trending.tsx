import PostInfo from "@/components/Feeds/PostInfo";
import { getPostByLikes } from "@/helper/getPosts";
import { useFeedModalStore, useSelectedPostStore } from "@/stores/stores";
import { IUserPostProps } from "@/types/post";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { RiLoader2Line } from "react-icons/ri";
import { useStore } from "zustand";
type Props = {
  posts: IUserPostProps[];
  lastPost: IUserPostProps | null;
};
const FeedModal = dynamic(() => import("@/components/Modal/Feed"), {
  ssr: false,
});

export default function Trending({ posts, lastPost }: Props) {
  const { setFeedModal } = useStore(useFeedModalStore);
  const { setSelectedPost } = useStore(useSelectedPostStore);
  const [newPosts, setNewPosts] = useState<IUserPostProps[]>([]);
  const [loading, setLoading] = useState(true);

  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(async (entries) => {
      if (entries[0].isIntersecting) {
        const { fetchNextPosts } = await import("@/helper/getPosts");
        const newPosts = await fetchNextPosts(lastPost);
        setNewPosts(newPosts ?? []);
        setLoading(false);
      }
    });
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);
  return (
    <div className="h-screen  w-full overflow-y-auto p-5">
      <div className="h-full w-full">
        <div className="container mx-auto columns-1 gap-5 sm:columns-2 lg:columns-3">
          {posts?.map((post) => (
            <div
              key={post.postId}
              className="group relative"
              onClick={() => {
                setSelectedPost(post);
                setFeedModal(true);
              }}
            >
              <Image
                className="mb-5 rounded-lg "
                src={post.image}
                width={1300}
                height={1300}
                alt={post.captions ?? post.author}
              />
              <PostInfo post={post} />
            </div>
          ))}
          <div ref={ref}></div>
          {loading ? (
            <RiLoader2Line
              className="mx-auto animate-spin text-gray-500"
              size={50}
            />
          ) : (
            <>
              {newPosts?.map((post) => (
                <div
                  key={post.postId}
                  className="group relative"
                  onClick={() => {
                    setSelectedPost(post);
                    setFeedModal(true);
                  }}
                >
                  <Image
                    className="mb-5 rounded-lg"
                    src={post.image}
                    width={1300}
                    height={1300}
                    alt={post.captions ?? post.author}
                  />
                  <PostInfo post={post} />
                </div>
              ))}
            </>
          )}
        </div>
      </div>
      <FeedModal />
    </div>
  );
}

export async function getServerSideProps({ res }: any) {
  const posts = await getPostByLikes(10);
  const highestLikes = posts.sort(
    (a, b) => b.likedBy.length - a.likedBy.length
  );
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=60, stale-while-revalidate=59"
  );
  return {
    props: {
      posts: highestLikes ?? [],
      lastPost: highestLikes[highestLikes.length - 1] ?? null,
    },
  };
}
