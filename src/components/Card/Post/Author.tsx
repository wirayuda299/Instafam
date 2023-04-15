import { IUserPostProps } from "@/types/post";
import {  useState } from "react";

export default function Author({ post }: { post: IUserPostProps }) {
  const [show, setShow] = useState(false);
  const [captions, setCaptions] = useState(post.captions[0]);

  return (
    <div className="overflow-hidden">
      <div
        className={`flex items-start max-w-xs cursor-pointer space-x-2 ${
          show ? "!max-w-fit flex-wrap" : ""
        }`}
        onClick={() => setShow(!show)}
      >
        <h3 className="pb-2 text-sm font-medium sm:font-semibold">
          {post?.author}
        </h3>
        <p
          className={`text-sm flex text-black dark:text-white font-thin ${
            captions.length > 25 && !show
              ? "!truncate "
              : ""
          }`}
        >
          {post.captions}
        </p>
        <p className="text-sm flex">
          {captions.length > 25 && !show ? (
            <span className="text-blue-500">...more</span>
          ): (
            <span className={`text-blue-500 ${captions.length < 1 ? 'hidden' : 'block'}`}>hide</span>
          )}
        </p>
      </div>
      <div className="flex flex-wrap">
        {post.hashtags.map((hashtag) => (
          <span
            key={hashtag}
            className="pr-1 text-xs font-normal text-blue-500"
          >
            {hashtag}
          </span>
        ))}
      </div>
    </div>
  );
}
