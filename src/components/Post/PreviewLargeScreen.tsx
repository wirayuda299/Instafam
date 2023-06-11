import { useDarkModeStore } from "@/stores/stores";
import type { Session } from "next-auth";
import dynamic from "next/dynamic";
import type { FC } from "react";
import { BsThreeDots } from "react-icons/bs";
import { useStore } from "zustand";
const Likes = dynamic(() => import("./Likes"));
const CommentsForm = dynamic(() => import("@/components/Comments/Forms"));
const ActionButton = dynamic(() => import("@/components/Post/ActionButton"));
const Comment = dynamic(() => import("@/components/Comments/Comment"));
const PostHeader = dynamic(() => import("@/components/Header/PostHeader"));
const Empty = dynamic(() => import("../Comments/Empty"));

const PostImage = dynamic(() => import("./Image"), {
  ssr: true,
});

type CommentsProps = Pick<IUserPostProps, "comments">;

type Props = {
  post: IUserPostProps;
  comments: CommentsProps["comments"];
  savedBy: string[];
  likes: string[];
  handleClick: () => void;
  session: Session | null;
};

const PreviewLargeScreen: FC<Props> = (props) => {
  const { post, comments, likes, savedBy, handleClick, session } = props;
  const { darkMode } = useStore(useDarkModeStore);
  return (
    <>
      <div className="hidden shadow-sm lg:block">
        <PostImage post={post} />
      </div>
      <div
        className={`relative hidden md:block ${
          darkMode ? "bg-black text-white" : "bg-white text-black"
        }`}
      >
        <div className="hidden h-full max-h-[400px] overflow-y-auto  overflow-x-hidden py-3 lg:block ">
          <div className="absolute top-0 w-full border-b border-gray-500 border-opacity-50 px-2">
            <PostHeader post={post}>
              <button onClick={handleClick} className="text-2xl">
                <BsThreeDots />
              </button>
            </PostHeader>
          </div>
          <div className={comments.length < 1 ? "mt-32" : ""}>
            <div className="pt-11 ">
              <Empty />
            </div>
            <Comment comments={comments} />
          </div>
          <div
            className={`absolute bottom-0 hidden w-full border-t border-gray-500 border-opacity-50 px-2 lg:block ${
              darkMode ? "bg-black" : "bg-white"
            }`}
          >
            <ActionButton
              likes={likes}
              post={post ?? []}
              savedBy={savedBy}
              uid={session?.user.uid as string}
            />
            <Likes likesCount={likes} uid={session?.user.uid as string} />
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
    </>
  );
};
export default PreviewLargeScreen;
