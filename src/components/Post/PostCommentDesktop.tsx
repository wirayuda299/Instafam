import Image from "next/image";
import { IUserPostProps } from "@/types/post";
import {  getCreatedDate } from "@/util/postDate";
import { Dispatch, ReactNode, SetStateAction } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useSession } from "next-auth/react";
import useComments from "@/hooks/useComments";
import useSavedPosts from "@/hooks/useSavedPosts";
import useUser from "@/hooks/useUser";
import useLikes from "@/hooks/useLikes";
const Likes = dynamic(() => import("./Likes"));
const Comments = dynamic(() => import("@/components/Post/Comments"));
const ActionButton = dynamic(() => import("@/components/Post/ActionButton"));
const IDHeader = dynamic(() => import("./IDHeader"))
const IDComments = dynamic(() => import("./IDComments"))
type Props = {
  post: IUserPostProps;
  commentOpen: boolean;
  setCommentOpen: Dispatch<SetStateAction<boolean>>;
  refreshData: () => void;
  children: ReactNode;
};

export default function PostCommentsDesktop({
  post,
  refreshData,
  commentOpen,
  setCommentOpen,
  children,
}: Props) {
  const { data: session } = useSession();
  const { comment } = useComments(post);
  const { savedPosts } = useSavedPosts(session, post);
  const { user } = useUser(session?.user.uid as string);
  const { likesCount } = useLikes(post);
  return (
    <div className=" relative ">
      <div className="hidden h-full max-h-[400px] overflow-y-auto overflow-x-hidden py-3 lg:block ">
        <IDHeader
          post={post}
          refreshData={refreshData}
          session={session}
          user={user}
        >
          {children}
        </IDHeader>
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

        <IDComments comment={comment} />
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
          <Likes likesCount={likesCount} session={session} />
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
