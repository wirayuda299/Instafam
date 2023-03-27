export interface IUser {
  image: string,
  createdAt: string,
  following: {
      userId: string,
  }[],
  followers: {
      userId: string,
  }[],
  email: string,
  savedPosts: IUserPostProps[],
  uid: string,
  username: string
  name: string,
}