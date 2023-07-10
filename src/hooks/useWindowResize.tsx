import {
  ActionsModalTypes,
  ActionsType,
  DrawerActionsTypes,
} from "@/types/ActionsTypes";
import { useEffect, type Dispatch } from "react";
type Props = {
  Dispatch: Dispatch<ActionsType>;
  modalDispatch: Dispatch<ActionsModalTypes>;
  drawerDispatch: Dispatch<DrawerActionsTypes>;
};
export default function useWindowResize(
  Dispatch: Props["Dispatch"],
  modalDispatch: Props["modalDispatch"],
  drawerDispatch: Props["drawerDispatch"]
) {
  const closeOnresize = () => {
    drawerDispatch({
      type: "TOGGLE_NOTIFICATION_DRAWER",
      payload: {
        notificationDrawer: false,
      },
    });
    modalDispatch({
      type: "SHOW_REPORT_MODAL",
      payload: {
        showReportModal: false,
      },
    }),
      modalDispatch({
        type: "SHOW_USERS_MODAL",
        payload: {
          showAllUserModal: false,
        },
      });
    modalDispatch({
      type: "TOGGLE_POST_PREVIEW_MODAL",
      payload: {
        postPreviewModal: false,
      },
    });
    modalDispatch({
      type: "TOGGLE_POST_MODAL",
      payload: {
        postModal: false,
      },
    });
    modalDispatch({
      type: "TOGGLE_POST_COMMENT_MODAL",
      payload: {
        postCommentModal: false,
      },
    });
    modalDispatch({
      type: "TOGGLE_MENU_MODAL",
      payload: {
        menuModal: false,
      },
    });
    Dispatch({
      type: "SELECT_POST",
      payload: {
        post: null,
      },
    });
    drawerDispatch({
      type: "TOGGLE_SEARCH_DRAWER",
      payload: {
        searchDrawer: false,
      },
    });
    Dispatch({
      type: "SELECT_POST",
      payload: {
        post: null,
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
