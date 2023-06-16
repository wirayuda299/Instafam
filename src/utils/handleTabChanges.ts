import { ActionsTypeUsersPage } from "@/types/ActionsTypes";
import { SetStateAction, TransitionStartFunction } from "react";

type ParamsTypes = {
  startTransition: TransitionStartFunction;
  setActiveTab: (value: SetStateAction<number>) => void;
  dispatch: (value: ActionsTypeUsersPage) => void;
  tabId: number;
};

type HandleTabChanges = (params: ParamsTypes) => void;
export const handleTabClick: HandleTabChanges = ({
  dispatch,
  setActiveTab,
  startTransition,
  tabId,
}) => {
  startTransition(() => {
    setActiveTab(tabId);
  });
  switch (tabId) {
    case 1:
      dispatch({
        type: "SET_POST_TAB",
      });
      break;
    case 2:
      dispatch({
        type: "SET_SAVED_POST_TAB",
      });
      break;
    case 3:
      dispatch({
        type: "SET_Tagged_POST_TAB",
      });
      break;
    default:
      break;
  }
};
