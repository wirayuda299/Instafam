import {
  useSelectedPostStore,
  usePostCommentModalStore,
  usePostPreviewModalStore,
} from "@/stores/stores";
import { IUserPostProps } from "@/types/post";
import dynamic from "next/dynamic";
import { BsThreeDots } from "react-icons/bs";
import { useStore } from "zustand";

const PostDetailComment = dynamic(() => import("./Preview"), {
  ssr: true,
});
const Buttons = dynamic(() => import("@/components/Buttons/Buttons"), {
  ssr: true,
});
const PostImage = dynamic(() => import("./Image"), {
  ssr: true,
});

type CommentsProps = Pick<IUserPostProps, "comments">;

type props = {
  post: IUserPostProps;
  comments: CommentsProps["comments"];
  savedBy: string[];
  likes: string[];
  handleClick: () => void;
};

export default function PreviewLargeScreen(props: props) {
  const { post, comments, likes, savedBy, handleClick } = props;
  const { setSelectedPost } = useStore(useSelectedPostStore);
  const { setPostCommentModal } = useStore(usePostCommentModalStore);
  const { setPostPreviewModal } = useStore(usePostPreviewModalStore);

  return (
    <>
      <div className="hidden shadow-sm lg:block">
        <PostImage post={post} classNames="w-full h-full object-cover"/>
      </div>
      <PostDetailComment
        setPostCommentModal={setPostCommentModal}
        setPostPreviewModal={setPostPreviewModal}
        setSelectedPost={setSelectedPost}
        comments={comments}
        likes={likes}
        savedBy={savedBy}
        post={post}
      >
        <Buttons onClick={handleClick} name="menu" title="menu">
          <BsThreeDots size={20} />
        </Buttons>
      </PostDetailComment>
    </>
  );
}
