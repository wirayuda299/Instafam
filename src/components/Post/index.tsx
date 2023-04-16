import { memo, useMemo, useState } from "react";
import { IUserPostProps } from "@/types/post";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { Session } from "next-auth";
import { imageLoader } from "@/util/imageLoader";
import useUser from "@/hooks/useUser";
import usePost from "@/hooks/usePost";

const Likes = dynamic(() => import("./Likes"));
const ActionButton = dynamic(() => import("./ActionButton"));
const PostHeader = dynamic(() => import("./Header"));
const Author = dynamic(() => import("./Author"));
const Comments = dynamic(() => import("./Comments"));
const MenuModal = dynamic(() => import("../Modal/Menu"));
const ReportModal = dynamic(() => import("../Modal/Report"));

type Props = {
  post: IUserPostProps;
  session: Session | null;
};

function PostCard({ post, session }: Props) {
  const [commentOpen, setCommentOpen] = useState<boolean>(false);
  const { replace, asPath } = useRouter();
  const refreshData = () => replace(asPath);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { likesCount, comment } = usePost(post);
  const { user, savedPosts } = useUser(session?.user.uid as string);

  const ActionsButtons = useMemo(() => {
    return (
      <>
        <ActionButton
          ssr={false}
          refreshData={refreshData}
          savedPosts={savedPosts}
          likes={likesCount}
          post={post}
          uid={session?.user?.uid as string}
          commentOpen={commentOpen}
          setCommentOpen={setCommentOpen}
        />
      </>
    )
  }, [likesCount, commentOpen, savedPosts])

  const PostComments = useMemo(() => {
    return (
      <>
        <Comments
          ssr={false}
          comments={comment}
          post={post}
          session={session}
          commentOpen={commentOpen}
        />
      </>
    )
  }, [comment, commentOpen])

  const PostHeaders = useMemo(() => {
    return (
      <>
        <PostHeader
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          post={post}
        />
      </>
    )
  }, [post])

  const AuthorInfo = useMemo(() => {
    return (
      <>
        <Author post={post} />
      </>
    )
  }, [post])

  const PostLikes = useMemo(() => {
    return (
      <>
        <Likes likesCount={likesCount} session={session} />
      </>
    )
  }, [likesCount])

  const MenuModalComponent = useMemo(() => {
    return (
      <>
        <MenuModal
          isMenuOpen={isMenuOpen}
          post={post}
          refreshData={refreshData}
          session={session}
          setIsMenuOpen={setIsMenuOpen}
          ssr={false}
          users={user}
        />
      </>
    )
  }, [isMenuOpen])

  const ReportModalComponent = useMemo(() => {
    return (
      <>
        <ReportModal session={session} />
      </>
    )
  }, [session])


  return (
    <div className="relative mb-5 w-full">
      <div className="rounded-sm bg-white shadow-lg dark:border-black dark:bg-black dark:text-white ">
        {PostHeaders}
        <Image
          src={post?.image}
          width={1300}
          height={1300}
          sizes="100vw"
          placeholder="blur"
          blurDataURL={
            "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////2wBDAf//////////////////////////////////////////////////////////////////////////////////////wAARCAACAAMDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwBaKKKAP//Z"
          }
          quality={60}
          loader={() =>
            imageLoader({ src: post?.image, width: 1300, quality: 10 })
          }
          priority
          className="h-auto w-full rounded-lg object-cover"
          alt={post?.author ?? "user post image"}
        />
        {ActionsButtons}
        {PostLikes}
        {AuthorInfo}
        {PostComments}
        {MenuModalComponent}
        {ReportModalComponent}
      </div>
    </div>
  );
}
export default memo(PostCard);
