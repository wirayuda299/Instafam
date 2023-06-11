import type { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import type { FieldValues } from "react-hook-form";
import { useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useSession } from "next-auth/react";

const Postheader = dynamic(() => import("@/components/Header/PostHeader"));
const PostForm = dynamic(() => import("@/components/Post/Form"));
const PostImage = dynamic(() => import("@/components/Post/Image"));

interface Values extends FieldValues {
  updated: string;
}

export default function EditPosts({ post }: { post: IUserPostProps }) {
  const { register, handleSubmit } = useForm();
  const { push } = useRouter();
  const session = useSession();
  const defaultValues = {
    captions: `${post?.captions} ${post?.hashtags}`,
  };

  const updateCurrentPost = async ({ updated }: Values) => {
    const { toast } = await import("react-hot-toast");

    try {
      if (typeof updated !== "string" || !session || !session.data?.user) {
        toast.error(`This ${updated} is not a string`);
        return;
      }
      const { updatePost } = await import("@/helper/updatePost");
      await updatePost(updated, post).then(() => {
        push(process.env.NEXTAUTH_URL as string);
      });
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Head>
        <title>Edit Post &#8226; Instafam </title>
      </Head>
      <div className="h-full w-full text-black dark:text-white">
        <div className="h-full w-full overflow-y-auto py-6">
          <div className="mx-auto grid h-screen w-full max-w-5xl place-items-center rounded-lg">
            <div className="relative grid h-full w-full grid-cols-1 rounded-lg border border-gray-500 border-opacity-50 p-5 lg:max-h-[550px] lg:grid-cols-2 lg:p-0">
              <PostImage post={post} />
              <div>
                <section className="border-b border-gray-500 border-opacity-50">
                  <Postheader post={post} />
                </section>
                <PostForm
                  defaultValues={defaultValues}
                  handleSubmit={handleSubmit}
                  register={register}
                  updatePost={updateCurrentPost}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  const { getPostById } = await import("@/helper/getPosts");
  const post = await getPostById(query?.id as string);
  if (!post) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      post: post ? post[0] : null,
    },
  };
}
