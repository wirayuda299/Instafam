import Comment from "@/components/Comments/Comment";
import Empty from "@/components/Comments/Empty";
import { IUserPostProps } from "@/types/post";
import Image from "next/image";
import { useId } from "react";
type Comments = Pick<IUserPostProps, "comments">;
type Props = {
  comments: Comments["comments"];
};
export default function PostComments({ comments }: Props) {
  const id = useId()
  return (
    <div className="h-auto w-full overflow-y-auto px-2">
      <Empty comments={comments} />
      <Comment comments={comments} key={id}/>
    </div>
  );
}
