import { PostSchema } from "@/schema/PostSchema";
import { IUserPostProps } from "@/types/post";
import { useState } from "react";

export default function Author({ post }: { post: IUserPostProps }) {
  const [show, setShow] = useState(false);
  const isValidProps = PostSchema.parse(post);
  if (!isValidProps) throw new Error("Invalid Props for Author Component");
  return (
    <div className="overflow-hidden">
      <div
        className={`flex max-w-xs cursor-pointer space-x-2 ${
          show ? "flex-wrap" : ""
        }`}
        onClick={() => setShow(!show)}
      >
        <h3 className="pb-2 text-sm font-medium sm:font-semibold">
          {post?.author}
        </h3>
        <p className={`text-sm font-thin ${show ? "" : "truncate"}`}>
          {post.captions}
        </p>
      </div>
      <div className="flex flex-wrap">
        {post.hashtags.map((hastag) => (
          <span key={hastag} className="pr-1 text-xs font-normal text-blue-500">
            {hastag}
          </span>
        ))}
      </div>
    </div>
  );
}
