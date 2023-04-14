import dynamic from "next/dynamic";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { GetServerSidePropsContext } from "next";
import Recommendation from "@/components/Loader/Recommendation";
const Suggestions = dynamic(
  () => import("@/components/Suggestions/Suggestions"), {
    loading : () => <Recommendation/>
  }
);
const PostCard = dynamic(() => import("@/components/Card/Post"), {
  loading: () => <CardLoader />,
});
const CardLoader = dynamic(() => import("@/components/Loader/Loader"));

export default function Home({ posts, users, sessions, last }: any) {
  const { ref, postsState, loading } = useInfiniteScroll(last);
  
  return (
        <section className="h-full w-full ">
          <div className="flex h-screen w-full items-start justify-between">
            <div className="flex w-full flex-col p-5 ">
              {posts?.map((post: any) => (
                <PostCard
                  post={post}
                  key={post.postId}
                  ssr={true}
                  session={sessions}
                />
              ))}
              <span ref={ref}></span>
              {loading && <CardLoader />}
              {postsState?.map((post) => (
                <PostCard
                  post={post}
                  key={post.postId}
                  ssr={false}
                  session={sessions}
                />
              ))}
            </div>
            <div className="relative">
              <Suggestions reccomend={users} session={sessions} />
            </div>
          </div>
        </section>

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

  return {
    props: {
      posts,
      users: users ?? [],
      sessions: session,
      last: posts ? posts[posts.length - 1] : null,
    },
  };
}
