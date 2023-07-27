import { ActionsModalTypes } from "@/types/ActionsTypes";


export function modalReducer(state: ModalStates, action: ActionsModalTypes) {
  switch (action.type) {
    case "SHOW_REPORT_MODAL":
      return {
        ...state,
        showReportModal: action.payload.showReportModal,
      };
    case "TOGGLE_POST_MODAL":
      return {
        ...state,
        postModal: action.payload.postModal,
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
    case "TOGGLE_FEED_MODAL":
      return {
        ...state,
        feedModal: action.payload.feedModal,
      };
    case "TOGGLE_POST_COMMENT_MODAL":
      return {
        ...state,
        postCommentModal: action.payload.postCommentModal,
      };
    case "TOGGLE_POST_REPORT_MODAL":
      return {
        ...state,
        postReportModal: action.payload.postReportModal,
      };
    case "TOGGLE_MESSAGE_MODAL":
      return {
        ...state,
        messageModal: action.payload.messageModal,
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
    case "SHOW_USERS_MODAL":
      return {
        ...state,
        showAllUserModal: action.payload.showAllUserModal,
      };
    default:
      return state;
  }
}
