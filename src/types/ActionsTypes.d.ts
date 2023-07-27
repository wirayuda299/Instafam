interface ActionMap<TType, TPayload> {
  type: TType
  payload:T
}

type ActionTypes =
  "TOGGLE_POST_MODAL" | 
  "TOGGLE_POST_CREATE_MODAL" | 
  "TOGGLE_FEED_MODAL" |
  "TOGGLE_POST_COMMENT_MODAL" |
  "SELECT_POST" |
  "SET_RESULT" |
  "TOGGLE_MENU_MODAL" |
  "TOGGLE_POST_PREVIEW_MODAL" |
  "TOGGLE_NOTIFICATION_MODAL" |
  "TOGGLE_POST_REPORT_MODAL"|
  "SET_BLUR_HASH"|
  "SET_PREVIEW_URL"|
  "SET_CROPPED_IMAGE"|
  "TOGGLE_MESSAGE_MODAL"|  
  "SET_CHAT_ROOM_SELECTED"|
  "SET_SELECTED_ACTIVITY" |
  "SET_SELECTED_CHAT" |
  "SHOW_REPORT_MODAL"



type PostModalAction = {
  type: "TOGGLE_POST_MODAL";
  payload: {
    postModal: boolean;
  };
};

type PostCreateModalAction = {
  type: "TOGGLE_POST_CREATE_MODAL";
  payload: {
    postCreateModal: boolean;
  };
};

type FeedModalAction = {
  type: "TOGGLE_FEED_MODAL";
  payload: {
    feedModal: boolean;
  };
};
type postCommentModalAction = {
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

type SetResultAction = {
  type: "SET_RESULT";
  payload: {
    result: IUser[];
  };
};

type ToggleMenuModalAction = {
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
type CroppedImageAction = {
  type: "SET_CROPPED_IMAGE";
  payload: {
    croppedImage: string;
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

type SelectedChatAction = {
  type: "SET_SELECTED_CHAT";
  payload: {
    selectedChat: DataMessage | null;
  };
};
type ShowUsersModalActions = {
  type: "SHOW_USERS_MODAL";
  payload: {
    showAllUserModal: boolean;
  };
};
type ShowReportModalActions = {
  type: "SHOW_REPORT_MODAL";
  payload: {
    showReportModal: boolean;
  };
};

type SetPostTabActions = {
  type: "SET_POST_TAB";
};
type SetSavedPostTabActions = {
  type: "SET_SAVED_POST_TAB";
};
type SetTaggedPostTabActions = {
  type: "SET_Tagged_POST_TAB";
};

type SetUsersActions = {
  type: "SET_USERS";
  payload: {
    users: IUser[];
  };
};
type SetSavedPosts = {
  type: "SET_SAVED_POSTS";
  payload: {
    savedposts: IUserPostProps[];
  };
};
type SetShowUsers = {
  type: "SET_SHOW_USERS";
  payload: {
    showUsers: boolean;
  };
};

export type ActionsTypeUsersPage =
  | SetPostTabActions
  | SetSavedPostTabActions
  | SetUsersActions
  | SetTaggedPostTabActions
  | SetSavedPosts
  | SetShowUsers;

export type ActionsType =
  | SetResultAction
  | SelectPostAction
  | SetBlurHashAction
  | SetPreviewUrlAction
  | CroppedImageAction
  | chatRoomSelectedAction
  | SelectedActivityActions
  | SelectedChatAction;

type ActionsModalTypes =
  ToggleMenuModalAction
  | TogglePostPreviewModalAction 
  | FeedModalAction
  | PostModalAction
  | NotificationModalAction
  | postCommentModalAction
  | PostCreateModalAction
  | PostReportModalAction
  | MessageModalAction
  | ShowUsersModalActions
  | ShowReportModalActions
