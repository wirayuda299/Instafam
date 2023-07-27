import {
  type Dispatch,
 type ReactNode,
  createContext,
  useContext,
  useMemo,
  useReducer,
} from "react";
import { DrawerActionsType, drawerreducer } from "../reducerFunctions/drawer";

type DrawerStatesproviderTypes = {
  drawerStates: DrawerStatesTypes;
  drawerDispatch: Dispatch<DrawerActionsType>;
};
export const initialStates = {
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
