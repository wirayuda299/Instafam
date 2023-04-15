import { IUserPostProps } from "@/types/post";
import { useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Head from "next/head";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import { getCurrentUserData } from "@/helper/getUser";
import { IUser } from "@/types/user";
const PostHeaderMobile = dynamic(
  () => import("@/components/Header/HeaderMobile")
);
const PostCommentDesktop = dynamic(
  () => import("@/components/Card/Post/PostCommentDesktop"),
  {
    ssr: true,
  }
);

export default function PostDetail({
  post,
  user,
}: {
  post: IUserPostProps;
  user: IUser;
}) {
  const [commentOpen, setCommentOpen] = useState<boolean>(false);
  const { asPath, replace } = useRouter();
  const refreshData = () => replace(asPath);
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
              <PostHeaderMobile
                commentOpen={commentOpen}
                post={post}
                refreshData={refreshData}
                setCommentOpen={setCommentOpen}
              />
              <PostCommentDesktop
                user={user}
                commentOpen={commentOpen}
                post={post}
                refreshData={refreshData}
                setCommentOpen={setCommentOpen}
              />
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
