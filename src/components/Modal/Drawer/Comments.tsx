import { IUserPostProps } from "@/types/post";
import Image from "next/image";
import { AiOutlineComment } from "react-icons/ai";
type Comments = Pick<IUserPostProps, "comments">;
type Props = {
  comments: Comments["comments"];
};
export default function PostComments({ comments }: Props) {
  return (
    <div className="h-auto w-full overflow-y-auto px-3 py-10">
      {comments.length < 1 && (
        <div className="flex items-center justify-center">
          <div className="flex flex-col items-center justify-center text-center">
            <AiOutlineComment size={50} />
            <h1 className="font-semibold">There&apos;s no comment yet</h1>
            <p className="text-xs text-gray-500">
              Be the first person to comment on this post
            </p>
          </div>
        </div>
      )}
      {comments.map((comment) => (
        <div className="mb-5 flex w-full space-x-2" key={comment.createdAt}>
          <Image
            src={comment?.commentByPhoto as string}
            width={40}
            height={40}
            priority
            alt={comment?.commentByName ?? "post"}
            className="h-10 w-10 rounded-full"
          />
          <div>
            <div className="flex space-x-2">
              <h4 className=" text-left text-sm font-semibold ">
                {comment?.commentByName}
              </h4>
              <p className=" text-left text-xs">{comment?.comment}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
