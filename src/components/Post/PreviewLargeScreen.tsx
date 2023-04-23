import { IUserPostProps } from "@/types/post";
import dynamic from "next/dynamic";
import { BsThreeDots } from "react-icons/bs";

const PostImage = dynamic(() => import("@/components/Post/Image"), {
  ssr: true,
});
const PostDetailComment = dynamic(() => import("./Preview"), {
  ssr: true,
});
const Buttons = dynamic(() => import("@/components/Buttons/Buttons"), {
  ssr: true,
});

type props = {
  post: IUserPostProps;
  comments: {
    commentByUid: string;
    comment: string;
    commentByName: string;
    commentByPhoto: string;
    createdAt: string | number;
  }[]
  savedBy: string[];
  likes: string[];
  handleClick: () => void;
}

export default function PreviewLargeScreen(props: props) {
  const { post, comments, likes, savedBy, handleClick } = props;
  return (
    <>
      <div className="hidden shadow-sm lg:block">
        <PostImage post={post} />
      </div>
      <PostDetailComment
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
  )
}
