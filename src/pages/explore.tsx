import Head from "next/head";
import { IUserPostProps } from "@/types/post";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { GetServerSidePropsContext } from "next";
import { getPostByLikes } from "@/helper/getPosts";
import { RiLoader2Line } from "react-icons/ri";
import Image from "next/image";
import PostInfo from "@/components/Feeds/PostInfo";
import { useStore } from "zustand";
import { useFeedModalStore, useSelectedPostStore } from "@/stores/stores";

type Props = {
  posts: IUserPostProps[];
  last: IUserPostProps;
};

export default function Explore({ posts, last }: Props) {
  const { ref, postsState, loading } = useInfiniteScroll(last);
  const { setSelectedPost } = useStore(useSelectedPostStore)
  const { setFeedModal } = useStore(useFeedModalStore)

  return (
    <>
      <Head>
        <title>Explore popular posts &#8226; Instafam</title>
        <meta
          name="description"
          content="Explore new posts and discover new accounts on Instafam."
        />
      </Head>
      <div className="h-screen w-full overflow-y-auto p-5 ">
        <h1 className="py-8 text-center text-5xl font-semibold">Explore</h1>
        <div
          className={`ease mb-7  w-full transition-transform duration-700 ease-out columns-1 md:columns-2 gap-5 lg:columns-3`}
        >
          {posts?.map((post) => (
            <div key={post.postId}>
              <div  className="relative group  " onClick={() => {
                setSelectedPost(post)
                setFeedModal(true)
              }}>

                <Image
                  className="rounded-lg mb-5 lg:w-[500px]  h-auto shadow-lg"
                  src={post.image}
                  priority
                  width={1300}
                  height={1300}
                  alt={post.captions ?? post.author}
                />
                <PostInfo post={post} />
              </div>
            </div>

          ))}
          <div ref={ref}></div>
          {loading && (
            <>
              <RiLoader2Line
                className="mx-auto  animate-spin text-gray-500"
                size={50}
              />
            </>
          )}
          {postsState?.map((post) => (
            <div key={post.postId} className="relative group " onClick={() => {
              setSelectedPost(post)
              setFeedModal(true)
            }}>
              <Image
                className="rounded-lg mb-5 lg:w-[500px]  h-auto shadow-lg"
                src={post.image}
                priority
                width={1300}
                height={1300}
                alt={post.captions ?? post.author}
              />
              <PostInfo post={post} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export async function getServerSideProps({ res }: GetServerSidePropsContext) {
  const posts = await getPostByLikes(10);
  const last = posts ? posts[posts.length - 1] : null;
  res.setHeader("Cache-Control", "maxage=120, stale-while-revalidate=60");

  return {
    props: {
      posts,
      last,
    },
  };
}

