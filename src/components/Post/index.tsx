import { IUserPostProps } from "@/types/post";
import Image from "next/image";
import dynamic from "next/dynamic";
import usePost from "@/hooks/usePost";
import { useSession } from "next-auth/react";
import {
  useDarkModeStore,
  useMenuModalStore,
  useSelectedPostStore,
} from "@/stores/stores";
import { useStore } from "zustand";
import { BsThreeDots } from "react-icons/bs";

const Likes = dynamic(() => import("./Likes"));
const ActionButton = dynamic(() => import("./ActionButton"));
const PostHeader = dynamic(() => import("./Header"));
const Author = dynamic(() => import("./Author"));
const Comments = dynamic(() => import("./Comments"));

type Props = {
  post: IUserPostProps;
  refreshData: () => void;
};

export default function PostCard({ post, refreshData }: Props) {

  const { likes, comments, savedBy } = usePost(post);
  const { data: session } = useSession();
  const { darkMode } = useStore(useDarkModeStore);
  const { setSelectedPost } = useStore(useSelectedPostStore);
  const { menuModal, setMenuModal } = useStore(useMenuModalStore);

  const handleClick = () => {
    setMenuModal(!menuModal);
    setSelectedPost(post);
  };

  return (
    <div className={`relative mb-5 w-full`}>
      <div
        className={`rounded-sm shadow-lg  ${
          darkMode ? "bg-black text-white" : "bg-white text-black"
        }`}
      >
        <PostHeader post={post}>
          <div>
            <button
              type="button"
              name="menu"
              title="menu"
              onClick={handleClick}
            >
              <BsThreeDots className="text-gray-500" size={20} />
            </button>
          </div>
        </PostHeader>
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
          className="post h-auto w-full rounded-lg object-cover"
          alt={post?.author ?? "user post image"}
        />
        <ActionButton
          ssr={false}
          refreshData={refreshData}
          savedBy={savedBy}
          likes={likes}
          post={post}
          uid={session?.user?.uid as string}
        />
        <Likes likesCount={likes} session={session} />
        <Author post={post} />
        <Comments
          ssr={false}
          comments={comments}
          post={post}
          session={session}
        />
      </div>
    </div>
  );
}
