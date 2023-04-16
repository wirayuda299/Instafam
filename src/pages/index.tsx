import dynamic from "next/dynamic";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { GetServerSidePropsContext } from "next";
import { useMemo } from "react";

const Suggestions = dynamic(
  () => import("@/components/Suggestions/Suggestions"),
  { ssr: true }
);
const PostCard = dynamic(() => import("@/components/Post"), { ssr: true });
const CardLoader = dynamic(() => import("@/components/Loader/Loader"), {
  ssr: true,
});

export default function Home({ posts, users, sessions, last }: any) {
  const { ref, postsState, loading } = useInfiniteScroll(last);
  const PostCardComponents = useMemo(() => {
    return (
      <>
        {posts?.map((post: any) => (
          <PostCard post={post} key={post.postId} session={sessions} />
        ))}
      </>
    );
  }, [posts])

  const ClientPostCard = useMemo(() => {
    return (
      <>
        {postsState?.map((post: any) => (
          <PostCard post={post} key={post.postId} session={sessions} />
        ))}
      </>
    );

  }, [postsState]);

  return (
    <div className="h-full w-full ">
      <div className="flex h-screen w-full items-start justify-between">
        <div className="flex w-full flex-col p-5 ">
          {PostCardComponents}
          <span ref={ref}></span>
          {loading && <CardLoader />}
          {ClientPostCard}
        </div>
        <div className="relative">
          <Suggestions reccomend={users} session={sessions} />
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({
  req,
  res,
}: GetServerSidePropsContext) {
  const { getSession } = await import("next-auth/react");
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }
  const { getPosts } = await import("@/helper/getPosts");
  const posts = await getPosts(4);

  const { getUserRecommendation } = await import("@/helper/getUser");
  const users = await getUserRecommendation(session?.user?.uid);
  res.setHeader("Cache-Control", "maxage=60, stale-while-revalidate=59");

  return {
    props: {
      posts,
      users: users ?? [],
      sessions: session,
      last: posts ? posts[posts.length - 1] : null,
    },
  };
}
