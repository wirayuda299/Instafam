import { IUserPostProps } from "@/types/post";
import { getCommentcreatedAt } from "@/util/postDate";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
export type IComment = Pick<IUserPostProps, "comments">;
type Props = {
  comment: IComment["comments"];
};
export default function IDComments({ comment }: Props) {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      {comment?.length === 0 && (
        <div className="flex w-full flex-1 items-center space-x-2 bg-white px-2 py-3 dark:bg-black">
          <p className="text-center">There is no comments yet</p>
        </div>
      )}
      {comment?.map((comment) => (
        <div className="mb-5 flex w-full gap-x-14 pr-2" key={comment?.comment}>
          <div className="flex items-center space-x-2 px-2 py-2 ">
            <Image
              src={comment?.commentByPhoto}
              width={40}
              height={40}
              alt={comment?.commentByName ?? "comment"}
              className="rounded-full"
            />
            <Link
              href={`/profile/${comment?.commentByUid}`}
              className="text-sm font-semibold"
            >
              {comment?.commentByName}
              <small className="block text-xs font-semibold text-gray-500">
                {getCommentcreatedAt(comment)}
              </small>
            </Link>
          </div>
          <div className="w-full flex-wrap overflow-hidden">
            <p className=" flex h-full flex-wrap pt-3 text-xs">
              {comment?.comment}
            </p>
          </div>
        </div>
      ))}
    </Suspense>
  );
}