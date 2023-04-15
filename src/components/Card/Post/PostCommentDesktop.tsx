import Image from "next/image";
import { IUserPostProps } from "@/types/post";
import { getCommentcreatedAt, getCreatedDate } from "@/util/postDate";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { BsThreeDots } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import dynamic from "next/dynamic";
import Link from "next/link";
import { IUser } from "@/types/user";
import { useSession } from "next-auth/react";
import useComments from "@/hooks/useComments";
import useSavedPosts from "@/hooks/useSavedPosts";
import useUser from "@/hooks/useUser";
import useLikes from "@/hooks/useLikes";
const Comments = dynamic(() => import("@/components/Card/Post/Comments"));
const ActionButton = dynamic(
  () => import("@/components/Card/Post/ActionButton")
);
type Props = {
  post: IUserPostProps;
  commentOpen: boolean;
  setCommentOpen: Dispatch<SetStateAction<boolean>>;
  refreshData: () => void;
  children: ReactNode
};

export default function PostCommentsDesktop({
  post,
  refreshData,
  commentOpen,
  setCommentOpen,
  children
}: Props) {
  const { data: session } = useSession();
  const { comment } = useComments(post);
  const { savedPosts } = useSavedPosts(session, post);
  const { user } = useUser(session?.user.uid as string);
  const { likesCount } = useLikes(post);
  return (
    <div className=" relative ">
      <div className="hidden h-full max-h-[400px] overflow-y-auto overflow-x-hidden py-3 lg:block ">
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
        <Link
          href={`/profile/${post?.author}`}
          className="mb-5 flex flex-1 space-x-2 bg-white px-2 py-3 dark:bg-black "
        >
          <Image
            src={post?.postedByPhotoUrl ?? ""}
            width={40}
            height={40}
            alt={post?.author ?? "author"}
            priority
            className="rounded-full bg-gradient-to-bl from-pink-600 to-orange-600 p-0.5"
          />
          <h4 className="pr-3 font-semibold">
            {post?.author}
            <span className="block pt-0 text-xs text-gray-500">
              {getCreatedDate(post)}
            </span>
          </h4>
          <p>{post?.captions ?? ""}</p>
        </Link>
        {/* comments */}
        {comment?.length === 0 && (
          <div className="flex w-full flex-1 items-center space-x-2 bg-white px-2 py-3 dark:bg-black">
            <p className="text-center">There is no comments yet</p>
          </div>
        )}
        {comment?.map((comment) => (
          <div
            className="mb-5 flex w-full gap-x-14 pr-2"
            key={comment?.comment}
          >
            <div className="flex items-center space-x-2 px-2 py-2 ">
              <Image
                src={comment?.commentByPhoto}
                width={40}
                height={40}
                alt={comment?.commentByName ?? "comment"}
                className="rounded-full"
              />
              <Link
                href={`/profile/${comment?.commentByUid}`}
                className="text-sm font-semibold"
              >
                {comment?.commentByName}
                <small className="block text-xs font-semibold text-gray-500">
                  {getCommentcreatedAt(comment)}
                </small>
              </Link>
            </div>
            <div className="w-full flex-wrap overflow-hidden">
              <p className=" flex h-full flex-wrap pt-3 text-xs">
                {comment?.comment}
              </p>
            </div>
         
          </div>
        ))}

        {/* comments end */}
        <div className="absolute bottom-0 hidden w-full border-t border-gray-500 border-opacity-50 px-2 lg:block">
          <ActionButton
            ssr={false}
            refreshData={refreshData}
            commentOpen={true}
            likes={likesCount}
            post={post ?? []}
            savedPosts={savedPosts}
            setCommentOpen={setCommentOpen}
            uid={session?.user.uid as string}
          />
          {likesCount && likesCount.length > 0 ? (
          <div className="mb-4 mt-1 px-1 text-xs font-light tracking-wider flex ">
            {likesCount.includes(session?.user?.uid as string) ? (
              <p className="flex space-x-1 gap-1 items-center">
                {likesCount.length > 1 ? "You  " : "liked by You "}
                <span
                  className={`${
                    likesCount.length - 1 < 1 ? "hidden" : "block"
                  }`}
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
          <div className="py-2">
            <Comments
              ssr={false}
              post={post ?? []}
              commentOpen={commentOpen}
              comments={comment ?? []}
              session={session}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
