import Form from "@/components/Search/Form";
import {
  useFeedModalStore,
  usePostModalStore,
  useSelectedPostStore,
} from "@/stores/stores";
import { IUserPostProps } from "@/types/post";
import dynamic from "next/dynamic";
import Image from "next/image";
import { AiOutlineSearch } from "react-icons/ai";
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

export default function Trending({ posts }: Props) {
  const { setSelectedPost } = useStore(useSelectedPostStore);
  const { setPostModal } = useStore(usePostModalStore);
  const { setFeedModal } = useStore(useFeedModalStore);

  return (
    <div className="h-screen w-full overflow-y-auto">
      <div className="md:hidden">
        <Form height="h-min">
          <button type="submit" name="Search" title="search">
            <AiOutlineSearch size={20} />
          </button>
        </Form>
      </div>
      <div className="m-0 columns-3 gap-0">
        {posts?.map((post, i) => (
          <div key={`${post.postId}`}>
            <button
              name="click to view the post"
              title="click to view the post"
              className={`hidden  h-max md:block ${i % 2 === 0 ? "aspect-square" : "aspect-video"
                }`}
              onClick={() => {
                setSelectedPost(post);
                setFeedModal(true);
              }}
            >
              <Image
                src={post.image}
                alt=""
                width={1200}
                height={1200}
                placeholder="blur"
                blurDataURL={post.image}
                className={`h-full w-full border object-cover object-top `}
                priority
              />
            </button>
            <div
              onClick={() => {
                setSelectedPost(post);
                setPostModal(true);
              }}
              className={`block w-full cursor-pointer md:hidden`}
            >
              <Image
                src={post.image}
                alt=""
                width={1200}
                height={1200}
                placeholder="blur"
                blurDataURL={post.image}
                className={`h-auto w-full border object-cover ${i % 2 === 0 ? "aspect-video" : "aspect-square"
                  }`}
                priority
              />
            </div>
          </div>
        ))}
      </div>
      <br className="md:hidden" />
      <br className="md:hidden" />
      <br className="md:hidden" />
      <FeedModal />
      <PostModal />
    </div>
  );
}

export async function getServerSideProps({ res }: any) {
  const { getAllPosts } = await import("@/helper/getPosts");
  const posts = await getAllPosts();
  res.setHeader("Cache-Control", "public, maxage=60, stale-while-revalidate");
  return {
    props: {
      posts,
    },
  };
}
