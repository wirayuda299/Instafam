import dynamic from "next/dynamic";
import { IUser } from "@/types/user";
import { IUserPostProps } from "@/types/post";
import { useEffect, useState } from "react";
const Suggestions = dynamic(
  () => import("@/components/Suggestions/Suggestions"),
  { ssr: true }
);
const Postloader = dynamic(() => import("@/components/Loader/Post"), {
  ssr: true,
});
const PostCard = dynamic(() => import("@/components/Post"), {
  ssr: true,
});

type Props = {
  posts: IUserPostProps[];
  users: IUser[];
};

export default function Home({ posts, users }: Props) {
  const [newPosts, setNewPosts] = useState<IUserPostProps[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(async (entries) => {
      if (entries[0].isIntersecting) {
        const { fetchNextPosts } = await import("@/helper/getPosts");
        const newPosts = await fetchNextPosts(posts[posts.length - 1]);
        setNewPosts(newPosts ?? []);
      }
    });
    const entry = document.getElementById("entry");
    if (entry) {
      observer.observe(entry);
    }
    return () => {
      if (entry) {
        observer.unobserve(entry);
      }
    };
  }, []);

  return (
    <div className="h-full w-full">
      <div className="container mx-auto flex h-screen w-full items-start justify-between">
        <div className="w-full p-5">
          {posts.length === 0 ? (
            <Postloader />
          ) : (
            posts?.map((post) => <PostCard post={post} key={post.postId} />)
          )}
          <div id="entry"></div>
          {newPosts.length === 0 ? (
            <Postloader />
          ) : (
            newPosts?.map((post) => <PostCard post={post} key={post.postId} />)
          )}
        </div>
        <Suggestions reccomend={users as IUser[]} />
      </div>
    </div>
  );
}

export async function getServerSideProps({ req, res }: any) {
  const { getPosts } = await import("@/helper/getPosts");
  const { getUserRecommendation } = await import("@/helper/getUser");
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
  const users = await getUserRecommendation(session?.user.uid);
  const posts = await getPosts(3);
  res.setHeader("Cache-Control", "public, maxage=60, stale-while-revalidate");

  return {
    props: {
      users,
      posts,
    },
  };
}
