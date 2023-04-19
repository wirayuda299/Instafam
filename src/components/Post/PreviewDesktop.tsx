import Image from "next/image";
import { IUserPostProps } from "@/types/post";
import { getCreatedDate } from "@/util/postDate";
import { ReactNode } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useStore } from "zustand";
import { useDarkModeStore } from "@/stores/stores";

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
};

export default function PostCommentsDesktop({
  post,
  children,
  refreshData,
  comments,
  likes,
  savedPosts,
  user,
}: Props) {
  const { data: session } = useSession();
  const {darkMode} = useStore(useDarkModeStore)

  return (
    <div className={`relative hidden md:block ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
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
            className="rounded-full"
            placeholder="blur"
            blurDataURL={'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAACAAMDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDpbiR1mYB2A46H2ooooEf/2Q=='}
          />
          <h4 className="pr-3 font-semibold ">
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
            likes={likes}
            post={post ?? []}
            savedPosts={savedPosts}
            uid={session?.user.uid as string}
          />
          <Likes likesCount={likes} session={session} />
          <div className="py-2">
            <Comments
              ssr={false}
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
