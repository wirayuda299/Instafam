interface IUser {
  image: string;
  createdAt: string;
  following: {
    userId: string;
  }[];
  followers: {
    followedBy: string;
    followedByName: string;
    followedImage: string;
  }[];
  email: string;
  savedPosts: IUserPostProps[];
  uid: string;
  username: string;
  name: string;
}
