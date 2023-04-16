import { IUserPostProps } from "@/types/post";
import { useState } from "react";

export default function Author({ post }: { post: IUserPostProps }) {
  const [show, setShow] = useState(false);
  const [captions, setCaptions] = useState(post.captions[0]);

  return (
    <div className="overflow-hidden">
      <div
        className={`flex max-w-xs cursor-pointer items-start space-x-2 ${
          show ? "!max-w-fit flex-wrap" : ""
        }`}
        onClick={() => setShow(!show)}
      >
        <h3 className="pb-2 text-sm font-medium sm:font-semibold">
          {post?.author}
        </h3>
        <p
          className={`flex text-sm font-thin text-black dark:text-white ${
            captions.length >= 25 && !show ? "!truncate " : ""
          }`}
        >
          {post.captions}
        </p>
        <p className="flex text-sm">
          {captions.length >= 25 && !show ? (
            <span className="text-blue-500">...more</span>
          ) : (
            <span
              className={`text-blue-500 ${
                captions.length < 25 ? "hidden" : "block"
              }`}
            >
              hide
            </span>
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
