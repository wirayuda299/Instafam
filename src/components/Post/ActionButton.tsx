import { IUserPostProps } from "@/types/post";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { RiBookmarkFill } from "react-icons/ri";
import { BiBookmark } from "react-icons/bi";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { TbMessageCircle2 } from "react-icons/tb";
import { type FC, memo } from "react";
import { useStateContext } from "@/stores/StateContext";

type Props = {
  post: IUserPostProps;
  uid: string;
  likes: string[];
  savedBy: string[];
};

const ActionButton: FC<Props> = (props) => {
  const { post, uid, likes, savedBy } = props;
  const { Dispatch } = useStateContext();

  const mobileClickEvents = () => {
    Dispatch({
      type: "SELECT_POST",
      payload: {
        post,
      },
    });
    Dispatch({
      type: "TOGGLE_POST_COMMENT_MODAL",
      payload: {
        postCommentModal: true,
      },
    });
  };

  const largeScreenClickEvent = () => {
    Dispatch({
      type: "TOGGLE_POST_PREVIEW_MODAL",
      payload: {
        postPreviewModal: true,
      },
    });
    Dispatch({
      type: "SELECT_POST",
      payload: {
        post,
      },
    });
  };

  const BUTTON_LISTS = [
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
          likes,
        };
        await handleLikes(Likes);
      },
    },
    {
      id: 2,
      icon: (
        <>
          <FaRegComment
            className="hidden text-2xl hover:text-gray-500 sm:text-3xl lg:block"
            onClick={largeScreenClickEvent}
          />
          <TbMessageCircle2
            className="block text-2xl hover:text-gray-500 sm:text-3xl lg:hidden"
            onClick={mobileClickEvents}
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
        const { share } = await import("@/utils/share");
        share(post, `${process.env.NEXTAUTH_URL}/post/${post.postId}`);
      },
    },
  ];

  return (
    <div className=" mb-2 mt-3 flex items-center justify-between p-1">
      <div className="flex gap-x-5">
        {BUTTON_LISTS.map((btn) => (
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
          };
          const { savePost } = await import("@/helper/savePost");
          savePost(savedPostArgs);
        }}
        name="save post"
        type="button"
        title="save post"
      >
        {savedBy?.includes(uid) ? (
          <RiBookmarkFill className="text-2xl sm:text-3xl" />
        ) : (
          <BiBookmark className="text-2xl hover:text-gray-500 sm:text-3xl" />
        )}
      </button>
    </div>
  );
};
export default memo(ActionButton);
