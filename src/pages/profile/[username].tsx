import dynamic from "next/dynamic";
import Head from "next/head";
import { IUserPostProps } from "@/types/post";
import { Session } from "next-auth";
import { IUser } from "@/types/user";
import { useRouter } from "next/router";
import useAuth from "@/hooks/useAuth";
import { GetServerSidePropsContext } from "next";
import { memo, useMemo, useState, useTransition } from "react";

const SavedPosts = dynamic(
  () => import("@/components/User/savedPosts/savedPosts"),
  {
    ssr: true,
  }
);
const ExplorePostCard = dynamic(() => import("@/components/Feeds"), {
  ssr: true,
});
const Statistic = dynamic(
  () => import("@/components/User/Statistic/Statistic"),
  {
    ssr: true,
  }
);
const Tab = dynamic(() => import("@/components/User/Tab/Tab"));

type Props = {
  posts: IUserPostProps[] | [];
  session: Session | null;
  user: IUser | null;
  query: {
    readonly username: string;
  };
};

function UserProfile({ posts, user, query }: Props) {
  const [postTab, setPostTab] = useState(true);
  const [savedPostTab, setSavedPosts] = useState(false);
  const { session } = useAuth();
  const { replace, asPath } = useRouter();
  const [activeTab, setActiveTab] = useState<number>(1);
  const [isPending, startTransition] = useTransition();

  const refreshData = () => {
    replace(asPath);
  };

  const handleTabClick = (tabId: number) => {
    startTransition(() => {
      setActiveTab(tabId);
    });
    switch (tabId) {
      case 1:
        setPostTab(true);
        setSavedPosts(false);
        break;
      case 2:
        setPostTab(false);
        setSavedPosts(true);
        break;
      case 3:
        setPostTab(false);
        setSavedPosts(false);
        break;
      default:
        break;
    }
  };

  const Tabs = useMemo(() => {
    return (
      <>
        <Tab activeTab={activeTab} handleTabChange={handleTabClick} />
      </>
    );
  }, [activeTab]);

  const Feeds = useMemo(() => {
    return (
      <>
        {postTab && (
          <>
            {posts && posts.length < 1 ? (
              <div className="col-span-3 mx-auto h-full w-full">
                <h1 className="w-full text-center text-2xl font-semibold text-gray-500 dark:text-gray-400">
                  No posts
                </h1>
              </div>
            ) : (
              posts?.map((post) => (
                <ExplorePostCard post={post} key={post.postId} />
              ))
            )}
          </>
        )}
      </>
    );
  }, [postTab, posts]);

  const SavedPost = useMemo(() => {
    return (
      <>
        {savedPostTab && (
          <SavedPosts
            savedPosts={user?.savedPosts}
            savedPostsTab={savedPostTab}
          />
        )}
      </>
    );
  }, [savedPostTab]);

  const Statistics = useMemo(() => {
    return (
      <>
        <Statistic
          session={session}
          refreshData={refreshData}
          users={user}
          posts={posts ?? []}
        />
      </>
    );
  }, [session, user, posts]);
  return (
    <>
      <Head>
        <title>
          {user ? user.name : ""}({user ? user.username : ""}) &#8226; Instafam
        </title>
        <link rel="icon" href={user?.image} />
        <meta
          name="description"
          content={`This is profile page of ${user?.username}`}
        />
      </Head>
      {session ? (
        <div className="mx-auto h-screen w-full overflow-y-auto p-5 py-5">
          <div className="flex w-full items-center space-x-3 border-b border-gray-500 border-opacity-50 md:justify-center md:space-x-10">
            {Statistics}
          </div>

          {session?.user?.username === query.username ? <>{Tabs}</> : null}
          <div className="grid w-full grid-cols-1 items-center justify-center gap-5 p-5 sm:grid-cols-2 md:grid-cols-3 ">
            {Feeds}
            {SavedPost}
          </div>
          <br className="md:hidden" />
          <br className="md:hidden" />
          <br className="md:hidden" />
          <br className="md:hidden" />
          <br className="md:hidden" />
        </div>
      ) : null}
    </>
  );
}
export default memo(UserProfile);

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  const { getPostByCurrentUser } = await import("@/helper/getPosts");
  const { getCurrentUserData } = await import("@/helper/getUser");
  const user = (await getCurrentUserData(query?.username as string)) as IUser[];
  const posts = await getPostByCurrentUser(user ? user[0]?.uid : "");
  if (!user || !posts) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      posts,
      user: user ? user[0] : null,
      query,
    },
  };
}
