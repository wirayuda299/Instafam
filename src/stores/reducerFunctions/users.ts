import { ActionsTypeUsersPage } from "@/types/ActionsTypes";

export type StatesTypes = {
  postTab: boolean;
  savedPostTab: boolean;
  users: IUser[];
  loadingSavedPosts: boolean;
  loadingUsers: boolean;
  savedPosts: IUserPostProps[];
  showUsers: boolean;
};
export function reducer(state: StatesTypes, action: ActionsTypeUsersPage) {
  switch (action.type) {
    case "SET_POST_TAB":
      return {
        ...state,
        postTab: true,
        savedPostTab: false,
      };
    case "SET_SHOW_USERS":
      return {
        ...state,
        showUsers: action.payload.showUsers,
      };
    case "SET_Tagged_POST_TAB":
      return {
        ...state,
        postTab: false,
        savedPostTab: false,
      };
    case "SET_SAVED_POST_TAB":
      return {
        ...state,
        postTab: false,
        savedPostTab: true,
      };
    case "SET_SAVED_POSTS":
      return {
        ...state,
        savedPosts: action.payload.savedposts,
        loadingSavedPosts: false,
      };

    case "SET_USERS":
      return {
        ...state,
        users: action.payload.users,
        loadingUsers: false,
      };
    default:
      return state;
  }
}
