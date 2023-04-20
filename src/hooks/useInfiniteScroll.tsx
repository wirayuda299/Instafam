import { IUserPostProps } from "@/types/post";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useInView } from "react-intersection-observer";

const options = {
  root: null,
  rootMargin: "0px",
  threshold: 1.0,
};

export default function useInfiniteScroll(last: IUserPostProps | null) {
  const { ref, inView } = useInView(options);
  const [postsState, setPostsState] = useState<IUserPostProps[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    try {
      const getPosts = async () => {
        const { fetchNextPosts } = await import("@/helper/getPosts");
        const posts = await fetchNextPosts(last);
        if (posts) {
          setPostsState(posts);
          setLoading(false);
        }
      };
      if (inView) {
        getPosts();
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  }, [inView]);

  return { ref, loading, inView, postsState };
}
