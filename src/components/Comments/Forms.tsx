import { IUserPostProps } from "@/types/post";
import { useRouter } from "next/router";
import { memo } from "react";
import { FieldValues, useForm } from "react-hook-form";
export type IComment = Pick<IUserPostProps, "comments">;

type Props = {
  post: IUserPostProps;
  session: any;
  comments: IComment["comments"];
};

function Comments({ post, session }: Props) {
  const { pathname } = useRouter();
  const { register, handleSubmit, resetField } = useForm();

  const defaultValues = {
    comments: "",
  };

  const handleSubmits = async (e: FieldValues) => {
    const { postComments } = await import("@/helper/comments");
    await postComments({
      e,
      post,
      session,
      resetField,
    });
  };

  return (
    <div
      className={pathname === "/post/[id]" ? "flex flex-col-reverse " : "block"}
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
export default memo(Comments);
