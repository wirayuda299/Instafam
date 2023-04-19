import { AiOutlineArrowLeft } from "react-icons/ai";
import { useStore } from "zustand";
import {
  useDarkModeStore,
  usePostCommentModalStore,
  useSelectedPostStore,
} from "@/stores/stores";
import Image from "next/image";
import { getCreatedDate } from "@/util/postDate";
import Comments from "../Post/Comments";
import { useSession } from "next-auth/react";
import { IUserPostProps } from "@/types/post";
import usePost from "@/hooks/usePost";

type Comments = Pick<IUserPostProps, "comments">;

export default function PostComment() {
  const { postCommentModal, setPostCommentModal } = useStore(
    usePostCommentModalStore
  );
  const { selectedPost } = useStore(useSelectedPostStore);
  const { darkMode } = useStore(useDarkModeStore);
  const { data: session } = useSession();
  const { comments } = usePost(selectedPost);
  return (
    <>
      {postCommentModal && selectedPost && session && (
        <div
          className={` ${
            darkMode ? "bg-black text-white" : "bg-white text-black"
          } fixed left-0 top-0 z-[99] h-screen w-full select-none overflow-y-auto !overflow-x-hidden  bg-black bg-opacity-60 shadow-sm  ${
            postCommentModal
              ? "animate-commentSlideIn "
              : "animate-commentSlideOut"
          }`}
          aria-modal="true"
          role="dialog"
        >
          <div
            className={` relative  h-full text-center ${
              darkMode ? "bg-black text-white" : "bg-white text-black"
            }`}
          >
            <div className="h-full">
              <div
                className={`sticky top-0 flex w-full items-center space-x-3 border-b border-gray-500 border-opacity-50 bg-black py-3 text-white  ${
                  darkMode ? "bg-black text-white" : "bg-white text-black"
                }`}
              >
                <button
                  onClick={() => setPostCommentModal(false)}
                  className="flex-1 px-2"
                >
                  <AiOutlineArrowLeft
                    size={25}
                    className={`${darkMode ? "text-white" : "text-black"}`}
                  />
                </button>
                <div className="w-full">
                  <h1
                    className={`text-center font-semibold ${
                      darkMode ? "text-white" : "text-black"
                    }`}
                  >
                    Comments
                  </h1>
                </div>
              </div>
              <div
                className={`w-full ${
                  darkMode ? "bg-black text-white" : "bg-white text-black"
                }`}
              >
                <div
                  className={`flex flex-wrap space-x-2 py-4  ${
                    darkMode ? "bg-black text-white" : "bg-white text-black"
                  }`}
                >
                  <div className="mb-5 flex w-full space-x-2 pl-2">
                    <div>
                      <Image
                        src={selectedPost?.postedByPhotoUrl as string}
                        width={40}
                        height={40}
                        priority
                        alt={selectedPost?.author ?? "post"}
                        className="h-10 w-10 rounded-full bg-gradient-to-bl from-pink-600 to-orange-600 p-1"
                      />
                    </div>
                    <div>
                      <div className="flex space-x-1">
                        <h4 className={`text-left text-sm font-semibold `}>
                          {selectedPost?.author}
                        </h4>
                        <small className="text-[10px] text-gray-500">
                          {getCreatedDate(selectedPost)}
                        </small>
                      </div>
                      <p className=" text-left text-xs">
                        {selectedPost?.captions}
                      </p>
                      {selectedPost?.hashtags.map((hashtag) => (
                        <span
                          className="text-left text-xs text-gray-500"
                          key={hashtag}
                        >
                          {hashtag}
                        </span>
                      ))}
                    </div>
                  </div>
                  {comments.map((comment) => (
                    <div
                      className="mb-5 flex w-full space-x-2"
                      key={comment.createdAt}
                    >
                      <Image
                        src={comment?.commentByPhoto as string}
                        width={40}
                        height={40}
                        priority
                        alt={comment?.commentByName ?? "post"}
                        className="rounded-full"
                      />
                      <div>
                        <div className="flex space-x-1">
                          <h4 className=" text-left text-sm font-semibold ">
                            {comment?.commentByName}
                          </h4>
                        </div>
                        <p className=" text-left text-xs">{comment?.comment}</p>
                        {selectedPost?.hashtags.map((hashtag) => (
                          <span className="text-xs text-gray-500" key={hashtag}>
                            {hashtag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {postCommentModal && (
              <div
                className={`fixed bottom-0 left-0 right-0 w-full ${
                  darkMode ? "bg-black" : "bg-white"
                }`}
              >
                <div className="flex items-center space-x-3 px-3">
                  <Image
                    src={session?.user.image as string}
                    width={45}
                    height={45}
                    alt=""
                    className="rounded-full"
                  />
                  <div className="w-full rounded-full border px-2 py-2">
                    <Comments
                      comments={selectedPost?.comments as Comments["comments"]}
                      post={selectedPost as IUserPostProps}
                      session={session}
                      ssr={false}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
