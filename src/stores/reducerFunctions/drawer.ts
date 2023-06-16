import { DrawerActionsTypes } from "@/types/ActionsTypes";
import { initialStates } from "../Drawer/DrawerStates";

export function drawerreducer(
  state: typeof initialStates,
  action: DrawerActionsTypes
) {
  switch (action.type) {
    case "TOGGLE_EXTRA_LIST":
      return {
        ...state,
        isExtraListOpen: action.payload.extraList,
      };
    case "TOGGLE_RECEIVER_DRAWER":
      return {
        ...state,
        receiverDrawer: action.payload.receiverDrawer,
      };
    case "TOGGLE_SEARCH_DRAWER":
      return {
        ...state,
        isSearchDrawerOpen: action.payload.searchDrawer,
      };
    case "TOGGLE_RESULT_DRAWER":
      return {
        ...state,
        resultDrawer: action.payload.resultDrawer,
      };
    case "TOGGLE_NOTIFICATION_DRAWER":
      return {
        ...state,
        notificationDrawer: action.payload.notificationDrawer,
      };
    default:
      return state;
  }
}
