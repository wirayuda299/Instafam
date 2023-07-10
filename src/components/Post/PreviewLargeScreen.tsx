import type { Session } from "next-auth";
import dynamic from "next/dynamic";
import type { FC } from "react";
import { BsThreeDots } from "react-icons/bs";
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
  return (
    <>
      <div className="hidden shadow-sm lg:block">
        <PostImage post={post} />
      </div>
      <div className="relative hidden bg-white text-black dark:bg-black dark:text-white md:block ">
        <div className="hidden h-full max-h-[400px] overflow-y-auto  overflow-x-hidden py-3 lg:block ">
          <div className="absolute top-0 w-full border-b border-gray-500 border-opacity-50 px-2">
            <PostHeader post={post}>
              <button onClick={handleClick} className="text-2xl">
                <BsThreeDots />
              </button>
            </PostHeader>
          </div>
          <div
            className={
              comments.length < 1
                ? "flex h-full w-full items-center justify-center"
                : ""
            }
          >
            {comments.length < 1 ? (
              <Empty />
            ) : (
              <div className="pl-4 pt-11">
                <Comment comments={comments} />
              </div>
            )}
          </div>
          <div className="absolute bottom-0 hidden w-full border-t border-gray-500 border-opacity-50 bg-white px-2 dark:bg-black lg:block">
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
