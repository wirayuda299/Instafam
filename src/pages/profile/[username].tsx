import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import type { GetServerSidePropsContext } from "next";
import { useEffect, useState, useTransition } from "react";
import type { Session } from "next-auth";
import { useStateContext } from "@/stores/StateContext";
import { useSession } from "next-auth/react";
import { getUserRecommendation } from "@/helper/getUser";
import { getPostsSavedByUser } from "@/helper/getPosts";

const Statistic = dynamic(
  () => import("@/components/User/Statistic/Statistic")
);
const PostLoader = dynamic(() => import("@/components/Loader/Post"));
const SuggestionMobile = dynamic(
  () => import("@/components/Suggestions/SuggestionMobile")
);
const PostInfo = dynamic(() => import("@/components/Post/PostInfo"));
const Tab = dynamic(() => import("@/components/User/Tab/Tab"));
const PostImage = dynamic(() => import("@/components/Post/Image"), {
  ssr: true,
});

type Props = {
  posts: IUserPostProps[] | [];
  session: Session | null;
  user: IUser | null;
  query: {
    username: string;
  };
};

export default function UserProfile({ posts, user, query }: Props) {
  const [postTab, setPostTab] = useState(true);
  const [loadingSavedPosts, setLoadingSavedPosts] = useState<boolean>(true);
  const [savedPostTab, setSavedPostsTab] = useState(false);
  const [users, setUsers] = useState<IUser[]>([]);
  const [loadingUsers, setLoadingUsers] = useState<boolean>(true);
  const [savedPosts, setsavedPosts] = useState<IUserPostProps[]>([]);
  const [showUsers, setShowUsers] = useState<boolean>(false);
  const { data: session } = useSession();
  const { replace, asPath } = useRouter();
  const [activeTab, setActiveTab] = useState<number>(1);
  const [, startTransition] = useTransition();
  const { Dispatch } = useStateContext();

  const handleTabClick = (tabId: number) => {
    startTransition(() => {
      setActiveTab(tabId);
    });
    switch (tabId) {
      case 1:
        setPostTab(true);
        setSavedPostsTab(false);
        break;
      case 2:
        setSavedPostsTab(true);
        setPostTab(false);
        break;
      case 3:
        setPostTab(false);
        setSavedPostsTab(false);
        break;
      default:
        break;
    }
  };

  const largeScreenClickEvent = (post: IUserPostProps) => {
    Dispatch({
      type: "TOGGLE_POST_PREVIEW_MODAL",
      payload: {
        postPreviewModal: true,
      },
    });
    Dispatch({
      type: "SELECT_POST",
      payload: {
        post,
      },
    });
  };

  useEffect(() => {
    const getUserRecommendations = async () => {
      try {
        const reccomendations = await getUserRecommendation(
          session?.user.uid as string
        );
        setUsers(reccomendations ?? []);
        setLoadingUsers(false);
      } catch (error: any) {
        console.log(error.message);
      }
    };
    if (window.innerWidth <= 1028 && showUsers) {
      getUserRecommendations();
    }
  }, [showUsers === true]);

  useEffect(() => {
    const getSavedPosts = async () => {
      try {
        const savedPostsData = await getPostsSavedByUser(
          session?.user.uid as string
        );

        setsavedPosts(savedPostsData ?? []);
        setLoadingSavedPosts(false);
      } catch (error: any) {
        console.log(error.message);
      }
    };
    savedPostTab && getSavedPosts();
  }, [savedPostTab === true]);

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
        <div className="mx-auto h-screen w-full overflow-x-auto overflow-y-scroll">
          <Statistic
            session={session}
            refreshData={() => replace(asPath)}
            users={user}
            posts={posts ?? []}
          />

          {session?.user?.username === query?.username ? (
            <Tab activeTab={activeTab} handleTabChange={handleTabClick} />
          ) : null}
          <div className=" mx-auto mt-3  md:max-w-5xl lg:hidden">
            <div className="flex items-center justify-between px-5">
              <h1 className="p-5 text-xl font-bold">Suggestion</h1>
              <button
                onClick={() => setShowUsers(!showUsers)}
                className="text-sm text-blue-600"
                type="button"
                name="show"
                title="show all users"
              >
                {showUsers ? "Hide" : "Show"}
              </button>
            </div>
            {showUsers ? (
              <div className="mt-5 flex justify-center">
                <div className="flex snap-mandatory snap-center  gap-5 overflow-x-scroll">
                  {users.map((user) => (
                    <SuggestionMobile user={user} key={user.uid} />
                  ))}
                </div>
              </div>
            ) : null}
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
                    posts?.map((post) => (
                      <>
                        <div
                          key={post.postId}
                          onClick={() => largeScreenClickEvent(post)}
                          className="hidden cursor-pointer md:block"
                        >
                          <PostImage post={post} />
                        </div>
                        <div
                          onClick={() => {
                            Dispatch({
                              type: "SELECT_POST",
                              payload: {
                                post,
                              },
                            });
                            Dispatch({
                              type: "TOGGLE_POST_MODAL",
                              payload: {
                                postModal: true,
                              },
                            });
                          }}
                          className={`block w-full cursor-pointer md:hidden`}
                        >
                          <PostImage post={post} />
                        </div>
                      </>
                    ))
                  )}
                </>
              )}
            </>
            {savedPostTab && (
              <>
                {loadingSavedPosts && (
                  <>
                    <PostLoader />
                    <PostLoader />
                    <PostLoader />
                  </>
                )}
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
                        <PostImage post={post} />
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

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  const { getPostByCurrentUser } = await import("@/helper/getPosts");
  const { getCurrentUserData } = await import("@/helper/getUser");
  const user = (await getCurrentUserData(query?.username as string)) as IUser[];
  const posts = await getPostByCurrentUser(user ? user[0]?.uid : "");

  if (!user) {
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
