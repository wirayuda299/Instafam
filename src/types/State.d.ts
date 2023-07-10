type GlobalStates = {
  selectedPost: IUserPostProps | null;
  result: IUser[];
  blurhash: string;
  previewUrl: string;
  croppedImage: string;
  chatRoomSelected: IUser | null;
  selectedChat: DataMessage | null;
};

type ModalStates = {
  menuModal: boolean;
  postPreviewModal: boolean;
  feedModal: boolean;
  postModal: boolean;
  postCommentModal: boolean;
  notificationModal: boolean;
  postCreateModal: boolean;
  postReportModal: boolean;
  messageModal: boolean;
  showAllUserModal: boolean;
  showReportModal: boolean;
};

type DrawerStatesTypes = {
  isSearchDrawerOpen: boolean;
  resultDrawer: boolean;
  notificationDrawer: boolean;
  receiverDrawer: boolean;
};
