import { IUserPostProps } from "@/types/post";
import { ReactNode } from "react";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { useStore } from "zustand";
import { useDarkModeStore } from "@/stores/stores";
const Likes = dynamic(() => import("./Likes"));
const CommentsForm = dynamic(() => import("@/components/Comments/Forms"));
const ActionButton = dynamic(() => import("@/components/Post/ActionButton"));
const Comment = dynamic(() => import("@/components/Comments/Comment"));
const PostHeader = dynamic(() => import("@/components/Header/PostHeader"));

type Props = {
  post: IUserPostProps;
  children?: ReactNode;
  comments: {
    commentByUid: string;
    comment: string;
    commentByName: string;
    commentByPhoto: string;
    createdAt: string | number;
  }[];
  likes: string[];
  savedBy: string[];
};

export default function PostDetailComment(props: Props) {
  const { post, children, comments, likes, savedBy } = props;
  const { data: session } = useSession();
  const { darkMode } = useStore(useDarkModeStore);

  return (
    <div
      className={`relative hidden md:block ${darkMode ? "bg-black text-white" : "bg-white text-black"
        }`}
    >
      <div className="hidden h-full max-h-[400px] overflow-y-auto  overflow-x-hidden py-3 lg:block ">
        <div className="border-b border-opacity-50 border-gray-500">
          <PostHeader post={post}>
            {children}
          </PostHeader>
        </div>
        <div className="px-2">
          <Comment comments={comments} />
        </div>
        <div
          className={`absolute bottom-0 hidden w-full border-t border-gray-500 border-opacity-50 px-2 lg:block ${darkMode ? "bg-black" : "bg-white"
            }`}
        >
          <ActionButton
            likes={likes}
            post={post ?? []}
            savedBy={savedBy}
            uid={session?.user.uid as string}
          />
          <Likes likesCount={likes} session={session} />
          <div className="py-2">
            <CommentsForm
              post={post ?? []}
              comments={comments ?? []}
              session={session}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
