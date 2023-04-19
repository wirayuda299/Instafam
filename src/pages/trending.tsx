import PostInfo from "@/components/Feeds/PostInfo";
import { getPostByLikes } from "@/helper/getPosts";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { IUserPostProps } from "@/types/post";
import Image from "next/image";
import { RiLoader2Line } from "react-icons/ri";

type Props = {
  posts: IUserPostProps[]
  lastPost: IUserPostProps | null
}

export default function Trending({ posts, lastPost }: Props) {
  const { ref, loading, postsState, inView } = useInfiniteScroll(lastPost)
  const merged = [...posts, ...postsState]

  return (
    <div className="w-full  h-screen overflow-y-auto p-5">
      <div className="w-full">
        <h1 className="text-2xl font-semibold text-center py-5 sm:text-5xl md:py-10">Trending</h1>
      </div>
      <div className="w-full h-full">
        <div className="container mx-auto gap-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 overflow-y-auto">
          {merged.map((post) => (
            <div key={post.postId} className="relative group">
              <Image className="rounded-lg" src={post.image} width={1300} height={1300} alt={post.captions ?? post.author} />
              <PostInfo post={post} />
            </div>
          ))}
          {loading && (
            <RiLoader2Line className="mx-auto animate-spin text-gray-500" size={50} />
          )
          }
          <div ref={ref}></div>
        </div>




      </div>

    </div >
  )
}

export async function getServerSideProps() {
  const posts = await getPostByLikes(10)
  const highestLikes = posts.sort((a, b) => b.likedBy.length - a.likedBy.length)


  return {
    props: {
      posts: highestLikes ?? [],
      lastPost: highestLikes[highestLikes.length - 1] ?? null
    },
  };
}