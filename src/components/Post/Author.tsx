import { IUserPostProps } from "@/types/post";
import { memo, useMemo, useState } from "react";

 function Author({ post }: { post: IUserPostProps }) {
  const [show, setShow] = useState(false);
  const posthastag = useMemo<string[]>(() => post.hashtags, [post])
  const captions = useMemo<string>(() => post.captions[0], [post])
  
  return (
    <div className="overflow-hidden">
      <div
        className={`flex max-w-[250px] text-ellipsis overflow-hidden cursor-pointer items-start space-x-2 ${
          show ? "!max-w-fit flex-wrap" : ""
        }`}
        onClick={() => setShow(!show)}
      >
        <h3 className="pb-2 text-sm font-medium sm:font-semibold">
          {post?.author}
        </h3>
        <p
          className={`flex text-sm font-thin text-black dark:text-white ${
            captions.length >= 20 && !show ? "!truncate !text-transparent !bg-gradient-to-r !from-white from-80% !bg-clip-text" : ""
          }`}
        >
          {post.captions}
        </p>
        <p className="flex text-sm">
          {captions.length >= 20 && !show ? (
            <span className="font-semibold ">.....more</span>
          ) : (
            <span
              className={`font-semibold ${
                captions.length < 20 ? "hidden" : "block"
              }`}
            >
              hide
            </span>
          )}
        </p>
      </div>
      <div className="flex flex-wrap">
        {posthastag.map((hashtag) => (
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
export default memo(Author)
