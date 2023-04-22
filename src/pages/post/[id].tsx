import { IUserPostProps } from "@/types/post";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Head from "next/head";
import { GetServerSidePropsContext } from "next";
import { useSession } from "next-auth/react";
import { BsThreeDots } from "react-icons/bs";
import usePost from "@/hooks/usePost";
import useUser from "@/hooks/useUser";
import { useSelectedPostStore, useMenuModalStore } from "@/stores/stores";
import { useStore } from "zustand";
import Image from "next/image";
import { getAllPosts } from "@/helper/getPosts";

const PostCommentDesktop = dynamic(
  () => import("@/components/Post/PreviewDesktop"),
  {
    ssr: true,
  }
);

const PostCard = dynamic(() => import("@/components/Post"), {
  ssr: true,
});

const Postloader = dynamic(() => import("@/components/Loader/Post"), {
  ssr: true,
});

type Props = {
  post: IUserPostProps;
};

export default function PostDetail({ post }: Props) {
  const { asPath, replace, pathname } = useRouter();
  const refreshData = () => replace(asPath);
  const { likes, comments, savedBy } = usePost(post);
  const { data: session } = useSession();
  const { user } = useUser(session?.user?.uid as string);
  const { setSelectedPost } = useStore(useSelectedPostStore);
  const { menuModal, setMenuModal } = useStore(useMenuModalStore);
  const [loading, setLoading] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const postRef = useRef<HTMLDivElement>(null);
  const [nextPosts, setNextPosts] = useState<IUserPostProps[] | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(async (entries) => {
      if (entries[0].isIntersecting) {
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
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  }, [nextPosts, pathname, post]);

  const PreviewDesktop = useMemo(() => {
    return (
      <>
        <PostCommentDesktop
          comments={comments}
          likes={likes}
          savedBy={savedBy}
          user={user}
          post={post}
          refreshData={refreshData}
        >
          <button onClick={handleClick} name="menu" title="">
            <BsThreeDots size={20} />
          </button>
        </PostCommentDesktop>
      </>
    );
  }, [post, likes, comments, session, user, savedBy]);

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
              ref={postRef}
            >
              <div className="hidden shadow-sm lg:block">
                <Image
                  src={post?.image ?? ""}
                  width={1300}
                  height={1300}
                  sizes="100vw"
                  quality={60}
                  placeholder="blur"
                  blurDataURL={
                    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAACAAMDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDpbiR1mYB2A46H2ooooEf/2Q=="
                  }
                  alt={post?.captions ?? "post"}
                  priority
                  className="h-auto w-full rounded-md md:h-full lg:rounded-none"
                />
              </div>
              {PreviewDesktop}
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
