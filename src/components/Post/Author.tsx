import { type FC, useState } from "react";

type AuhtorProps = {
  hashtags: string[];
  captions: string;
  author: string;
};

const Author: FC<AuhtorProps> = ({ author, captions, hashtags }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="overflow-hidden">
      <div
        className={`flex max-w-[250px] items-start  space-x-2 ${
          show ? "!max-w-fit flex-wrap" : ""
        }`}
      >
        <h3 className="pb-2 text-sm font-medium sm:font-semibold">{author}</h3>
        <p
          className={` text-sm font-thin  ${
            captions[0].length >= 20 && !show ? "truncate" : ""
          }`}
        >
          {captions}
        </p>
        <button
          className="!ml-0 text-sm text-gray-400"
          onClick={() => setShow(!show)}
          type="button"
          name="show more"
          title="show more"
        >
          {captions[0].length >= 20 && !show ? (
            <span className="font-semibold ">more</span>
          ) : (
            <span
              className={`ml-1 font-semibold ${
                captions[0].length < 20 ? "hidden" : "block"
              }`}
            >
              hide
            </span>
          )}
        </button>
      </div>
      <div className="flex flex-wrap">
        {hashtags.map((hashtag) => (
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
};
export default Author;
