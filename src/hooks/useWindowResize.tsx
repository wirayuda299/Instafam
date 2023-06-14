import { ActionsType } from "@/types/ActionsTypes";
import { useEffect } from "react";

export default function useWindowResize(Dispatch: React.Dispatch<ActionsType>) {
  const closeOnresize = () => {
    Dispatch({
      type: "TOGGLE_NOTIFICATION_DRAWER",
      payload: {
        notificationDrawer: false,
      },
    });
    Dispatch({
      type: "SHOW_REPORT_MODAL",
      payload: {
        showReportModal: false,
      },
    }),
      Dispatch({
        type: "SHOW_USERS_MODAL",
        payload: {
          showAllUserModal: false,
        },
      });
    Dispatch({
      type: "TOGGLE_POST_PREVIEW_MODAL",
      payload: {
        postPreviewModal: false,
      },
    });
    Dispatch({
      type: "TOGGLE_POST_MODAL",
      payload: {
        postModal: false,
      },
    });
    Dispatch({
      type: "SELECT_POST",
      payload: {
        post: null,
      },
    });
    Dispatch({
      type: "TOGGLE_SEARCH_DRAWER",
      payload: {
        searchDrawer: false,
      },
    });
    Dispatch({
      type: "TOGGLE_EXTRA_LIST",
      payload: {
        extraList: false,
      },
    });
    Dispatch({
      type: "TOGGLE_POST_COMMENT_MODAL",
      payload: {
        postCommentModal: false,
      },
    });
    Dispatch({
      type: "SELECT_POST",
      payload: {
        post: null,
      },
    });
    Dispatch({
      type: "TOGGLE_MENU_MODAL",
      payload: {
        menuModal: false,
      },
    });
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      closeOnresize();
    });
    return () => {
      window.removeEventListener("resize", () => {
        closeOnresize();
      });
    };
  }, []);
}
