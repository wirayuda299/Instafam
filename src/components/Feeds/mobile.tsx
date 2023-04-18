import { IUserPostProps } from "@/types/post"
import Image from "next/image"
import PostInfo from "./PostInfo"
import { imageLoader } from "@/util/imageLoader"
import ActionButton from "../Post/ActionButton"
import useUser from "@/hooks/useUser"
import { useSession } from "next-auth/react"
import usePost from "@/hooks/usePost"
import Comments from "../Post/Comments"

type Props = {
  post: IUserPostProps
  handleClick: () => void
  mobileView: boolean
}
export default function Mobile({ post, handleClick, mobileView }: Props) {
  const refreshData = () => { }
  const { data: session } = useSession()
  const { savedPosts } = useUser(session?.user?.uid as string)
  const { likes, comments } = usePost(post)
  return (
    <div
      className="group relative cursor-pointer shadow-lg block md:scale-75 lg:hidden"
      onClick={handleClick}>
      <div className="">
        <Image
          src={post?.image}
          width={1300}
          height={1300}
          sizes="100vw"
          placeholder="blur"
          blurDataURL={Buffer.from(post?.image as string).toString()}
          loader={() => imageLoader({ src: post?.image, width: 40, quality: 10 })}
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
            <Comments comments={comments} post={post} session={session} ssr={false} />
          </>
        )}
      </div>
    </div>
  )
}
