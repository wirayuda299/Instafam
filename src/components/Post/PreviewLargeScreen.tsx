import {
  useSelectedPostStore,
  usePostCommentModalStore,
  usePostPreviewModalStore,
} from "@/stores/stores";
import { IUserPostProps } from "@/types/post";
import dynamic from "next/dynamic";
import { BsThreeDots } from "react-icons/bs";
import { useStore } from "zustand";
import Image from "next/image";

const PostDetailComment = dynamic(() => import("./Preview"), {
  ssr: true,
});
const Buttons = dynamic(() => import("@/components/Buttons/Buttons"), {
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
        <Image
          src={post?.image}
          width={1300}
          height={1300}
          sizes="(max-width: 1300px) 100vw, 500px"
          placeholder="blur"
          blurDataURL={
            "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAACAAMDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDpbiR1mYB2A46H2ooooEf/2Q=="
          }
          quality={60}
          priority
          className="post h-full w-full object-cover"
          alt={post?.author ?? "user post image"}
        />
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
