import { db } from "@/config/firebase";
import { IUserPostProps } from "@/types/post";
import { getCreatedDate } from "@/util/postDate";
import { doc, updateDoc } from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";
import Head from "next/head";
const Headers = dynamic(() => import("@/components/Card/Post/Edit/Header"));
const PostEditImage = dynamic(
  () => import("@/components/Card/Post/Edit/image")
);
const PostForm = dynamic(() => import("@/components/Card/Post/Edit/Form"));
interface Values extends FieldValues {
  updated: string;
}

export default function EditPosts({ posts }: { posts: IUserPostProps }) {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const defaultValues = {
    captions: `${posts?.captions} ${posts?.hashtags}`,
  };

  async function updatePost(e: Values) {
    try {
      const q = doc(db, "posts", `post-${posts.postId}`);
      await updateDoc(q, {
        captions: e.updated.match(/^[^#]*/),
        hashtags:
          e.updated
            .match(/#(?!\n)(.+)/g)
            ?.join(" ")
            .split(" ") || [],
      }).then(() => {
        toast.success("post updated");
        router.push(`${process.env.NEXTAUTH_URL}`);
      });
    } catch (error: any) {
      console.log(error.message);
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
              <PostEditImage posts={posts} />
              <div>
                <Headers getCreatedDate={getCreatedDate} posts={posts} />
                <PostForm
                  defaultValues={defaultValues}
                  handleSubmit={handleSubmit}
                  register={register}
                  updatePost={updatePost}
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
  const posts = await getPostById(query?.id as string);
  return {
    props: {
      posts: posts ? posts[0] : null,
    },
  };
}
