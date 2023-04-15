import { AiOutlineClose } from "react-icons/ai";
import { IUserPostProps } from "@/types/post";
import { Dispatch, SetStateAction } from "react";
import PostHeaderMobile from "../Post/IDPreviewMobile";
import Modal from "../Modal";
import PostCommentDesktop from "../Post/PostCommentDesktop";

type Props = {
  isModalOpen: boolean;
  commentOpen: boolean;
  post: IUserPostProps;
  refreshData: () => void;
  setCommentOpen: Dispatch<SetStateAction<boolean>>;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};
export default function FeedModal({
  commentOpen,
  isModalOpen,
  post,
  refreshData,
  setCommentOpen,
  setIsModalOpen,
}: Props) {
  return (
    <Modal isModalOpen={isModalOpen}>
      <div className="h-full w-full text-black dark:text-white">
        <div className="h-full w-full overflow-y-auto">
          <div className="mx-auto grid h-screen w-full max-w-5xl place-items-center rounded-lg ">
            <div className="relative grid h-full w-full grid-cols-1 justify-between overflow-y-auto rounded-xl border border-gray-500 border-opacity-10 bg-white p-5 shadow-2xl dark:bg-black lg:max-h-[530px] lg:grid-cols-2 lg:p-0">
              <PostHeaderMobile
                setIsModalOpen={setIsModalOpen}
                commentOpen={commentOpen}
                post={post}
                refreshData={refreshData}
                setCommentOpen={setCommentOpen}
              />
              <PostCommentDesktop
                commentOpen={commentOpen}
                post={post}
                refreshData={refreshData}
                setCommentOpen={setCommentOpen}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsModalOpen(false);
                  }}
                >
                  <AiOutlineClose size={25} />
                </button>
              </PostCommentDesktop>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
