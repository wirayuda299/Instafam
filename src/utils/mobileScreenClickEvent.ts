import { ActionsType } from "@/types/ActionsTypes";
import { IUserPostProps } from "@/types/post";
import type { Dispatch } from "react";

type MobileClickEventsType = (
  dispatch: Dispatch<ActionsType>,
  post: IUserPostProps
) => void;

export const mobileClickEvents: MobileClickEventsType = (Dispatch, post) => {
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
