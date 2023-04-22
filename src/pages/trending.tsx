import { getAllPosts } from "@/helper/getPosts";
import { usePostModalStore, useSelectedPostStore } from "@/stores/stores";
import { IUserPostProps } from "@/types/post";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useStore } from "zustand";

type Props = {
  posts: IUserPostProps[];
  lastPost: IUserPostProps | null;
};
const FeedModal = dynamic(() => import("@/components/Modal/Feed"), {
  ssr: true,
});

const PostModal = dynamic(() => import("@/components/Modal/Post/Post"), {
  ssr: true,
});

const Feeds = dynamic(() => import("@/components/Feeds"), {
  ssr: true,
});

export default function Trending({ posts }: Props) {
  const {setSelectedPost} = useStore(useSelectedPostStore)
  const {setPostModal} = useStore(usePostModalStore)

  return (
    <div className="h-screen w-full overflow-y-auto">
      <div className="md:container columns-3 md:mx-auto md:p-5 gap-0 md:gap-5 md:grid md:grid-cols-3">
        {posts?.map((post, i) => (
          <div key={`${post.postId}`}>
            <div className="hidden md:block">
              <Feeds post={post} index={i} />
            </div>
            <div
            onClick={() => {
              setSelectedPost(post)
              setPostModal(true)
            }}
              className={`w-full md:hidden cursor-pointer`}>
              <Image
                src={post.image}
                alt={post.captions ?? post.author}
                width={1000}
                loading="lazy"
                placeholder="blur"
                blurDataURL={
                  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAACAAMDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDpbiR1mYB2A46H2ooooEf/2Q=="
                }
                quality={60}
                height={2000}
                className={`${i % 2 === 0 ? 'aspect-video' : 'aspect-square'} !w-full object-cover object-top h-full`}
              />
            </div>
          </div>
        ))}
      </div>
      <FeedModal />
      <PostModal/>
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
