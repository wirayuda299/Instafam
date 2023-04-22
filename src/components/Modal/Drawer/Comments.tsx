import { IUserPostProps } from "@/types/post";
import Image from "next/image";
import { AiOutlineComment } from "react-icons/ai";
type Comments = Pick<IUserPostProps, "comments">;
type Props = {
  comments: Comments["comments"];
}
export default function PostComments({ comments }: Props) {
  return (
    <div className="h-full w-full overflow-y-auto py-10 px-3">
      {comments.length < 1 && (
        <div className="flex justify-center items-center">
          <div className="text-center flex flex-col justify-center items-center">
            <AiOutlineComment size={50}/>
            <h1 className="font-semibold">There&apos;s no comment yet</h1>
            <p className="text-xs text-gray-500">Be the first person to comment on this post</p>
          </div>
        </div>
      )}
      {comments.map((comment) => (
        <div
          className="mb-5 flex w-full space-x-2"
          key={comment.createdAt}
        >
          <Image
            src={comment?.commentByPhoto as string}
            width={40}
            height={40}
            priority
            alt={comment?.commentByName ?? "post"}
            className="rounded-full w-10 h-10"
          />
          <div>
            <div className="flex space-x-2">
              <h4 className=" text-left text-sm font-semibold ">
                {comment?.commentByName}
              </h4>
              <p className=" text-left text-xs">
                {comment?.comment}
              </p>
            </div>

          </div>
        </div>
      ))}
    </div>
  )
}