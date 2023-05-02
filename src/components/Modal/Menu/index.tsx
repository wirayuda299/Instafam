import useUser from "@/hooks/useUser";
import { useDarkModeStore } from "@/stores/stores";
import { IUserPostProps } from "@/types/post";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useStore } from "zustand";
import Lists from "./Lists";
import { createPortal } from "react-dom";
import { memo } from "react";
import { useStateContext } from "@/stores/StateContext";

function Menu() {
  const { state: { selectedPost } } = useStateContext();
  const { replace, asPath } = useRouter();
  const refreshData = () => replace(asPath);
  const { state: { menuModal }, Dispatch } = useStateContext();
  const { darkMode } = useStore(useDarkModeStore);
  const { data: session } = useSession();
  const { user } = useUser(session?.user?.uid as string);

  const openReportModal = () => {
    Dispatch({
      type: 'TOGGLE_POST_REPORT_MODAL',
      payload: {
        postReportModal: true
      }
    })
    Dispatch({
      type: 'TOGGLE_MENU_MODAL',
      payload: {
        menuModal: false
      }
    })
  };
 
  const closeMenuModal = () => {
    Dispatch({
      type: 'TOGGLE_MENU_MODAL',
      payload: {
        menuModal: false
      }
    })
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
      event: async () => {
        const { postActions } = await import("@/helper/postActions")
        await postActions(selectedPost as IUserPostProps, session, refreshData, closeMenuModal)
      },
    },
    {
      id: 3,
      name: "Copy Link",
      event: async () => {
        const { copyLink } = await import("@/utils/copyLink");
        copyLink(`${process.env.NEXTAUTH_URL}/post/${selectedPost?.postId}`);
        closeMenuModal()
      },
    },
    {
      id: 4,
      name: "Go to post",
      event: () => {
        closeMenuModal()
        replace(`/post/${selectedPost?.postId}`);
      }
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
        Dispatch({
          type: 'TOGGLE_MENU_MODAL',
          payload: {
            menuModal: false
          }
        })
      }
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
              closeMenuModal={closeMenuModal}
              session={session}
            />
          </ul>
        </div>
      </div>
    </div>,
    document.getElementById("modal") as Element
  );
}
export default memo(Menu);