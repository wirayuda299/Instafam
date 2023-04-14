import { IUserPostProps } from "@/types/post";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

const options = {
  root: null,
  rootMargin: "0px",
  threshold: 1.0,
};

export default function useInfiniteScroll(last: any) {
  const { ref, inView } = useInView(options);
  const [postsState, setPostsState] = useState<IUserPostProps[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (inView) {
      const next = import("@/helper/getPosts");
      next.then((nextPosts) => {
        nextPosts.fetchNextPosts(last).then((posts) => {
          setPostsState(posts as IUserPostProps[]);
          setLoading(false);
        });
      });
    }
  }, [inView]);

  return { ref, postsState, loading, inView };
}
