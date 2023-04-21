import { IUserPostProps } from "@/types/post";
import { useRouter } from "next/router";
import { FieldValues, useForm } from "react-hook-form";
export type IComment = Pick<IUserPostProps, "comments">;

type Props = {
  post: IUserPostProps;
  session: any;
  comments: IComment["comments"];
  ssr: boolean;
};

export default function Comments({ post, session, ssr }: Props) {
  const { pathname } = useRouter();
  const { register, handleSubmit, resetField } = useForm();
  const defaultValues = {
    comments: "",
  };
  const handleSubmits = async (e: FieldValues) => {

    const { toast } = await import("react-hot-toast");
    if (e.comments === "") return toast.error("Please enter a comment");
    const { getCsrfToken } = await import("next-auth/react");
    const { db } = await import("@/config/firebase");
    const { doc, updateDoc, arrayUnion } = await import("firebase/firestore");
    try {
      const token = await getCsrfToken();
      if (!token) {
        throw new Error("No CSRF token found");
      }

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
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div
      className={
        pathname === "/post/[id]" ? "flex flex-col-reverse " : "block"
      }
    >
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
