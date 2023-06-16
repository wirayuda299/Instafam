import {
  type Dispatch,
  createContext,
  useContext,
  useMemo,
  useReducer,
  ReactNode,
} from "react";
import { reducer } from "../reducerFunctions/reducer";
import { ActionsType } from "@/types/ActionsTypes";

const initialState: GlobalStates = {
  selectedPost: null,
  result: [],
  blurhash: "",
  previewUrl: "",
  croppedImage: "",
  chatRoomSelected: null,
  selectedChat: null,
};

type StateProviderProps = {
  Dispatch: Dispatch<ActionsType>;
  state: GlobalStates;
};

const StateContext = createContext<StateProviderProps>({
  Dispatch: () => {},
  state: initialState,
});

export function StateProvider({ children }: { children: ReactNode }) {
  const [state, Dispatch] = useReducer(reducer, initialState);

  const values = useMemo(() => {
    return {
      state,
      Dispatch,
    };
  }, [state]);

  return (
    <StateContext.Provider value={values}>{children}</StateContext.Provider>
  );
}

export const useStateContext = () => useContext(StateContext);
