import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useMemo,
  useReducer,
} from "react";

import { modalReducer } from "../reducerFunctions/Modal";
import { ActionsModalTypes } from "@/types/ActionsTypes";

type ModalContextProvidersProps = {
  modalStates: ModalStates;
  modalDispatch: Dispatch<ActionsModalTypes>;
};

const initialStates: ModalStates = {
  showReportModal: false,
  showAllUserModal: false,
  menuModal: false,
  postPreviewModal: false,
  feedModal: false,
  postModal: false,
  postCommentModal: false,
  notificationModal: false,
  postCreateModal: false,
  postReportModal: false,
  messageModal: false,
};

export const ModalContext = createContext<ModalContextProvidersProps>({
  modalDispatch: () => {},
  modalStates: initialStates,
});

export const ModalContextProviders = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [modalStates, modalDispatch] = useReducer(modalReducer, initialStates);

  const values = useMemo(() => {
    return {
      modalStates,
      modalDispatch,
    };
  }, [modalStates]);

  return (
    <ModalContext.Provider value={values}>{children}</ModalContext.Provider>
  );
};

export const useModalContext = () => useContext(ModalContext);
