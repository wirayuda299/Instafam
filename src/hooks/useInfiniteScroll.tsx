import { fetchNextPosts } from "@/helper/getPosts";
import { IUserPostProps } from "@/types/post";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function useInfiniteScroll(last:any) {
  const { ref, inView } = useInView();
	const [postsState, setPostsState] = useState<IUserPostProps[]>([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		try {
			if (inView) {
				fetchNextPosts(last).then((newPosts) => {
					setPostsState(newPosts as IUserPostProps[]);
					setLoading(false);
				});
			}
		} catch (error) {
			console.log(error);
		}
	}, [inView]);
  return { ref, postsState, loading, inView}
}
