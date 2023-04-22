import Feeds from "@/components/Feeds";
import { getAllPosts } from "@/helper/getPosts";
import { IUserPostProps } from "@/types/post";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

type Props = {
  posts: IUserPostProps[];
  lastPost: IUserPostProps | null;
};
const FeedModal = dynamic(() => import("@/components/Modal/Feed"), {
  ssr: true,
});


export default function Trending({ posts }: Props) {

  return (
    <div className="h-screen w-full overflow-y-auto">
      <div className="md:container columns-3 md:mx-auto md:p-5 gap-0 md:gap-5 md:grid md:grid-cols-3">
        {posts?.map((post, i) => (
          <div key={`${post.postId}`}>
              <div className="hidden md:block">
                <Feeds post={post} />
              </div>
            <Link
              href={`/post/${post.postId}`}
              shallow
              prefetch
              as={`/post/${post.postId}`}
              className={`w-full md:hidden `}
              key={post.postId}>
              <Image
                src={post.image}
                alt={post.captions ?? post.author}
                width={1000}
                priority
                height={2000}
                className={`${i % 2 === 0 ? 'aspect-video' : 'aspect-square'} w-full object-cover h-full`}
              />
            </Link>
          </div>
        ))}
      </div>
      <FeedModal />
    </div>
  );
}

export async function getServerSideProps({ res }: any) {
  const posts = await getAllPosts();
  res.setHeader(
    "Cache-Control",
    "public, maxage=60, stale-while-revalidate"
  );
  return {
    props: {
      posts,
    },
  };
}
