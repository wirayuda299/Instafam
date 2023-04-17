import { Suspense } from "react";
import { IUserPostProps } from "@/types/post";
import dynamic from "next/dynamic";

const FeedsCards = dynamic(() => import("@/components/Feeds"));

type ISavedPostsProps = {
  savedPosts: IUserPostProps[] | undefined;
  savedPostsTab: boolean;
};
export default function SavedPosts({
  savedPosts,
  savedPostsTab,
}: ISavedPostsProps) {
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
              <Suspense key={post.postId} fallback={ <p>Loading...</p> }>
                <FeedsCards post={post} />
              </Suspense>
            ))
          )}
        </>
      )}
    </>
  );
}
