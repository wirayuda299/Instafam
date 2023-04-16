import { IUserPostProps } from "@/types/post";
import { imageLoader } from "@/util/imageLoader";
import dynamic from "next/dynamic";
import Image from "next/image";
import { memo, useState } from "react";
import { useRouter } from "next/router";
const PostInfo = dynamic(() => import("./PostInfo"));
const FeedModal = dynamic(() => import("./Modal"));

function ExplorePostCard({ post }: { post: IUserPostProps }) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [commentOpen, setCommentOpen] = useState<boolean>(false);
  const { asPath, replace } = useRouter();
  const refreshData = () => replace(asPath);
  return (
    <div
      className="group relative cursor-pointer shadow-lg"
      onClick={() => setIsModalOpen(true)}
    >
      <div className="rounded-sm bg-white shadow-lg dark:border-black dark:bg-black dark:text-white ">
        <Image
          src={post?.image}
          width={1300}
          height={1300}
          sizes="100vw"
          placeholder="blur"
          blurDataURL={
            "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////2wBDAf//////////////////////////////////////////////////////////////////////////////////////wAARCAACAAMDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwBaKKKAP//Z"
          }
          priority
          quality={60}
          loader={() =>
            imageLoader({ src: post?.image, width: 1300, quality: 10 })
          }
          className="mb-5  h-auto w-full rounded-lg object-cover"
          alt={post?.author ?? "user post image"}
        />
        <PostInfo post={post} />
        <FeedModal
          commentOpen={commentOpen}
          isModalOpen={isModalOpen}
          post={post}
          refreshData={refreshData}
          setCommentOpen={setCommentOpen}
          setIsModalOpen={setIsModalOpen}
        />
      </div>
    </div>
  );
}
export default memo(ExplorePostCard);
