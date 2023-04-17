import { IUserPostProps } from "@/types/post";
import { useRouter } from "next/router";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
export type IComment = Pick<IUserPostProps, "comments">;

type Props = {
  post: IUserPostProps;
  session: any;
  commentOpen: boolean;
  comments: IComment["comments"];
  ssr: boolean;
};

export default function Comments({ post, session, ssr }: Props) {
  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  };
  const { register, handleSubmit, resetField } = useForm();
  const defaultValues = {
    comments: "",
  };
  const handleSubmits = async (e: FieldValues) => {
    if (e.comments === "") return;
    const { db } = await import("@/config/firebase");
    const { doc, updateDoc, arrayUnion } = await import("firebase/firestore");
    try {
      const postRef = doc(db, "posts", `post-${post.postId}`);
      await updateDoc(postRef, {
        comments: arrayUnion({
          commentByUid: session?.user.uid as string,
          comment: e.comments,
          commentByName: session?.user.username as string,
          commentByPhoto: session?.user.image as string,
          createdAt: Date.now(),
        }),
      }).then(() => {
        resetField("comments");
      });
      ssr ? refreshData() : undefined;
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className={router.pathname === "/post/[id]" ? "flex flex-col-reverse " : "block"}>
      <form className="px-1 py-1" onSubmit={handleSubmit(handleSubmits)}>
        <input
          type="text"
          placeholder="Add a comment..."
          autoComplete="off"
          autoFocus={false}
          defaultValue={defaultValues.comments}
          {...register("comments")}
          className="w-full bg-transparent text-xs focus:outline-none"
        />
      </form>
    </div>
  );
}
