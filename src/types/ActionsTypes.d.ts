import { IUserPostProps } from "./post";
import { IUser } from "./user";

export type PostModalAction = {
  type: "TOGGLE_POST_MODAL";
  payload: {
    postModal: boolean;
  };
};

export type PostCrateModalAction = {
  type: "TOGGLE_POST_CREATE_MODAL";
  payload: {
    postCreateModal: boolean;
  };
};
export type NotificationDrawerAction = {
  type: "TOGGLE_NOTIFICATION_DRAWER";
  payload: {
    notificationDrawer: boolean;
  };
};
type ResultDrawerAction = {
  type: "TOGGLE_RESULT_DRAWER";
  payload: {
    resultDrawer: boolean;
  };
};
type FeedModalAction = {
  type: "TOGGLE_FEED_MODAL";
  payload: {
    feedModal: boolean;
  };
};
export type postCommentModalAction = {
  type: "TOGGLE_POST_COMMENT_MODAL";
  payload: {
    postCommentModal: boolean;
  };
};
type SelectPostAction = {
  type: "SELECT_POST";
  payload: {
    post: IUserPostProps | null;
  };
};
type ToggleExtraListAction = {
  type: "TOGGLE_EXTRA_LIST";
  payload: {
    extraList: boolean;
  };
};
type ToggleSearchDrawerAction = {
  type: "TOGGLE_SEARCH_DRAWER";
  payload: {
    searchDrawer: boolean;
  };
};

export type SetResultAction = {
  type: "SET_RESULT";
  payload: {
    result: IUser[];
  };
};

export type ToggleMenuModalAction = {
  type: "TOGGLE_MENU_MODAL";
  payload: {
    menuModal: boolean;
  };
};

type TogglePostPreviewModalAction = {
  payload: {
    postPreviewModal: boolean;
  };
  type: "TOGGLE_POST_PREVIEW_MODAL";
};
type NotificationModalAction = {
  type: "TOGGLE_NOTIFICATION_MODAL";
  payload: {
    notificationModal: boolean;
  };
};
export type PostReportModalAction = {
  type: "TOGGLE_POST_REPORT_MODAL";
  payload: {
    postReportModal: boolean;
  };
};
export type SetBlurHashAction = {
  type: "SET_BLUR_HASH";
  payload: {
    blurhash: string;
  };
};
export type SetPreviewUrlAction = {
  type: "SET_PREVIEW_URL";
  payload: {
    previewUrl: string;
  };
};
export type CroppedImageAction = {
  type: "SET_CROPPED_IMAGE";
  payload: {
    croppedImage: string;
  };
};
type ReceiverDrawerAction = {
  type: "TOGGLE_RECEIVER_DRAWER";
  payload: {
    receiverDrawer: boolean;
  };
};
type MessageModalAction = {
  type: "TOGGLE_MESSAGE_MODAL";
  payload: {
    messageModal: boolean;
  };
};
type chatRoomSelectedAction = {
  type: "SET_CHAT_ROOM_SELECTED";
  payload: {
    chatRoomSelected: IUser | null;
  };
};
type SelectedActivityActions = {
  type: "SET_SELECTED_ACTIVITY";
  payload: {
    activity: string;
  };
};

export type ActionsType =
  | TogglePostPreviewModalAction
  | ToggleMenuModalAction
  | SetResultAction
  | ToggleSearchDrawerAction
  | ToggleExtraListAction
  | SelectPostAction
  | ResultDrawerAction
  | FeedModalAction
  | PostModalAction
  | postCommentModalAction
  | NotificationDrawerAction
  | NotificationModalAction
  | PostCrateModalAction
  | PostReportModalAction
  | SetBlurHashAction
  | SetPreviewUrlAction
  | CroppedImageAction
  | ReceiverDrawerAction
  | MessageModalAction
  | chatRoomSelectedAction
  | SelectedActivityActions;
