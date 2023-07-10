import useUser from "@/hooks/useUser";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Lists from "./Lists";
import { createPortal } from "react-dom";
import { memo } from "react";
import { useStateContext } from "@/stores/Global/StateContext";
import { useModalContext } from "@/stores/Modal/ModalStatesContext";

const Menu = () => {
  const { state: { selectedPost } } = useStateContext();
  
  const { modalStates: { menuModal }, modalDispatch } = useModalContext();

  const { replace, asPath } = useRouter();
  const refreshData = () => replace(asPath);
  const { data: session } = useSession();
  const { user } = useUser(session?.user?.uid as string);

  const openReportModal = () => {
    modalDispatch({
      type: "TOGGLE_POST_REPORT_MODAL",
      payload: {
        postReportModal: true,
      },
    });
    modalDispatch({
      type: "TOGGLE_MENU_MODAL",
      payload: {
        menuModal: false,
      },
    });
  };

  
  const closeMenuModal = () => {
    modalDispatch({
      type: "TOGGLE_MENU_MODAL",
      payload: {
        menuModal: false,
      },
    });
  };

  const buttonLists = [
    {
      id: 1,
      name: selectedPost?.postedById === session?.user.uid ? "Edit" : "Report",
      event: () =>
        selectedPost?.postedById === session?.user?.uid
          ? undefined
          : openReportModal(),
    },
    {
      id: 2,
      name:
        selectedPost?.postedById === session?.user.uid
          ? "Delete"
          : user?.following.find(
              (user) => user.userId === selectedPost?.postedById
            )
          ? "UnFollow"
          : "Follow",
      event: async () => {
        const { postActions } = await import("@/helper/postActions");
        await postActions(
          selectedPost as IUserPostProps,
          session,
          refreshData,
          closeMenuModal
        );
      },
    },
    {
      id: 3,
      name: "Copy Link",
      event: async () => {
        const { copyLink } = await import("@/utils/copyLink");
        copyLink(`${process.env.NEXTAUTH_URL}/post/${selectedPost?.postId}`);
        closeMenuModal();
      },
    },
    {
      id: 4,
      name: "Go to post",
      event: () => {
        closeMenuModal();
        replace(`/post/${selectedPost?.postId}`);
      },
    },

    {
      id: 5,
      name: "Share to",
      event: async () => {
        const { share } = await import("@/utils/share");
        share(
          selectedPost as IUserPostProps,
          `${process.env.NEXTAUTH_URL}/post/${selectedPost?.postId}`
        );
      },
    },
    {
      id: 6,
      name: "Cancel",
      event: () => {
        modalDispatch({
          type: "TOGGLE_MENU_MODAL",
          payload: {
            menuModal: false,
          },
        });
      },
    },
  ];
  if (!menuModal) return null;

  return createPortal(
    <div
      className={` fixed left-0 top-0 z-[99999999] h-screen w-full select-none  !overflow-x-hidden !overflow-y-hidden bg-black  bg-opacity-60 shadow-sm backdrop-blur-sm  ${
        menuModal ? "animate-fadeIn" : "animate-fadeOut"
      }`}
      aria-modal="true"
      role="dialog"
    >
      <div className="mx-auto h-full max-w-5xl text-center ">
        <div className="flex h-full flex-col items-center justify-center">
          <ul className="flex min-w-[400px] flex-col rounded-lg !bg-white p-5 text-black dark:!bg-black  ">
            <Lists
              buttonLists={buttonLists}
              selectedPost={selectedPost}
              closeMenuModal={closeMenuModal}
              session={session}
            />
          </ul>
        </div>
      </div>
    </div>,
    document.getElementById("modal") as Element
  );
};
export default memo(Menu);
