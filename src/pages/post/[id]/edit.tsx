import { IUserPostProps } from "@/types/post";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { FieldValues, useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import Head from "next/head";

const Postheader = dynamic(() => import("@/components/Header/PostHeader"));
const PostForm = dynamic(() => import("@/components/Post/Form"));
const PostImage = dynamic(() => import("@/components/Post/Image"));

interface Values extends FieldValues {
  updated: string;
}

export default function EditPosts({ post }: { post: IUserPostProps }) {
  const { register, handleSubmit } = useForm();
  const { push } = useRouter();
  const defaultValues = {
    captions: `${post?.captions} ${post?.hashtags}`,
  };

  const updateCurrentPost = async (e: Values) => {
    const {toast} = await import("react-hot-toast");
    try {
      const { updatePost } = await import("@/helper/updatePost");
      await updatePost(e, post).then(() => {
        toast.success("Post updated successfully");
        push('/');
      })
    } catch (error: any) {
      toast.error(error.message);
    }
  }

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
                <div className="border-b border-gray-500 border-opacity-50">
                  <Postheader post={post} />
                </div>
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
  return {
    props: {
      post: post ? post[0] : null,
    },
  };
}
