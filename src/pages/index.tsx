import dynamic from "next/dynamic";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { GetServerSidePropsContext } from "next";
import { getPosts } from "@/helper/getPosts";
import { getUserRecommendation } from "@/helper/getUser";
import { getSession } from "next-auth/react";
import { RiLoader2Line } from "react-icons/ri";

const Suggestions = dynamic(
  () => import("@/components/Suggestions/Suggestions"),
  {
    ssr: true,
  }
);
const PostCard = dynamic(() => import("@/components/Post"), {
  ssr: true,
});

export default function Home({ posts, users, last }: any) {
  const { ref, postsState, loading } = useInfiniteScroll(last);

  return (
    <div className="h-full w-full ">
      <div className="flex h-screen w-full items-start justify-between">
        <div className="flex w-full flex-col p-5 ">
          {posts?.map((post: any) => (
            <PostCard post={post} key={post.postId} />
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
          {postsState?.map((post: any) => (
            <PostCard post={post} key={post.postId} />
          ))}
        </div>
        <div className="relative">
          <Suggestions reccomend={users} />
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({
  req,
  res,
}: GetServerSidePropsContext) {
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }
  const posts = await getPosts(4);
  const users = await getUserRecommendation(session?.user?.uid);
  res.setHeader("Cache-Control", "maxage=500, stale-while-revalidate");

  return {
    props: {
      posts,
      users: users ?? [],
      last: posts ? posts[posts.length - 1] : null,
    },
  };
}
