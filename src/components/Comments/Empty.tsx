import { IUserPostProps } from "@/types/post";
import { AiOutlineComment } from "react-icons/ai";
type Comments = Pick<IUserPostProps, "comments">;
type Props = {
  comments: Comments["comments"];
};
export default function Empty({ comments }: Props) {
  return (
    <>
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
    </>
  );
}
