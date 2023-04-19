import dynamic from "next/dynamic";
import Head from "next/head";
import { IUserPostProps } from "@/types/post";
import { Session } from "next-auth";
import { IUser } from "@/types/user";
import { useRouter } from "next/router";
import useAuth from "@/hooks/useAuth";
import { GetServerSidePropsContext } from "next";
import { Suspense, memo, useMemo, useState, useTransition } from "react";
import Image from "next/image";

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
                <Image
                  placeholder="blur"
                  blurDataURL={'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAACAAMDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDpbiR1mYB2A46H2ooooEf/2Q=='}
                  src={post.image}
                  width={500}
                  height={500}
                  alt={post.captions ?? post.author}
                  key={post.postId}
                  className="rounded-lg"
                />
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
        <>
          {user?.savedPosts && user?.savedPosts.length < 1 ? (
            <div className="col-span-3 mx-auto h-full w-full">
              <h1 className="w-full text-center text-2xl font-semibold text-gray-500 dark:text-gray-400">
                No saved posts
              </h1>
            </div>
          ) : (
            user?.savedPosts?.map((post) => (
              <Suspense key={post.postId} fallback={<p>Loading...</p>}>
                <Image
                  placeholder="blur"
                  blurDataURL={'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAACAAMDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDpbiR1mYB2A46H2ooooEf/2Q=='}
                  src={post.image}
                  width={500}
                  height={500}
                  alt={post.captions ?? post.author}
                  key={post.postId}
                  className="rounded-lg"
                />
              </Suspense>
            ))
          )}
        </>
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
