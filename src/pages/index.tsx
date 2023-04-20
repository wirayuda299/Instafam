import dynamic from "next/dynamic";
import { SWRConfig } from "swr/_internal";
import useSWR from "swr";
import { GetServerSidePropsContext } from "next";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { Suspense } from "react";
import { IUserPostProps } from "@/types/post";
import { IUser } from "@/types/user";

const Suggestions = dynamic(
  () => import("@/components/Suggestions/Suggestions"),
  { ssr: true }
);
const PostCard = dynamic(() => import("@/components/Post"), { ssr: false });
const Postloader = dynamic(() => import("@/components/Loader/Post"));

type Props = {
  fallback: {
    posts: IUserPostProps[];
    users: IUser[];
  };
};

export default function Home({ fallback: { posts, users } }: Props) {
  const { data, isLoading } = useSWR(
    "/api/posts",
    async () => {
      const { getPosts } = await import("@/helper/getPosts");
      const posts = await getPosts(4);
      return posts;
    },
    {
      suspense: true,
      fallbackData: posts,
    }
  );
  const { ref, postsState, loading } = useInfiniteScroll(
    data ? data?.[data.length - 1] : null
  );
  return (
    <div className="h-full w-full ">
      <div className="flex h-screen w-full items-start justify-between">
        <div className="flex w-full flex-col p-5 ">
          {isLoading && loading ? (
            <Postloader />
          ) : (
            <SWRConfig value={{ fallback: posts }}>
              {data?.map((post) => (
                <Suspense key={post.postId} fallback={<Postloader />}>
                  <PostCard post={post} />
                </Suspense>
              ))}
            </SWRConfig>
          )}
          <div ref={ref}></div>
          <>
            {postsState?.map((post) => (
              <PostCard post={post} key={post.postId} />
            ))}
          </>
        </div>
        <div>
          <Suggestions reccomend={users} />
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
  const { getPosts } = await import("@/helper/getPosts");
  const { getSession } = await import("next-auth/react");
  const posts = await getPosts(4);
  const session = await getSession({ req });
  const { getUserRecommendation } = await import("@/helper/getUser");
  const users = await getUserRecommendation(session?.user.uid as string);

  return {
    props: {
      fallback: {
        posts,
        users,
      },
    },
  };
}
