import Image from "next/image";
import { IUserPostProps } from "@/types/post";
import { getCreatedDate } from "@/util/postDate";
import { ReactNode } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useSession } from "next-auth/react";

const Likes = dynamic(() => import("./Likes"));
const Comments = dynamic(() => import("@/components/Post/Comments"));
const ActionButton = dynamic(() => import("@/components/Post/ActionButton"));
const PreviewHeader = dynamic(() => import("./PreviewHeader"));
const PreviewComment = dynamic(() => import("./PreviewComments"));

type Props = {
  post: IUserPostProps;
  children?: ReactNode;
  refreshData: () => void;
  comments: any;
  likes: any;
  savedPosts: any;
  user: any;
  setCommentOpen: any;
  commentOpen: boolean;
};

export default function PostCommentsDesktop({post, children, refreshData, comments, likes, savedPosts, user, commentOpen, setCommentOpen}: Props) {
  const { data: session } = useSession();

  return (
    <div className=" relative ">
      <div className="hidden h-full max-h-[400px] overflow-y-auto overflow-x-hidden py-3 lg:block ">
        <PreviewHeader
          post={post}
          refreshData={refreshData}
          session={session}
          user={user}
        >
          {children}
        </PreviewHeader>
        <Link
          href={`/profile/${post?.author}`}
          className="mb-5 flex flex-1 space-x-2  px-2 py-3 "
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
            <span className="block pt-0 text-left text-xs text-gray-500">
              {getCreatedDate(post)}
            </span>
          </h4>
          <p>{post?.captions ?? ""}</p>
        </Link>
        <PreviewComment comment={comments} />
        <div className="absolute bottom-0 hidden w-full border-t border-gray-500 border-opacity-50 px-2 lg:block">
          <ActionButton
            ssr={true}
            refreshData={refreshData}
            commentOpen={true}
            likes={likes}
            post={post ?? []}
            savedPosts={savedPosts}
            setCommentOpen={setCommentOpen}
            uid={session?.user.uid as string}
          />
          <Likes likesCount={likes} session={session} />
          <div className="py-2">
            <Comments
              ssr={false}
              post={post ?? []}
              commentOpen={commentOpen}
              comments={comments ?? []}
              session={session}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
