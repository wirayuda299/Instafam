import Head from "next/head";
import { IUserPostProps } from "@/types/post";
import dynamic from "next/dynamic";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { GetServerSidePropsContext } from "next";
import { getPosts } from "@/helper/getPosts";
import { RiLoader2Line } from "react-icons/ri";

const ExplorePostCard = dynamic(() => import("@/components/Feeds"), {
  ssr: true,

});


type Props = {
  posts: IUserPostProps[];
  last: IUserPostProps;
};

export default function Explore({ posts, last }: Props) {
  const { ref, postsState, loading } = useInfiniteScroll(last);
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
        <div className="mb-7 w-full columns-1 gap-10 sm:columns-2 lg:columns-3">
          {posts?.map((post) => (
            <ExplorePostCard post={post} key={post.postId} />
          ))}
          <span ref={ref}></span>
          {loading && (
            <>
              <RiLoader2Line
                className="mx-auto  animate-spin text-gray-500"
                size={50}
              />
            </>
          )}
          {postsState?.map((post) => (
            <ExplorePostCard post={post} key={post.postId} />
          ))}
        </div>
      </div>
    </>
  );
}
export async function getServerSideProps({ res }: GetServerSidePropsContext) {
  const posts = await getPosts(10);
  const last = posts ? posts[posts.length - 1] : null;
  res.setHeader("Cache-Control", "maxage=500, stale-while-revalidate");

  return {
    props: {
      posts,
      last,
    },
  };
}
