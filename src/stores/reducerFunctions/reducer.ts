import { ActionsType } from "@/types/ActionsTypes";

export function reducer(state: GlobalStates, action: ActionsType) {
  switch (action.type) {
    case "SET_SELECTED_CHAT":
      return {
        ...state,
        selectedChat: action.payload.selectedChat,
      };
    case "SET_BLUR_HASH":
      return {
        ...state,
        blurhash: action.payload.blurhash,
      };
    case "SET_CHAT_ROOM_SELECTED":
      return {
        ...state,
        chatRoomSelected: action.payload.chatRoomSelected,
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
    case "SET_RESULT":
      return {
        ...state,
        result: action.payload.result,
      };
    default:
      return state;
  }
}
