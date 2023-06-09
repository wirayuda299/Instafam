import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import type { GetServerSidePropsContext } from "next";
import usePost from "@/hooks/usePost";
import { useStateContext } from "@/stores/Global/StateContext";
import { useSession } from "next-auth/react";
import { useModalContext } from "@/stores/Modal/ModalStatesContext";

const PostCard = dynamic(() => import("@/components/Post"), {
  ssr: true,
});

const Postloader = dynamic(() => import("@/components/Loader/Post"), {
  ssr: true,
});
const PreviewLargeScreen = dynamic(
  () => import("@/components/Post/PreviewLargeScreen"),
  {
    ssr: true,
  }
);

export default function PostDetail({ post }: { post: IUserPostProps }) {
  const { likes, comments, savedBy } = usePost(post);
  const { Dispatch } = useStateContext();
  const {
    modalStates: { menuModal },
    modalDispatch,
  } = useModalContext();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const [nextPosts, setNextPosts] = useState<IUserPostProps[] | null>(null);

  useEffect(() => {
    window.addEventListener("resize", async () => {
      if (window.innerWidth < 1024) {
        const { getAllPosts } = await import("@/helper/getPosts");
        const allPosts = (await getAllPosts()) as IUserPostProps[];
        // @ts-ignore
        setNextPosts(allPosts);
        setLoading(false);
      }
    });
    return () => {
      window.removeEventListener("resize", async () => {
        if (window.innerWidth < 1024) {
          const { getAllPosts } = await import("@/helper/getPosts");
          const allPosts = (await getAllPosts()) as IUserPostProps[];
          setNextPosts(allPosts);
          setLoading(false);
        }
      });
    };
  }, []);

  useEffect(() => {
    const width = window.innerWidth;
    if (width < 1024) {
      const observer = new IntersectionObserver(async (entries) => {
        if (entries[0].isIntersecting) {
          const { getAllPosts } = await import("@/helper/getPosts");
          const newPosts = (await getAllPosts()) as IUserPostProps[];
          setNextPosts(newPosts.filter((p) => p.postId !== post.postId));
          setLoading(false);
        }
      });
      if (ref.current) {
        observer.observe(ref.current);
      }
      return () => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      };
    }
  }, [post]);

  const handleClick = () => {
    modalDispatch({
      type: "TOGGLE_MENU_MODAL",
      payload: {
        menuModal: !menuModal,
      },
    });
    Dispatch({
      type: "SELECT_POST",
      payload: {
        post,
      },
    });
  };

  return (
    <>
      <Head>
        <title>
          {post?.author}({post?.captions ?? "post"}) &#8226; Instafam
        </title>
      </Head>
      <div className="h-full w-full text-black dark:text-white">
        <div className="h-full w-full overflow-y-auto">
          <div className="container mx-auto grid h-screen w-full max-w-5xl place-items-center rounded-lg ">
            <div className="relative grid h-full w-full grid-cols-1 justify-between overflow-y-auto border border-gray-500 border-opacity-50 p-5 lg:max-h-[530px] lg:grid-cols-2 lg:p-0">
              <PreviewLargeScreen
                session={session}
                comments={comments}
                handleClick={handleClick}
                likes={likes}
                post={post}
                savedBy={savedBy}
              />
              <div className="block lg:hidden">
                <PostCard post={post} />
                <div ref={ref}></div>
                {loading && <Postloader />}
                <>
                  {nextPosts?.map((post) => (
                    <PostCard post={post} key={post.postId} />
                  ))}
                </>
              </div>
            </div>
            <br className="md:hidden" />
            <br className="md:hidden" />
            <br className="md:hidden" />
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({
  query,
  res,
}: GetServerSidePropsContext) {
  const { getPostById } = await import("@/helper/getPosts");
  const posts = await getPostById(query?.id as string);
  res.setHeader("Cache-Control", "maxage=60, stale-while-revalidate");

  return {
    props: {
      post: posts ? posts[0] : null,
    },
  };
}
