import { useStateContext } from "@/stores/StateContext";
import dynamic from "next/dynamic";
import { AiOutlineSearch } from "react-icons/ai";

type Props = {
  posts: IUserPostProps[];
  lastPost: IUserPostProps | null;
};

const PostImage = dynamic(() => import("@/components/Post/Image"), {
  ssr: true,
});

const Form = dynamic(() => import("@/components/Modal/Drawer/Search/Form"), {
  ssr: true,
});
const Footer = dynamic(() => import("@/components/Footer"), {
  ssr: true,
});
const PostInfo = dynamic(() => import("@/components/Post/PostInfo"), {
  ssr: true,
});

export default function Trending({ posts }: Props) {
  const { Dispatch } = useStateContext();
  return (
    <div className="h-screen w-full overflow-y-auto p-5">
      <div className="md:pointer-events-none  md:hidden ">
        <Form height="h-min">
          <button type="submit" name="Search" title="search">
            <AiOutlineSearch size={20} />
          </button>
        </Form>
      </div>
      <div className="m-0 columns-3xs">
        {posts?.map((post) => (
          <div key={`${post.postId}`}>
            <div
              title="click to view the post"
              className={`group relative mb-5 hidden h-full  !w-full cursor-pointer md:block ${
                Number(post.createdAt) % 2 === 0
                  ? "aspect-square"
                  : "aspect-[9/16]"
              }`}
              onClick={() => {
                Dispatch({
                  type: "SELECT_POST",
                  payload: {
                    post,
                  },
                });
                Dispatch({
                  type: "TOGGLE_FEED_MODAL",
                  payload: {
                    feedModal: true,
                  },
                });
              }}
            >
              <PostImage
                post={post}
                className="h-full min-h-full w-full overflow-hidden rounded-lg object-cover object-center"
              />
              <PostInfo post={post} />
            </div>
            <button
              name="open"
              title="open"
              type="button"
              onClick={() => {
                Dispatch({
                  type: "SELECT_POST",
                  payload: {
                    post,
                  },
                });
                Dispatch({
                  type: "TOGGLE_POST_MODAL",
                  payload: {
                    postModal: true,
                  },
                });
              }}
              className={`mb-5 block w-full cursor-pointer md:pointer-events-none md:hidden`}
            >
              <PostImage
                post={post}
                className={`h-full w-full  border border-gray-400 border-opacity-40 object-cover `}
              />
            </button>
          </div>
        ))}
      </div>

      <Footer classNames="flex flex-wrap gap-3 text-xs  text-gray-500 transition-all ease mt-10 justify-center">
        <p className="mt-5 w-full text-center text-xs text-gray-500">
          © 2023 INSTAFAM by{" "}
          <a href="https://instafam.vercel.app" className="pr-1">
            Instafam
          </a>
          from <a href="https://instafam.vercel.app">INSTAFAM</a>
        </p>
      </Footer>
      <br className="md:hidden" />
      <br className="md:hidden" />
      <br className="md:hidden" />
    </div>
  );
}

export async function getServerSideProps({ res }: any) {
  const { getAllPosts } = await import("@/helper/getPosts");
  const response = await getAllPosts();
  const posts = response.sort((a, b) => b.likedBy.length - a.likedBy.length);

  res.setHeader("Cache-Control", "public, maxage=60, stale-while-revalidate");
  return {
    props: {
      posts,
    },
  };
}
