import { useDarkModeStore } from "@/stores/stores";
import { IUserPostProps } from "@/types/post";
import { IUser } from "@/types/user";
import { getCreatedDate } from "@/util/postDate";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "zustand";

type Props = {
  post: IUserPostProps;
  session: any;
  refreshData: () => void;
  user: IUser | null;
  children: any;
};
export default function PreviewHeader({
  post,
  session,
  refreshData,
  user,
  children,
}: Props) {
  const { darkMode } = useStore(useDarkModeStore);
  return (
    <div
      className={`sticky -top-3 flex w-full border-b border-gray-500 border-opacity-50 px-2 py-3 transition-all duration-300  ${
        darkMode ? "bg-blac text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex flex-1 items-start space-x-2">
        <div className="flex space-x-2">
          <Image
            src={post?.postedByPhotoUrl}
            width={40}
            height={40}
            priority
            alt={post?.author ?? "post"}
            className="rounded-full bg-gradient-to-bl from-pink-600 to-orange-600 p-0.5"
            placeholder="blur"
            blurDataURL={'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAACAAMDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDpbiR1mYB2A46H2ooooEf/2Q=='}
          />
          <div className="cursor-pointer">
            <h4 className="pr-1 font-semibold">{post?.author}</h4>
            <p className="text-left text-xs text-gray-500">
              {getCreatedDate(post)}
            </p>
          </div>
        </div>
        &#8226;
        {post?.postedById === session?.user?.uid ? (
          <Link
            href={`/post/${post?.postId}/edit`}
            as={`/post/${post?.postId}/edit`}
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
