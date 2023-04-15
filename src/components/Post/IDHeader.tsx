import { IUserPostProps } from "@/types/post";
import { IUser } from "@/types/user";
import { getCreatedDate } from "@/util/postDate";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
type Props = {
  post: IUserPostProps;
  session: Session | null;
  refreshData: () => void;
  user: IUser | null;
  children: ReactNode;
};
export default function IDHeader({
  post,
  session,
  refreshData,
  user,
  children,
}: Props) {
  return (
    <div className="ease sticky -top-3 flex w-full border-b border-gray-500 border-opacity-50 bg-white px-2 py-3 transition-all duration-300 dark:bg-black">
      <div className="flex flex-1 items-start space-x-2">
        <div className="flex space-x-2">
          <Image
            src={post?.postedByPhotoUrl}
            width={40}
            height={40}
            priority
            alt={post?.author ?? "post"}
            className="rounded-full bg-gradient-to-bl from-pink-600 to-orange-600 p-0.5"
          />
          <div className="cursor-pointer">
            <h4 className="pr-1 font-semibold">{post?.author}</h4>
            <p className="text-xs text-gray-500">{getCreatedDate(post)}</p>
          </div>
        </div>
        &#8226;
        {post.postedById === session?.user?.uid ? (
          <Link
            href={`/post/${post.postId}/edit`}
            as={`/post/${post.postId}/edit`}
          >
            <span className="pt-1 text-xs font-semibold">Edit</span>
          </Link>
        ) : (
          <button
            className="pt-1 text-xs font-semibold"
            type="button"
            name="follow and unfollow"
            title="folow and unfollow"
            onClick={async () => {
              const { handleFollow } = await import("@/helper/follow");
              const followArgs = {
                id: (post?.postedById as string) ?? "",
                uid: session?.user.uid as string,
                followedByName: session?.user.username as string,
                refreshData,
                ssr: false,
              };

              handleFollow(followArgs);
            }}
          >
            {user &&
            user?.following?.find(
              (user: { userId: string }) =>
                user?.userId === post?.postedById ?? ""
            )
              ? "Following"
              : "Follow"}
          </button>
        )}
      </div>
      {children}
    </div>
  );
}
