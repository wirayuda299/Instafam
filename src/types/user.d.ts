type Following = {
  userId: string;
};

type Followers = {
  followedBy: string;
  followedByName: string;
  followedImage: string;
};

type Base = {
  image: string;
  createdAt: string;
  email: string;
  uid: string;
  username: string;
  name: string;
};
interface IUser extends Base {
  following: Following[];
  followers: Followers[];
  savedPosts: IUserPostProps[];
}
