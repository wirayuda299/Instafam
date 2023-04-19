import { IUserPostProps } from "@/types/post";
import { useMemo, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Head from "next/head";
import { GetServerSidePropsContext } from "next";
import { getSession, useSession } from "next-auth/react";
import { getCurrentUserData } from "@/helper/getUser";
import { BsThreeDots } from "react-icons/bs";
import usePost from "@/hooks/usePost";
import useUser from "@/hooks/useUser";
const IDPreviewMobile = dynamic(
  () => import("@/components/Post/PreviewMobile"), {
    ssr: true,
  }
);
const PostCommentDesktop = dynamic(
  () => import("@/components/Post/PreviewDesktop"),
  {
    ssr: true,
  }
);

export default function PostDetail({ post }: { post: IUserPostProps }) {
  const [commentOpen] = useState<boolean>(false);
  const { asPath, replace } = useRouter();
  const refreshData = () => replace(asPath);
  const { likes, comments } = usePost(post);
  const { data: session } = useSession();
  const { savedPosts, user } = useUser(session?.user?.uid as string);

  const PreviewMobile = useMemo(() => {
    return (
      <>
        <IDPreviewMobile
          comments={comments}
          likes={likes}
          savedPosts={savedPosts}
          session={session}
          user={user}
          post={post}
          refreshData={refreshData}
        />
      </>
    );
  }, [commentOpen, post, likes, comments, session, user, savedPosts]);

  const PreviewDesktop = useMemo(() => {
    return (
      <>
        <PostCommentDesktop
          comments={comments}
          likes={likes}
          savedPosts={savedPosts}
          user={user}
          post={post}
          refreshData={refreshData}
        >
          <button>
            <BsThreeDots size={20} />
          </button>
        </PostCommentDesktop>
      </>
    );
  }, [commentOpen, post, likes, comments, session, user, savedPosts]);
  return (
    <>
      <Head>
        <title>
          {post?.author}({post?.captions ?? "post"}) &#8226; Instafam
        </title>
      </Head>
      <div className="h-full w-full text-black dark:text-white">
        <div className="h-full w-full overflow-y-auto">
          <div className="mx-auto grid h-screen w-full max-w-5xl place-items-center rounded-lg ">
            <div className="relative grid h-full w-full grid-cols-1 justify-between overflow-y-auto border border-gray-500 border-opacity-50 p-5 lg:max-h-[530px] lg:grid-cols-2 lg:p-0">
              {PreviewMobile}
              {PreviewDesktop}
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

export async function getServerSideProps({
  query,
  req,
}: GetServerSidePropsContext) {
  const { getPostById } = await import("@/helper/getPosts");
  const posts = await getPostById(query?.id as string);
  const session = await getSession({ req });
  const user = await getCurrentUserData(session?.user?.uid as string);

  return {
    props: {
      post: posts ? posts[0] : null,
      user: user ? user : null,
    },
  };
}
