import { ActionsType } from "@/types/ActionsTypes";
import type { State } from "@/types/State";

export function reducer(state: State, action: ActionsType) {
  switch (action.type) {
    case "SET_SELECTED_CHAT":
      return {
        ...state,
        selectedChat: action.payload.selectedChat,
      };
    case "SET_SELECTED_ACTIVITY":
      return {
        ...state,
        selectedActivity: action.payload.activity,
      };
    case "SET_CHAT_ROOM_SELECTED":
      return {
        ...state,
        chatRoomSelected: action.payload.chatRoomSelected,
      };
    case "TOGGLE_RECEIVER_DRAWER":
      return {
        ...state,
        receiverDrawer: action.payload.receiverDrawer,
      };
    case "SET_CROPPED_IMAGE":
      return {
        ...state,
        croppedImage: action.payload.croppedImage,
      };
    case "SET_PREVIEW_URL":
      return {
        ...state,
        previewUrl: action.payload.previewUrl,
      };
    case "SELECT_POST":
      return {
        ...state,
        selectedPost: action.payload.post,
      };
    case "TOGGLE_EXTRA_LIST":
      return {
        ...state,
        isExtraListOpen: action.payload.extraList,
      };
    case "TOGGLE_SEARCH_DRAWER":
      return {
        ...state,
        isSearchDrawerOpen: action.payload.searchDrawer,
      };
    case "SET_RESULT":
      return {
        ...state,
        result: action.payload.result,
      };
    case "TOGGLE_MENU_MODAL":
      return {
        ...state,
        menuModal: action.payload.menuModal,
      };
    case "TOGGLE_POST_PREVIEW_MODAL":
      return {
        ...state,
        postPreviewModal: action.payload.postPreviewModal,
      };
    case "TOGGLE_RESULT_DRAWER":
      return {
        ...state,
        resultDrawer: action.payload.resultDrawer,
      };
    case "TOGGLE_FEED_MODAL":
      return {
        ...state,
        feedModal: action.payload.feedModal,
      };
    case "TOGGLE_POST_MODAL":
      return {
        ...state,
        postModal: action.payload.postModal,
      };
    case "TOGGLE_POST_COMMENT_MODAL":
      return {
        ...state,
        postCommentModal: action.payload.postCommentModal,
      };
    case "TOGGLE_NOTIFICATION_DRAWER":
      return {
        ...state,
        notificationDrawer: action.payload.notificationDrawer,
      };
    case "TOGGLE_NOTIFICATION_MODAL":
      return {
        ...state,
        notificationModal: action.payload.notificationModal,
      };
    case "TOGGLE_POST_CREATE_MODAL":
      return {
        ...state,
        postCreateModal: action.payload.postCreateModal,
      };
    case "TOGGLE_POST_REPORT_MODAL":
      return {
        ...state,
        postReportModal: action.payload.postReportModal,
      };
    case "SET_BLUR_HASH":
      return {
        ...state,
        blurhash: action.payload.blurhash,
      };
    case "TOGGLE_MESSAGE_MODAL":
      return {
        ...state,
        messageModal: action.payload.messageModal,
      };

    default:
      return state;
  }
}
