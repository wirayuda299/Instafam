import Empty from "@/components/Comments/Empty";
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
      <Empty comments={comments} />
      {comments.map((comment) => (
        <div className="mb-5 flex w-full space-x-2" key={comment.createdAt}>
          <Image
            src={comment?.commentByPhoto as string}
            width={40}
            height={40}
            priority
            alt={comment?.commentByName ?? "post"}
            placeholder="blur"
            blurDataURL={comment?.commentByPhoto as string}
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
