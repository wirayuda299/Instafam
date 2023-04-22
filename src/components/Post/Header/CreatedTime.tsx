import { IUserPostProps } from "@/types/post";
import { getCreatedDate } from "@/util/postDate";
import Link from "next/link";

export default function CreatedTime({ post }: { post: IUserPostProps }) {
  return (
    <div className={`ml-3 flex w-full items-center justify-between`}>
      <div>
        <div>
          <div>
            <Link
              href={`/profile/${post?.author}`}
              className="block text-sm font-semibold leading-tight antialiased"
            >
              {post?.author}
            </Link>
          </div>
          <span
            className={`block text-left font-thin leading-tight text-gray-500 antialiased xs:text-[10px] sm:text-xs `}
          >
            {getCreatedDate(post.createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
}
