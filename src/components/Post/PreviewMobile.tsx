import Image from "next/image";
import { IUserPostProps } from "@/types/post";
import { getCreatedDate } from "@/util/postDate";
import dynamic from "next/dynamic";
import Link from "next/link";
import { imageLoader } from "@/util/imageLoader";
import { AiOutlineClose } from "react-icons/ai";
import {
  useSelectedPostStore,
  usePostPreviewModalStore,
} from "@/stores/stores";
import { useStore } from "zustand";
import { MouseEvent } from "react";
const Comments = dynamic(() => import("@/components/Post/Comments"));
const ActionButton = dynamic(() => import("@/components/Post/ActionButton"));
const Likes = dynamic(() => import("./Likes"));
type PostComments = Pick<IUserPostProps, "comments">;

type Props = {
  post: IUserPostProps | null;
  likes: string[];
  comments: PostComments["comments"];
  savedPosts: string[];
  user: any;
  refreshData: () => void;
  session: any;
  commentOpen: boolean;
};

export default function PreviewMobile({
  post,
  comments,
  likes,
  refreshData,
  savedPosts,
  session,
  user,
  commentOpen,
}: Props) {
  const { setSelectedPost } = useStore(useSelectedPostStore);
  const { setPostPreviewModal } = useStore(usePostPreviewModalStore);
  const handleClick = (e:MouseEvent) => {
    e.stopPropagation();
    setSelectedPost(null);
    setPostPreviewModal(false);
  };

  return (
    <figure className="shadow-sm">
      <div className="py-2 lg:hidden">
        <div className="flex items-center justify-between">
          <div className="flex cursor-pointer items-center space-x-2 ">
            <Image
              src={post?.postedByPhotoUrl ?? ""}
              width={40}
              priority
              height={40}
              className="rounded-full bg-gradient-to-bl from-pink-600 to-orange-600 p-0.5"
              alt={post?.captions ?? "post"}
            />
            <Link href={`/profile/${post?.author}`}>
              <h1 className="text-sm font-bold">{post?.author}</h1>
              <p className="text-left text-xs">{getCreatedDate(post)}</p>
            </Link>
          </div>
          <button onClick={(e) => handleClick(e)}>
            <AiOutlineClose className="text-2xl" />
          </button>
        </div>
      </div>
      <Image
        src={post?.image ?? ""}
        width={1300}
        height={1300}
        sizes="100vw"
        
        quality={60}
        loader={() =>
          imageLoader({ src: post?.image ?? "", width: 1300, quality: 10 })
        }
        alt={post?.captions ?? "post"}
        priority
        className="h-auto w-full rounded-md md:h-full lg:rounded-none"
      />
      <div className="block lg:hidden">
        <ActionButton
          ssr={false}
          refreshData={refreshData}
          likes={likes}
          post={post as IUserPostProps}
          savedPosts={savedPosts}
          uid={user?.uid as string}
        />
        <Likes likesCount={likes} session={session} />
        <figcaption className="flex items-center space-x-2 p-2 text-2xl font-bold">
          <h2 className="text-sm">{post?.author}</h2>
          <p className="break-words text-xs">{post?.captions}</p>
        </figcaption>
        <Comments
          ssr={false}
          comments={comments}
          post={post as IUserPostProps}
          session={session}
        />
      </div>
    </figure>
  );
}
