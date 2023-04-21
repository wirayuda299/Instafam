import { IUserPostProps } from "@/types/post";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { RiBookmarkFill } from "react-icons/ri";
import { BiBookmark } from "react-icons/bi";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { TbMessageCircle2 } from "react-icons/tb";
import {
  usePostCommentModalStore,
  usePostPreviewModalStore,
  useSelectedPostStore,
} from "@/stores/stores";
import { useStore } from "zustand";

type Props = {
  post: IUserPostProps;
  uid: string;
  likes: string[];
  savedBy: string[];
  refreshData: () => void;
  ssr: boolean;
};

export default function ActionButton(props: Props) {
  const { post, uid, likes, savedBy, refreshData, ssr } = props;
  const { setPostPreviewModal } = useStore(usePostPreviewModalStore);
  const { setSelectedPost } = useStore(useSelectedPostStore);
  const { setPostCommentModal } = useStore(usePostCommentModalStore);

  const clickLgScreen = () => {
    setPostPreviewModal(true);
    setPostCommentModal(false);
    setSelectedPost(post);
  };

  const clickMobileScreen = () => {
    setSelectedPost(post);
    setPostCommentModal(true);
    setPostPreviewModal(false);
  };

  const Buttons = [
    {
      id: 1,
      icon: likes?.includes(uid) ? (
        <AiFillHeart className="animate-popUp text-2xl text-red-600 sm:text-3xl " />
      ) : (
        <AiOutlineHeart className="text-2xl hover:text-gray-500 sm:text-3xl" />
      ),
      onClick: async () => {
        const { handleLikes } = await import("@/helper/like");
        const Likes = {
          post,
          uid,
          refreshData,
        };
        handleLikes(Likes);
      },
    },
    {
      id: 2,
      icon: (
        <>
          <FaRegComment
            className="hidden text-2xl hover:text-gray-500 sm:text-3xl lg:block"
            onClick={clickLgScreen}
          />
          <TbMessageCircle2
            className="block text-2xl hover:text-gray-500 sm:text-3xl lg:hidden"
            onClick={clickMobileScreen}
          />
        </>
      ),
    },
    {
      id: 3,
      icon: (
        <IoPaperPlaneOutline className="text-2xl hover:text-gray-500 sm:text-3xl" />
      ),
      onClick: async () => {
        const { share } = await import("@/util/share");
        share(post, `${process.env.NEXTAUTH_URL}/post/${post.postId}`);
      },
    },
  ];

  return (
    <div className=" mb-2 mt-3 flex items-center justify-between p-1">
      <div className="flex gap-x-5">
        {Buttons.map((btn) => (
          <button
            key={btn.id}
            onClick={btn.onClick}
            name="action button"
            type="button"
            title="action button"
                      >
            {btn.icon}
          </button>
        ))}
      </div>
      <button
        onClick={async () => {
          const savedPostArgs = {
            post,
            uid,
            refreshData,
            ssr,
          };
        
          const { savePost } = await import("@/helper/savePost");
          
          savePost(savedPostArgs);
        }}
        name="save post"
        type="button"
        title="save post"
      >
        { savedBy?.includes(uid) ? (
          <RiBookmarkFill className="text-2xl sm:text-3xl" />
        ) : (
          <BiBookmark className="text-2xl hover:text-gray-500 sm:text-3xl" />
        )}
      </button>
    </div>
  );
}
