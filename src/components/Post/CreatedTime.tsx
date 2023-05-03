import { useStateContext } from "@/stores/StateContext";
import { IUserPostProps } from "@/types/post";
import { getCreatedDate } from "@/utils/postDate";
import Link from "next/link";

export default function CreatedTime({ post }: { post: IUserPostProps }) {
  const createdAt = getCreatedDate(post?.createdAt);
  const {
    state: { postModal },
    Dispatch,
  } = useStateContext();
  return (
    <div className={`ml-3 flex w-full items-center justify-between`}>
      <div>
        <div>
          <div>
            <Link
              onClick={() =>
                postModal
                  ? Dispatch({
                      type: "TOGGLE_POST_MODAL",
                      payload: {
                        postModal: false,
                      },
                    })
                  : null
              }
              href={`/profile/${post?.author}`}
              className="block text-sm font-semibold leading-tight antialiased"
            >
              {post?.author}
            </Link>
          </div>
          <span
            className={`block text-left font-thin leading-tight text-gray-500 antialiased xs:text-[10px] sm:text-xs `}
          >
            {createdAt}
          </span>
        </div>
      </div>
    </div>
  );
}
