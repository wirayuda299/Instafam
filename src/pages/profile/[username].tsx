import dynamic from "next/dynamic";
import Head from "next/head";
import { IUserPostProps } from "@/types/post";
import { IUser } from "@/types/user";
import { useRouter } from "next/router";
import useAuth from "@/hooks/useAuth";
import { GetServerSidePropsContext } from "next";
import { memo, useMemo, useState, useTransition } from "react";
import type { Session } from "next-auth";
import { usePostCommentModalStore, usePostModalStore, usePostPreviewModalStore, useSelectedPostStore } from "@/stores/stores";
import { useStore } from "zustand";
import SuggestionMobile from "@/components/Suggestions/SuggestionMobile";
const Statistic = dynamic(
  () => import("@/components/User/Statistic/Statistic"),
  {
    ssr: true,
  }
);
const PostInfo = dynamic(() => import("@/components/Feeds/PostInfo"));
const Tab = dynamic(() => import("@/components/User/Tab/Tab"));
const PostImage = dynamic(() => import("@/components/Post/Image"), {
  ssr: true,
});

type Props = {
  posts: IUserPostProps[] | [];
  session: Session | null;
  user: IUser | null;
  query: {
    readonly username: string;
  };
  savedPosts: IUserPostProps[] | [];
  reccomendations: IUser[] | [];
};

function UserProfile({ posts, user, query, savedPosts, reccomendations }: Props) {
  const [postTab, setPostTab] = useState(true);
  const [savedPostTab, setSavedPosts] = useState(false);
  const { session } = useAuth();
  const { replace, asPath } = useRouter();
  const [activeTab, setActiveTab] = useState<number>(1);
  const [, startTransition] = useTransition();
  const { setSelectedPost } = useStore(useSelectedPostStore);
  const { setPostCommentModal } = useStore(usePostCommentModalStore);
  const { setPostPreviewModal } = useStore(usePostPreviewModalStore);
  const { setPostModal } = useStore(usePostModalStore);

  const clickLgScreen = (post: IUserPostProps | null) => {
    setPostPreviewModal(true);
    setPostCommentModal(false);
    setSelectedPost(post);
  };
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
        <div className="mx-auto h-screen w-full overflow-y-auto overflow-x-auto">
          <div className="flex w-full items-center space-x-3 border-b border-gray-500 border-opacity-50 md:justify-center md:space-x-10">
            {Statistics}
          </div>

          {session?.user?.username === query?.username ? <>{Tabs}</> : null}
          <div className="max-w-4xl md:max-w-5xl lg:hidden mx-auto">
            <h1 className="font-bold text-xl p-5">
              Suggestion
            </h1>
            <div className="flex justify-center mt-5">
              <div className="overflow-x-scroll snap-center flex snap-mandatory gap-5">
                {reccomendations.filter(user => user.username !== session?.user?.username).map((user, i) => (
                  <SuggestionMobile user={user} key={user.uid} />
                ))}
              </div>
            </div>
          </div>

          <div className="grid w-full grid-cols-1 items-center justify-center gap-5 p-5 sm:grid-cols-2 md:grid-cols-3 ">
            <>
              {postTab && (
                <>
                  {posts && posts.length < 1 ? (
                    <div className="col-span-3 mx-auto h-full w-full ">
                      <h1 className="w-full text-center text-2xl font-semibold text-gray-500 dark:text-gray-400">
                        No posts
                      </h1>
                    </div>
                  ) : (
                    posts?.map((post, i) => (
                      <>

                        <div key={post.postId} onClick={() => clickLgScreen(post)} className="cursor-pointer hidden md:block">
                          <PostImage post={post} />
                        </div>
                        <div
                          onClick={() => {
                            setSelectedPost(post);
                            setPostModal(true);
                          }}
                          className={`block w-full cursor-pointer md:hidden`}
                        >
                          <PostImage
                            post={post}
                            classNames={`h-full w-full  object-cover `} />
                        </div>
                      </>
                    )
                    )
                  )}
                </>
              )}
            </>
            {savedPostTab && (
              <>
                {savedPosts && savedPosts.length < 1 ? (
                  <div className="col-span-3 mx-auto h-full w-full">
                    <h1 className="w-full text-center text-2xl font-semibold text-gray-500 dark:text-gray-400">
                      No saved posts
                    </h1>
                  </div>
                ) : (
                  <>

                    {savedPosts?.map((post) => (
                      <div key={post.postId} className="group relative">
                        <PostImage post={post} classNames="w-full h-full object-cover rounded-lg" />
                        <PostInfo post={post} />
                      </div>
                    ))}
                  </>
                )}
              </>
            )}
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
  const { getPostByCurrentUser, getPostsSavedByUser } = await import(
    "@/helper/getPosts"
  );
  const { getCurrentUserData, getUserRecommendation } = await import("@/helper/getUser");
  const user = (await getCurrentUserData(query?.username as string)) as IUser[];
  const posts = await getPostByCurrentUser(user ? user[0]?.uid : "");
  const savedPosts = await getPostsSavedByUser(user ? user[0]?.uid : "");
  const reccomendations = await getUserRecommendation(user ? user[0]?.uid : "", undefined);
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
      savedPosts: savedPosts ? savedPosts : [],
      reccomendations: reccomendations ? reccomendations : [],
    },
  };
}
