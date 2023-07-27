import { initialStates } from "../Drawer/DrawerStates";

type PayloadType =
  | { type: "TOGGLE_NOTIFICATION_DRAWER"; payload: { notificationDrawer: boolean } }
  | { type: "TOGGLE_RECEIVER_DRAWER"; payload: { receiverDrawer: boolean } }
  | { type: "TOGGLE_RESULT_DRAWER"; payload: { resultDrawer: boolean } }
  | { type: "TOGGLE_SEARCH_DRAWER"; payload: { searchDrawer: boolean } };


export type DrawerActionsType = PayloadType;

export function drawerreducer(
  state: typeof initialStates,
  action: DrawerActionsType
) {
  switch (action.type) {
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
