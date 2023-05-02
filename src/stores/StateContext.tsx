import { Dispatch, createContext, useContext, useMemo, useReducer } from 'react';
import { reducer } from './reducer';
import { State } from '@/types/State';
import { ActionsType } from '@/types/ActionsTypes';

const intialState: State = {
  selectedPost: null,
  isExtraListOpen: false,
  isSearchDrawerOpen: false,
  menuModal: false,
  result: [],
  postPreviewModal: false,
  resultDrawer: false,
  feedModal: false,
  postModal: false,
  postCommentModal: false,
  notificationDrawer: false,
  notificationModal: false,
  postCreateModal: false,
  postReportModal: false,
  blurhash: '',
  previewUrl: '',
  croppedImage: '',
  receiverDrawer: false,
  messageModal: false,
  chatRoomSelected: null,
  
}

type StateProviderProps = {
  Dispatch: Dispatch<ActionsType>
  state: State
}

const StateContext = createContext<StateProviderProps>({
  Dispatch: () => { },
  state: intialState
});

export function StateProvider({ children }: { children: React.ReactNode }) {
  const [state, Dispatch] = useReducer(reducer, intialState)

  const values = useMemo(() => {
    return {
      state,
      Dispatch,
    }
  }, [state])

  return (
    <StateContext.Provider value={values}>
      {children}
    </StateContext.Provider>
  );
}

export const useStateContext = () => useContext(StateContext);