import { IUserPostProps } from "./post";
export interface IUser {
  image: string;
  createdAt: string;
  following: {
    userId: string;
  }[];
  followers: {
    followedBy: string;
    followedByName: string;
  }[];
  email: string;
  savedPosts: IUserPostProps[];
  uid: string;
  username: string;
  name: string;
}
