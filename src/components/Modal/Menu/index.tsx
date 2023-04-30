import useUser from "@/hooks/useUser";
import {
  useDarkModeStore,
  useMenuModalStore,
  usePostModalStore,
  useReportModalStore,
  useSelectedPostStore,
} from "@/stores/stores";
import { IUserPostProps } from "@/types/post";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useStore } from "zustand";
import Lists from "./Lists";
import { createPortal } from "react-dom";
import toast from "react-hot-toast";

export default function Menu() {
  const { setReportModal } = useStore(useReportModalStore);
  const { selectedPost } = useStore(useSelectedPostStore);
  const { setMenuModal } = useStore(useMenuModalStore);
  const { replace, asPath } = useRouter();
  const refreshData = () => replace(asPath);
  const { setPostModal } = useStore(usePostModalStore);
  const { menuModal } = useStore(useMenuModalStore);
  const { darkMode } = useStore(useDarkModeStore);
  const { data: session } = useSession();
  const { user } = useUser(session?.user?.uid as string);

  const handleCLose = () => {
    setMenuModal(false);
    setPostModal(false);
  };
  const openReportModal = () => {
    setReportModal(true);
    setMenuModal(false);
  };

  const postActions = async () => {
    if (selectedPost?.postedById === session?.user.uid) {
      const { deletePost } = await import("@/helper/deletePost");
      const deletePostsArgs = {
        post: selectedPost,
        refreshData,
        session,
      };
      deletePost(deletePostsArgs)
        .then(() => {
          setMenuModal(false);
          refreshData()
          toast.success("Post deleted successfully.");
        });
    } else {
      const { handleFollow } = await import("@/helper/follow");
      const followArgs = {
        id: selectedPost?.postedById as string,
        uid: session?.user.uid as string,
        followedByName: session?.user.username as string,
        followedDate: Date.now(),
        followedImage: session?.user.image as string,
      };
      await handleFollow(followArgs)
    }

  }

  const buttonLists = [
    {
      id: 1,
      name: selectedPost?.postedById === session?.user.uid ? "Edit" : "Report",
      event: () => selectedPost?.postedById === session?.user?.uid ? undefined : openReportModal()
    },
    {
      id: 2,
      name:
        selectedPost?.postedById === session?.user.uid
          ? "Delete"
          : user?.following.find((user) => user.userId === selectedPost?.postedById) ? "UnFollow" : "Follow",
      event: async () => postActions(),
    },
    {
      id: 3,
      name: "Copy Link",
      event: async () => {
        const { copyLink } = await import("@/util/copyLink");
        copyLink(`${process.env.NEXTAUTH_URL}/post/${selectedPost?.postId}`);
        setMenuModal(false);
      },
    },
    {
      id: 4,
      name: "Go to post",
      event: () => {
        handleCLose();
        replace(`/post/${selectedPost?.postId}`);
      },
    },

    {
      id: 5,
      name: "Share to",
      event: async () => {
        const { share } = await import("@/util/share");
        share(
          selectedPost as IUserPostProps,
          `${process.env.NEXTAUTH_URL}/post/${selectedPost?.postId}`
        );
      },
    },
    {
      id: 6,
      name: "Cancel",
      event: handleCLose,
    },
  ];
  if (!menuModal) return null;

  return createPortal(
    <div
      className={` fixed left-0 top-0 z-[99999999] h-screen w-full  select-none !overflow-x-hidden !overflow-y-hidden  bg-black bg-opacity-60 shadow-sm  ${menuModal ? "animate-fadeIn" : "animate-fadeOut"
        }`}
      aria-modal="true"
      role="dialog"
    >
      <div className="mx-auto h-full max-w-5xl text-center ">
        <div className="flex h-full flex-col items-center justify-center">
          <ul
            className={`flex min-w-[400px] flex-col rounded-lg  p-5 ${darkMode ? "!bg-black text-white" : "!bg-white text-black"
              } `}
          >
            <Lists
              buttonLists={buttonLists}
              darkMode={darkMode}
              selectedPost={selectedPost}
              session={session}
              setMenuModal={setMenuModal}
            />
          </ul>
        </div>
      </div>
    </div>,
    document.getElementById("modal") as Element
  );
}
