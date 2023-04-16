import { IUserPostProps } from "@/types/post";
import { useRouter } from "next/router";
import { FieldValues, useForm } from "react-hook-form";
import Image from "next/image";
import { Session } from "next-auth";
import toast from "react-hot-toast";
export type IComment = Pick<IUserPostProps, "comments">;

type Props = {
  post: IUserPostProps;
  session: Session | null;
  commentOpen: boolean;
  comments: IComment["comments"];
  ssr: boolean;
};

export default function Comments({
  post,
  commentOpen,
  comments,
  session,
  ssr,
}: Props) {
  const { register, handleSubmit, resetField } = useForm();
  const defaultValues = {
    comments: "",
  };
  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
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
      ssr && refreshData();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div
      className={
        router.pathname === "/post/[id]" ? "flex flex-col-reverse " : "block"
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
      <div
        className={`py-2 ${commentOpen ? "block" : "hidden"} ${
          router.pathname === "/post/[id]" ? "pt-5 " : ""
        }}`}
      >
        {comments?.length < 1 ? (
          <p className="text-center text-xs">There&apos;s no comment yet</p>
        ) : (
          comments &&
          comments?.map((comment) => (
            <div
              className="flex flex-wrap items-center space-x-2 pb-2"
              key={comment.createdAt}
            >
              <div className="flex items-center space-x-3">
                <Image
                  src={comment?.commentByPhoto}
                  alt={comment?.comment}
                  width={40}
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL={
                    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////2wBDAf//////////////////////////////////////////////////////////////////////////////////////wAARCAACAAMDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwBaKKKAP//Z"
                  }
                  height={40}
                  className="h-8 w-8 rounded-full"
                />
                <h3 className="text-xs font-bold ">{comment?.commentByName}</h3>
                <p className="text-xs font-extralight text-gray-400">
                  {comment?.comment}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
