import { DrawerActionsTypes } from "@/types/ActionsTypes";
import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useMemo,
  useReducer,
} from "react";
import { drawerreducer } from "../reducerFunctions/drawer";

type DrawerStatesproviderTypes = {
  drawerStates: DrawerStatesTypes;
  drawerDispatch: Dispatch<DrawerActionsTypes>;
};
export const initialStates = {
  isExtraListOpen: false,
  isSearchDrawerOpen: false,
  resultDrawer: false,
  notificationDrawer: false,
  receiverDrawer: false,
};
export const DrawerStates = createContext<DrawerStatesproviderTypes>({
  drawerStates: initialStates,
  drawerDispatch: () => {},
});

export const DrawerStatesprovider = ({ children }: { children: ReactNode }) => {
  const [drawerStates, drawerDispatch] = useReducer(
    drawerreducer,
    initialStates
  );

  const values = useMemo(() => {
    return {
      drawerStates,
      drawerDispatch,
    };
  }, [drawerStates]);

  return (
    <DrawerStates.Provider value={values}>{children}</DrawerStates.Provider>
  );
};
export const useDrawerContext = () => useContext(DrawerStates);
