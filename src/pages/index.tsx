import dynamic from "next/dynamic";
import { GetServerSidePropsContext } from "next";
import { IUser } from "@/types/user";
import { getPosts } from "@/helper/getPosts";
import { getUserRecommendation } from "@/helper/getUser";
import { getSession } from "next-auth/react";
import { IUserPostProps } from "@/types/post";
import { useEffect, useRef, useState } from "react";

const Suggestions = dynamic(
  () => import("@/components/Suggestions/Suggestions"),
  { ssr: true }
);
const PostCard = dynamic(() => import("@/components/Post"), { ssr: true });
const Postloader = dynamic(() => import("@/components/Loader/Post"));

type Props = {
  posts: IUserPostProps[];
  users: IUser[];
};

export default function Home({ posts, users }: Props) {
  const [newPosts, setNewPosts] = useState<IUserPostProps[]>([]);
  const [loading, setLoading] = useState(true);
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const observer = new IntersectionObserver(async (entries) => {
      if (entries[0].isIntersecting) {
        const { fetchNextPosts } = await import('@/helper/getPosts')
        const newPosts = await fetchNextPosts(posts[posts.length - 1])
        setNewPosts(newPosts ?? [])
        setLoading(false)
      }
    })
    if (ref.current) {
      observer.observe(ref.current)
    }
  }, [])

  return (
    <div className="h-full w-full ">
      <div className="flex h-screen w-full items-start justify-between">
        <div className="flex w-full flex-col p-5 ">
          {!posts && <Postloader />}
          {posts?.map((post) => (
            <PostCard post={post} key={post.postId} />
          ))
          }
          <div ref={ref}></div>
          {loading && <Postloader />}
          <>
            {newPosts?.map((post) => (
              <PostCard
                post={post}
                key={post.postId}
              />
            ))}
          </>
        </div>
        <div>
          <Suggestions reccomend={users as IUser[]} />
        </div>
      </div>
    </div>
  );
}



export async function getServerSideProps({ req, res }: GetServerSidePropsContext) {
  const session = await getSession({ req })
  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      }
    }
  }
  const users = await getUserRecommendation(session.user.uid)
  const posts = await getPosts(4)
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=60, stale-while-revalidate=59"
  );

  return {
    props: {
      users,
      posts,
    },
  }
}

