import Head from "next/head";
import { IUserPostProps } from "@/types/post";
import dynamic from "next/dynamic";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { GetServerSidePropsContext } from "next";
import { getPosts } from "@/helper/getPosts";
import { RiLoader2Line } from "react-icons/ri";
import { useEffect, useState } from "react";
import { useStore } from "zustand";
import { useSelectedPostStore, usePostPreviewModalStore } from "@/stores/stores";

const ExplorePostCard = dynamic(() => import("@/components/Feeds"), {
  ssr: true,
});

type Props = {
  posts: IUserPostProps[];
  last: IUserPostProps;
};

export default function Explore({ posts, last }: Props) {
  const { ref, postsState, loading } = useInfiniteScroll(last);
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [mobileView, setMobileView] = useState<boolean>(false);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowWidth(window.innerWidth);
    })

    return () => {
      window.removeEventListener("resize", () => {
        setWindowWidth(window.innerWidth);
      })
    }
  }, [])
  return (
    <>
      <Head>
        <title>Explore popular posts &#8226; Instafam</title>
        <meta
          name="description"
          content="Explore new posts and discover new accounts on Instafam."
        />
      </Head>
      <div className="h-screen w-full overflow-y-auto p-5 ">
        <h1 className="py-8 text-center text-5xl font-semibold">Explore</h1>
        <div className={`mb-7 w-full grid gap-3 transition-all ease-out duration-500 ${mobileView && windowWidth < 768 ? 'grid-cols-1' : 'grid-cols-2 lg:grid-cols-3 '} `}>
          {posts?.map((post) => (
            <ExplorePostCard
              post={post}
              key={post.postId}
              mobileView={mobileView}
              setMobileView={setMobileView}
              windowWidth={windowWidth}
            />
          ))}
          <span ref={ref}></span>
          {loading && (
            <>
              <RiLoader2Line
                className="mx-auto  animate-spin text-gray-500"
                size={50}
              />
            </>
          )}
          {postsState?.map((post) => (
            <ExplorePostCard
              post={post}
              key={post.postId}
              mobileView={mobileView}
              setMobileView={setMobileView}
              windowWidth={windowWidth}
            />
          ))}
        </div>
      </div>
    </>
  );
}
export async function getServerSideProps({ res }: GetServerSidePropsContext) {
  const posts = await getPosts(10);
  const last = posts ? posts[posts.length - 1] : null;
  res.setHeader("Cache-Control", "maxage=120, stale-while-revalidate=60");

  return {
    props: {
      posts,
      last
    },
  };
}
