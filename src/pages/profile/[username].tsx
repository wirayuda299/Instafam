import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import type { GetServerSidePropsContext } from "next";
import { useEffect, useReducer, useState, useTransition } from "react";
import type { Session } from "next-auth";
import { useStateContext } from "@/stores/Global/StateContext";
import { useSession } from "next-auth/react";
import { getUserRecommendation } from "@/helper/getUser";
import { getPostsSavedByUser } from "@/helper/getPosts";
import { StatesTypes, reducer } from "@/stores/reducerFunctions/users";
import { useModalContext } from "@/stores/Modal/ModalStatesContext";

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

const InitialStates: StatesTypes = {
  postTab: true,
  savedPostTab: false,
  users: [] as IUser[],
  loadingUsers: true,
  loadingSavedPosts: true,
  savedPosts: [],
  showUsers: false,
};

export default function UserProfile({ posts, user, query }: Props) {
  const [states, dispatch] = useReducer(reducer, InitialStates);
  const [activeTab, setActiveTab] = useState<number>(1);
  const { data: session } = useSession();
  const { replace, asPath } = useRouter();
  const [, startTransition] = useTransition();
  const { Dispatch } = useStateContext();
  const { modalDispatch } = useModalContext();

  const largeScreenClickEvent = (post: IUserPostProps) => {
    modalDispatch({
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
        dispatch({
          type: "SET_USERS",
          payload: {
            users: reccomendations as IUser[],
          },
        });
      } catch (error: any) {
        console.log(error.message);
      }
    };
    if (window.innerWidth <= 1028 && states.showUsers) {
      getUserRecommendations();
    }
  }, [states.showUsers === true]);

  useEffect(() => {
    const getSavedPosts = async () => {
      try {
        const savedPostsData = await getPostsSavedByUser(
          session?.user.uid as string
        );
        dispatch({
          type: "SET_SAVED_POSTS",
          payload: { savedposts: savedPostsData ?? [] },
        });
      } catch (error: any) {
        console.log(error.message);
      }
    };
    states.savedPostTab && getSavedPosts();
  }, [states.savedPostTab === true]);

  return (
    <>
      {session ? (
        <div className="mx-auto h-screen w-full overflow-x-auto overflow-y-scroll">
          <Statistic
            session={session}
            refreshData={() => replace(asPath)}
            users={user}
            posts={posts ?? []}
          />

          {session?.user?.username === query?.username ? (
            <Tab
              dispatch={dispatch}
              setActiveTab={setActiveTab}
              startTransition={startTransition}
              activeTab={activeTab}
            />
          ) : null}
          <div className=" mx-auto mt-3  md:max-w-5xl lg:hidden">
            <div className="flex items-center justify-between px-5">
              <h1 className="p-5 text-xl font-bold">Suggestion</h1>
              <button
                onClick={() => {
                  dispatch({
                    type: "SET_SHOW_USERS",
                    payload: {
                      showUsers: !states.showUsers,
                    },
                  });
                }}
                className="text-sm text-blue-600"
                type="button"
                name="show"
                title="show all users"
              >
                {states.showUsers ? "Hide" : "Show"}
              </button>
            </div>
            {states.showUsers ? (
              <div className="mt-5 flex justify-center">
                <div className="flex snap-mandatory snap-center  gap-5 overflow-x-scroll">
                  {states?.users.map((user, i) => (
                    <SuggestionMobile user={user} key={Math.random() * i} />
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <div className="grid w-full grid-cols-1 items-center justify-center gap-5 p-5 sm:grid-cols-2 md:grid-cols-3 ">
            {states.postTab && (
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
                      <div
                        key={Math.random() * i}
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
                          modalDispatch({
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
            {states.savedPostTab && (
              <>
                {states.loadingSavedPosts && (
                  <>
                    <PostLoader />
                    <PostLoader />
                    <PostLoader />
                  </>
                )}
                {states.savedPosts && states.savedPosts.length < 1 ? (
                  <div className="col-span-3 mx-auto h-full w-full">
                    <h1 className="w-full text-center text-2xl font-semibold text-gray-500 dark:text-gray-400">
                      No saved posts
                    </h1>
                  </div>
                ) : (
                  <>
                    {states.savedPosts?.map((post, i) => (
                      <div key={Math.random() * i} className="group relative">
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
