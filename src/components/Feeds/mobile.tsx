import { IUserPostProps } from "@/types/post";
import Image from "next/image";
import PostInfo from "./PostInfo";
import ActionButton from "../Post/ActionButton";
import useUser from "@/hooks/useUser";
import { useSession } from "next-auth/react";
import usePost from "@/hooks/usePost";
import Comments from "../Post/Comments";

type Props = {
  post: IUserPostProps;
  handleClick: () => void;
  mobileView: boolean;
};
export default function Mobile({ post, handleClick, mobileView }: Props) {
  const refreshData = () => {};
  const { data: session } = useSession();
  const { savedPosts } = useUser(session?.user?.uid as string);
  const { likes, comments } = usePost(post);
  return (
    <div
      className="group relative block cursor-pointer shadow-lg md:scale-75 lg:hidden"
      onClick={handleClick}
    >
      <div className="">
        <Image
          src={post?.image}
          width={1300}
          height={1300}
          sizes="100vw"
          placeholder="blur"
          blurDataURL={'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAACAAMDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDpbiR1mYB2A46H2ooooEf/2Q=='}
          priority
          quality={60}
          className="mb-5 h-full w-full rounded-lg object-cover"
          alt={post?.author ?? "user post image"}
        />
        <PostInfo post={post} />
        {mobileView && (
          <>
            <ActionButton
              likes={likes}
              post={post}
              refreshData={refreshData}
              savedPosts={savedPosts}
              ssr={false}
              uid={session?.user.uid as string}
            />
            <Comments
              comments={comments}
              post={post}
              session={session}
              ssr={false}
            />
          </>
        )}
      </div>
    </div>
  );
}
