import dynamic from "next/dynamic";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { GetServerSidePropsContext } from "next";
import { getPosts } from "@/helper/getPosts";
import { RiLoader2Line } from "react-icons/ri";
const Menu = dynamic(() => import("@/components/Modal/Menu"));
const Report = dynamic(() => import("@/components/Modal/Report"));
const PostPreview = dynamic(() => import("@/components/Modal/PostPreview"));
const PostComment = dynamic(() => import("@/components/Modal/PostComment"));

const Suggestions = dynamic(
  () => import("@/components/Suggestions/Suggestions"),
  {ssr: true}
);
const PostCard = dynamic(() => import("@/components/Post"), { ssr: true });

export default function Home({ posts, users, last }: any) {
  const { ref, postsState, loading } = useInfiniteScroll(last);
  const merged = [...posts, ...postsState];
  
  return (
    <div className="h-full w-full ">
      <div className="flex h-screen w-full items-start justify-between">
        <div className="flex w-full flex-col p-5 ">
          {merged?.map((post) => (
            <PostCard key={post.postId} post={post} />
          ))}
          {loading && (
            <RiLoader2Line className="mx-auto animate-spin text-gray-500" size={50} />
          )}
          <div ref={ref}></div>
        </div>
        <div className="relative">
          <Suggestions reccomend={users} />
        </div>
      </div>
      <Menu />
      <Report />
      <PostComment />
      <PostPreview />
    </div>
  );
}

export async function getServerSideProps({ req, res }: GetServerSidePropsContext) {
  const { getSession } = await import("next-auth/react");
  const { getUserRecommendation } = await import("@/helper/getUser");
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }
  const posts = await getPosts(3);
  const users = await getUserRecommendation(session?.user?.uid);
  res.setHeader(
    'Cache-Control',
    'public, maxage=60, stale-while-revalidate=59'
  )

  return {
    props: {
      posts,
      users: users ?? [],
      last: posts ? posts[posts.length - 1] : null,
    },
  };
}
