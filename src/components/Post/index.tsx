import { useState } from "react";
import { IUserPostProps } from "@/types/post";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { imageLoader } from "@/util/imageLoader";
import useUser from "@/hooks/useUser";
import usePost from "@/hooks/usePost";
import { useSession } from "next-auth/react";
import { useDarkModeStore } from "@/stores/stores";
import { useStore } from "zustand";

const Likes = dynamic(() => import("./Likes"));
const ActionButton = dynamic(() => import("./ActionButton"));
const PostHeader = dynamic(() => import("./Header"));
const Author = dynamic(() => import("./Author"));
const Comments = dynamic(() => import("./Comments"));

type Props = {
  post: IUserPostProps;
};

export default function PostCard({ post }: Props) {
  const [commentOpen, setCommentOpen] = useState<boolean>(false);
  const { replace, asPath } = useRouter();
  const refreshData = () => replace(asPath);
  const { likes, comments } = usePost(post);
  const { data: session } = useSession();
  const { savedPosts } = useUser(session?.user.uid as string);
  const { darkMode } = useStore(useDarkModeStore);

  return (
    <div className={`relative mb-5 w-full`}>
      <div
        className={`rounded-sm shadow-lg  ${
          darkMode ? "bg-black text-white" : "bg-white text-black"
        }`}
      >
        <PostHeader post={post} />
        <Image
          src={post?.image}
          width={1300}
          height={1300}
          sizes="(max-width: 1300px) 100vw, 500px"
          placeholder="blur"
          blurDataURL={Buffer.from(post?.image as string).toString("base64")}
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
          likes={likes}
          post={post}
          uid={session?.user?.uid as string}
          commentOpen={commentOpen}
          setCommentOpen={setCommentOpen}
        />
        <Likes likesCount={likes} session={session} />
        <Author post={post} />
        <Comments
          ssr={false}
          comments={comments}
          post={post}
          session={session}
          commentOpen={commentOpen}
        />
      </div>
    </div>
  );
}
