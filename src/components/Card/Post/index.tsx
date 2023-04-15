import { memo, useState } from "react";
import { IUserPostProps } from "@/types/post";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { Session } from "next-auth";
import { z } from "zod";
import { PostSchema } from "@/schema/PostSchema";
import { SessionSchema } from "@/schema/comment";
import { imageLoader } from "@/util/imageLoader";
import useLikes from "@/hooks/useLikes";
import useComments from "@/hooks/useComments";
import useSavedPosts from "@/hooks/useSavedPosts";
import useUser from "@/hooks/useUser";
const ActionButton = dynamic(() => import("./ActionButton"));
const PostHeader = dynamic(() => import("./Header"));
const Author = dynamic(() => import("./Author"));
const Comments = dynamic(() => import("./Comments"));
const MenuModal = dynamic(() => import("../../Modal/Menu"));
const ReportModal = dynamic(() => import("../../Modal/Report"));
export interface IPostCardProps {
  post: IUserPostProps;
  session: Session | null;
}
export const PostCardSchema = z.object({
  post: PostSchema,
  session: SessionSchema,
});
function PostCard({ post, session }: IPostCardProps) {
  const [commentOpen, setCommentOpen] = useState<boolean>(false);
  const { replace, asPath } = useRouter();
  const refreshData = () => replace(asPath);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { likesCount } = useLikes(post);
  const { comment } = useComments(post);
  const { savedPosts } = useSavedPosts(session, post);
  const { user } = useUser(session?.user.uid as string);

  return (
    <div className="relative mb-5 w-full">
      <div className="rounded-sm bg-white shadow-lg dark:border-black dark:bg-black dark:text-white ">
        <PostHeader
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          session={session}
          post={post}
        />
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
        {likesCount && likesCount.length > 0 ? (
          <div className="mb-4 mt-1 px-1 text-xs font-light tracking-wider flex ">
            {likesCount.includes(session?.user?.uid as string) ? (
              <p className="flex space-x-1 gap-1 items-center">
                {likesCount.length > 1 ? "You  " : "liked by You "}
                <span
                  className={`${
                    likesCount.length - 1 < 1 ? "hidden" : "block"
                  }`}
                > 
                   and {likesCount.length - 1} others
                </span>
              </p>
            ) : (
              <span>
                {likesCount.length} {likesCount.length > 1 ? "likes" : "like"}
              </span>
            )}
          </div>
        ) : null}
        <Author post={post} />
        <Comments
          ssr={false}
          comments={comment}
          post={post}
          session={session}
          commentOpen={commentOpen}
        />
        <MenuModal
          isMenuOpen={isMenuOpen}
          post={post}
          refreshData={refreshData}
          session={session}
          setIsMenuOpen={setIsMenuOpen}
          ssr={false}
          users={user}
        />
        <ReportModal session={session} />
      </div>
    </div>
  );
}
export default memo(PostCard);
