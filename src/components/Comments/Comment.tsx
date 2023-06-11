import { getCreatedDate } from "@/utils/postDate";
import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";

type CommentsProps = {
  comments: Pick<IUserPostProps, "comments">["comments"];
};

const Comments: FC<CommentsProps> = ({ comments }) => {
  return (
    <>
      {comments?.map((comment) => (
        <div className="mb-5 flex w-full space-x-10  " key={comment?.createdAt}>
          <div className="flex items-center space-x-2 px-6 py-2 lg:px-2 ">
            <Image
              src={comment?.commentByPhoto}
              width={40}
              height={40}
              alt={comment?.commentByName ?? "comment"}
              sizes="40px"
              className="h-8 w-8 rounded-full"
            />
            <Link
              href={`/profile/${comment?.commentByName}`}
              className="text-sm font-semibold"
            >
              {comment?.commentByName}
              <small className="block text-left text-[10px] font-semibold text-gray-500">
                {getCreatedDate(comment.createdAt)}
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
    </>
  );
};

export default Comments;
