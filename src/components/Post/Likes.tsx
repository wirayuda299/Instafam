import { type FC, memo } from "react";

type LikesProps = {
  likesCount: string[];
  uid: string;
};
const Likes: FC<LikesProps> = ({ likesCount, uid }) => {
  return (
    <>
      {likesCount && likesCount.length > 0 ? (
        <div className="mb-4 mt-1 flex px-1 text-xs font-light tracking-wider ">
          {likesCount.includes(uid) ? (
            <p className="flex items-center gap-1 space-x-1">
              {likesCount.length > 1 ? "You  " : "liked by You "}
              <span
                className={`${likesCount.length - 1 < 1 ? "hidden" : "block"}`}
              >
                and {likesCount.length - 1} others
              </span>
            </p>
          ) : (
            <span>
              {likesCount.length} {likesCount.length > 1 ? "likes" : "like"}
            </span>
          )}
        </div>
      ) : null}
    </>
  );
};
export default memo(Likes);
