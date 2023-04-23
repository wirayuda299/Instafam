import { IUserPostProps } from "@/types/post";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import { GetServerSidePropsContext } from "next";
import { BsThreeDots } from "react-icons/bs";
import usePost from "@/hooks/usePost";
import { useSelectedPostStore, useMenuModalStore } from "@/stores/stores";
import { useStore } from "zustand";

const PostDetailComment = dynamic(
  () => import("@/components/Post/Preview"),
  {
    ssr: true,
  }
);
const Buttons = dynamic(() => import("@/components/Buttons/Buttons"), {
  ssr: true,
});

const PostCard = dynamic(() => import("@/components/Post"), {
  ssr: true,
});

const Postloader = dynamic(() => import("@/components/Loader/Post"), {
  ssr: true,
});
const PostImage = dynamic(() => import("@/components/Post/Image"), {
  ssr: true,
});

type Props = {
  post: IUserPostProps;
};

export default function PostDetail({ post }: Props) {
  const { likes, comments, savedBy } = usePost(post);
  const { setSelectedPost } = useStore(useSelectedPostStore);
  const { menuModal, setMenuModal } = useStore(useMenuModalStore);
  const [loading, setLoading] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const [nextPosts, setNextPosts] = useState<IUserPostProps[] | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(async (entries) => {
      if (entries[0].isIntersecting) {
        const {getAllPosts} = await import("@/helper/getPosts");
        const newPosts = await getAllPosts();
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
  }, [post]);

  const handleClick = () => {
    setMenuModal(!menuModal);
    setSelectedPost(post);
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
            <div
              className="relative grid h-full w-full grid-cols-1 justify-between overflow-y-auto border border-gray-500 border-opacity-50 p-5 lg:max-h-[530px] lg:grid-cols-2 lg:p-0"
            >
              <div className="hidden shadow-sm lg:block">
                <PostImage post={post} />
              </div>
              <PostDetailComment
                comments={comments}
                likes={likes}
                savedBy={savedBy}
                post={post}
              >
                <Buttons onClick={handleClick} name="menu" title="menu">
                  <BsThreeDots size={20} />
                </Buttons>
              </PostDetailComment>
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
            <br className="md:hidden" />
            <br className="md:hidden" />
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  const { getPostById } = await import("@/helper/getPosts");
  const posts = await getPostById(query?.id as string);

  return {
    props: {
      post: posts ? posts[0] : null,
    },
  };
}
