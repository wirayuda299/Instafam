import Image from "next/image";
import { IUserPostProps } from "@/types/post";
import { getCreatedDate } from "@/util/postDate";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { imageLoader } from "@/util/imageLoader";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import useLikes from "@/hooks/useLikes";
import useSavedPosts from "@/hooks/useSavedPosts";
const Comments = dynamic(() => import("@/components/Card/Post/Comments"));
const ActionButton = dynamic(
  () => import("@/components/Card/Post/ActionButton")
);

type Props = {
  post: IUserPostProps;
  commentOpen: boolean;
  setCommentOpen: Dispatch<SetStateAction<boolean>>;
  refreshData: () => void;
  session: Session | null;
};

export default function PostHeaderMobile({
  post,
  commentOpen,
  refreshData,
  setCommentOpen,
}: Props) {
  const { data: session } = useSession();
  const { likesCount } = useLikes(post);
  const { savedPosts } = useSavedPosts(session, post);
  return (
    <figure className="shadow-sm">
      <div className="py-2 lg:hidden">
        <Link
          href={`/profile/${post?.author}`}
          className="flex cursor-pointer items-center space-x-2"
        >
          <Image
            src={post?.postedByPhotoUrl ?? ""}
            width={40}
            priority
            height={40}
            className="rounded-full bg-gradient-to-bl from-pink-600 to-orange-600 p-0.5"
            alt={post?.captions ?? "post"}
          />
          <div>
            <h1 className="text-sm font-bold">{post?.author}</h1>
            <p className="text-xs">{getCreatedDate(post)}</p>
          </div>
        </Link>
      </div>
      <Image
        src={post?.image}
        width={1300}
        height={1300}
        sizes="100vw"
        placeholder="blur"
        quality={60}
        loader={() =>
          imageLoader({ src: post?.image, width: 1300, quality: 10 })
        }
        blurDataURL={
          "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////2wBDAf//////////////////////////////////////////////////////////////////////////////////////wAARCAACAAMDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwBaKKKAP//Z"
        }
        alt={post?.captions ?? "post"}
        priority
        className="h-auto w-full rounded-md md:h-full lg:rounded-none"
      />
      {/* action button mobile */}
      <div className="block lg:hidden">
        <ActionButton
          ssr={false}
          refreshData={refreshData}
          commentOpen={commentOpen}
          likes={likesCount}
          post={post}
          savedPosts={savedPosts}
          setCommentOpen={setCommentOpen}
          uid={session?.user.uid as string}
        />
        <span
          className={`pl-1 text-xs ${
            likesCount?.length < 1 ? "hidden" : "block"
          }`}
        >
          {likesCount?.length} likes
        </span>
        <figcaption className="flex items-center space-x-2 p-2 text-2xl font-bold">
          <h2 className="text-sm">{post?.author}</h2>
          <p className="break-words text-xs">{post?.captions}</p>
        </figcaption>
        <Comments
          ssr={false}
          commentOpen={commentOpen}
          comments={post?.comments}
          post={post}
          session={session}
        />
      </div>
    </figure>
  );
}
