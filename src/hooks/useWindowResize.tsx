import { ActionsType } from "@/types/ActionsTypes";
import { useEffect } from "react";

export default function useWindowResize(Dispatch: React.Dispatch<ActionsType>) {
  const closeNotificationDrawer = () => {
    Dispatch({
      type: "TOGGLE_NOTIFICATION_DRAWER",
      payload: {
        notificationDrawer: false,
      },
    });
  };
  const closeOnresize = () => {
    Dispatch({
      type: "TOGGLE_POST_PREVIEW_MODAL",
      payload: {
        postPreviewModal: false,
      },
    });
    Dispatch({
      type: "SELECT_POST",
      payload: {
        post: null,
      },
    });
  };
  const closeExtraList = () => {
    Dispatch({
      type: "TOGGLE_EXTRA_LIST",
      payload: {
        extraList: false,
      },
    });
  };
  const closeCommentDrawer = () => {
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
  };
  const closeSearchdrawer = () => {
    Dispatch({
      type: "TOGGLE_SEARCH_DRAWER",
      payload: {
        searchDrawer: false,
      },
    });
  };
  const closeMenuModal = () => {
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
      closeNotificationDrawer();
      closeExtraList();
      closeCommentDrawer();
      closeSearchdrawer();
      closeMenuModal();
    });
    return () => {
      window.removeEventListener("resize", () => {
        closeOnresize();
        closeNotificationDrawer();
        closeExtraList();
        closeCommentDrawer();
        closeSearchdrawer();
        closeMenuModal();
      });
    };
  }, []);
}
