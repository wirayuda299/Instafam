import { IUserPostProps } from "@/types/post";
import { ReactNode } from "react";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { useStore } from "zustand";
import { useDarkModeStore, usePostCommentModalStore, usePostPreviewModalStore, useSelectedPostStore } from "@/stores/stores";
const Likes = dynamic(() => import("./Likes"));
const CommentsForm = dynamic(() => import("@/components/Comments/Forms"));
const ActionButton = dynamic(() => import("@/components/Post/ActionButton"));
const Comment = dynamic(() => import("@/components/Comments/Comment"));
const PostHeader = dynamic(() => import("@/components/Header/PostHeader"));
const Empty = dynamic(() => import("../Comments/Empty"))

type CommentsProps = Pick<IUserPostProps, "comments">;
type Props = {
  post: IUserPostProps;
  children?: ReactNode;
  comments: CommentsProps["comments"];
  likes: string[];
  savedBy: string[];
  setSelectedPost: (post: IUserPostProps | null) => void;
  setPostCommentModal: (postCommentModal: boolean) => void
  setPostPreviewModal: (postPreviewModal: boolean) => void

};

export default function PostDetailComment(props: Props) {
  const { post, children, comments, likes, savedBy, setSelectedPost, setPostCommentModal, setPostPreviewModal } = props;
  const { data: session } = useSession();
  const { darkMode } = useStore(useDarkModeStore);


  return (
    <div
      className={`relative hidden md:block ${darkMode ? "bg-black text-white" : "bg-white text-black"
        }`}
    >
      <div className="hidden h-full max-h-[400px] overflow-y-auto  overflow-x-hidden py-3 lg:block ">
        <div className="border-b border-opacity-50 absolute top-0 w-full border-gray-500">
          <PostHeader post={post}>
            {children}
          </PostHeader>
        </div>
        <div className="px-2">
          <div className="pt-24">
            <Empty comments={comments} />
          </div>
          <Comment comments={comments} />
        </div>
        <div
          className={`absolute bottom-0 hidden w-full border-t border-gray-500 border-opacity-50 px-2 lg:block ${darkMode ? "bg-black" : "bg-white"
            }`}
        >
          <ActionButton
            setPostCommentModal={setPostCommentModal}
            setPostPreviewModal={setPostPreviewModal}
            setSelectedPost={setSelectedPost}
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
