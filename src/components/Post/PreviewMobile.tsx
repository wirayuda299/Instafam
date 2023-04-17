import Image from "next/image";
import { IUserPostProps } from "@/types/post";
import { getCreatedDate } from "@/util/postDate";
import dynamic from "next/dynamic";
import Link from "next/link";
import { imageLoader } from "@/util/imageLoader";
import { AiOutlineClose } from "react-icons/ai";
import { useSelectedPostStore, usePostPreviewModalStore } from "@/stores/stores";
import { useStore } from "zustand";
const Comments = dynamic(() => import("@/components/Post/Comments"));
const ActionButton = dynamic(() => import("@/components/Post/ActionButton"));
const Likes = dynamic(() => import("./Likes"));
type PostComments = Pick<IUserPostProps, 'comments'>


type Props = {
  post: IUserPostProps | null;
  likes: string[],
  comments: PostComments['comments'],
  savedPosts: string[],
  user: any,
  refreshData: () => void,
  session : any,
  commentOpen: boolean,
  setCommentOpen: any

};

export default function PreviewMobile({ post, comments, likes, refreshData, savedPosts,session,user, commentOpen,setCommentOpen }: Props) {
  const { setSelectedPost} = useStore(useSelectedPostStore)
  const {setPostPreviewModal} = useStore(usePostPreviewModalStore)
  const handleClick = () => {
    setSelectedPost(null)
    setPostPreviewModal(false)
  }

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
              <p className="text-xs text-left">{getCreatedDate(post)}</p>
            </Link>
          </div>
          <button onClick={handleClick}>
            <AiOutlineClose className="text-2xl" />
          </button>
        </div>
      </div>
      <Image
        src={post?.image ?? ""}
        width={1300}
        height={1300}
        sizes="100vw"
        placeholder="blur"
        quality={60}
        loader={() =>
          imageLoader({ src: post?.image ?? '', width: 1300, quality: 10 })
        }
        blurDataURL={
          "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////2wBDAf//////////////////////////////////////////////////////////////////////////////////////wAARCAACAAMDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwBaKKKAP//Z"
        }
        alt={post?.captions ?? "post"}
        priority
        className="h-auto w-full rounded-md md:h-full lg:rounded-none"
      />
      <div className="block lg:hidden">
        <ActionButton
          ssr={false}
          refreshData={refreshData}
          commentOpen={commentOpen}
          likes={likes}
          post={post as IUserPostProps}
          savedPosts={savedPosts}
          setCommentOpen={setCommentOpen}
          uid={user?.uid as string}
        />
        <Likes likesCount={likes} session={session} />
        <figcaption className="flex items-center space-x-2 p-2 text-2xl font-bold">
          <h2 className="text-sm">{post?.author}</h2>
          <p className="break-words text-xs">{post?.captions}</p>
        </figcaption>
        <Comments
          ssr={false}
          commentOpen={commentOpen}
          comments={comments}
          post={post as IUserPostProps}
          session={session}
        />
      </div>
    </figure>
  );
}
