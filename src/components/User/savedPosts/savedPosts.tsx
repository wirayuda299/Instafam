import { Suspense } from "react";
import { tabSavedPosts } from "@/store/TabToggler";
import { useRecoilValue } from "recoil";
import { IUserPostProps } from "@/types/post";
import Loader from "@/components/Loader/Loader";
import { z } from "zod";
import dynamic from "next/dynamic";
import { PostSchema } from "@/schema/PostSchema";
const FeedsCards = dynamic(() => import("@/components/Feeds"), {
  loading: () => <Loader />,
});

type ISavedPostsProps = {
  savedPosts: IUserPostProps[] | [];
};
const SavedPropsSchema = z.object({
  savedPosts: z.array(PostSchema).nullish().optional(),
});

export default function SavedPosts({ savedPosts }: ISavedPostsProps) {
  const savedPostsTab = useRecoilValue(tabSavedPosts);
  const isValid = SavedPropsSchema.parse({ savedPosts });
  if (!isValid) return null;
  return (
    <>
      {savedPostsTab && (
        <>
          {savedPosts && savedPosts.length < 1 ? (
            <div className="col-span-3 mx-auto h-full w-full">
              <h1 className="w-full text-center text-2xl font-semibold text-gray-500 dark:text-gray-400">
                No saved posts
              </h1>
            </div>
          ) : (
            savedPosts?.map((post) => (
              <Suspense key={post.postId} fallback={<Loader />}>
                <FeedsCards post={post} />
              </Suspense>
            ))
          )}
        </>
      )}
    </>
  );
}
